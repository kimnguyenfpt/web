const url = 'http://localhost:3000/api';

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${url}/categories`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
