'use client';

import { useCallback, useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Store,
  Plus,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  MapPin,
  CalendarDays,
  Package,
  CheckCircle2,
  Clock3,
  PauseCircle,
} from 'lucide-react';
import CreateShopModal from './_components/createShopModal';
import ShopDetailsDrawer from './_components/shopDetailDrawer';
import useApiQuery from '@/lib/query/useApiQuery';
import { useQueryClient } from '@tanstack/react-query';

// const shops = [
//   {
//     id: 'DK-1024',
//     name: 'Mwangaza Mini Mart',
//     owner: 'Amina Hassan',
//     location: 'Sinza, Dar es Salaam',
//     package: 'Starter',
//     status: 'Active',
//     products: 248,
//     createdAt: '2026-10-29',
//   },
//   {
//     id: 'DK-1023',
//     name: 'Kibo Electronics',
//     owner: 'Juma Mushi',
//     location: 'Moshi, Kilimanjaro',
//     package: 'Growth',
//     status: 'Active',
//     products: 186,
//     createdAt: '2026-10-27',
//   },
//   {
//     id: 'DK-1022',
//     name: 'Neema Beauty Store',
//     owner: 'Neema John',
//     location: 'Arusha mjini',
//     package: 'Starter',
//     status: 'Pending',
//     products: 74,
//     createdAt: '2026-10-26',
//   },
//   {
//     id: 'DK-1021',
//     name: 'Mlimani Hardware',
//     owner: 'Peter Charles',
//     location: 'Morogoro',
//     package: 'Business',
//     status: 'Active',
//     products: 512,
//     createdAt: '2026-10-24',
//   },
//   {
//     id: 'DK-1020',
//     name: 'Tumaini Fashion',
//     owner: 'Rehema Ally',
//     location: 'Mwanza',
//     package: 'Starter',
//     status: 'Suspended',
//     products: 93,
//     createdAt: '2026-10-22',
//   },
//   {
//     id: 'DK-1019',
//     name: 'Baraka Foods',
//     owner: 'Baraka Paulo',
//     location: 'Dodoma',
//     package: 'Growth',
//     status: 'Active',
//     products: 321,
//     createdAt: '2026-10-20',
//   },
//   {
//     id: 'DK-1018',
//     name: 'Upendo Stationery',
//     owner: 'Upendo Michael',
//     location: 'Tabata, Dar es Salaam',
//     package: 'Starter',
//     status: 'Pending',
//     products: 65,
//     createdAt: '2026-10-18',
//   },
// ];

const statusStyles = {
  Active:
    'bg-emerald-50 text-emerald-700 ring-emerald-600/15 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20',
  Pending:
    'bg-amber-50 text-amber-700 ring-amber-600/15 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-400/20',
  Suspended:
    'bg-rose-50 text-rose-700 ring-rose-600/15 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-400/20',
};

