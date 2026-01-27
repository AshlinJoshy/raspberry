import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Header />
      <div className="flex pt-16 h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 overflow-y-auto bg-slate-950">
           <Outlet />
        </main>
      </div>
    </div>
  );
}
