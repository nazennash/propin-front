import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../components/pages/stores/Cart';
import { Link } from 'react-router-dom';

export const NewArrivals = (props) => {
    const carts = useSelector(store => store.cart.items);
    console.log(carts)
    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getProducts();
    }, [currentPage]);

    const getProducts = async () => {
        try {
            const url = `https://pinacore-rnlyj.ondigitalocean.app/products/products/new_arrivals/?page=${currentPage}`;
            const response = await axios.get(url);
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
        <div className="bg-white mx-auto container">
            <div className="mx-auto  px-4 py-10 sm:px-6 sm:py-24">
                <h2><span className="text-2xl font-bold text-gray-900">New Arrivals |</span> Don't miss this opporunity </h2>
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:gap-x-8 m-3 sm:mx-0">
                    {products.map((product, index) => (
                        <div key={index} className="group relative border rounded-lg p-3">
                            <div className='flex items-center justify-between'>
                                <span className='bg-blue-500 text-white p-1 rounded-full text-[12px] font-bold text-center flex items-center justify-center'
                                    style={{ width: '30px', height: '30px' }}>
                                    {product.discount_percentage}%
                                </span>

                                <span className="mt-1 text-sm text-gray-500">{product.color}</span>
                            </div>
                            <Link
                                to={`/details/${product.id}/`}>
                                <div className="object-cover w-[120px] h-[120px] md:w-[150px] md:h-[150px] xl:w-[200px] xl:h-[200px] mx-auto overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="items-center h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                            </Link>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-md text-gray-700 font-bold">
                                        <Link to={`/details/${product.id}/`}>
                                            <span aria-hidden="true" className="" />
                                            {product.name}
                                        </Link>
                                    </h3>
                                    <button onClick={() => handleAddToCart(product)} className="bg-blue-500 px-2 py-1 tracking-tight rounded-md mt-1 text-sm text-white font-semibold sm:hover:text-blue-500">Add to Cart</button>
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
