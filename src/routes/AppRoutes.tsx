import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import DashboardLayout from '../components/layout/DashboardLayout';
import ScreenOwnerDashboard from '../pages/screen-owner/Dashboard';
import AdvertiserDashboard from '../pages/advertiser/Dashboard';
import AdminDashboard from '../pages/admin/Dashboard';
import Users from '../pages/admin/Users';
import Screens from '../pages/screen-owner/Screens';
import ScreenForm from '../pages/screen-owner/ScreenForm';
import PlayerPage from '../pages/player/PlayerPage';
import Campaigns from '../pages/advertiser/Campaigns';
import CampaignForm from '../pages/advertiser/CampaignForm';
import Creatives from '../pages/advertiser/Creatives';
import CreativeUpload from '../pages/advertiser/CreativeUpload';
import Approvals from '../pages/screen-owner/Approvals';
import { useAuth } from '../hooks/useAuth';

export default function AppRoutes() {
  const { user, profile, loading } = useAuth();

  // Helper to determine home route based on role
  const getHomeRoute = () => {
    if (loading) return null; // Or a loading spinner route
    if (!user) return <Navigate to="/login" replace />;
    
    if (profile?.role === 'screen_owner') return <Navigate to="/screen-owner" replace />;
    if (profile?.role === 'advertiser') return <Navigate to="/advertiser" replace />;
    if (profile?.role === 'admin') return <Navigate to="/admin" replace />;
    
    return <Navigate to="/login" replace />; // Fallback
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/player/:screenId" element={<PlayerPage />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        {/* Screen Owner Routes */}
        <Route path="/screen-owner" element={
          <ProtectedRoute allowedRoles={['screen_owner']}>
            <ScreenOwnerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/screen-owner/screens" element={
            <ProtectedRoute allowedRoles={['screen_owner']}>
               <Screens />
            </ProtectedRoute>
        } />
        <Route path="/screen-owner/screens/new" element={
            <ProtectedRoute allowedRoles={['screen_owner']}>
               <ScreenForm />
            </ProtectedRoute>
        } />
        <Route path="/screen-owner/screens/:id/edit" element={
            <ProtectedRoute allowedRoles={['screen_owner']}>
               <ScreenForm />
            </ProtectedRoute>
        } />
        <Route path="/screen-owner/approvals" element={
            <ProtectedRoute allowedRoles={['screen_owner']}>
               <Approvals />
            </ProtectedRoute>
        } />

        {/* Advertiser Routes */}
        <Route path="/advertiser" element={
          <ProtectedRoute allowedRoles={['advertiser']}>
            <AdvertiserDashboard />
          </ProtectedRoute>
        } />
         <Route path="/advertiser/campaigns" element={
            <ProtectedRoute allowedRoles={['advertiser']}>
               <Campaigns />
            </ProtectedRoute>
        } />
        <Route path="/advertiser/campaigns/new" element={
            <ProtectedRoute allowedRoles={['advertiser']}>
               <CampaignForm />
            </ProtectedRoute>
        } />
         <Route path="/advertiser/creatives" element={
            <ProtectedRoute allowedRoles={['advertiser']}>
               <Creatives />
            </ProtectedRoute>
        } />
        <Route path="/advertiser/creatives/new" element={
            <ProtectedRoute allowedRoles={['advertiser']}>
               <CreativeUpload />
            </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Users />
          </ProtectedRoute>
        } />
      </Route>

      <Route path="/" element={getHomeRoute() || <div className="h-screen bg-slate-950" />} />
    </Routes>
  );
}
