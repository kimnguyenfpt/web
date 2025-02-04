import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from './AuthRegisterSlice';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.authRegister);

    const onSubmit = (data) => {
        dispatch(registerUser(data)).unwrap()
            .then(() => {
                window.alert('Đăng ký thành công');
                navigate('/login');
            })
            .catch((error) => {
                console.error('Registration error:', error);
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-800">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">Đăng ký</h2>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Tên đăng nhập</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400"
                            placeholder="Tên đăng nhập"
                            {...register('username', { required: 'Vui lòng nhập tên đăng nhập' })}
                        />
                        {errors.username && <p className="text-red-500 mt-1 text-sm">{errors.username.message}</p>}
                    </div>

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
                        <label className="block text-gray-700 mb-2">Số điện thoại</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400"
                            placeholder="Nhập số điện thoại"
                            {...register('phone', { required: 'Vui lòng nhập số điện thoại', pattern: { value: /^[0-9]+$/, message: 'Số điện thoại không hợp lệ' } })}
                        />
                        {errors.phone && <p className="text-red-500 mt-1 text-sm">{errors.phone.message}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Mật khẩu</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400"
                            placeholder="Nhập mật khẩu"
                            {...register('password', { required: 'Vui lòng nhập mật khẩu' })}
                        />
                        {errors.password && <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>}
                    </div>

                    <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-800 to-purple-400 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold transition duration-300">Đăng ký</button>

                    {auth.status === 'loading' && <p className="mt-4 text-center text-yellow-500">Đang xử lý...</p>}
                    {auth.error && <p className="mt-4 text-center text-red-500">{auth.error}</p>}

                    <div className="text-center mt-6">
                        <p className="text-gray-600">Bạn đã có tài khoản? <Link to="/login" className="text-blue-500 hover:underline">Đăng nhập</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
