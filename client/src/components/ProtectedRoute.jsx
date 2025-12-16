import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    // 1. Check if authenticated
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 2. Check if role is allowed
    // If usage doesn't specify allowedRoles, assume it's just "Authenticated Users Only" (less strict)
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect to their appropriate dashboard based on their actual role
        if (user.role === 'admin') return <Navigate to="/admin-dashboard" replace />;
        if (user.role === 'gardener' || user.role === 'expert') return <Navigate to="/gardener-dashboard" replace />;
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
