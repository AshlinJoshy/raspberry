import { useCreatives } from '../../hooks/useCreatives';
import { Plus, Film, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Creatives() {
  const { creatives, isLoading, error } = useCreatives();

  if (isLoading) return <div className="text-slate-400">Loading creatives...</div>;
  if (error) return <div className="text-red-400">Error loading creatives</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-2xl font-bold text-white">My Creatives</h1>
           <p className="mt-1 text-sm text-slate-400">Manage your uploaded advertising assets.</p>
        </div>
        <Link
          to="/advertiser/creatives/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Upload Creative
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {creatives?.map((creative) => (
          <div key={creative.id} className="bg-slate-900 border border-slate-800 overflow-hidden shadow-sm rounded-xl transition-all hover:border-slate-700 hover:shadow-md">
            <div className="aspect-w-16 aspect-h-9 bg-slate-800 flex items-center justify-center relative">
                 {/* Preview */}
                 {creative.file_type === 'image' ? (
                     <img src={creative.file_url} alt={creative.name} className="object-cover w-full h-48" />
                 ) : (
                     <div className="w-full h-48 flex items-center justify-center bg-slate-800 text-slate-500">
                         <Film className="h-12 w-12" />
                     </div>
                 )}
                 <div className="absolute top-2 right-2">
                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${
                         creative.status === 'approved' ? 'bg-green-400/10 text-green-400 ring-green-400/20' :
                         creative.status === 'rejected' ? 'bg-red-400/10 text-red-400 ring-red-400/20' :
                         'bg-yellow-400/10 text-yellow-400 ring-yellow-400/20'
                     }`}>
                         {creative.status}
                     </span>
                 </div>
            </div>
            <div className="px-5 py-4">
              <h3 className="text-lg font-medium text-white truncate">{creative.name}</h3>
              <p className="mt-1 text-sm text-slate-500 flex items-center">
                  {creative.file_type === 'image' ? <ImageIcon className="h-4 w-4 mr-1.5"/> : <Film className="h-4 w-4 mr-1.5"/>}
                  {creative.width}x{creative.height}
                  {creative.duration_seconds && ` • ${creative.duration_seconds}s`}
              </p>
            </div>
          </div>
        ))}
         {creatives?.length === 0 && (
             <div className="col-span-full text-center py-16 bg-slate-900 rounded-xl border-2 border-slate-800 border-dashed">
                 <div className="mx-auto h-12 w-12 text-slate-600">
                     <Plus className="h-full w-full" />
                 </div>
                 <h3 className="mt-2 text-sm font-semibold text-white">No creatives</h3>
                 <p className="mt-1 text-sm text-slate-500">Get started by uploading your first creative.</p>
             </div>
        )}
      </div>
    </div>
  );
}
