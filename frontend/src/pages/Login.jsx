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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-dark-bg text-gray-800 dark:text-white p-4">
      <form onSubmit={handleLogin} className="w-full max-w-md p-6 md:p-8 bg-white dark:bg-glass-dark shadow-lg rounded-lg space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Login</h2>
        {error && <p className="text-red-500 text-sm md:text-base mb-4">{error}</p>}
        {message && <p className="text-green-500 text-sm md:text-base mb-4">{message}</p>}
        
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border rounded dark:bg-gray-800 dark:text-white text-sm md:text-base"
          required
        />
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 border rounded dark:bg-gray-800 dark:text-white text-sm md:text-base"
          required
        />
        
        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm md:text-base">
          Login
        </button>
        
        <p onClick={handlePasswordReset} className="text-sm md:text-base text-blue-500 cursor-pointer hover:underline text-center">
          Forgot Password?
        </p>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-glass-dark text-gray-500">or</span>
          </div>
        </div>
        
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full p-3 bg-red-600 text-white rounded hover:bg-red-700 text-sm md:text-base"
        >
          Sign in with Google
        </button>
        
        <p className="mt-4 text-center text-sm md:text-base">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
