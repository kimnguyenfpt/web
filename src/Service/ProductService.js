const url = 'http://localhost:3000/api';

export const fetchNewProducts = async () => {
  try {
    const response = await fetch(`${url}/new-products`);
    if (!response.ok) {
      throw new Error('Mạng không ổn');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${url}/products`);
    if (!response.ok) {
      throw new Error('Mạng không ổn');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
};

export const fetchHotProducts = async () => {
  try {
    const response = await fetch(`${url}/hot-products`);
    if (!response.ok) {
      throw new Error('Mạng không ổn');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${url}/products/${id}`);
    if (!response.ok) {
      throw new Error('Không tồn tại sản phẩm');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
};
 
export const fetchRelatedProducts = async (productId) => {
  try {
    const response = await fetch(`${url}/products/${productId}/related`);
    if (!response.ok) throw new Error('Không thể lấy sản phẩm liên quan');
    return await response.json();
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
};

export const fetchProductsByCategoryId = async (categoryId) => {
  try {
    const response = await fetch(`${url}/products/categoryid/${categoryId}`);
    if (!response.ok) {
      throw new Error('Mạng không ổn');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi rồi:', error);
    throw error;
  }
};