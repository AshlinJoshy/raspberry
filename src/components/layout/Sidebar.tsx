import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LayoutDashboard, Monitor, CheckSquare, Megaphone, Image, Users } from 'lucide-react';
import RoleSwitcher from './RoleSwitcher';
import clsx from 'clsx';

export default function Sidebar() {
  const { profile, effectiveRole } = useAuth();

  const role = effectiveRole || profile?.role;

  const navigation = [
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
    <div className="flex flex-col w-64 bg-slate-900 border-r border-slate-800 h-[calc(100vh-4rem)] fixed top-16 left-0">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-2 flex-1 px-2 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.end}
              className={({ isActive }) =>
                clsx(
                  isActive 
                    ? 'bg-brand-500/10 text-brand-400 border-l-2 border-brand-500' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border-l-2 border-transparent',
                  'group flex items-center px-3 py-2 text-sm font-medium transition-colors duration-150'
                )
              }
            >
              <item.icon
                className={clsx(
                  'mr-3 flex-shrink-0 h-5 w-5',
                  // Icon color handling is done by parent text color classes mostly, but can force if needed
                )}
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-800">
        <RoleSwitcher />
      </div>
    </div>
  );
}
