import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate, useLocation } from 'react-router'; // useLocation import koro
import { Loader2 } from 'lucide-react'; // Ekta spinner icon

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext); // Loading state-ti nio
    const location = useLocation(); // Current location track korbe

    // 1. Data load hoyar somoy loader dekhabe
    if (loading) {
        return (
            <div className="min-h-screen bg-[#030014] flex items-center justify-center">
                <Loader2 className="animate-spin text-violet-500" size={48} />
            </div>
        );
    }

    // 2. User na thakle login-e pathabe ebong state pass korbe
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 3. User thakle content dekhabe
    return children;
};

export default PrivateRoute;