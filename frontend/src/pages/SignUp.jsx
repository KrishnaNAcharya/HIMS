import React, { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Ensure this path is correct
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      // Attempt to create a new account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set admin status in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        isAdmin: isAdmin
      });

      // Send email verification
      await sendEmailVerification(user);
      setSuccessMessage(
        'A verification email has been sent to your email address. Please verify your email before logging in.'
      );

      // Listen for verification
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          await user.reload();
          if (user.emailVerified) {
            unsubscribe(); // Stop listening for further changes
            navigate('/home'); // Redirect to home
          }
        }
      });
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        // If the account already exists, sign in the user
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          navigate('/home'); // Redirect to home
        } catch (signInError) {
          setError('Failed to sign in. Please check your credentials.');
        }
      } else {
        setError(err.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      navigate('/home'); // Navigate to home
    } catch (err) {
      console.error(err);
      setError('Failed to sign in with Google.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-dark-bg text-gray-800 dark:text-white p-4">
      <form onSubmit={handleSignUp} className="w-full max-w-md p-6 md:p-8 bg-white dark:bg-glass-dark shadow-lg rounded-lg space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Sign Up</h2>
        {error && <p className="text-red-500 text-sm md:text-base mb-4">{error}</p>}
        {successMessage && <p className="text-blue-500 text-sm md:text-base mb-4">{successMessage}</p>}
        
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
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isAdmin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            className="mr-2 h-4 w-4"
          />
          <label htmlFor="isAdmin" className="text-sm md:text-base">Register as Admin</label>
        </div>
        
        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm md:text-base">
          Sign Up
        </button>
        
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
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
