// src/pages/SignUp.jsx

import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase'; // Ensure to import your Firebase configuration
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/'); // Navigate to home after sign up
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/'); // Navigate to home after sign in
    } catch (err) {
      console.error(err);
      setError('Failed to sign in with Google.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-dark-bg text-gray-800 dark:text-white">
      <form onSubmit={handleSignUp} className="w-full max-w-md p-6 bg-white dark:bg-glass-dark shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
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
          Sign Up
        </button>
        <hr className="my-4" />
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full p-3 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
};

export default SignUp;
