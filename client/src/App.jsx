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
import GardenerPage from './pages/GardenerPage';
import UserProfile from './pages/UserProfile';
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
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:id" element={<ProductDetailsPage />} />
          <Route path="/regional-gardening" element={<RegionalGardening />} />

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
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
