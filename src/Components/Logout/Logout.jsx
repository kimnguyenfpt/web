import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Login/AuthLoginSilce';
import { Modal, Progress } from 'antd';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        sessionStorage.removeItem('user'); // Xóa thông tin người dùng khỏi sessionStorage
        dispatch(logout()); // Dispatch action logout
        setIsModalVisible(true); // Hiển thị modal
        let interval = setInterval(() => {
            setProgress((prev) => {
                if (prev <= 0) {
                    clearInterval(interval);
                    setIsModalVisible(false); // Ẩn modal
                    navigate('/'); // Điều hướng về trang chủ
                }
                return prev - 10; // Giảm thanh tiến trình
            });
        }, 200); // Giảm mỗi 200ms

        return () => clearInterval(interval); // Dọn dẹp interval khi component bị hủy
    }, [dispatch, navigate]);

    return (
        <div>
            {/* Hiển thị modal */}
            <Modal
                title="Đăng xuất"
                visible={isModalVisible}
                footer={null}
                closable={false} // Không thể đóng modal bằng tay
            >
                <p>Bạn đã đăng xuất thành công.</p>
                <Progress percent={progress} status="active" />
            </Modal>
        </div>
    );
};

export default Logout;
