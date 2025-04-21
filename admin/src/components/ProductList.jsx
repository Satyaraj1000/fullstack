import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products");
      setProducts(res.data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.post("/admin/products/delete", { id });
        fetchProducts();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.length === 0 ? (
        <p className="text-gray-600">No products available.</p>
      ) : (
        products.map((p) => (
          <div
            key={p._id}
            className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition duration-300"
          >
            {p.image && (
              <img
                src={p.image.url}
                alt={p.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
            )}
            <h3 className="text-xl font-semibold text-blue-700 mb-2">{p.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{p.shortDescription}</p>
            <button
              onClick={() => handleDelete(p._id)}
              className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
