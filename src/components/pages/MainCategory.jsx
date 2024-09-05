import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { axiosInstance } from "../../apiconfig.jsx"; // Import axiosInstance

export const MainCategory = ({ toggleMobileMenu }) => {
  const [mainCategories, setMainCategories] = useState([]);

  useEffect(() => {
    getMainCategories();
  }, []);

  const getMainCategories = async () => {
    try {
      const response = await axiosInstance.get("/products/main_category/");
      setMainCategories(response.data.results); // Access 'results' from paginated response
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
          {mainCategories.map(({ id, name, image }) => (
            <li key={id} className="relative border-b p-3 m-0.5">
              <NavLink
                to={`category/${id}/`}
                onClick={() => toggleMobileMenu()}
                aria-controls="mobile-menu"
              >
                {/* <img
                  src={image}
                  alt={name}
                  className="w-10 h-10 mr-2 inline-block"
                /> */}
                {name}
              </NavLink>
            </li>
          ))}
        </div>
      </ul>
    </nav>
  );
};
