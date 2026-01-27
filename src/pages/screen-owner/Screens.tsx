import { useScreens } from '../../hooks/useScreens';
import ScreenCard from '../../components/screens/ScreenCard';
import { Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Screens() {
  const { screens, isLoading, error, deleteScreen } = useScreens();
  const navigate = useNavigate();

  if (isLoading) return <div className="text-slate-400">Loading screens...</div>;
  if (error) return <div className="text-red-400">Error loading screens</div>;

  const handleEdit = (screen: any) => {
    navigate(`/screen-owner/screens/${screen.id}/edit`);
  };

  const handleDelete = async (id: string) => {
      if (confirm('Are you sure you want to delete this screen?')) {
          await deleteScreen.mutateAsync(id);
      }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">My Screens</h1>
          <p className="mt-1 text-sm text-slate-400">Manage your digital billboards and monitors.</p>
        </div>
        <Link
          to="/screen-owner/screens/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Screen
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {screens?.map((screen) => (
          <ScreenCard
            key={screen.id}
            screen={screen}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
        {screens?.length === 0 && (
            <div className="col-span-full text-center py-16 bg-slate-900 rounded-xl border-2 border-slate-800 border-dashed">
                <div className="mx-auto h-12 w-12 text-slate-600">
                    <Plus className="h-full w-full" />
                </div>
                <h3 className="mt-2 text-sm font-semibold text-white">No screens</h3>
                <p className="mt-1 text-sm text-slate-500">Get started by creating a new screen.</p>
                <div className="mt-6">
                  <Link
                    to="/screen-owner/screens/new"
                    className="inline-flex items-center rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                    Add Screen
                  </Link>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
