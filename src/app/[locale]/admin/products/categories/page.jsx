'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  FolderTree,
  Plus,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Package,
  CheckCircle2,
  XCircle,
  CalendarDays,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import CategoryDetailsDrawer from './_components/categoryDetailsDrawer';
import CreateCategoryModal from './_components/createCategoryModal';

// Sample data ya Product Categories (Hii utai-replace na useApiQuery baadaye)
const INITIAL_CATEGORIES = [
  {
    id: 'CAT-101',
    name: 'Vyakula na Vinywaji',
    slug: 'vyakula-na-vinywaji',
    description: 'Bidhaa zote za chakula, vinywaji baridi na nafaka.',
    productsCount: 420,
    status: 'Active',
    createdAt: '2026-01-15',
  },
  {
    id: 'CAT-102',
    name: 'Elektroniki',
    slug: 'elektroniki',
    description: 'Vifaa vya umeme, simu, laptops na accessories zake.',
    productsCount: 185,
    status: 'Active',
    createdAt: '2026-01-20',
  },
  {
    id: 'CAT-103',
    name: 'Vipodozi na Urembo',
    slug: 'vipodozi-na-urembo',
    description: 'Mafuta ya mgando, manukato na vifaa vya saluni.',
    productsCount: 96,
    status: 'Active',
    createdAt: '2026-02-02',
  },
  {
    id: 'CAT-104',
    name: 'Nguo na Viatu',
    slug: 'nguo-na-viatu',
    description: 'Mavazi ya kiume, kike na watoto pamoja na viatu.',
    productsCount: 310,
    status: 'Inactive',
    createdAt: '2026-02-10',
  },
  {
    id: 'CAT-105',
    name: 'Vifaa vya Ujenzi',
    slug: 'vifaa-vya-ujenzi',
    description: 'Sinki, bati, misumari na vifaa vingine vya ujenzi.',
    productsCount: 54,
    status: 'Active',
    createdAt: '2026-02-18',
  },
  {
    id: 'CAT-106',
    name: 'Dawa na Afya',
    slug: 'dawa-na-afya',
    description: 'Vifaa vya huduma ya kwanza na virutubisho vya mwili.',
    productsCount: 128,
    status: 'Active',
    createdAt: '2026-03-01',
  },
];

const statusStyles = {
  Active:
    'bg-emerald-50 text-emerald-700 ring-emerald-600/15 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20',
  Inactive:
    'bg-rose-50 text-rose-700 ring-rose-600/15 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-400/20',
};

