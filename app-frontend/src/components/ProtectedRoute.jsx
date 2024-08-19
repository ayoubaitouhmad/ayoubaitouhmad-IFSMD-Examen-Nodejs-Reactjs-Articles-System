import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated !== undefined) {
            setLoading(false);
        }
    }, [isAuthenticated]);

    if (loading) {
        return <div>Loading...</div>; // Show a loading state while determining authentication
    }

    return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
