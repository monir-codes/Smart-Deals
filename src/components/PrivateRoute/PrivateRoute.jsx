import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate, useLocation } from 'react-router'; // useLocation import koro
import { Loader2 } from 'lucide-react'; // Ekta spinner icon
import Loader from '../Loader/Loader';

const PrivateRoute = ({ children }) => {
    const { user, loading, setLoading } = useContext(AuthContext); // Loading state-ti nio
    const location = useLocation(); // Current location track korbe

    // 1. Data load hoyar somoy loader dekhabe
    if (loading) {
        return <Loader></Loader>
    }

    // 2. User na thakle login-e pathabe ebong state pass korbe
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 3. User thakle content dekhabe
    return children;
};

export default PrivateRoute;