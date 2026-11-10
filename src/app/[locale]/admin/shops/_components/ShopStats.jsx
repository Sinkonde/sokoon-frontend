export default function ShopStats({ stats }) {
  return (
    <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {stats.map(({ label, value, detail, icon: Icon, iconStyle }) => (
        <article
          key={label}
          className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-900/[0.02] dark:border-slate-800 dark:bg-[#10131c]"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium text-slate-500">{label}</p>
            <span className={`grid size-8 place-items-center rounded-lg ${iconStyle}`}>
              <Icon size={16} />
            </span>
          </div>
          <p className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">{value}</p>
          <p className="mt-1 text-[11px] text-slate-400">{detail}</p>
        </article>
      ))}
    </section>
  );
}
