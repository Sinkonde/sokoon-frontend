import {
  Store,
  Package,
  ShoppingCart,
  Users,
  ArrowUpRight,
} from 'lucide-react';

const stats = [
  { label: 'Total shops', value: '1,248', change: '+12.8%', icon: Store },
  { label: 'Products', value: '18,420', change: '+8.4%', icon: Package },
  { label: 'Sales today', value: 'TSh 4.8M', change: '+5.2%', icon: ShoppingCart },
  { label: 'Active users', value: '2,306', change: '+3.1%', icon: Users },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-violet-600 dark:text-violet-400">
            OVERVIEW
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Muhtasari wa shughuli za mfumo wako.
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          Today · Tanzania
        </div>
      </div>

      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {stats.map(({ label, value, change, icon: Icon }) => (
          <article
            key={label}
            className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-900/[0.02] dark:border-slate-800 dark:bg-[#10131c]"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-slate-500">{label}</span>
              <span className="grid size-8 place-items-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
                <Icon size={16} />
              </span>
            </div>
            <p className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">{value}</p>
            <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
              <ArrowUpRight size={13} />
              {change}
              <span className="font-normal text-slate-400">vs last month</span>
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-900/[0.02] sm:p-5 dark:border-slate-800 dark:bg-[#10131c]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold">Recent activity</h2>
            <p className="mt-1 text-xs text-slate-500">
              Shughuli za hivi karibuni kwenye platform.
            </p>
          </div>
        </div>
        <div className="mt-5 rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center text-xs text-slate-400 dark:border-slate-700">
          Activity data itaonekana hapa baada ya kuunganisha backend.
        </div>
      </section>
    </div>
  );
}