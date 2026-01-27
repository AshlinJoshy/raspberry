import clsx from 'clsx';

interface ScreenStatusBadgeProps {
  status: 'active' | 'inactive' | 'maintenance';
  isOnline: boolean;
}

export default function ScreenStatusBadge({ status, isOnline }: ScreenStatusBadgeProps) {
  return (
    <div className="flex flex-col space-y-1">
      <span className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
        status === 'active' ? "bg-green-100 text-green-800" :
        status === 'maintenance' ? "bg-yellow-100 text-yellow-800" :
        "bg-gray-100 text-gray-800"
      )}>
        {status}
      </span>
      <span className={clsx(
         "inline-flex items-center text-xs",
         isOnline ? "text-green-600" : "text-red-600"
      )}>
        <span className={clsx(
          "h-2 w-2 rounded-full mr-1",
          isOnline ? "bg-green-600" : "bg-red-600"
        )} />
        {isOnline ? 'Online' : 'Offline'}
      </span>
    </div>
  );
}
