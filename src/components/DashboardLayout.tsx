import { Outlet } from 'react-router-dom';
import DashboardHeader from './dashboard/DashboardHeader';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <Outlet />
    </div>
  );
}
