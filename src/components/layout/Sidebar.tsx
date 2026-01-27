import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LayoutDashboard, Monitor, CheckSquare, Megaphone, Image, Users } from 'lucide-react';
import clsx from 'clsx';

export default function Sidebar() {
  const { profile } = useAuth();

  const role = profile?.role;

  const navigation = [
    // Common
    // { name: 'Dashboard', href: role === 'screen_owner' ? '/screen-owner' : role === 'advertiser' ? '/advertiser' : '/admin', icon: LayoutDashboard },
    
    // Screen Owner
    ...(role === 'screen_owner' ? [
      { name: 'Dashboard', href: '/screen-owner', icon: LayoutDashboard, end: true },
      { name: 'My Screens', href: '/screen-owner/screens', icon: Monitor },
      { name: 'Approvals', href: '/screen-owner/approvals', icon: CheckSquare },
    ] : []),

    // Advertiser
    ...(role === 'advertiser' ? [
      { name: 'Dashboard', href: '/advertiser', icon: LayoutDashboard, end: true },
      { name: 'Campaigns', href: '/advertiser/campaigns', icon: Megaphone },
      { name: 'Creatives', href: '/advertiser/creatives', icon: Image },
    ] : []),

    // Admin
    ...(role === 'admin' ? [
      { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, end: true },
      { name: 'Users', href: '/admin/users', icon: Users },
    ] : []),
  ];

  return (
    <div className="flex flex-col w-64 bg-gray-800 h-screen fixed top-0 left-0 pt-16">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.end}
              className={({ isActive }) =>
                clsx(
                  isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                )
              }
            >
              <item.icon
                className={clsx(
                  'mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-300'
                )}
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
