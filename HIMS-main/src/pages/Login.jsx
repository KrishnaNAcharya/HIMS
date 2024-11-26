// src/pages/Login.jsx

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Ensure this path is correct
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home'); // Navigate to home after login
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-dark-bg text-gray-800 dark:text-white">
      <form onSubmit={handleLogin} className="w-full max-w-md p-6 bg-white dark:bg-glass-dark shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded dark:bg-gray-800 dark:text-white"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded dark:bg-gray-800 dark:text-white"
          required
        />
        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600">
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;