function StatusBadge({ status }) {
  const Icon =
    status === 'Active'
      ? CheckCircle2
      : status === 'Pending'
        ? Clock3
        : PauseCircle;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${statusStyles[status]}`}
    >
      <Icon size={12} />
      {status}
    </span>
  );
}

function ShopAvatar({ name }) {
  return (
    <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-violet-100 text-sm font-bold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
      {name
        .split(' ')
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()}
    </div>
  );
}

export default function ShopsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [packageFilter, setPackageFilter] = useState('All packages');
  const [page, setPage] = useState(1);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  // const [shops, setShops] = useState([]);

  const closeShopDrawer = useCallback(() => {
    setSelectedShop(null);
    }, []);

  const {data:shop, isLoading, isFetching,isError,error, refetch} = useApiQuery('get_shops', {});
    const shops = shop?.data?.shops
  const pageSize = 5;
  const queryClient = useQueryClient();

  const filteredShops = useMemo(() => {
    const query = search.trim().toLowerCase();

    return shops?.filter((shop) => {
      const matchesSearch =
        !query ||
        [shop.name, shop.owner, shop.location, shop.id]
          .some((value) => value.toLowerCase().includes(query));

      const matchesStatus =
        statusFilter === 'All statuses' || shop.status === statusFilter;

      const matchesPackage =
        packageFilter === 'All packages' || shop.package === packageFilter;

      return matchesSearch && matchesStatus && matchesPackage;
    });
  }, [search, statusFilter, packageFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredShops?.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedShops = filteredShops?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function updateSearch(value) {
    setSearch(value);
    setPage(1);
  }

  function updateStatus(value) {
    setStatusFilter(value);
    setPage(1);
  }

  function updatePackage(value) {
    setPackageFilter(value);
    setPage(1);
  }

  const stats = [
    {
      label: 'Total shops',
      value: '1,248',
      detail: '+8.2% this month',
      icon: Store,
      iconStyle: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300',
    },
    {
      label: 'New shops',
      value: '86',
      detail: 'This month',
      icon: Plus,
      iconStyle: 'bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300',
    },
    {
      label: 'Starter package',
      value: '624',
      detail: '50% of all shops',
      icon: Package,
      iconStyle: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300',
    },
    {
      label: 'Active shops',
      value: '1,106',
      detail: '88.6% active',
      icon: CheckCircle2,
      iconStyle: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300',
    },
  ];

  // useEffect(()=>{
  //   setShops(data?.data?.shops);
  //   console.log(shops)
  // },[data])

  

  if (isLoading) {
    return <p>Inapakia maduka...</p>;
  }

  if (isError && !data) {
    return (
      <div>
        <p>{error?.message || 'Imeshindikana kupata maduka.'}</p>
        <button onClick={() => refetch()}>
          Jaribu tena
        </button>
      </div>
    );
  }

  //console.log(data)

  // return (
  //   <div>
  //     <h1>Maduka</h1>

  //     {isFetching && <p>Inasasisha taarifa...</p>}

  //     <pre>{JSON.stringify(data, null, 2)}</pre>
  //   </div>
  // );

  return (
    <div className="mx-auto max-w-[1440px] space-y-5">
      {/* Page heading */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-600 dark:text-violet-400">
            Platform management
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">Shops</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage stores, subscriptions, and shop activity.
          </p>
        </div>

        <button
            type="button"
            onClick={() => setCreateModalOpen(true)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-semibold text-white shadow-sm shadow-violet-600/20 transition hover:bg-violet-700 active:scale-[0.98]"
            >
            <Plus size={17} />
            Add shop
        </button>
      </div>

      {/* Stats */}
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
            <p className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">
              {value}
            </p>
            <p className="mt-1 text-[11px] text-slate-400">{detail}</p>
          </article>
        ))}
      </section>

      {/* Shops list */}
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-900/[0.02] dark:border-slate-800 dark:bg-[#10131c]">
        <div className="border-b border-slate-100 px-4 py-4 sm:px-5 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold">All shops</h2>
              <p className="mt-1 text-xs text-slate-500">
                Browse and manage registered shops.
              </p>
            </div>
            <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {filteredShops?.length} shops
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-[minmax(200px,1fr)_160px_160px]">
            <label className="relative block">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(event) => updateSearch(event.target.value)}
                placeholder="Search shop, owner, location..."
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-3 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-900 dark:focus:bg-slate-900"
              />
            </label>

            <label className="relative">
              <SlidersHorizontal
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <select
                value={statusFilter}
                onChange={(event) => updateStatus(event.target.value)}
                className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-600 outline-none focus:border-violet-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              >
                <option>All statuses</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Suspended</option>
              </select>
            </label>

            <select
              value={packageFilter}
              onChange={(event) => updatePackage(event.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 outline-none focus:border-violet-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              <option>All packages</option>
              <option>Starter</option>
              <option>Growth</option>
              <option>Business</option>
            </select>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-slate-50/80 text-[11px] uppercase tracking-wide text-slate-400 dark:bg-slate-900/70">
              <tr>
                <th className="px-5 py-3 font-semibold">Shop</th>
                <th className="px-4 py-3 font-semibold">Package</th>
                <th className="px-4 py-3 font-semibold">Products</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Created</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedShops?.map((shop) => (
                <tr
                  key={shop.id}
                  className="transition hover:bg-slate-50/70 dark:hover:bg-slate-900/50"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <ShopAvatar name={shop.name} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{shop.name}</p>
                        <p className="mt-0.5 truncate text-xs text-slate-500">
                          {shop.owner} · {shop.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {shop.package}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-slate-600 dark:text-slate-300">
                    {shop.products}
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={shop.status} />
                  </td>
                  <td className="px-4 py-3.5 text-xs text-slate-500">
                    {shop.createdAt}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                  <button
                        type="button"
                        aria-label={`Maelezo ya ${shop.name}`}
                        onClick={() => setSelectedShop(shop)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                        >
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile shop cards */}
        <div className="space-y-3 p-3 md:hidden">
          {paginatedShops?.map((shop) => (
            <article
              key={shop.id}
              className="rounded-xl border border-slate-200/80 p-3.5 dark:border-slate-800"
            >
              <div className="flex items-start gap-3">
                <ShopAvatar name={shop.name} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold">{shop.name}</h3>
                      <p className="mt-0.5 text-xs text-slate-500">{shop.owner}</p>
                    </div>
                    <button
                      onClick={() => setSelectedShop(shop)}
                      aria-label={`Actions for ${shop.name}`}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <MoreHorizontal size={17} />
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <StatusBadge status={shop.status} />
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {shop.package}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={12} />
                      {shop.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Package size={12} />
                      {shop.products} products
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays size={12} />
                      {shop.createdAt}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {filteredShops?.length === 0 && (
          <div className="px-4 py-12 text-center">
            <div className="mx-auto grid size-11 place-items-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800">
              <Search size={19} />
            </div>
            <p className="mt-3 text-sm font-semibold">No shops found</p>
            <p className="mt-1 text-xs text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-4 py-3.5 dark:border-slate-800 sm:px-5">
          <p className="text-xs text-slate-500">
            Showing{' '}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {filteredShops?.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
              {'–'}
              {Math.min(currentPage * pageSize, filteredShops?.length)}
            </span>{' '}
            of {filteredShops?.length}
          </p>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              disabled={currentPage === 1}
              className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`grid size-8 place-items-center rounded-lg text-xs font-semibold ${
                    pageNumber === currentPage
                      ? 'bg-violet-600 text-white'
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {pageNumber}
                </button>
              )
            )}

            <button
              onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
              disabled={currentPage === totalPages}
              className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800"
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <CreateShopModal
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onSubmit={(form) => {
                // TODO: Unganisha hapa na Laravel create-shop mutation.
                //console.log('New shop form:', form);
                queryClient.invalidateQueries({
                  queryKey: ['get_shops'],
                });
                setCreateModalOpen(false);
            }}
            />

            <ShopDetailsDrawer
            shop={selectedShop}
            onClose={closeShopDrawer}
            />
    </div>
  );
}