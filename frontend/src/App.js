import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Homepage from './components/Homepage.js'; 
import Dashboard from './components/Dashboard.js'; 
import NewOrderPage from './components/NewOrderPage.js'; 
import SigninPage from './components/SigninPage.js'; 
import TrackingPage from './components/TrackingPage.js'; 
import CheckoutPage from './components/CheckoutPage.js';
import SignupForm from './components/SignupForm.js'; 
import ContactUs from './components/ContactUs.js';
import Footer from './components/Footer.js';

function App() {
  return (
    <Router>
      <div className="background">
        
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-order" element={<NewOrderPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
