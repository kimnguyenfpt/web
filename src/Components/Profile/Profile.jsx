import React, { useEffect, useState } from 'react';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('user'));
        console.log('Stored User:', storedUser); 
        if (storedUser) {
            setUser(storedUser.user);
        }
    }, []);

    return (
        <div className="profile-container">
            <h1 className="profile-header">Hồ sơ của bạn</h1>
            {user ? (
                <div className="profile-details">
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p className="profile-not-logged-in">Bạn chưa đăng nhập.</p>
            )}
        </div>
    );
};

export default Profile;
