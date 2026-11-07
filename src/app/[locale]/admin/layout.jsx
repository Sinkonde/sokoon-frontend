import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminShell from './admin-shell';
import serverApi from '@/lib/api/severApi';

export default async function AdminLayout({ children, params }) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  // Token haipo: rudi login
  if (!token) {
    redirect(`/${locale}/login`);
  }

  let dashboardData = null;

  try {
    const response = await serverApi.post('/api/v1', {
      type: 'admin_dashboard',
      payload: {},
    });

    dashboardData = response.data;
  } catch (error) {
    // Token inaweza kuwepo lakini ime-expire au si sahihi.
    if (error.response?.status === 401) {
      redirect(`${process.env.APP_ROOT_URL}/login`);
    }

    console.error('Admin dashboard fetch failed:', error);
  }

  return (
    <AdminShell dashboardData={dashboardData}>
      {children}
    </AdminShell>
  );
}