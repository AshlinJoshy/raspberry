export default function AdvertiserDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Advertiser Dashboard</h1>
      <div className="mt-4">
        <p>Manage your ad campaigns and creatives.</p>
         <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Active Campaigns</dt>
            <dd className="mt-1 text-3xl font-semibold text-green-600">0</dd>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg p-5">
             <dt className="text-sm font-medium text-gray-500 truncate">Pending Creatives</dt>
             <dd className="mt-1 text-3xl font-semibold text-yellow-600">0</dd>
          </div>
           <div className="bg-white overflow-hidden shadow rounded-lg p-5">
             <dt className="text-sm font-medium text-gray-500 truncate">Total Spend</dt>
             <dd className="mt-1 text-3xl font-semibold text-gray-900">$0.00</dd>
          </div>
        </div>
      </div>
    </div>
  );
}
