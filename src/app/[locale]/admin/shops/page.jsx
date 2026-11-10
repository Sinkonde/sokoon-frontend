'use client';

import { useCallback, useMemo, useState } from 'react';
import { Store, Plus, Package, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import CreateShopModal from './_components/createShopModal';
import ShopDetailsDrawer from './_components/shopDetailDrawer';
import ShopsPageHeader from './_components/ShopsPageHeader';
import ShopStats from './_components/ShopStats';
import ShopsToolbar from './_components/ShopsToolbar';
import ShopsTable from './_components/ShopsTable';
import ShopMobileCards from './_components/ShopMobileCards';
import ShopsEmptyState from './_components/ShopsEmptyState';
import ShopsPagination from './_components/ShopsPagination';
import useApiQuery from '@/lib/query/useApiQuery';
import { useQueryClient } from '@tanstack/react-query';

export default function ShopsPage() {
  const t = useTranslations('shops');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [packageFilter, setPackageFilter] = useState('All packages');
  const [page, setPage] = useState(1);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  const closeShopDrawer = useCallback(() => {
    setSelectedShop(null);
  }, []);

  const { data: shop, isLoading, isFetching, isError, error, refetch } = useApiQuery('get_shops', {});
  const shops = shop?.data?.shops;
  const shopStats = shop?.data?.stats
  
  const pageSize = 5;
  const queryClient = useQueryClient();

  const filteredShops = useMemo(() => {
    const query = search.trim().toLowerCase();

    return shops?.filter((shop) => {
      const matchesSearch = !query || [shop.name, shop.owner, shop.location, shop.id].some((value) => String(value ?? '')?.toLowerCase()?.includes(query));

      const matchesStatus =
        statusFilter === 'All statuses' || shop.status === statusFilter;

      const matchesPackage =
        packageFilter === 'All packages' || shop.package === packageFilter;

      return matchesSearch && matchesStatus && matchesPackage;
    });
  }, [shops, search, statusFilter, packageFilter]);

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
      label: t('stats.totalShops'),
      value: shopStats?.total_shops,
      detail: t('stats.growthThisMonth'),
      icon: Store,
      iconStyle: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300',
    },
    {
      label: t('stats.newShops'),
      value: shopStats?.new_shops,
      detail: t('stats.thisMonth'),
      icon: Plus,
      iconStyle: 'bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300',
    },
    {
      label: t('stats.starterPackage'),
      value: '624',
      detail: t('stats.halfOfAllShops'),
      icon: Package,
      iconStyle: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300',
    },
    {
      label: t('stats.activeShops'),
      value: '1,106',
      detail: t('stats.activePercentage'),
      icon: CheckCircle2,
      iconStyle: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300',
    },
  ];

  if (isLoading) {
    return <p>{t('loading')}</p>;
  }

  if (isError && !shop) {
    return (
      <div>
        <p>{error?.message || t('loadError')}</p>
        <button onClick={() => refetch()}>{t('retry')}</button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] space-y-5">
      <ShopsPageHeader onAddShop={() => setCreateModalOpen(true)} />

      <ShopStats stats={stats} />

      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-900/[0.02] dark:border-slate-800 dark:bg-[#10131c]">
        <ShopsToolbar
          search={search}
          statusFilter={statusFilter}
          packageFilter={packageFilter}
          onSearchChange={updateSearch}
          onStatusChange={updateStatus}
          onPackageChange={updatePackage}
          shopCount={filteredShops?.length}
        />

        <ShopsTable shops={paginatedShops} onSelectShop={setSelectedShop} />
        <ShopMobileCards shops={paginatedShops} onSelectShop={setSelectedShop} />

        {filteredShops?.length === 0 && <ShopsEmptyState />}

        <ShopsPagination
          totalItems={filteredShops?.length}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </section>

      <CreateShopModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={(form) => {
          queryClient.invalidateQueries({
            queryKey: ['get_shops'],
            exact: false,
            refetchType: 'active',
          });
          setCreateModalOpen(false);
        }}
      />

      <ShopDetailsDrawer shop={selectedShop} onClose={closeShopDrawer} />
    </div>
  );
}
