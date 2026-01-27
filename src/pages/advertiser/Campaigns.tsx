import { useCampaigns } from '../../hooks/useCampaigns';
import { Plus, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Campaigns() {
  const { campaigns, isLoading, error } = useCampaigns();

  if (isLoading) return <div className="text-slate-400">Loading campaigns...</div>;
  if (error) return <div className="text-red-400">Error loading campaigns</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-2xl font-bold text-white">My Campaigns</h1>
           <p className="mt-1 text-sm text-slate-400">Manage and track your advertising campaigns.</p>
        </div>
        <Link
          to="/advertiser/campaigns/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Campaign
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-800 shadow-sm rounded-xl overflow-hidden">
        <ul role="list" className="divide-y divide-slate-800">
          {campaigns?.map((campaign) => (
            <li key={campaign.id} className="hover:bg-slate-800/50 transition-colors">
              <div className="px-6 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-brand-400 truncate">{campaign.name}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ring-1 ring-inset ${
                        campaign.status === 'active' ? 'bg-green-400/10 text-green-400 ring-green-400/20' : 
                        campaign.status === 'draft' ? 'bg-slate-700/40 text-slate-400 ring-slate-600' : 
                        'bg-yellow-400/10 text-yellow-400 ring-yellow-400/20'
                    }`}>
                      {campaign.status}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-slate-400">
                      <Megaphone className="flex-shrink-0 mr-1.5 h-4 w-4 text-slate-500" />
                      Creative: {campaign.creative?.name || 'Unknown'}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-slate-500 sm:mt-0">
                    <p>
                      {new Date(campaign.start_date).toLocaleDateString()} - {new Date(campaign.end_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
          {campaigns?.length === 0 && (
              <li className="px-6 py-12 text-center text-slate-500">
                  No campaigns created yet.
              </li>
          )}
        </ul>
      </div>
    </div>
  );
}
