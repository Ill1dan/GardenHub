import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import GardenerDashboard from './pages/GardenerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

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
