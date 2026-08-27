export type UserRole = 'FARMER' | 'PROCUREMENT_OPERATOR' | 'DISTRICT_ADMIN' | 'SUPER_ADMIN';

export type QueueActionState =
  | 'WAIT_AT_HOME'
  | 'YOUR_TURN_IS_APPROACHING'
  | 'START_TRAVELLING'
  | 'ARRIVED'
  | 'WAITING_FOR_WEIGHING'
  | 'WEIGHING'
  | 'QUALITY_ASSESSMENT'
  | 'PROCUREMENT_ACCEPTED'
  | 'BILL_GENERATED'
  | 'PAYMENT_PROCESSING'
  | 'PAYMENT_CREDITED';

export type CentreStatus = 'OPTIMAL' | 'MODERATE' | 'CONGESTED' | 'DELAYED' | 'CLOSED';

export type QualityGrade = 'GRADE_A' | 'GRADE_B' | 'FAIR_AVERAGE_QUALITY' | 'REJECTED';

export type PaymentStatus = 'PENDING' | 'PFMS_VALIDATED' | 'BANK_PROCESSING' | 'CREDITED' | 'FAILED';

export type NotificationCategory =
  | 'QUEUE_UPDATE'
  | 'ETA_UPDATE'
  | 'SLOT_CHANGE'
  | 'CENTRE_DELAY'
  | 'RESCHEDULING'
  | 'PROCUREMENT_STATUS'
  | 'PAYMENT_STATUS'
  | 'SYSTEM_ALERT';

export interface FarmerProfile {
  id: string;
  name: string;
  phone: string;
  aadhaarMasked: string;
  farmerId: string;
  village: string;
  taluk: string;
  district: string;
  state: string;
  landSizeAcres: number;
  primaryCrop: string;
  bankAccountMasked: string;
  bankName: string;
  ifscCode: string;
}

export interface ProcurementCentre {
  id: string;
  name: string;
  code: string;
  district: string;
  address: string;
  latitude: number;
  longitude: number;
  distanceKm: number;
  capacityQuintalsPerDay: number;
  currentCapacityUsedQuintals: number;
  capacityUtilizationPercent: number;
  activeWeighingStations: number;
  totalWeighingStations: number;
  queueSize: number;
  averageWaitMinutes: number;
  processingRatePerHour: number;
  status: CentreStatus;
  delayMinutes: number;
  delayReason?: string;
  isRecommended?: boolean;
  recommendationReasons?: string[];
  contactPhone: string;
  operatingHours: string;
}

export interface DynamicSlot {
  id: string;
  centreId: string;
  date: string;
  arrivalWindowStart: string; // e.g. "10:30 AM"
  arrivalWindowEnd: string;   // e.g. "11:00 AM"
  expectedWaitMinutes: number;
  confidenceScore: 'HIGH' | 'MEDIUM' | 'LOW';
  availableCapacityQuintals: number;
  maxTokens: number;
  bookedTokens: number;
  isRecommendedSlot?: boolean;
}

export interface Booking {
  id: string;
  tokenNumber: string; // e.g. "KFN-2847"
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  centreId: string;
  centreName: string;
  cropType: string;
  variety: string;
  expectedQuantityQuintals: number;
  bookingDate: string;
  scheduledArrivalWindow: {
    start: string;
    end: string;
  };
  dynamicArrivalWindow: {
    start: string;
    end: string;
  };
  currentPositionInQueue: number;
  farmersAhead: number;
  estimatedWaitMinutes: number;
  estimatedProcurementTime: string;
  actionState: QueueActionState;
  centreDelayMinutes: number;
  centreDelayReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProcurementRecord {
  id: string;
  tokenNumber: string;
  farmerId: string;
  centreId: string;
  cropType: string;
  weighingStationNumber: number;
  grossWeightQuintals: number;
  tareWeightQuintals: number;
  netWeightQuintals: number;
  moisturePercent: number;
  foreignMatterPercent: number;
  qualityGrade: QualityGrade;
  mspRatePerQuintal: number;
  totalProcurementAmount: number;
  billNumber: string;
  billGeneratedAt: string;
  stageTimestamps: {
    arrivedAt?: string;
    weighingStartedAt?: string;
    weighingCompletedAt?: string;
    qualityAssessedAt?: string;
    procurementAcceptedAt?: string;
    billGeneratedAt?: string;
    paymentInitiatedAt?: string;
    paymentCreditedAt?: string;
  };
}

export interface PaymentRecord {
  id: string;
  tokenNumber: string;
  farmerId: string;
  farmerName: string;
  amount: number;
  status: PaymentStatus;
  billNumber: string;
  transactionRef: string;
  beneficiaryName: string;
  accountNumberMasked: string;
  bankName: string;
  ifscCode: string;
  pfmsBatchNumber: string;
  paymentInitiatedAt: string;
  paymentCreditedAt?: string;
  failureReason?: string;
}

export interface AppNotification {
  id: string;
  category: NotificationCategory;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  severity: 'info' | 'warning' | 'critical' | 'success';
  actionUrl?: string;
}

export interface AdminAlert {
  id: string;
  type: 'PREDICTION' | 'RECOMMENDATION' | 'ALERT';
  centreId?: string;
  centreName?: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
  suggestedAction?: string;
}

export interface SimulationState {
  isSimulationActive: boolean;
  simulatedDelayMinutes: number;
  simulatedSlowdownPercent: number;
  stationFailureActive: boolean;
  queueSpikeCount: number;
  centreClosureActive: boolean;
  lastSimulatedEvent?: string;
}
