import { useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; // Add this import

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
          alert("Your profile has been updated.");
          setEditMode(false);
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          alert("Failed to update profile. Please try again.");
        });
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent! Check your inbox.");
        setShowForgotPassword(false);
      })
      .catch((error) => {
        console.error("Error sending password reset email:", error);
        alert("Error sending password reset email. Please try again.");
      });
  };

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Failed to sign out. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-glass-dark text-gray-800 dark:text-white transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-glass-dark shadow-lg rounded-lg p-8">
        <div className="flex flex-col items-center mb-6">
          {/* Avatar Section */}
          <div className="relative mb-4">
            <img
              src="/src/assets/pfp.png"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
            />
          </div>
          {/* User Name and Email */}
          <h2 className="text-2xl font-semibold mt-4">{fullName || "No Name Set"}</h2>
          <p className="text-sm text-gray-500">{email}</p>
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Profile Form */}
        <div className="mt-6 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={!editMode}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Actions */}
        {editMode && (
          <div className="mt-6 flex justify-between">
            <button
              onClick={saveChanges}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Forgot Password Link */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowForgotPassword(true)}
            className="text-blue-500 hover:text-blue-700"
          >
            Forgot Password?
          </button>
        </div>

        {/* Add Sign Out Button - place before the last closing div */}
        <div className="mt-6 text-center">
          <button
            onClick={handleSignOut}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-96">
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
