const url = "http://localhost:3000/api/products/search";
const search = async (query) => {
  const response = await fetch(`${url}/${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response.json();
};

export default {
  search,
};
