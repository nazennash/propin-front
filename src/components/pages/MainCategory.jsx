import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";

export const MainCategory = ({ toggleMobileMenu }) => {
    const [mainCategories, setMainCategories] = useState([]);

    useEffect(() => {
        getMainCategories();
    }, []);

    const getMainCategories = async () => {
        try {
            const url = `https://pinacore-rnlyj.ondigitalocean.app/products/main_category/`;
            const response = await axios.get(url);
            setMainCategories(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error.message);
        }
    };

    return (
        <nav className="bg-white">
            <ul>
                <li className="hidden md:block bg-blue-500 text-white p-3 font-bold rounded-t-lg">
                    All Categories
                </li>
                <div className="max-h-80 overflow-y-auto">
                    {mainCategories.map(({ id, name }) => (
                        <li key={id} className="relative border-b p-3 m-0.5">
                            <NavLink
                                to={`category/${id}/`}
                                onClick={() => toggleMobileMenu()}
                                aria-controls="mobile-menu"
                            >
                                {name}
                            </NavLink>
                        </li>
                    ))}
                </div>
            </ul>
        </nav>
    );
};
