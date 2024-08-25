import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../../Service/CategoryService';
import './Categories.css';

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    loadCategories();
  }, []);

  return (
    <section className="category-section">
      {categories.length > 0 ? (
        categories.map((category, index) => (
          <div className="category-item" key={index}>
            <a className="text-decoration-none" href="">
              <div className="cat-item">
                <div className="overflow-hidden">
                  <img src={`/img/products/${category.img}`} alt={category.name} />
                </div>
                <div className="cat-item-info">
                  <h6>{category.name}</h6>
                  <small className="text-body">100 Products</small>
                </div>
              </div>
            </a>
          </div>
        ))
      ) : (
        <p>Loading categories...</p>
      )}
    </section>
  );
}

export default Categories;
