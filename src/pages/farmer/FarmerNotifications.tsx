import React from 'react';
import { useNotifications } from '../../hooks/useRealtimeData';
import { farmerApi } from '../../services/apiServices';
import {
  Bell,
  CheckCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Info,
  Calendar,
  IndianRupee,
  Scale
} from 'lucide-react';

export const FarmerNotifications: React.FC = () => {
  const notifications = useNotifications();

  const getCategoryIcon = (category: string, severity: string) => {
    switch (category) {
      case 'CENTRE_DELAY':
        return <AlertTriangle className="h-5 w-5 text-amber-600" />;
      case 'QUEUE_UPDATE':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'SLOT_CHANGE':
        return <Calendar className="h-5 w-5 text-indigo-600" />;
      case 'PROCUREMENT_STATUS':
        return <Scale className="h-5 w-5 text-emerald-600" />;
      case 'PAYMENT_STATUS':
        return <IndianRupee className="h-5 w-5 text-emerald-600" />;
      default:
        return <Info className="h-5 w-5 text-slate-600" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <Bell className="h-4 w-4" />
            <span>Alerts & Real-Time Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            Notifications & Dispatch Alerts
          </h1>
        </div>

        <button
          onClick={() => {
            notifications.forEach((n) => farmerApi.markNotificationRead(n.id));
          }}
          className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs"
        >
          <CheckCheck className="h-4 w-4 text-emerald-600" />
          <span>Mark all read</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
            <Bell className="h-10 w-10 text-slate-300 mx-auto mb-2" />
            <h3 className="font-bold text-slate-700">No active alerts</h3>
            <p className="text-xs text-slate-500 mt-1">
              You will receive real-time alerts when your queue approaches or if delays occur.
            </p>
          </div>
        ) : (
          notifications.map((notif) => {
            const isUnread = !notif.read;

            return (
              <div
                key={notif.id}
                onClick={() => farmerApi.markNotificationRead(notif.id)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3.5 ${
                  notif.severity === 'critical'
                    ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-400/20'
                    : isUnread
                    ? 'bg-white border-emerald-300 shadow-xs ring-1 ring-emerald-500/10'
                    : 'bg-white/80 border-slate-200'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${
                  notif.severity === 'critical'
                    ? 'bg-amber-100'
                    : 'bg-slate-100'
                }`}>
                  {getCategoryIcon(notif.category, notif.severity)}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-sm font-bold ${
                      notif.severity === 'critical' ? 'text-amber-950' : 'text-slate-900'
                    }`}>
                      {notif.title}
                    </h3>
                    <span className="text-[10px] text-slate-400 font-medium shrink-0">
                      {notif.timestamp}
                    </span>
                  </div>
                  <p className={`text-xs ${
                    notif.severity === 'critical' ? 'text-amber-900 font-medium' : 'text-slate-600'
                  }`}>
                    {notif.message}
                  </p>
                </div>

                {isUnread && (
                  <span className="h-2 w-2 rounded-full bg-emerald-600 shrink-0 mt-2"></span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
