import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const MainCategory = () => {
    const [category, setMainCategory] = useState([]);

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

    return (
        <div className="bg-white">
            {category.map((category, index) => (
                <div key={index} className="relative border-b  p-3 m-0.5">
                    <a href="">{category.name}</a>
                </div>
            ))}
        </div>
    );
};
