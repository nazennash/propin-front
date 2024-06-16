import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth";
import axios from "axios";
import { MainCategory } from "./MainCategory";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No token found");
        return;
      }

      localStorage.removeItem("authToken");
      localStorage.clear();

      await axios.post("http://127.0.0.1:8000/users/logout/", {}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      auth.logout();

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div>
      <nav className="shadow-md bg-gray-50">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between relative">
            <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#24C6DC] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600"
                aria-controls="mobile-menu"
                aria-expanded={mobileMenuOpen}
              >
                <span className="absolute -inset-0.5"></span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex items-center justify-center md:items-stretch md:justify-start px-10 md:p-0">
              <NavLink to="/" className="flex flex-shrink-0 items-center">
                <span className="ml-3 text-[22px] font-bold text-gray-800">
                  Pinacore
                </span>
              </NavLink>
            </div>

            {!auth.user ? (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <NavLink
                  to="/register"
                  className="block px-4 py-2 text-sm text-gray-600"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-2"
                >
                  Login
                </NavLink>
              </div>
            ) : (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-600"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-2"
                >
                  Logout
                </button>
              </div>
            )}
            <div className="hidden md:ml-6 md:block">
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type="text"
                  name="search-item"
                  id="search-item"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`} id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <MainCategory toggleMobileMenu={toggleMobileMenu} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
