import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6"><span className="text-primary">Admin</span> Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
