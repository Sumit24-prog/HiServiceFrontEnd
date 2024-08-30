// LogoutButton.tsx
import React from 'react';
import { LogOut } from 'lucide-react'; // Import the LogOut icon from lucide-react
import logoutButtonStyle from '../styles/LogoutButton.module.css';
import {logout} from "../apiService.ts"; // Import the CSS module

const LogoutButton: React.FC = () => {
    const handleLogout = async () => {
        try {
            await logout();
            // Clear user data from local storage or state
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            // Redirect to login page
            window.location.href = '/login'; // Adjust the path as needed
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <button className={logoutButtonStyle.logoutButton} onClick={handleLogout}>
            <LogOut size={20} /> {/* Icon size adjusted for the button */}
            <span>Logout</span>
        </button>
    );
};

export default LogoutButton;
