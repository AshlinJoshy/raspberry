export default function ScreenOwnerDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Screen Owner Dashboard</h1>
      <div className="mt-4">
        <p className="text-slate-400">Welcome to your screen management dashboard.</p>
        {/* Placeholder for stats */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-slate-900 border border-slate-800 overflow-hidden shadow-sm rounded-xl p-6">
            <dt className="text-sm font-medium text-slate-500 truncate">Total Screens</dt>
            <dd className="mt-2 text-3xl font-semibold text-white">0</dd>
          </div>
          <div className="bg-slate-900 border border-slate-800 overflow-hidden shadow-sm rounded-xl p-6">
             <dt className="text-sm font-medium text-slate-500 truncate">Active Screens</dt>
             <dd className="mt-2 text-3xl font-semibold text-green-400">0</dd>
          </div>
           <div className="bg-slate-900 border border-slate-800 overflow-hidden shadow-sm rounded-xl p-6">
             <dt className="text-sm font-medium text-slate-500 truncate">Pending Approvals</dt>
             <dd className="mt-2 text-3xl font-semibold text-yellow-400">0</dd>
          </div>
        </div>
      </div>
    </div>
  );
}
