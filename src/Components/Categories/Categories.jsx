import React, { useEffect, useState } from "react";
import { fetchCategories } from "../../Service/CategoryService";
import { fetchProductsByCategoryId } from "../../Service/ProductService";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [productCounts, setProductCounts] = useState({});

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);

        // Fetch product counts for each category
        const counts = {};
        for (const category of categoriesData) {
          const products = await fetchProductsByCategoryId(category.id);
          counts[category.id] = products.length;
        }
        setProductCounts(counts);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    loadCategories();
  }, []);

  return (
    <section className="py-8 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.length > 0 ? (
        categories.map((category, index) => (
          <div
            className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            key={index}
          >
            <a href="#" className="block">
              {/* Image Section */}
              <div className="aspect-w-4 aspect-h-3 bg-gray-100 overflow-hidden">
                <img
                  src={`/img/products/${category.img}`}
                  alt={category.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Content Section */}
              <div className="p-3 text-center">
                <h6 className="text-sm font-semibold text-gray-800 group-hover:text-teal-600 transition-colors">
                  {category.name}
                </h6>
                <p className="text-xs text-gray-500 mt-1">
                  {productCounts[category.id] || 0} Sản phẩm
                </p>
              </div>
            </a>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">
          Đang tải danh mục...
        </p>
      )}
    </section>
  );
}

export default Categories;
