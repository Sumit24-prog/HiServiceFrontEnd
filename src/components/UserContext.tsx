import React, { createContext, useState, useEffect, useContext } from 'react';

interface User {
    userId: string;
    // Other user details if needed
}

const UserContext = createContext<User | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setUser({ userId });
        }
    }, []);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
