import { useAuth } from '../../hooks/useAuth';
import clsx from 'clsx';

export default function RoleSwitcher() {
  const { isSuperAdmin, effectiveRole, impersonateRole } = useAuth();

  if (!isSuperAdmin) return null;

  const roles = [
    { id: 'admin', label: 'Admin' },
    { id: 'screen_owner', label: 'Screen Owner' },
    { id: 'advertiser', label: 'Advertiser' },
  ] as const;

  return (
    <div className="px-4 py-4 border-t border-slate-800">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
        Test as Role
      </p>
      <div className="flex flex-col space-y-1">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => impersonateRole(role.id)}
            className={clsx(
              'flex items-center px-2 py-1.5 text-xs font-medium rounded-md transition-colors',
              effectiveRole === role.id
                ? 'bg-brand-500/20 text-brand-400 ring-1 ring-brand-500/50'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            )}
          >
            <span className={clsx(
              'w-2 h-2 rounded-full mr-2',
              effectiveRole === role.id ? 'bg-brand-500' : 'bg-slate-600'
            )} />
            {role.label}
          </button>
        ))}
      </div>
    </div>
  );
}
