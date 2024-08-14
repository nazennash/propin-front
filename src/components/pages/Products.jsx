import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../components/pages/stores/Cart';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../apiconfig.jsx'; // Import axiosInstance

export const Products = () => {
    const carts = useSelector(store => store.cart.items);
    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getProducts();
    }, [currentPage]);

    const getProducts = async () => {
        try {
            const response = await axiosInstance.get(`/products/products/`, {
                params: { page: currentPage },
            });
            setProducts(response.data.results);
        } catch (error) {
            console.error('Error fetching products:', error.message);
        }
    };

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart({
            productId: product.id,
            description: product.description,
            ...product,
            quantity: 1,
        }));
    };

    return (
        <div className="bg-white container mx-auto">
            <div className="mx-auto px-4 py-5 sm:px-6 sm:py-15">
                <h2><span className="text-2xl font-bold text-gray-900">Products |</span> Don't miss the current offers until the end of August</h2>
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:gap-x-8 m-3 sm:mx-0">
                    {products.map((product, index) => (
                        <div key={index} className="group relative border rounded-lg p-3 flex flex-col justify-between h-[400px]"> {/* Ensure same card height */}
                            <div>
                                <div className='flex items-center justify-between'>
                                    <span className='bg-blue-500 text-white p-1 rounded-full text-[12px] font-bold text-center flex items-center justify-center'
                                        style={{ width: '30px', height: '30px' }}>
                                        {product.discount_percentage}%
                                    </span>

                                    <span className="mt-1 text-sm text-gray-500">{product.color}</span>
                                </div>
                                <Link to={`/details/${product.id}/`}>
                                    <div className="flex justify-center items-center mx-auto overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 h-[150px] mt-2">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-40 object-cover overflow-hidden object-center"
                                            // className="w-full h-[200px] object-cover object-center"
                                            style={{ maxHeight: '200px' }}
                                        />
                                    </div>
                                </Link>
                            </div>
                            <div className="mt-4 flex justify-between items-end">
                                <div>
                                    <h3 className="text-md text-gray-700 font-bold">
                                        <Link to={`/details/${product.id}/`}>
                                            <span aria-hidden="true" className="" />
                                            {product.name}
                                        </Link>
                                    </h3>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="bg-blue-500 px-2 py-1 tracking-tight rounded-md text-sm text-white font-semibold sm:hover:text-blue-500 mt-1"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='mt-4 flex justify-center'>
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className='mr-2 px-3 py-1 bg-blue-500 text-white rounded-md'
                    >
                        <ArrowLeft />
                    </button>
                    <button
                        onClick={nextPage}
                        className='px-3 py-1 bg-blue-500 text-white rounded-md'
                    >
                        <ArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};
