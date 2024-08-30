// UserProfile.tsx
import React from 'react';

interface User {
    userId: string;
    username: string;
    email: string;
    address: string;
    contactNumber: string;
}

interface Props {
    user: User;
}

const UserProfile: React.FC<Props> = ({ user }) => {
    return (
        <div>
            <h2>{user.username}'s Profile</h2>
            <p>Email: {user.email}</p>
            <p>Address: {user.address}</p>
            <p>Contact: {user.contactNumber}</p>
        </div>
    );
};

export default UserProfile;
