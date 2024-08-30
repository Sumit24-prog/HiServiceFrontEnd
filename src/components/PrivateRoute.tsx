// src/components/PrivateRoute.tsx
import React from 'react';
import { RouteProps, Navigate} from 'react-router-dom';

const PrivateRoute: React.FC<RouteProps> = ({ children }) => {
    const token = localStorage.getItem('token'); // Replace with your actual authentication logic

    return token ? (
        <>{children}</>
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoute;
