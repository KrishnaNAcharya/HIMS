import { useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  signOut, // Add signOut import
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; // Add this import
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();
  const { logout } = useAuth(); // Add this line

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
        setFullName(user.displayName || "");
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  useEffect(() => {
    const root = document.documentElement;
    const darkModeActive = root.classList.contains("dark");
    setIsDarkMode(darkModeActive);
  }, []);

  const saveChanges = () => {
    const user = auth.currentUser;

    if (user) {
      updateProfile(user, { displayName: fullName })
        .then(() => {
          toast.success('Profile updated successfully!');
          setEditMode(false);
        })
        .catch((error) => {
          toast.error('Failed to update profile: ' + error.message);
        });
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success('Password reset email sent! Please check your inbox.');
        setShowForgotPassword(false);
      })
      .catch((error) => {
        toast.error('Error sending password reset email: ' + error.message);
      });
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('Successfully signed out!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign out: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-glass-dark text-gray-800 dark:text-white p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-glass-dark shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 md:p-8 space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <img
                src="/src/assets/pfp.png"
                alt="Profile"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
              />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold mt-2">{fullName || "No Name Set"}</h2>
            <p className="text-sm md:text-base text-gray-500">{email}</p>
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm md:text-base"
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Profile Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm md:text-base font-medium text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={!editMode}
                className="w-full p-3 border rounded-md text-sm md:text-base dark:bg-gray-700"
              />
            </div>
            
            <div>
              <label className="block text-sm md:text-base font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full p-3 border rounded-md text-sm md:text-base dark:bg-gray-700"
              />
            </div>
          </div>

          {/* Action Buttons */}
          {editMode && (
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                onClick={saveChanges}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm md:text-base"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-sm md:text-base"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Additional Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setShowForgotPassword(true)}
              className="text-blue-500 hover:text-blue-700 text-sm md:text-base"
            >
              Reset Password
            </button>
            <button
              onClick={handleSignOut}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm md:text-base"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Password Reset Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Reset Your Password</h3>
            <label className="block text-sm font-medium text-gray-600">Enter your email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600"
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleForgotPassword}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Send Reset Link
              </button>
              <button
                onClick={() => setShowForgotPassword(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
