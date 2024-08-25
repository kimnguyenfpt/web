import React from 'react';
import PropTypes from 'prop-types';
import './BrandBox.css';

export default function BrandBox({ onCategoryClick }) {
  return (
    <div className="brands-wrapper">
      <div className="brands-container">
        <div className="brand-box" onClick={() => onCategoryClick(1)}>Laptop</div>
        <div className="brand-box" onClick={() => onCategoryClick(2)}>Điện Thoại</div>
        <div className="brand-box" onClick={() => onCategoryClick(3)}>Phụ Kiện</div>
        <div className="brand-box" onClick={() => onCategoryClick(4)}>Xem tất cả</div>
      </div>
    </div>
  );
}

BrandBox.propTypes = {
  onCategoryClick: PropTypes.func.isRequired,
};
