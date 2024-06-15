import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';

export const MainCategoryList = () => {
    const [category, setMainCategory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getMainCategory();
    }, []);

    const getMainCategory = async () => {
        try {
            const url = `http://127.0.0.1:8000/products/main_category/`;
            const response = await axios.get(url);
            setMainCategory(response.data);
        } catch (error) {
            console.error('Error fetching category:', error.message);
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

    return (
        < div className="bg-white container mx-auto" >
            <div className="mx-auto px-4 py-10 sm:px-6 sm:py-15 ">
                <h2><span className="text-2xl font-bold text-gray-900">Category |</span> Don't miss this opportunity at a special discount Up </h2>
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:gap-x-8 m-3 sm:mx-0">
                    {category.map((category, index) => (
                        <div key={index} className="group relative border rounded-lg p-3">
                            <div className="object-cover w-[150px] h-[150px] xl:w-[200px] xl:h-[200px] mx-auto overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="items-center h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-md text-gray-700 font-bold">
                                        <a href={category.href}>
                                            <span aria-hidden="true" className="" />
                                            {category.name}
                                        </a>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div >
    );
};
