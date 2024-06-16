import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

export const BrowseByCategory = (props) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);

    useEffect(() => {
        getProducts();
    }, [currentPage]);


    const getProducts = async () => {
        try {
            const url = `http://127.0.0.1:8000/products/main_category/?page=${currentPage}`;
            const response = await axios.get(url);
            setProducts(response.data.results);
        } catch (error) {
            console.error('Error fetching products:', error.message);
        }
    };

    const nextPage = () => {
        if (hasNextPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    return (
        <div className="bg-white">
            <div className="mx-auto  px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2><span className="text-2xl font-bold text-gray-900">Products |</span> Don't miss the current offers until the end of August </h2>
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8 m-3 sm:mx-0">
                    {products.map((product, index) => (
                        <div key={index} className="group relative border rounded-lg p-3">
                            <Link to={`/category/${category.id}/`}>
                                <div className="object-cover w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] mx-auto overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="items-center h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div className='align-center'>
                                        <h3 className="text-md text-gray-700 font-bold">
                                            <a href={product.href}>
                                                <span aria-hidden="true" className="" />
                                                {product.name}
                                            </a>
                                        </h3>
                                    </div>
                                </div>
                            </Link>
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
        </div >
    );
};
