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
import InsuranceForm from './pages/InsuranceForm';
import FloatingGradient from './pages/FloatingGradient';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-dark-bg text-white min-h-screen font-sans relative">
          <FloatingGradient />
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Hero />
              </ProtectedRoute>
            } />
            <Route path="/home" element={
              <ProtectedRoute>
                <>
                  <Hero />
                  <PlanDetails />
                </>
              </ProtectedRoute>
            } />
            <Route path="/contact" element={
              <ProtectedRoute>
                <ContactPage />
              </ProtectedRoute>
            } />
            <Route path="/about" element={
              <ProtectedRoute>
                <AboutUs />
              </ProtectedRoute>
            } />
            <Route path="/get-quote" element={
              <ProtectedRoute>
                <InsuranceForm />
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