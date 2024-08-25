// Logout.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Login/AuthLoginSilce';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem('user');
        dispatch(logout());
        window.alert('Đăng xuất thành công');
        navigate('/');
    }, [dispatch, navigate]);

    return <div>Đang đăng xuất...</div>;
};

export default Logout;
