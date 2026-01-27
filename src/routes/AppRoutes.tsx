import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import DashboardLayout from '../components/layout/DashboardLayout';
import ScreenOwnerDashboard from '../pages/screen-owner/Dashboard';
import AdvertiserDashboard from '../pages/advertiser/Dashboard';
import AdminDashboard from '../pages/admin/Dashboard';
import Screens from '../pages/screen-owner/Screens';
import ScreenForm from '../pages/screen-owner/ScreenForm';
import PlayerPage from '../pages/player/PlayerPage';
import Campaigns from '../pages/advertiser/Campaigns';
import CampaignForm from '../pages/advertiser/CampaignForm';
import Creatives from '../pages/advertiser/Creatives';
import CreativeUpload from '../pages/advertiser/CreativeUpload';
import Approvals from '../pages/screen-owner/Approvals';

export default function AppRoutes() {
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
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
