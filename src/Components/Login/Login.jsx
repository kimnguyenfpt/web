import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, logout } from './AuthLoginSilce';
import { Modal, Progress } from 'antd';
import './Login.css';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.authLogin);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [progress, setProgress] = useState(100); // Giá trị thanh tiến trình

    const onSubmit = (data) => {
        dispatch(login(data)).unwrap()
            .then((response) => {
                console.log('Login response:', response);
                sessionStorage.setItem('user', JSON.stringify(response));
                setModalMessage('Đăng nhập thành công!');
                showModalAndRedirect('/');
            })
            .catch((error) => {
                console.error('Login error:', error);
                setModalMessage('Đăng nhập thất bại: ' + (error.message || 'Kiểm tra lại thông tin đăng nhập của bạn'));
                showModal();
            });
    };

    const handleLogout = () => {
        dispatch(logout()).unwrap()
            .then(() => {
                sessionStorage.removeItem('user');
                setModalMessage('Đăng xuất thành công!');
                showModalAndRedirect('/login');
            });
    };

    const showModalAndRedirect = (path) => {
        setProgress(100); // Đặt lại thanh tiến trình
        setIsModalVisible(true);

        let interval = setInterval(() => {
            setProgress((prev) => {
                if (prev <= 0) {
                    clearInterval(interval);
                    setIsModalVisible(false);
                    navigate(path);
                }
                return prev - 10;
            });
        }, 200); // Giảm mỗi 200ms
    };

    const showModal = () => {
        setProgress(100); // Đặt lại thanh tiến trình
        setIsModalVisible(true);

        let interval = setInterval(() => {
            setProgress((prev) => {
                if (prev <= 0) {
                    clearInterval(interval);
                    setIsModalVisible(false);
                }
                return prev - 10;
            });
        }, 200); // Giảm mỗi 200ms
    };

    return (
        <div className="wrapper">
            {!auth.user ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Đăng nhập</h1>
                    <div className="input-box">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            {...register('email', { required: 'Vui lòng nhập email' })}
                        />
                        {errors.email && <span>{errors.email.message}</span>}
                        <i className='bx bx-envelope'></i>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            name="password"
                            placeholder="Mật Khẩu"
                            {...register('password', { required: 'Vui lòng nhập password' })}
                        />
                        {errors.password && <span>{errors.password.message}</span>}
                        <i className='bx bxs-lock-alt'></i>
                    </div>
                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" name="remember" id="remember" /> Nhớ Mật Khẩu
                        </label>
                        <a href="">Thay đổi mật khẩu</a>
                    </div>
                    <button type="submit" className="btn">Đăng nhập</button>
                    {auth.status === 'loading' && <p>Loading...</p>}
                    {auth.error && <p>{auth.error}</p>}
                    <div className="login-link">
                        <p>Bạn chưa có tài khoản? <Link to="/register">Đăng Ký</Link></p>
                    </div>
                </form>
            ) : (
                <div>
                    <p>Xin chào, {auth.user.username}</p>
                    <button onClick={handleLogout} className="btn">Đăng xuất</button>
                </div>
            )}

            {/* Modal thông báo */}
            <Modal
                title="Thông báo"
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <p>{modalMessage}</p>
                <Progress percent={progress} status="active" />
            </Modal>
        </div>
    );
};

export default Login;
