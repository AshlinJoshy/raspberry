import { useCampaigns } from '../../hooks/useCampaigns';
import { Plus, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Campaigns() {
  const { campaigns, isLoading, error } = useCampaigns();

  if (isLoading) return <div>Loading campaigns...</div>;
  if (error) return <div>Error loading campaigns</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">My Campaigns</h1>
        <Link
          to="/advertiser/campaigns/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Campaign
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {campaigns?.map((campaign) => (
            <li key={campaign.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">{campaign.name}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        campaign.status === 'active' ? 'bg-green-100 text-green-800' : 
                        campaign.status === 'draft' ? 'bg-gray-100 text-gray-800' : 
                        'bg-yellow-100 text-yellow-800'
                    }`}>
                      {campaign.status}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <Megaphone className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      Creative: {campaign.creative?.name || 'Unknown'}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      {new Date(campaign.start_date).toLocaleDateString()} - {new Date(campaign.end_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
          {campaigns?.length === 0 && (
              <li className="px-4 py-12 text-center text-gray-500">
                  No campaigns created yet.
              </li>
          )}
        </ul>
      </div>
    </div>
  );
}
