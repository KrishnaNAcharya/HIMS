import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase'; // Ensure this path is correct
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Successfully logged in!');
      navigate('/home'); // Navigate to home after login
    } catch (err) {
      toast.error('Failed to log in. Please check your credentials.');
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success('Successfully signed in with Google!');
      navigate('/home'); // Navigate to home after successful Google sign-in
    } catch (err) {
      toast.error('Failed to sign in with Google.');
    }
  };

  const handlePasswordReset = async () => {
    setError('');
    setMessage('');

    if (!email) {
      setError('Please enter your email address to reset your password.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent. Please check your inbox.');
    } catch (err) {
      toast.error('Failed to send password reset email. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-dark-bg text-gray-800 dark:text-white">
      <form onSubmit={handleLogin} className="w-full max-w-md p-6 bg-white dark:bg-glass-dark shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}
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
        <p
          onClick={handlePasswordReset}
          className="mt-2 text-sm text-blue-500 cursor-pointer hover:underline text-center"
        >
          Forgot Password?
        </p>
        <hr className="my-4" />
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full p-3 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Sign in with Google
        </button>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
