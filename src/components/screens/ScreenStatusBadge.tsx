import clsx from 'clsx';

interface ScreenStatusBadgeProps {
  status: 'active' | 'inactive' | 'maintenance';
  isOnline: boolean;
}

export default function ScreenStatusBadge({ status, isOnline }: ScreenStatusBadgeProps) {
  return (
    <div className="flex flex-col items-end space-y-2">
      <span className={clsx(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ring-1 ring-inset",
        status === 'active' ? "bg-green-400/10 text-green-400 ring-green-400/20" :
        status === 'maintenance' ? "bg-yellow-400/10 text-yellow-400 ring-yellow-400/20" :
        "bg-slate-700/40 text-slate-400 ring-slate-600"
      )}>
        {status}
      </span>
      <span className={clsx(
         "inline-flex items-center text-xs font-medium",
         isOnline ? "text-green-400" : "text-red-400"
      )}>
        <span className={clsx(
          "h-1.5 w-1.5 rounded-full mr-1.5",
          isOnline ? "bg-green-400" : "bg-red-400"
        )} />
        {isOnline ? 'Online' : 'Offline'}
      </span>
    </div>
  );
}