function StatusBadge({ status }) {
  const Icon = status === 'Active' ? CheckCircle2 : XCircle;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${statusStyles[status]}`}
    >
      <Icon size={12} />
      {status}
    </span>
  );
}

function CategoryAvatar({ name }) {
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

export default function ProductCategoriesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [page, setPage] = useState(1);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Mfano wa data (utawafanya hawa watoke kwenye backend)
  const categories = INITIAL_CATEGORIES;
  const pageSize = 5;

  const closeCategoryDrawer = useCallback(() => {
    setSelectedCategory(null);
  }, []);

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    return categories?.filter((cat) => {
      const matchesSearch =
        !query ||
        [cat.name, cat.slug, cat.id, cat.description]
          .some((val) => val?.toLowerCase().includes(query));

      const matchesStatus =
        statusFilter === 'All statuses' || cat.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [categories, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredCategories?.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedCategories = filteredCategories?.slice(
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

  // Summary Cards Stats
  const totalProductsCount = useMemo(() => {
    return categories.reduce((acc, item) => acc + item.productsCount, 0);
  }, [categories]);

  const activeCategoriesCount = useMemo(() => {
    return categories.filter((item) => item.status === 'Active').length;
  }, [categories]);

  const stats = [
    {
      label: 'Total categories',
      value: categories.length.toString(),
      detail: 'Registered categories',
      icon: FolderTree,
      iconStyle: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300',
    },
    {
      label: 'Total products',
      value: totalProductsCount.toLocaleString(),
      detail: 'Across all categories',
      icon: Package,
      iconStyle: 'bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300',
    },
    {
      label: 'Active categories',
      value: activeCategoriesCount.toString(),
      detail: `${Math.round((activeCategoriesCount / categories.length) * 100)}% of total`,
      icon: CheckCircle2,
      iconStyle: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300',
    },
    {
      label: 'Avg. Products/Category',
      value: Math.round(totalProductsCount / categories.length).toString(),
      detail: 'Per category distribution',
      icon: Layers,
      iconStyle: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300',
    },
  ];

  return (
    <div className="relative mx-auto max-w-[1440px] space-y-5 pb-20 md:pb-0">
      {/* Page heading */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-600 dark:text-violet-400">
            Inventory & Catalog
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">Product Categories</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage product classifications, tags, and catalog structures.
          </p>
        </div>

        {/* Desktop Add Button */}
        <button
          type="button"
          onClick={() => setCreateModalOpen(true)}
          className="hidden h-10 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-semibold text-white shadow-sm shadow-violet-600/20 transition hover:bg-violet-700 active:scale-[0.98] md:inline-flex"
        >
          <Plus size={17} />
          Add category
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

      {/* Categories table & list section */}
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-900/[0.02] dark:border-slate-800 dark:bg-[#10131c]">
        <div className="border-b border-slate-100 px-4 py-4 sm:px-5 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold">All categories</h2>
              <p className="mt-1 text-xs text-slate-500">
                Browse and organize product categories.
              </p>
            </div>
            <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {filteredCategories?.length} categories
            </span>
          </div>

          {/* Search and Filters */}
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-[minmax(200px,1fr)_160px]">
            <label className="relative block">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(event) => updateSearch(event.target.value)}
                placeholder="Search category name, slug, description..."
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
                <option>Inactive</option>
              </select>
            </label>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-slate-50/80 text-[11px] uppercase tracking-wide text-slate-400 dark:bg-slate-900/70">
              <tr>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Slug</th>
                <th className="px-4 py-3 font-semibold">Products</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Created</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedCategories?.map((cat) => (
                <tr
                  key={cat.id}
                  className="transition hover:bg-slate-50/70 dark:hover:bg-slate-900/50"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <CategoryAvatar name={cat.name} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{cat.name}</p>
                        <p className="mt-0.5 truncate text-xs text-slate-500">
                          {cat.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-mono text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      /{cat.slug}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-slate-600 dark:text-slate-300">
                    {cat.productsCount} items
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={cat.status} />
                  </td>
                  <td className="px-4 py-3.5 text-xs text-slate-500">
                    {cat.createdAt}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      type="button"
                      aria-label={`Maelezo ya ${cat.name}`}
                      onClick={() => setSelectedCategory(cat)}
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

        {/* Mobile Category Cards */}
        <div className="space-y-3 p-3 md:hidden">
          {paginatedCategories?.map((cat) => (
            <article
              key={cat.id}
              className="rounded-xl border border-slate-200/80 p-3.5 dark:border-slate-800"
            >
              <div className="flex items-start gap-3">
                <CategoryAvatar name={cat.name} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold">{cat.name}</h3>
                      <p className="mt-0.5 text-xs font-mono text-slate-500">/{cat.slug}</p>
                    </div>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      aria-label={`Actions for ${cat.name}`}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <MoreHorizontal size={17} />
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <StatusBadge status={cat.status} />
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {cat.productsCount} products
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays size={12} />
                      {cat.createdAt}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {filteredCategories?.length === 0 && (
          <div className="px-4 py-12 text-center">
            <div className="mx-auto grid size-11 place-items-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800">
              <Search size={19} />
            </div>
            <p className="mt-3 text-sm font-semibold">No categories found</p>
            <p className="mt-1 text-xs text-slate-500">
              Try changing your search terms or filters.
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-4 py-3.5 dark:border-slate-800 sm:px-5">
          <p className="text-xs text-slate-500">
            Showing{' '}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {filteredCategories?.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
              {'–'}
              {Math.min(currentPage * pageSize, filteredCategories?.length)}
            </span>{' '}
            of {filteredCategories?.length}
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

      {/* Floating Action Button (FAB) Kwa ajili ya Mobile Tu */}
      <button
        type="button"
        onClick={() => setCreateModalOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-violet-600 p-4 font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-700 active:scale-95 md:hidden"
        aria-label="Add category"
      >
        <Plus size={22} />
        <span className="text-sm">Add Category</span>
      </button>

      {/* Modals & Drawers */}
      <CreateCategoryModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={(formData) => {
          // TODO: Unganisha hapa na Backend (Laravel API Mutation)
          // console.log('New category submitted:', formData);
          setCreateModalOpen(false);
        }}
      />

      <CategoryDetailsDrawer
        category={selectedCategory}
        onClose={closeCategoryDrawer}
      />
    </div>
  );
}