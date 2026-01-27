import { useApprovals } from '../../hooks/useApprovals';
import { Check, X, Film } from 'lucide-react';

export default function Approvals() {
  const { approvals, isLoading, error, updateStatus } = useApprovals();

  if (isLoading) return <div>Loading approvals...</div>;
  if (error) return <div>Error loading approvals</div>;

  const handleStatusChange = async (id: string, status: 'approved' | 'rejected') => {
    try {
        await updateStatus.mutateAsync({ id, status });
    } catch (err) {
        console.error('Failed to update status', err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Content Approvals</h1>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {approvals?.map((approval) => (
            <li key={approval.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                   <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded flex items-center justify-center">
                            {approval.creative.file_type === 'image' ? (
                                <img src={approval.creative.file_url} alt="" className="h-16 w-16 object-cover rounded" />
                            ) : (
                                <Film className="h-8 w-8 text-gray-400" />
                            )}
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">{approval.creative.name}</h3>
                            <p className="text-sm text-gray-500">Proposed for screen: <span className="font-medium">{approval.screen.name}</span></p>
                        </div>
                   </div>
                   <div className="flex items-center space-x-2">
                       {approval.status === 'pending' ? (
                           <>
                                <button
                                    onClick={() => handleStatusChange(approval.id, 'approved')}
                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    <Check className="h-4 w-4 mr-1" /> Approve
                                </button>
                                <button
                                    onClick={() => handleStatusChange(approval.id, 'rejected')}
                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    <X className="h-4 w-4 mr-1" /> Reject
                                </button>
                           </>
                       ) : (
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                               approval.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                           }`}>
                               {approval.status}
                           </span>
                       )}
                   </div>
                </div>
              </div>
            </li>
          ))}
          {approvals?.length === 0 && (
              <li className="px-4 py-12 text-center text-gray-500">
                  No pending approvals.
              </li>
          )}
        </ul>
      </div>
    </div>
  );
}
