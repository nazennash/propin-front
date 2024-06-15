import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const MainCategory = () => {
    const [mainCategories, setMainCategories] = useState([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Initialize with false

    useEffect(() => {
        getMainCategories();
    }, []);

    const getMainCategories = async () => {
        try {
            const url = `http://127.0.0.1:8000/products/main_category/`;
            const response = await axios.get(url);
            setMainCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };

    const handleCategoryClick = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        // setMobileMenuOpen(false);
    };

    return (
        <div className="bg-white">
            <ul>
                <li className='hidden md:block bg-blue-500 text-white p-3 font-bold rounded-t-lg'>
                    All Categories
                </li>
                <div className='max-h-80 overflow-y-auto'>
                    {mainCategories.map((category, index) => (
                        <li key={index} className="relative border-b p-3 m-0.5">
                            <Link
                                to={`/category/${category.id}/`}
                                onClick={handleCategoryClick}
                                aria-controls="mobile-menu"
                                aria-expanded={mobileMenuOpen}
                            >
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </div>
            </ul>
        </div>
    );
};
