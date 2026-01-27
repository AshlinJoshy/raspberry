export default function AdvertiserDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Advertiser Dashboard</h1>
      <div className="mt-4">
        <p className="text-slate-400">Manage your ad campaigns and creatives.</p>
         <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-slate-900 border border-slate-800 overflow-hidden shadow-sm rounded-xl p-6">
            <dt className="text-sm font-medium text-slate-500 truncate">Active Campaigns</dt>
            <dd className="mt-2 text-3xl font-semibold text-green-400">0</dd>
          </div>
          <div className="bg-slate-900 border border-slate-800 overflow-hidden shadow-sm rounded-xl p-6">
             <dt className="text-sm font-medium text-slate-500 truncate">Pending Creatives</dt>
             <dd className="mt-2 text-3xl font-semibold text-yellow-400">0</dd>
          </div>
           <div className="bg-slate-900 border border-slate-800 overflow-hidden shadow-sm rounded-xl p-6">
             <dt className="text-sm font-medium text-slate-500 truncate">Total Spend</dt>
             <dd className="mt-2 text-3xl font-semibold text-white">$0.00</dd>
          </div>
        </div>
      </div>
    </div>
  );
}
