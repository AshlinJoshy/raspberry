import type { Screen } from '../../hooks/useScreens';
import ScreenStatusBadge from './ScreenStatusBadge';
import { Edit, Trash2, MonitorPlay, MapPin, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ScreenCardProps {
  screen: Screen;
  onEdit: (screen: Screen) => void;
  onDelete: (id: string) => void;
}

export default function ScreenCard({ screen, onEdit, onDelete }: ScreenCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 overflow-hidden shadow-sm rounded-xl transition-all hover:border-slate-700 hover:shadow-md">
      <div className="px-5 py-5">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-100 truncate">{screen.name}</h3>
            <div className="mt-1 flex items-center text-sm text-slate-500">
              <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-slate-600" />
              {screen.city}, {screen.country}
            </div>
            <div className="mt-2 flex items-center text-xs text-slate-500 space-x-3">
               <span className="flex items-center px-2 py-1 rounded bg-slate-800 text-slate-400">
                 <Maximize2 className="mr-1 h-3 w-3" />
                 {screen.resolution_width}x{screen.resolution_height}
               </span>
               <span className="px-2 py-1 rounded bg-slate-800 text-slate-400 capitalize">
                 {screen.screen_type}
               </span>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0">
            <ScreenStatusBadge status={screen.status} isOnline={screen.is_online} />
          </div>
        </div>
      </div>
      <div className="bg-slate-800/50 border-t border-slate-800 px-5 py-3 flex justify-between items-center">
        <div className="text-sm">
           <Link to={`/player/${screen.id}`} target="_blank" className="font-medium text-brand-400 hover:text-brand-300 flex items-center transition-colors">
             <MonitorPlay className="h-4 w-4 mr-1.5"/> Open Player
           </Link>
        </div>
        <div className="flex space-x-1">
            <button onClick={() => onEdit(screen)} className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
              <Edit className="h-4 w-4" />
            </button>
            <button onClick={() => onDelete(screen.id)} className="p-1.5 rounded-md text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-colors">
              <Trash2 className="h-4 w-4" />
            </button>
        </div>
      </div>
    </div>
  );
}
