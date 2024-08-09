import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { axiosInstance } from "../../apiconfig.jsx"; // Import axiosInstance

export const MainCategory = ({ toggleMobileMenu }) => {
    const [mainCategories, setMainCategories] = useState([]);

    useEffect(() => {
        getMainCategories();
    }, []);

    const getMainCategories = async () => {
        try {
            const response = await axiosInstance.get("/products/main_category/");
            setMainCategories(response.data);
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
