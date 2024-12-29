// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './pages/Header';
import Hero from './pages/Hero';
import PlanDetails from './pages/PlanDetails';
import ContactPage from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Footer from './pages/Footer';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import InsuranceFormStep1 from './pages/InsuranceFormStep1';
import InsuranceFormStep2 from './pages/InsuranceFormStep2';
import InsuranceFormStep3 from './pages/InsuranceFormStep3';
import FloatingGradient from './pages/FloatingGradient';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import InsuranceFormContainer from './pages/InsuranceFormContainer'; // Import InsuranceFormContainer
import Success from './pages/Success'; // Import Success
import PaymentPage from './pages/PaymentPage'; // Add import
import Profile from './pages/Profile';
import AdminPanel from './components/AdminPanel'; // Import AdminPanel
import { Toaster } from 'react-hot-toast'; // Import Toaster

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-dark-bg text-white min-h-screen font-sans relative">
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
          <FloatingGradient />
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <PlanDetails />
              </>
            } /> {/* Public access */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path = "/profile" element={<Profile/>}/>
            <Route path="/about" element={<AboutUs />} /> {/* Public access */}
            <Route path="/" element={<PlanDetails />} />
            <Route path="/insurance-form" element={<InsuranceFormContainer />} />
            <Route path="/contact" element={<ContactPage />} /> {/* Public access */}
            <Route path="/home" element={
              <ProtectedRoute>
                <>
                  <Hero />
                  <PlanDetails />
                </>
              </ProtectedRoute>
            } />
            <Route path="/get-quote" element={
              <ProtectedRoute>
                <InsuranceFormContainer />
              </ProtectedRoute>
            } />
            <Route path="/success" element={
              <ProtectedRoute>
                <Success />
              </ProtectedRoute>
            } />
            <Route path="/payment" element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;