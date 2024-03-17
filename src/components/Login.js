import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you should add your authentication logic
    // For now, we'll just call the onLogin function with the user details including the role
    onLogin({ username, password, role });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-2xl rounded-lg p-8 transform transition-all hover:scale-105 duration-500"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-8">Welcome Back!</h2>
          <div className="mb-6">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg shadow-sm bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg shadow-sm bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="role" className="block text-gray-700 font-bold mb-2">
              Role
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg shadow-sm bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="super-admin">Super Admin</option>
              <option value="general-admin">General Admin</option>
              <option value="service-provider-admin">Service Provider Admin</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button
              className="w-full py-3 px-6 rounded-lg bg-purple-600 text-white font-bold hover:bg-purple-700 focus:outline-none focus:shadow-outline transition-colors duration-300"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;