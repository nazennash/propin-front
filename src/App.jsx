// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SellerDashboard from './components/SellerDashboard';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './Auth';
import EditProduct from './components/EditProduct';
import AddProduct from './components/AddProduct';

const App = () => {
  return (

    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SellerDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:productId" element={<EditProduct />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
