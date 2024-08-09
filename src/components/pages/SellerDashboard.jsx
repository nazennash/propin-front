import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth';
import { axiosInstance } from '../../apiconfig.jsx';

export const SellerDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth?.user) {
            fetchProducts();
        }
    }, [auth?.user]);

    const fetchProducts = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axiosInstance.get('products/products/', {
                params: { seller: auth?.user },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            console.log('API Response:', response);
            const data = response.data;

            if (Array.isArray(data.results)) { // Check if the products are in the `results` array
                setProducts(data.results);
            } else if (Array.isArray(data)) { // Check if the products are directly in the `data`
                setProducts(data);
            } else {
                setProducts([]);
                console.error('Unexpected data structure:', data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await axiosInstance.delete(`products/products/${productId}/`, {
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
        auth.logout();
    };

    return (
        <div className="container mx-auto p-5">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-3xl font-bold">Welcome, {auth?.user || 'Seller'}!</h1>
                <div>
                    <Link to="/add-product" className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4">
                        Add New Product
                    </Link>
                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md">
                        Logout
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : error ? (
                <div className="text-red-500 text-center">{error}</div>
            ) : (
                <div>
                    {products.length === 0 ? (
                        <div className="text-center text-gray-500">No products found. Add your first product!</div>
                    ) : (
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2">Image</th>
                                    <th className="py-2">Name</th>
                                    <th className="py-2">Description</th>
                                    <th className="py-2">Price</th>
                                    <th className="py-2">Status</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id} className="text-center border-b">
                                        <td className="py-2">
                                            <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-md mx-auto" />
                                        </td>
                                        <td className="py-2">{product.name}</td>
                                        <td className="py-2">{product.description}</td>
                                        <td className="py-2 text-red-500">Kshs. {product.price}</td>
                                        <td className={`py-2 font-semibold ${product.is_active ? 'text-green-500' : 'text-red-500'}`}>
                                            {product.is_active ? 'Active' : 'Inactive'}
                                        </td>
                                        <td className="py-2">
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
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};

export default SellerDashboard;
