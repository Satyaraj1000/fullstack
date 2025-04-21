import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Admin Dashboard</h1>

        {/* Product Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Product</h2>
          <ProductForm refresh={() => window.location.reload()} />
        </div>

        {/* Product List Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
