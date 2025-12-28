import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import GardenerDashboard from './pages/GardenerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ShopPage from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import RegionalGardening from './pages/RegionalGardening';
import ProblemsPage from './pages/ProblemsPage';
import GardenerPage from './pages/GardenerPage';
import UserProfile from './pages/UserProfile';
import ForumPage from './pages/ForumPage';
import MembershipPage from './pages/MembershipPage';
import ServicePage from './pages/ServicePage';
import ServicePackagesPage from './pages/ServicePackagesPage';
import ManualServicePage from './pages/ManualServicePage';
import ChatPage from './pages/ChatPage';
import PlantCarePage from './pages/PlantCarePage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={['viewer', 'gardener', 'expert', 'admin']}>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/gardeners" element={<GardenerPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/services/packages" element={<ServicePackagesPage />} />
          <Route path="/services/manual" element={<ManualServicePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:id" element={<ProductDetailsPage />} />
          <Route path="/regional-gardening" element={<RegionalGardening />} />
          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/membership" element={<MembershipPage />} />

          <Route
            path="/plant-care"
            element={
              <ProtectedRoute allowedRoles={['viewer']}>
                <PlantCarePage />
              </ProtectedRoute>
            }
          />

          {/* Viewer Dashboard: Only for Viewers */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['viewer']}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Gardener Dashboard: For Gardeners and Experts */}
          <Route
            path="/gardener-dashboard"
            element={
              <ProtectedRoute allowedRoles={['gardener', 'expert']}>
                <GardenerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard: Only for Admin */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute allowedRoles={['viewer', 'gardener', 'expert', 'admin']}>
                <ChatPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
