import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from './AuthRegisterSlice';
import './Register.css';

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
        <div className="wrapper">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Đăng ký</h1>
                <div className="input-box">
                    <input
                        type="text"
                        name="username"
                        placeholder="Tên Đăng Nhập"
                        {...register('username', { required: true })}
                    />
                    {errors.username && <span>Nhập Username đi....</span>}
                    <i className='bx bxs-user'></i>
                </div>
                <div className="input-box">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        {...register('email', { required: true })}
                    />
                    {errors.email && <span>Nhập email đi......</span>}
                    <i className='bx bx-envelope'></i>
                </div>
                <div className="input-box">
                    <input
                        type="text"
                        name="phone"
                        placeholder="Số Điện Thoại"
                        {...register('phone', { required: true, pattern: /^[0-9]+$/ })}
                    />
                    {errors.phone && <span>Nhập số điện thoại đi...</span>}
                    <i className='bx bxs-phone'></i>
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        name="password"
                        placeholder="Mật Khẩu"
                        {...register('password', { required: true })}
                    />
                    {errors.password && <span>Nhập mật khẩu đi....</span>}
                    <i className='bx bxs-lock-alt'></i>
                </div>
                <button type="submit" className="btn">Đăng ký</button>
                {auth.status === 'loading' && <p>Loading...</p>}
                {auth.error && <p>{auth.error}</p>}
                <div className="login-link">
                    <p>Bạn Đã Có Tài Khoản? <Link to="/login">Đăng Nhập</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Register;
