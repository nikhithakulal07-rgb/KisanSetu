import {
  ProcurementCentre,
  Booking,
  ProcurementRecord,
  PaymentRecord,
  AppNotification,
  AdminAlert,
  QueueActionState,
  SimulationState
} from '../types';
import {
  initialCentres,
  initialActiveBooking,
  initialProcurementRecord,
  initialPaymentRecord,
  initialNotifications,
  initialAdminAlerts,
} from './mockData';

type Listener = () => void;

class SimulationStore {
  private centres: ProcurementCentre[] = JSON.parse(JSON.stringify(initialCentres));
  private booking: Booking = JSON.parse(JSON.stringify(initialActiveBooking));
  private procurement: ProcurementRecord = JSON.parse(JSON.stringify(initialProcurementRecord));
  private payment: PaymentRecord = JSON.parse(JSON.stringify(initialPaymentRecord));
  private notifications: AppNotification[] = JSON.parse(JSON.stringify(initialNotifications));
  private adminAlerts: AdminAlert[] = JSON.parse(JSON.stringify(initialAdminAlerts));
  private simulationState: SimulationState = {
    isSimulationActive: false,
    simulatedDelayMinutes: 0,
    simulatedSlowdownPercent: 0,
    stationFailureActive: false,
    queueSpikeCount: 0,
    centreClosureActive: false,
  };
  private listeners: Set<Listener> = new Set();

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error('SimulationStore notify error', err);
      }
    });
  }

  // Getters
  public getCentres(): ProcurementCentre[] {
    return [...this.centres];
  }

  public getCentreById(id: string): ProcurementCentre | undefined {
    return this.centres.find((c) => c.id === id);
  }

  public getActiveBooking(): Booking {
    return { ...this.booking };
  }

  public getProcurement(): ProcurementRecord {
    return { ...this.procurement };
  }

  public getPayment(): PaymentRecord {
    return { ...this.payment };
  }

  public getNotifications(): AppNotification[] {
    return [...this.notifications];
  }

  public getAdminAlerts(): AdminAlert[] {
    return [...this.adminAlerts];
  }

  public getSimulationState(): SimulationState {
    return { ...this.simulationState };
  }

  // Action / Mutation Helpers
  public createBooking(data: Partial<Booking>): Booking {
    const centre = this.centres.find((c) => c.id === data.centreId) || this.centres[1];
    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      tokenNumber: `KFN-${Math.floor(1000 + Math.random() * 9000)}`,
      farmerId: 'farmer-101',
      farmerName: 'Ramesh Patel',
      farmerPhone: '+91 98451 23890',
      centreId: centre.id,
      centreName: centre.name,
      cropType: data.cropType || 'Paddy (Grade A)',
      variety: data.variety || 'JGL 1798',
      expectedQuantityQuintals: data.expectedQuantityQuintals || 35,
      bookingDate: 'Today',
      scheduledArrivalWindow: data.scheduledArrivalWindow || {
        start: '10:30 AM',
        end: '11:00 AM',
      },
      dynamicArrivalWindow: data.dynamicArrivalWindow || {
        start: '10:30 AM',
        end: '11:00 AM',
      },
      currentPositionInQueue: centre.queueSize + 1,
      farmersAhead: centre.queueSize,
      estimatedWaitMinutes: Math.round((centre.queueSize / centre.processingRatePerHour) * 60),
      estimatedProcurementTime: '11:15 AM',
      actionState: 'WAIT_AT_HOME',
      centreDelayMinutes: centre.delayMinutes || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.booking = newBooking;
    
    // Add confirmation notification
    this.addNotification({
      category: 'SLOT_CHANGE',
      title: 'Arrival Window Booked Successfully',
      message: `Token ${newBooking.tokenNumber} allocated at ${centre.name}. Window: ${newBooking.dynamicArrivalWindow.start} - ${newBooking.dynamicArrivalWindow.end}.`,
      severity: 'success',
    });

    this.notify();
    return this.booking;
  }

  public updateActionState(state: QueueActionState) {
    this.booking.actionState = state;
    this.booking.updatedAt = new Date().toISOString();
    
    if (state === 'START_TRAVELLING') {
      this.addNotification({
        category: 'QUEUE_UPDATE',
        title: 'Start Travelling Now!',
        message: 'Your turn is approaching! Only 4 farmers ahead. Please proceed to the procurement centre.',
        severity: 'critical',
      });
    } else if (state === 'ARRIVED') {
      this.addNotification({
        category: 'PROCUREMENT_STATUS',
        title: 'Arrival Logged at Gate',
        message: 'Your vehicle has entered the gate. Proceed to Weighing Station #2 when called.',
        severity: 'info',
      });
    }

    this.notify();
  }

  public addNotification(notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: 'Just now',
      read: false,
      ...notif,
    };
    this.notifications = [newNotif, ...this.notifications];
    this.notify();
  }

  public markNotificationAsRead(id: string) {
    this.notifications = this.notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    this.notify();
  }

  // SIMULATION METHODS (Triggerable from Admin / Operator / Demo toolbar)
  public simulateCentreSlowdown(delayMinutes = 50) {
    this.simulationState.isSimulationActive = true;
    this.simulationState.simulatedDelayMinutes = delayMinutes;
    this.simulationState.lastSimulatedEvent = `Centre Slowdown (+${delayMinutes}m delay injected)`;

    // Update target centre
    this.centres = this.centres.map((c) => {
      if (c.id === 'centre-b' || c.id === this.booking.centreId) {
        return {
          ...c,
          delayMinutes,
          delayReason: 'Weighbridge hydraulic calibration & sudden intake surge',
          status: 'DELAYED',
          processingRatePerHour: Math.max(5, c.processingRatePerHour - 5),
        };
      }
      return c;
    });

    // Update booking dynamic ETA & arrival window
    this.booking.centreDelayMinutes = delayMinutes;
    this.booking.centreDelayReason = 'Gejjalagere Sub-Centre is experiencing a 50-minute delay';
    this.booking.dynamicArrivalWindow = {
      start: '03:00 PM',
      end: '03:20 PM',
    };
    this.booking.estimatedWaitMinutes += delayMinutes;
    this.booking.estimatedProcurementTime = '03:25 PM';
    this.booking.actionState = 'WAIT_AT_HOME';

    this.addNotification({
      category: 'CENTRE_DELAY',
      title: 'Centre Delay Warning: 50-Minute Delay',
      message: `${this.booking.centreName} is experiencing a 50-minute delay. Your arrival window has been shifted to 3:00 PM – 3:20 PM. Please do not travel yet.`,
      severity: 'critical',
    });

    this.adminAlerts = [
      {
        id: `alert-sim-${Date.now()}`,
        type: 'ALERT',
        centreId: this.booking.centreId,
        centreName: this.booking.centreName,
        title: 'Emergency Delay Injected (Simulation)',
        description: 'Throughput slowed down. 50 minute buffer added to 31 queued farmers.',
        severity: 'high',
        timestamp: 'Just now',
        suggestedAction: 'Hold outward dispatch messages and refresh dynamic arrival windows.',
      },
      ...this.adminAlerts,
    ];

    this.notify();
  }

  public simulateQueueSpike(additionalFarmers = 20) {
    this.simulationState.isSimulationActive = true;
    this.simulationState.queueSpikeCount += additionalFarmers;
    this.simulationState.lastSimulatedEvent = `Queue Spike (+${additionalFarmers} farmers in queue)`;

    this.centres = this.centres.map((c) => {
      if (c.id === this.booking.centreId) {
        const newQueue = c.queueSize + additionalFarmers;
        return {
          ...c,
          queueSize: newQueue,
          capacityUtilizationPercent: Math.min(98, c.capacityUtilizationPercent + 15),
          status: newQueue > 50 ? 'CONGESTED' : 'MODERATE',
        };
      }
      return c;
    });

    this.booking.farmersAhead += additionalFarmers;
    this.booking.currentPositionInQueue += additionalFarmers;
    this.booking.estimatedWaitMinutes += Math.round((additionalFarmers / 14) * 60);

    this.addNotification({
      category: 'QUEUE_UPDATE',
      title: 'Queue Intake Surge',
      message: `Surge in farm vehicle arrivals. Queue adjusted. Your position is now #${this.booking.currentPositionInQueue}.`,
      severity: 'warning',
    });

    this.notify();
  }

  public simulateStationFailure() {
    this.simulationState.isSimulationActive = true;
    this.simulationState.stationFailureActive = true;
    this.simulationState.lastSimulatedEvent = 'Weighing Station #1 Offline';

    this.centres = this.centres.map((c) => {
      if (c.id === this.booking.centreId) {
        return {
          ...c,
          activeWeighingStations: Math.max(1, c.activeWeighingStations - 1),
          processingRatePerHour: Math.round(c.processingRatePerHour * 0.65),
          status: 'DELAYED',
        };
      }
      return c;
    });

    this.booking.centreDelayMinutes += 25;
    this.booking.estimatedWaitMinutes += 30;

    this.addNotification({
      category: 'SYSTEM_ALERT',
      title: 'Weighing Station Maintenance Alert',
      message: 'One weighing bridge temporarily under maintenance. Rate adjusted dynamically.',
      severity: 'warning',
    });

    this.notify();
  }

  public simulateAdvanceQueueStep() {
    this.simulationState.isSimulationActive = true;
    
    if (this.booking.farmersAhead > 4) {
      this.booking.farmersAhead = 4;
      this.booking.currentPositionInQueue = 5;
      this.booking.estimatedWaitMinutes = 20;
      this.booking.actionState = 'START_TRAVELLING';
      this.simulationState.lastSimulatedEvent = 'Queue Advanced: 4 Farmers Ahead (START TRAVELLING)';
      
      this.addNotification({
        category: 'QUEUE_UPDATE',
        title: 'Start Travelling: Your Turn Approaching',
        message: 'Only 4 farmers ahead of you. Please leave home now to reach within your arrival window.',
        severity: 'critical',
      });
    } else if (this.booking.farmersAhead > 0) {
      this.booking.farmersAhead = 0;
      this.booking.currentPositionInQueue = 1;
      this.booking.estimatedWaitMinutes = 5;
      this.booking.actionState = 'ARRIVED';
      this.simulationState.lastSimulatedEvent = 'Farmer Arrived at Gate';
      
      this.addNotification({
        category: 'PROCUREMENT_STATUS',
        title: 'Arrived at Gate: Ready for Weighing',
        message: 'Token KFN-2847 is next in line. Please pull vehicle onto Weighing Platform #2.',
        severity: 'success',
      });
    } else {
      this.advanceProcurementWorkflow();
    }

    this.notify();
  }

  public advanceProcurementWorkflow() {
    const states: QueueActionState[] = [
      'WAIT_AT_HOME',
      'START_TRAVELLING',
      'ARRIVED',
      'WAITING_FOR_WEIGHING',
      'WEIGHING',
      'QUALITY_ASSESSMENT',
      'PROCUREMENT_ACCEPTED',
      'BILL_GENERATED',
      'PAYMENT_PROCESSING',
      'PAYMENT_CREDITED',
    ];

    const currentIndex = states.indexOf(this.booking.actionState);
    if (currentIndex < states.length - 1) {
      const nextState = states[currentIndex + 1];
      this.booking.actionState = nextState;
      this.simulationState.lastSimulatedEvent = `Workflow Advanced -> ${nextState}`;

      if (nextState === 'WEIGHING') {
        this.procurement.stageTimestamps.weighingStartedAt = 'Just now';
      } else if (nextState === 'QUALITY_ASSESSMENT') {
        this.procurement.stageTimestamps.qualityAssessedAt = 'Just now';
      } else if (nextState === 'PROCUREMENT_ACCEPTED') {
        this.procurement.stageTimestamps.procurementAcceptedAt = 'Just now';
      } else if (nextState === 'BILL_GENERATED') {
        this.procurement.stageTimestamps.billGeneratedAt = 'Just now';
        this.addNotification({
          category: 'PROCUREMENT_STATUS',
          title: 'Digital Procurement Bill Generated',
          message: `Bill #${this.procurement.billNumber} for ₹${this.procurement.totalProcurementAmount.toLocaleString('en-IN')} approved. Sent to PFMS.`,
          severity: 'success',
        });
      } else if (nextState === 'PAYMENT_PROCESSING') {
        this.payment.status = 'BANK_PROCESSING';
        this.procurement.stageTimestamps.paymentInitiatedAt = 'Just now';
      } else if (nextState === 'PAYMENT_CREDITED') {
        this.payment.status = 'CREDITED';
        this.payment.paymentCreditedAt = 'Just now';
        this.procurement.stageTimestamps.paymentCreditedAt = 'Just now';
        this.addNotification({
          category: 'PAYMENT_STATUS',
          title: 'DBT Payment Successfully Credited!',
          message: `₹${this.payment.amount.toLocaleString('en-IN')} successfully credited to SBI A/c ${this.payment.accountNumberMasked}. Ref: ${this.payment.transactionRef}.`,
          severity: 'success',
        });
      }
    }
    this.notify();
  }

  public simulateReset() {
    this.centres = JSON.parse(JSON.stringify(initialCentres));
    this.booking = JSON.parse(JSON.stringify(initialActiveBooking));
    this.procurement = JSON.parse(JSON.stringify(initialProcurementRecord));
    this.payment = JSON.parse(JSON.stringify(initialPaymentRecord));
    this.notifications = JSON.parse(JSON.stringify(initialNotifications));
    this.adminAlerts = JSON.parse(JSON.stringify(initialAdminAlerts));
    this.simulationState = {
      isSimulationActive: false,
      simulatedDelayMinutes: 0,
      simulatedSlowdownPercent: 0,
      stationFailureActive: false,
      queueSpikeCount: 0,
      centreClosureActive: false,
      lastSimulatedEvent: 'Simulation parameters reset to initial state',
    };
    this.notify();
  }
}

export const simulationStore = new SimulationStore();
