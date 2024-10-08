import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth';
import { axiosInstance } from '../../apiconfig.jsx';

export const EditProduct = () => {
    const { productId } = useParams();  // Get product ID from the URL
    const [mainCategories, setMainCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [subTypeCategories, setSubTypeCategories] = useState([]);
    const [sizes] = useState([
        { value: "Xtra Large", label: "Xtra Large" },
        { value: "Large", label: "Large" },
        { value: "Medium", label: "Medium" },
        { value: "Small", label: "Small" },
    ]);

    const [mainCategory, setMainCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [subTypeCategory, setSubTypeCategory] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState('');
    const [image, setImage] = useState(null);
    const [brand, setBrand] = useState('');
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        fetchMainCategories();
        fetchProductDetails();
    }, []);

    useEffect(() => {
        if (mainCategory) {
            fetchSubCategories(mainCategory);
        }
    }, [mainCategory]);

    useEffect(() => {
        if (subCategory) {
            fetchSubTypeCategories(subCategory);
        }
    }, [subCategory]);

    const fetchMainCategories = async () => {
        try {
            const response = await axiosInstance.get('/products/main_category/');
            setMainCategories(response.data);
        } catch (err) {
            console.error('Error fetching main categories:', err);
        }
    };

    const fetchSubCategories = async (mainCategoryId) => {
        try {
            const response = await axiosInstance.get(`/products/sub_category/?main_category=${mainCategoryId}`);
            setSubCategories(response.data);
        } catch (err) {
            console.error('Error fetching sub categories:', err);
        }
    };

    const fetchSubTypeCategories = async (subCategoryId) => {
        try {
            const response = await axiosInstance.get(`/products/sub_type_category/?sub_category=${subCategoryId}`);
            setSubTypeCategories(response.data);
        } catch (err) {
            console.error('Error fetching sub type categories:', err);
        }
    };

    const fetchProductDetails = async () => {
        try {
            const response = await axiosInstance.get(`/products/products/${productId}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            const product = response.data;
            setMainCategory(product.main_category);
            setSubCategory(product.sub_category);
            setSubTypeCategory(product.sub_type_category);
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setDiscountedPrice(product.discounted_price);
            setBrand(product.brand);
            setSize(product.size);
            setColor(product.color);
        } catch (err) {
            console.error('Error fetching product details:', err);
            setError('Failed to load product details');
        }
    };

    const handleEditProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        if (!mainCategory || !subCategory || !subTypeCategory || !name || !description || !price || !brand || !size || !color) {
            setError('Please fill in all fields.');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('main_category', mainCategory);
        formData.append('sub_category', subCategory);
        formData.append('sub_type_category', subTypeCategory);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('discounted_price', discountedPrice);
        if (image) {
            formData.append('image', image);  // Only append the image if it's been updated
        }
        formData.append('brand', brand);
        formData.append('size', size);
        formData.append('color', color);

        try {
            await axiosInstance.put(`/products/products/${productId}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            setSuccess(true);
            setTimeout(() => navigate('/seller-dashboard'), 2000);  // Redirect after 2 seconds
        } catch (err) {
            console.error('Error updating product:', err);
            setError('Failed to update product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold mb-5">Edit Product</h1>
            <form onSubmit={handleEditProduct} className="space-y-5">
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Main category</label>
                    <select
                        className="w-full border border-gray-300 p-3 rounded-md"
                        value={mainCategory}
                        onChange={(e) => setMainCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Main Category</option>
                        {mainCategories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Sub category</label>
                    <select
                        className="w-full border border-gray-300 p-3 rounded-md"
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Sub Category</option>
                        {subCategories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Sub type category</label>
                    <select
                        className="w-full border border-gray-300 p-3 rounded-md"
                        value={subTypeCategory}
                        onChange={(e) => setSubTypeCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Sub Type Category</option>
                        {subTypeCategories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Product Name</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-3 rounded-md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Description</label>
                    <textarea
                        className="w-full border border-gray-300 p-3 rounded-md"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Price (Kshs)</label>
                    <input
                        type="number"
                        className="w-full border border-gray-300 p-3 rounded-md"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Discounted Price</label>
                    <input
                        type="number"
                        className="w-full border border-gray-300 p-3 rounded-md"
                        value={discountedPrice}
                        onChange={(e) => setDiscountedPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Product Image</label>
                    <input
                        type="file"
                        className="w-full border border-gray-300 p-3 rounded-md"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Brand</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-3 rounded-md"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Size</label>
                    <select
                        className="w-full border border-gray-300 p-3 rounded-md"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        required
                    >
                        <option value="">Select Size</option>
                        {sizes.map(size => (
                            <option key={size.value} value={size.value}>{size.label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Color</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-3 rounded-md"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="text-red-500">{error}</div>}
                {success && <div className="text-green-500">Product updated successfully!</div>}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update Product'}
                </button>
            </form>
        </div>
    );
};

export default EditProduct;
