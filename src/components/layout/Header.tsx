import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { LogOut, Bell } from 'lucide-react';

export default function Header() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">AdScreen</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
            </button>
            <div className="relative flex items-center space-x-2">
              <div className="flex flex-col text-right hidden sm:block">
                <span className="text-sm font-medium text-gray-900">{profile?.full_name || user?.email}</span>
                <span className="text-xs text-gray-500 capitalize">{profile?.role?.replace('_', ' ')}</span>
              </div>
              <div className="ml-3 relative">
                 <button onClick={handleSignOut} className="p-2 text-gray-400 hover:text-gray-500">
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
