import { useApprovals } from '../../hooks/useApprovals';
import { Check, X, Film } from 'lucide-react';

export default function Approvals() {
  const { approvals, isLoading, error, updateStatus } = useApprovals();

  if (isLoading) return <div className="text-slate-400">Loading approvals...</div>;
  if (error) return <div className="text-red-400">Error loading approvals</div>;

  const handleStatusChange = async (id: string, status: 'approved' | 'rejected') => {
    try {
        await updateStatus.mutateAsync({ id, status });
    } catch (err) {
        console.error('Failed to update status', err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Content Approvals</h1>

      <div className="bg-slate-900 border border-slate-800 shadow-sm rounded-xl overflow-hidden">
        <ul role="list" className="divide-y divide-slate-800">
          {approvals?.map((approval) => (
            <li key={approval.id}>
              <div className="px-6 py-5">
                <div className="flex items-center justify-between">
                   <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16 bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden border border-slate-700">
                            {approval.creative.file_type === 'image' ? (
                                <img src={approval.creative.file_url} alt="" className="h-full w-full object-cover" />
                            ) : (
                                <Film className="h-8 w-8 text-slate-500" />
                            )}
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-medium text-white">{approval.creative.name}</h3>
                            <p className="text-sm text-slate-400">Proposed for screen: <span className="font-medium text-slate-300">{approval.screen.name}</span></p>
                        </div>
                   </div>
                   <div className="flex items-center space-x-2">
                       {approval.status === 'pending' ? (
                           <>
                                <button
                                    onClick={() => handleStatusChange(approval.id, 'approved')}
                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                                >
                                    <Check className="h-4 w-4 mr-1" /> Approve
                                </button>
                                <button
                                    onClick={() => handleStatusChange(approval.id, 'rejected')}
                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                >
                                    <X className="h-4 w-4 mr-1" /> Reject
                                </button>
                           </>
                       ) : (
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${
                               approval.status === 'approved' 
                                 ? 'bg-green-400/10 text-green-400 ring-green-400/20' 
                                 : 'bg-red-400/10 text-red-400 ring-red-400/20'
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
              <li className="px-6 py-12 text-center text-slate-500">
                  No pending approvals.
              </li>
          )}
        </ul>
      </div>
    </div>
  );
}
