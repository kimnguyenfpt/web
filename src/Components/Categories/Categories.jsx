import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../../Service/CategoryService';
import { fetchProductsByCategoryId } from '../../Service/ProductService'; // Import the function to fetch products by category
import './Categories.css';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [productCounts, setProductCounts] = useState({}); // State to store product counts for each category

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);

        // Fetch product counts for each category
        const counts = {};
        for (const category of categoriesData) {
          const products = await fetchProductsByCategoryId(category.id);
          counts[category.id] = products.length; // Save the product count for each category
        }
        setProductCounts(counts);
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
                  <small className="text-body">
                    {productCounts[category.id] || 0} Products
                  </small>
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
