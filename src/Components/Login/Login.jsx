import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, logout } from './AuthLoginSilce';
import { Modal, Progress } from 'antd';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.authLogin);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [progress, setProgress] = useState(100);

    const onSubmit = (data) => {
        dispatch(login(data)).unwrap()
            .then((response) => {
                sessionStorage.setItem('user', JSON.stringify(response));
                setModalMessage('Đăng nhập thành công!');
                showModalAndRedirect('/');
            })
            .catch((error) => {
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
        setProgress(100);
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
        }, 200);
    };

    const showModal = () => {
        setProgress(100);
        setIsModalVisible(true);

        let interval = setInterval(() => {
            setProgress((prev) => {
                if (prev <= 0) {
                    clearInterval(interval);
                    setIsModalVisible(false);
                }
                return prev - 10;
            });
        }, 200);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-800">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl">
                {!auth.user ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">Đăng nhập</h2>

                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400"
                                placeholder="Nhập email của bạn"
                                {...register('email', { required: 'Vui lòng nhập email' })}
                            />
                            {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Mật khẩu</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400"
                                placeholder="Nhập mật khẩu của bạn"
                                {...register('password', { required: 'Vui lòng nhập mật khẩu' })}
                            />
                            {errors.password && <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>}
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <label className="flex items-center text-sm text-gray-600">
                                <input type="checkbox" className="mr-2 accent-blue-400" /> Nhớ mật khẩu
                            </label>
                            <a href="#" className="text-sm text-blue-500 hover:text-blue-600 hover:underline">Quên mật khẩu?</a>
                        </div>

                        <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-800 to-purple-400 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold transition duration-300">Đăng nhập</button>

                        {auth.status === 'loading' && <p className="mt-4 text-center text-yellow-500">Đang xử lý...</p>}
                        {auth.error && <p className="mt-4 text-center text-red-500">{auth.error}</p>}

                        <div className="text-center mt-6">
                            <p className="text-gray-600">Chưa có tài khoản? <Link to="/register" className="text-blue-500 hover:underline">Đăng ký ngay</Link></p>
                        </div>
                    </form>
                ) : (
                    <div className="text-center">
                        <h3 className="text-2xl text-gray-800 mb-4">Xin chào, {auth.user.username}</h3>
                        <button onClick={handleLogout} className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-semibold transition duration-300">Đăng xuất</button>
                    </div>
                )}

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
        </div>
    );
};

export default Login;
