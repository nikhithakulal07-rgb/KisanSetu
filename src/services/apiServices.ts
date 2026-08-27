import { apiClient, isLiveBackendAvailable } from './apiClient';
import { simulationStore } from './simulationStore';
import { mockFarmerProfile, generateDynamicSlots } from './mockData';
import {
  FarmerProfile,
  ProcurementCentre,
  Booking,
  ProcurementRecord,
  PaymentRecord,
  AppNotification,
  AdminAlert,
  DynamicSlot,
  QueueActionState
} from '../types';

// Farmer API
export const farmerApi = {
  getProfile: async (): Promise<FarmerProfile> => {
    if (isLiveBackendAvailable) {
      const res = await apiClient.get<FarmerProfile>('/api/farmer/profile');
      return res.data;
    }
    return Promise.resolve(mockFarmerProfile);
  },
  getActiveBooking: async (): Promise<Booking> => {
    if (isLiveBackendAvailable) {
      const res = await apiClient.get<Booking>('/api/farmer/booking/active');
      return res.data;
    }
    return Promise.resolve(simulationStore.getActiveBooking());
  },
  createBooking: async (bookingData: Partial<Booking>): Promise<Booking> => {
    if (isLiveBackendAvailable) {
      const res = await apiClient.post<Booking>('/api/farmer/booking', bookingData);
      return res.data;
    }
    return Promise.resolve(simulationStore.createBooking(bookingData));
  },
  getNotifications: async (): Promise<AppNotification[]> => {
    if (isLiveBackendAvailable) {
      const res = await apiClient.get<AppNotification[]>('/api/farmer/notifications');
      return res.data;
    }
    return Promise.resolve(simulationStore.getNotifications());
  },
  markNotificationRead: async (id: string): Promise<void> => {
    if (isLiveBackendAvailable) {
      await apiClient.patch(`/api/farmer/notifications/${id}/read`);
      return;
    }
    simulationStore.markNotificationAsRead(id);
  },
};

// Centres API
export const centresApi = {
  getCentres: async (): Promise<ProcurementCentre[]> => {
    if (isLiveBackendAvailable) {
      const res = await apiClient.get<ProcurementCentre[]>('/api/centres');
      return res.data;
    }
    return Promise.resolve(simulationStore.getCentres());
  },
  getCentreById: async (id: string): Promise<ProcurementCentre | undefined> => {
    if (isLiveBackendAvailable) {
      const res = await apiClient.get<ProcurementCentre>(`/api/centres/${id}`);
      return res.data;
    }
    return Promise.resolve(simulationStore.getCentreById(id));
  },
  getAvailableSlots: async (centreId: string): Promise<DynamicSlot[]> => {
    if (isLiveBackendAvailable) {
      const res = await apiClient.get<DynamicSlot[]>(`/api/centres/${centreId}/slots`);
      return res.data;
    }
    return Promise.resolve(generateDynamicSlots(centreId));
  },
};

// Virtual Queue API
export const queueApi = {
  getLiveQueueStatus: async (tokenNumber: string): Promise<Booking> => {
    if (isLiveBackendAvailable) {
      const res = await apiClient.get<Booking>(`/api/queue/${tokenNumber}`);
      return res.data;
    }
    return Promise.resolve(simulationStore.getActiveBooking());
  },
  updateActionState: async (state: QueueActionState): Promise<void> => {
    if (isLiveBackendAvailable) {
      await apiClient.post('/api/queue/action-state', { state });
      return;
    }
    simulationStore.updateActionState(state);
  },
};

// Procurement API
export const procurementApi = {
  getProcurementRecord: async (tokenNumber: string): Promise<ProcurementRecord> => {
    if (isLiveBackendAvailable) {
      const res = await apiClient.get<ProcurementRecord>(`/api/procurement/${tokenNumber}`);
      return res.data;
    }
    return Promise.resolve(simulationStore.getProcurement());
  },
  advanceStage: async (stage: QueueActionState): Promise<void> => {
    if (isLiveBackendAvailable) {
      await apiClient.post('/api/procurement/stage', { stage });
      return;
    }
    simulationStore.advanceProcurementWorkflow();
  },
};

// Payments API
export const paymentsApi = {
  getPaymentRecord: async (tokenNumber: string): Promise<PaymentRecord> => {
    if (isLiveBackendAvailable) {
      const res = await apiClient.get<PaymentRecord>(`/api/payments/${tokenNumber}`);
      return res.data;
    }
    return Promise.resolve(simulationStore.getPayment());
  },
};

// Admin & Analytics API
export const adminApi = {
  getAlerts: async (): Promise<AdminAlert[]> => {
    if (isLiveBackendAvailable) {
      const res = await apiClient.get<AdminAlert[]>('/api/admin/alerts');
      return res.data;
    }
    return Promise.resolve(simulationStore.getAdminAlerts());
  },
};

// Simulation API (SIH Demo Console)
export const simulationApi = {
  injectCentreSlowdown: async (delayMinutes = 50): Promise<void> => {
    if (isLiveBackendAvailable) {
      await apiClient.post('/api/simulation/slowdown', { delayMinutes });
    }
    simulationStore.simulateCentreSlowdown(delayMinutes);
  },
  injectQueueSpike: async (count = 20): Promise<void> => {
    if (isLiveBackendAvailable) {
      await apiClient.post('/api/simulation/queue-spike', { count });
    }
    simulationStore.simulateQueueSpike(count);
  },
  injectStationFailure: async (): Promise<void> => {
    if (isLiveBackendAvailable) {
      await apiClient.post('/api/simulation/station-failure');
    }
    simulationStore.simulateStationFailure();
  },
  advanceQueue: async (): Promise<void> => {
    if (isLiveBackendAvailable) {
      await apiClient.post('/api/simulation/advance-queue');
    }
    simulationStore.simulateAdvanceQueueStep();
  },
  resetSimulation: async (): Promise<void> => {
    if (isLiveBackendAvailable) {
      await apiClient.post('/api/simulation/reset');
    }
    simulationStore.simulateReset();
  },
};
