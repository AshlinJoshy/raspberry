import { useCreatives } from '../../hooks/useCreatives';
import { Plus, Film, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Creatives() {
  const { creatives, isLoading, error } = useCreatives();

  if (isLoading) return <div>Loading creatives...</div>;
  if (error) return <div>Error loading creatives</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">My Creatives</h1>
        <Link
          to="/advertiser/creatives/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Upload Creative
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {creatives?.map((creative) => (
          <div key={creative.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 flex items-center justify-center relative">
                 {/* Preview */}
                 {creative.file_type === 'image' ? (
                     <img src={creative.file_url} alt={creative.name} className="object-cover w-full h-48" />
                 ) : (
                     <div className="w-full h-48 flex items-center justify-center bg-gray-800 text-white">
                         <Film className="h-12 w-12" />
                     </div>
                 )}
                 <div className="absolute top-2 right-2">
                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                         creative.status === 'approved' ? 'bg-green-100 text-green-800' :
                         creative.status === 'rejected' ? 'bg-red-100 text-red-800' :
                         'bg-yellow-100 text-yellow-800'
                     }`}>
                         {creative.status}
                     </span>
                 </div>
            </div>
            <div className="px-4 py-4">
              <h3 className="text-lg font-medium text-gray-900 truncate">{creative.name}</h3>
              <p className="mt-1 text-sm text-gray-500 flex items-center">
                  {creative.file_type === 'image' ? <ImageIcon className="h-4 w-4 mr-1"/> : <Film className="h-4 w-4 mr-1"/>}
                  {creative.width}x{creative.height}
                  {creative.duration_seconds && ` • ${creative.duration_seconds}s`}
              </p>
            </div>
          </div>
        ))}
         {creatives?.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-lg border border-gray-200 border-dashed">
                <p className="text-gray-500">No creatives uploaded yet.</p>
            </div>
        )}
      </div>
    </div>
  );
}
