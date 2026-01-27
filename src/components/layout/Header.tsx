import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { LogOut, Bell, MonitorPlay } from 'lucide-react';

export default function Header() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 h-16 fixed top-0 w-full z-10">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center space-x-2">
              <MonitorPlay className="h-8 w-8 text-brand-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">AdScreen</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 focus:ring-offset-slate-900">
              <span className="sr-only">View notifications</span>
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-6 w-px bg-slate-800" aria-hidden="true" />
            <div className="relative flex items-center space-x-4">
              <div className="flex flex-col text-right hidden sm:block">
                <span className="text-sm font-medium text-slate-200">{profile?.full_name || user?.email}</span>
                <span className="text-xs text-slate-500 capitalize">{profile?.role?.replace('_', ' ')}</span>
              </div>
              <div className="relative">
                 <button 
                  onClick={handleSignOut} 
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Sign out"
                 >
                    <LogOut className="h-5 w-5" />
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
