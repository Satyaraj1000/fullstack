import { useState } from "react";
import axios from "../api/axiosInstance";
import { toast } from "react-toastify";


const ProductForm = ({ refresh }) => {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "",
    description: "",
    shortDescription: "",
    features: "",
    applications: "",
    industries: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (["features", "applications", "industries"].includes(key)) {
        formData.append(key, JSON.stringify(val.split(",")));
      } else {
        formData.append(key, val);
      }
    });

    try {
      await axios.post("/admin/products", formData);
      toast.success("Product added successfully");
      refresh();
    } catch (err) {
      console.error(err);
      toast.error("Error adding product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto space-y-5">
      <h2 className="text-2xl font-semibold text-gray-700 text-center">Add New Product</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="slug"
          placeholder="Slug"
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="features"
          placeholder="Features (comma-separated)"
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="applications"
          placeholder="Applications (comma-separated)"
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="industries"
          placeholder="Industries (comma-separated)"
          onChange={handleChange}
          required
          className="input"
        />
      </div>

      <textarea
        name="description"
        placeholder="Full Description"
        onChange={handleChange}
        required
        className="input h-28"
      />
      <textarea
        name="shortDescription"
        placeholder="Short Description"
        onChange={handleChange}
        required
        className="input h-20"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
      >
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
