import React from 'react';
import { QueueActionState } from '../../types';
import { useTranslation } from '../../i18n/I18nContext';
import { Home, Navigation, CheckCircle2, Scale, FileText, IndianRupee, Clock, ShieldCheck } from 'lucide-react';

interface StatusBadgeProps {
  status: QueueActionState;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
}) => {
  const { t } = useTranslation();

  const getStatusConfig = () => {
    switch (status) {
      case 'WAIT_AT_HOME':
        return {
          label: t.waitAtHome,
          icon: <Home className="h-4 w-4" />,
          classes: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
        };
      case 'YOUR_TURN_IS_APPROACHING':
        return {
          label: t.yourTurnApproaching,
          icon: <Clock className="h-4 w-4 text-emerald-600 animate-pulse" />,
          classes: 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold',
        };
      case 'START_TRAVELLING':
        return {
          label: t.startTravelling,
          icon: <Navigation className="h-4 w-4 text-white animate-bounce" />,
          classes: 'bg-emerald-600 text-white border-emerald-700 shadow-md font-extrabold animate-pulse',
        };
      case 'ARRIVED':
        return {
          label: t.arrivedAtCentre,
          icon: <CheckCircle2 className="h-4 w-4 text-blue-700" />,
          classes: 'bg-blue-100 text-blue-900 border-blue-300 font-bold',
        };
      case 'WAITING_FOR_WEIGHING':
        return {
          label: 'WAITING FOR WEIGHING',
          icon: <Scale className="h-4 w-4 text-indigo-700" />,
          classes: 'bg-indigo-100 text-indigo-900 border-indigo-300 font-bold',
        };
      case 'WEIGHING':
        return {
          label: t.weighingInProgress,
          icon: <Scale className="h-4 w-4 text-purple-700 animate-spin" />,
          classes: 'bg-purple-100 text-purple-900 border-purple-300 font-bold',
        };
      case 'QUALITY_ASSESSMENT':
        return {
          label: t.qualityAssessment,
          icon: <ShieldCheck className="h-4 w-4 text-teal-700" />,
          classes: 'bg-teal-100 text-teal-900 border-teal-300 font-bold',
        };
      case 'PROCUREMENT_ACCEPTED':
        return {
          label: t.procurementAccepted,
          icon: <CheckCircle2 className="h-4 w-4 text-green-700" />,
          classes: 'bg-green-100 text-green-900 border-green-300 font-bold',
        };
      case 'BILL_GENERATED':
        return {
          label: t.billGenerated,
          icon: <FileText className="h-4 w-4 text-cyan-700" />,
          classes: 'bg-cyan-100 text-cyan-900 border-cyan-300 font-bold',
        };
      case 'PAYMENT_PROCESSING':
        return {
          label: t.paymentProcessing,
          icon: <Clock className="h-4 w-4 text-amber-700 animate-spin" />,
          classes: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
        };
      case 'PAYMENT_CREDITED':
        return {
          label: t.paymentCredited,
          icon: <IndianRupee className="h-4 w-4 text-emerald-700" />,
          classes: 'bg-emerald-100 text-emerald-950 border-emerald-300 font-extrabold shadow-sm',
        };
      default:
        return {
          label: status,
          icon: <Clock className="h-4 w-4" />,
          classes: 'bg-slate-100 text-slate-800 border-slate-300',
        };
    }
  };

  const config = getStatusConfig();

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3.5 py-1.5 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-lg border uppercase tracking-wider ${config.classes} ${sizeClasses}`}
    >
      {showIcon && config.icon}
      <span>{config.label}</span>
    </span>
  );
};
