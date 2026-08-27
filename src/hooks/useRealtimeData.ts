import { useState, useEffect } from 'react';
import { simulationStore } from '../services/simulationStore';
import {
  ProcurementCentre,
  Booking,
  ProcurementRecord,
  PaymentRecord,
  AppNotification,
  AdminAlert,
  SimulationState
} from '../types';

export const useCentres = (): ProcurementCentre[] => {
  const [centres, setCentres] = useState<ProcurementCentre[]>(() => simulationStore.getCentres());

  useEffect(() => {
    const unsubscribe = simulationStore.subscribe(() => {
      setCentres(simulationStore.getCentres());
    });
    return unsubscribe;
  }, []);

  return centres;
};

export const useActiveBooking = (): Booking => {
  const [booking, setBooking] = useState<Booking>(() => simulationStore.getActiveBooking());

  useEffect(() => {
    const unsubscribe = simulationStore.subscribe(() => {
      setBooking(simulationStore.getActiveBooking());
    });
    return unsubscribe;
  }, []);

  return booking;
};

export const useProcurement = (): ProcurementRecord => {
  const [procurement, setProcurement] = useState<ProcurementRecord>(() => simulationStore.getProcurement());

  useEffect(() => {
    const unsubscribe = simulationStore.subscribe(() => {
      setProcurement(simulationStore.getProcurement());
    });
    return unsubscribe;
  }, []);

  return procurement;
};

export const usePayment = (): PaymentRecord => {
  const [payment, setPayment] = useState<PaymentRecord>(() => simulationStore.getPayment());

  useEffect(() => {
    const unsubscribe = simulationStore.subscribe(() => {
      setPayment(simulationStore.getPayment());
    });
    return unsubscribe;
  }, []);

  return payment;
};

export const useNotifications = (): AppNotification[] => {
  const [notifications, setNotifications] = useState<AppNotification[]>(() => simulationStore.getNotifications());

  useEffect(() => {
    const unsubscribe = simulationStore.subscribe(() => {
      setNotifications(simulationStore.getNotifications());
    });
    return unsubscribe;
  }, []);

  return notifications;
};

export const useAdminAlerts = (): AdminAlert[] => {
  const [alerts, setAlerts] = useState<AdminAlert[]>(() => simulationStore.getAdminAlerts());

  useEffect(() => {
    const unsubscribe = simulationStore.subscribe(() => {
      setAlerts(simulationStore.getAdminAlerts());
    });
    return unsubscribe;
  }, []);

  return alerts;
};

export const useSimulationState = (): SimulationState => {
  const [state, setState] = useState<SimulationState>(() => simulationStore.getSimulationState());

  useEffect(() => {
    const unsubscribe = simulationStore.subscribe(() => {
      setState(simulationStore.getSimulationState());
    });
    return unsubscribe;
  }, []);

  return state;
};
