import Link from 'next/link';

export default function ShopLayout({ children }) {
  return (
    <div className="min-h-dvh bg-slate-50 dark:bg-[#0d1020]">

      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#151a2b] md:block">

        <h1 className="mb-8 text-xl font-bold text-indigo-600">
          Duka SaaS
        </h1>

        <nav className="space-y-2">

          {[
            ['Dashboard', '/'],
            ['POS', '/pos'],
            ['Bidhaa', '/products'],
            ['Stock', '/stock'],
            ['Mauzo', '/sales'],
            ['Wateja', '/customers'],
            ['Gharama', '/expenses'],
            ['Ripoti', '/reports'],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-white/5"
            >
              {label}
            </Link>
          ))}

        </nav>

      </aside>

      <main className="md:pl-64">
        {children}
      </main>

    </div>
  );
}