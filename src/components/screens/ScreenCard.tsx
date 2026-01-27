import type { Screen } from '../../hooks/useScreens';
import ScreenStatusBadge from './ScreenStatusBadge';
import { Edit, Trash2, MonitorPlay } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ScreenCardProps {
  screen: Screen;
  onEdit: (screen: Screen) => void;
  onDelete: (id: string) => void;
}

export default function ScreenCard({ screen, onEdit, onDelete }: ScreenCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{screen.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{screen.city}, {screen.country}</p>
            <div className="mt-2 text-sm text-gray-500">
               {screen.resolution_width}x{screen.resolution_height} • {screen.screen_type}
            </div>
          </div>
          <div className="ml-4">
            <ScreenStatusBadge status={screen.status} isOnline={screen.is_online} />
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-between items-center">
        <div className="text-sm">
           <Link to={`/player/${screen.id}`} target="_blank" className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center">
             <MonitorPlay className="h-4 w-4 mr-1"/> Player
           </Link>
        </div>
        <div className="flex space-x-2">
            <button onClick={() => onEdit(screen)} className="text-gray-400 hover:text-gray-500">
              <Edit className="h-5 w-5" />
            </button>
            <button onClick={() => onDelete(screen.id)} className="text-red-400 hover:text-red-500">
              <Trash2 className="h-5 w-5" />
            </button>
        </div>
      </div>
    </div>
  );
}
