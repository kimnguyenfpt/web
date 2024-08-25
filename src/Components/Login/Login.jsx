import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, logout } from './AuthLoginSilce'; 
import './Login.css';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.authLogin);

    const onSubmit = (data) => {
        dispatch(login(data)).unwrap()
            .then((response) => {
                console.log('Login response:', response); 
                sessionStorage.setItem('user', JSON.stringify(response));
                window.alert('Đăng nhập thành công');
                navigate('/');
            })
            .catch((error) => {
                console.error('Login error:', error);
                window.alert('Đăng nhập thất bại: ' + (error.message || 'Kiểm tra lại thông tin đăng nhập của bạn'));
            });
    };

    const handleLogout = () => {
        dispatch(logout()).unwrap()
            .then(() => {
                window.alert('Đăng xuất thành công');
                navigate('/login');
            });
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
        </div>
    );
};

export default Login;
