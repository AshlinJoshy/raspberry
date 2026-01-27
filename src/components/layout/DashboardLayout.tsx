import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
           <Outlet />
        </main>
      </div>
    </div>
  );
}
