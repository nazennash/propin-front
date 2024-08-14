import { Route, Routes } from 'react-router-dom';
import { Register } from './components/Register';
import { Index } from './components/Index';
import Navbar from './components/pages/Navbar';
import { PageNotFound } from './components/PageNotFound';
import { AuthProvider } from './components/Auth';
import { Products } from './components/pages/Products';
import { Footer } from './components/pages/Footer';
import Cart from './components/pages/Cart';
import { Category } from './components/pages/Category';
import { Details } from './components/pages/Details';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categoryId" element={<Category />} />
        <Route path="/details/:productId" element={<Details />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
