import React from 'react';
import { usePayment, useProcurement } from '../../hooks/useRealtimeData';
import { useAuth } from '../../features/auth/AuthContext';
import {
  IndianRupee,
  CheckCircle2,
  Clock,
  Building2,
  FileText,
  ShieldCheck,
  Download,
  AlertCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const FarmerPayments: React.FC = () => {
  const payment = usePayment();
  const procurement = useProcurement();
  const { farmer } = useAuth();

  const isCredited = payment.status === 'CREDITED';
  const isProcessing = payment.status === 'BANK_PROCESSING' || payment.status === 'PFMS_VALIDATED';

  const dbtSteps = [
    {
      title: 'PFMS Validation & Sanction',
      desc: 'Sanction order created with Mandya District Treasury',
      done: true,
      time: payment.paymentInitiatedAt,
    },
    {
      title: 'Batch Dispatch to Clearing House',
      desc: `Batch Ref: ${payment.pfmsBatchNumber}`,
      done: true,
      time: payment.paymentInitiatedAt,
    },
    {
      title: 'Destination Bank Processing (SBI)',
      desc: `A/c: ${farmer.bankAccountMasked} (IFSC: ${farmer.ifscCode})`,
      done: isCredited,
      current: isProcessing,
      time: isCredited ? payment.paymentCreditedAt : 'In clearance with State Bank of India',
    },
    {
      title: 'DBT Amount Credited to Farmer Account',
      desc: `₹${payment.amount.toLocaleString('en-IN')} deposited`,
      done: isCredited,
      time: isCredited ? payment.paymentCreditedAt : 'Estimated within 24-48 hours',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
          <IndianRupee className="h-4 w-4" />
          <span>Direct Benefit Transfer (DBT) Portal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
          Procurement Payment & Bank Tracking
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Direct government MSP payments transferred directly to your Aadhaar-seeded bank account.
        </p>
      </div>

      {/* Hero Payout Card */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total MSP Procurement Amount
            </span>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 mt-1 font-display flex items-baseline gap-1">
              <span>₹{payment.amount.toLocaleString('en-IN')}</span>
              <span className="text-xs font-semibold text-slate-500">(35.0 Qtl @ ₹2,183/Qtl)</span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Payment Status
            </span>
            {isCredited ? (
              <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-950 font-extrabold text-sm px-3.5 py-1.5 rounded-xl border border-emerald-300 shadow-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                PAYMENT CREDITED
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 font-extrabold text-sm px-3.5 py-1.5 rounded-xl border border-amber-300 shadow-xs">
                <Clock className="h-4 w-4 text-amber-700 animate-spin" />
                BANK PROCESSING
              </span>
            )}
          </div>
        </div>

        {/* Transaction Metadata */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-500 block">Bill Number</span>
            <strong className="text-slate-900 font-mono font-bold">{payment.billNumber}</strong>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-500 block">PFMS Ref Number</span>
            <strong className="text-slate-900 font-mono font-bold">{payment.transactionRef}</strong>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-500 block">Bank Account</span>
            <strong className="text-slate-900 font-bold">{payment.bankName}</strong>
            <span className="text-[10px] text-slate-500 block">{payment.accountNumberMasked}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-500 block">Initiation Timestamp</span>
            <strong className="text-slate-900 font-bold">{payment.paymentInitiatedAt}</strong>
          </div>
        </div>

        {/* PFMS & DBT Clearance Pipeline Timeline */}
        <div className="mt-8 space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-700" />
            <span>Govt PFMS to Bank Clearance Pipeline</span>
          </h3>

          <div className="space-y-3">
            {dbtSteps.map((step, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border flex items-start gap-3 transition ${
                  step.done
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : step.current
                    ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400/20'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  step.done
                    ? 'bg-emerald-600 text-white'
                    : step.current
                    ? 'bg-amber-500 text-white animate-pulse'
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {step.done ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-slate-900">{step.title}</h4>
                    <span className="text-[10px] font-semibold text-slate-600">{step.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help Note */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
          <HelpCircle className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
          <p>
            Payments are directly cleared under Mandya District Agricultural Procurement Treasury. In case of IFSC discrepancy, contact Mandya APMC helpline: 1800-425-3553.
          </p>
        </div>
      </div>
    </div>
  );
};
