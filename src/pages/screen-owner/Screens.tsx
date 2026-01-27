import { useScreens } from '../../hooks/useScreens';
import ScreenCard from '../../components/screens/ScreenCard';
import { Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Screens() {
  const { screens, isLoading, error, deleteScreen } = useScreens();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading screens...</div>;
  if (error) return <div>Error loading screens</div>;

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">My Screens</h1>
        <Link
          to="/screen-owner/screens/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
            <div className="col-span-full text-center py-12 bg-white rounded-lg border border-gray-200 border-dashed">
                <p className="text-gray-500">No screens registered yet.</p>
            </div>
        )}
      </div>
    </div>
  );
}
