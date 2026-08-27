import React from 'react';
import { AlertTriangle, Clock, ShieldAlert } from 'lucide-react';
import { useTranslation } from '../../i18n/I18nContext';

interface DelayAlertBannerProps {
  centreName: string;
  delayMinutes: number;
  newArrivalWindowStart?: string;
  newArrivalWindowEnd?: string;
  reason?: string;
}

export const DelayAlertBanner: React.FC<DelayAlertBannerProps> = ({
  centreName,
  delayMinutes,
  newArrivalWindowStart,
  newArrivalWindowEnd,
  reason,
}) => {
  const { t } = useTranslation();

  if (!delayMinutes || delayMinutes <= 0) return null;

  return (
    <div className="relative overflow-hidden rounded-xl border-2 border-amber-500/80 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 p-4 shadow-md backdrop-blur-sm">
      <div className="flex items-start gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500 text-white shadow-sm delay-beacon">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-base font-bold text-amber-950 flex items-center gap-2">
              <span>{centreName} {t.centreDelayWarning} ({delayMinutes} min)</span>
            </h4>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-200 px-2.5 py-0.5 text-xs font-bold text-amber-900 border border-amber-300">
              <Clock className="h-3 w-3" /> Live Dynamic Adjustment
            </span>
          </div>

          <p className="text-sm font-semibold text-amber-900">
            {t.doNotTravelYet}
          </p>

          {newArrivalWindowStart && newArrivalWindowEnd && (
            <div className="mt-2 inline-flex items-center gap-2 rounded-lg bg-amber-100/90 px-3 py-1.5 text-xs font-semibold text-amber-950 border border-amber-300">
              <span>New Dynamic Arrival Window:</span>
              <strong className="text-amber-900 font-extrabold text-sm tracking-wide">
                {newArrivalWindowStart} – {newArrivalWindowEnd}
              </strong>
            </div>
          )}

          {reason && (
            <p className="text-xs text-amber-800/90 pt-0.5">
              <span className="font-semibold">Reason:</span> {reason}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
