import { CheckCircle2, Clock3, PauseCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

const statusStyles = {
  Active:
    'bg-emerald-50 text-emerald-700 ring-emerald-600/15 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20',
  Pending:
    'bg-amber-50 text-amber-700 ring-amber-600/15 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-400/20',
  Suspended:
    'bg-rose-50 text-rose-700 ring-rose-600/15 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-400/20',
};

export default function StatusBadge({ status }) {
  const t = useTranslations('shops.status');
  const Icon =
    status === 'Active'
      ? CheckCircle2
      : status === 'Pending'
        ? Clock3
        : PauseCircle;

  const translationKey = {
    Active: 'active',
    Pending: 'pending',
    Suspended: 'suspended',
  }[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${statusStyles[status]}`}
    >
      <Icon size={12} />
      {translationKey ? t(translationKey) : status}
    </span>
  );
}
