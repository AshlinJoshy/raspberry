export default function ScreenOwnerDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Screen Owner Dashboard</h1>
      <div className="mt-4">
        <p>Welcome to your screen management dashboard.</p>
        {/* Placeholder for stats */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Screens</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg p-5">
             <dt className="text-sm font-medium text-gray-500 truncate">Active Screens</dt>
             <dd className="mt-1 text-3xl font-semibold text-green-600">0</dd>
          </div>
           <div className="bg-white overflow-hidden shadow rounded-lg p-5">
             <dt className="text-sm font-medium text-gray-500 truncate">Pending Approvals</dt>
             <dd className="mt-1 text-3xl font-semibold text-yellow-600">0</dd>
          </div>
        </div>
      </div>
    </div>
  );
}
