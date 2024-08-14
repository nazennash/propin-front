// src/components/SellerDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth';
import { axiosPrivateInstance } from '../apiconfig';

export const SellerDashboard = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [expandedProduct, setExpandedProduct] = useState(null);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetchProducts();
        } else {
            navigate('/login'); // Redirect to login if no user
        }
    }, [user]);

    const fetchProducts = async () => {
        setError('');
        try {
            const response = await axiosPrivateInstance.get('products/products/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            console.log('API Response:', response);
            const data = response.data;

            if (Array.isArray(data.results)) {
                setProducts(data.results);
            } else if (Array.isArray(data)) {
                setProducts(data);
            } else {
                setProducts([]);
                console.error('Unexpected data structure:', data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to load products');
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await axiosPrivateInstance.delete(`products/products/${productId}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
            setError('Failed to delete product');
        }
    };

    const handleEditProduct = (productId) => {
        navigate(`/edit-product/${productId}`);
    };

    const handleLogout = () => {
        logout(); // Call the logout method from your Auth context or hook
    };

    const toggleDescription = (productId) => {
        setExpandedProduct(expandedProduct === productId ? null : productId);
    };

    return (
        <>
            <nav className="flex flex-wrap justify-between items-center bg-gray-800 text-white p-4">
                <h1 className="text-2xl font-bold">Pinacore</h1>
                <div className="mt-2 md:mt-0">
                    {!user ? (
                        <>
                            <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
                                Register
                            </Link>
                            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                Login
                            </Link>
                        </>
                    ) : (
                        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md">
                            Logout
                        </button>
                    )}
                </div>
            </nav>

            <div className="container mx-auto p-5">
                <div className="flex flex-wrap justify-between items-center mb-5">
                    <h1 className="text-2xl md:text-3xl font-bold">Welcome, {user?.username || 'Seller'}!</h1>
                    {user && (
                        <Link to="/add-product" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 md:mt-0">
                            Add New Product
                        </Link>
                    )}
                </div>

                {error ? (
                    <div className="text-red-500 text-center mb-4">{error}</div>
                ) : (
                    <div>
                        {products.length === 0 ? (
                            <div className="text-center text-gray-500">No products found. Add your first product!</div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {products.map(product => (
                                    <div key={product.id} className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-md">
                                        <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                                        <div className="p-4">
                                            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                                            <p className={`text-gray-700 ${expandedProduct === product.id ? '' : 'line-clamp-3'}`}>
                                                {product.description}
                                            </p>
                                            {product.description.length > 100 && (
                                                <button
                                                    onClick={() => toggleDescription(product.id)}
                                                    className="text-blue-500 mt-2 block"
                                                >
                                                    {expandedProduct === product.id ? 'View Less' : 'View More'}
                                                </button>
                                            )}
                                            <div className="mt-4 flex justify-between items-center">
                                                <span className="text-red-500">Kshs. {product.price}</span>
                                                <span className={`font-semibold ${product.is_active ? 'text-green-500' : 'text-red-500'}`}>
                                                    {product.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                            <div className="mt-4 flex justify-between">
                                                <Link
                                                    to={`/product/${product.id}`}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                                                >
                                                    View Details
                                                </Link>
                                                <div>
                                                    <button
                                                        onClick={() => handleEditProduct(product.id)}
                                                        className="bg-green-500 text-white px-3 py-1 rounded-md mr-2"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteProduct(product.id)}
                                                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default SellerDashboard;
