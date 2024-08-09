import React, { useState, useEffect } from "react";
import { useAuth } from "./Auth";
import { Products } from "./pages/Products";
import { SlideShow } from "./pages/SlideShow";
import { FirstInfo } from "./pages/FirstInfo";
import { NewArrivals } from "./pages/NewArrivals";
import { MainCategoryList } from "./pages/MainCategoryList";
import { MainCategory } from "./pages/MainCategory";
import { axiosInstance } from '../apiconfig.jsx';
import { NavLink } from "react-router-dom";

export const Index = () => {
  const auth = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNote, setShowNote] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setShowDropdown(true);
    setShowNote(false);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.get(`/products/search/`, {
        params: { search: searchQuery }
      });
      setSearchResults(response.data.results);
      setShowDropdown(true);
      setShowNote(response.data.results.length === 0);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
      setShowDropdown(false);
      setShowNote(true);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit(event);
    }
  };

  return (
    <>
      <div>
        <div className="mx-auto container flex text-center items-center justify-center shadow-sm p-6">
          <div>
            <div className="md:hidden mx-auto">
              <div className="relative mt-2 rounded-md shadow-sm">
                <form onSubmit={handleSearchSubmit} className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="search-item"
                    id="search-item"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Search..."
                  />
                  <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-5-5m0 0l-5 5m5-5V3"></path>
                    </svg>
                  </button>
                </form>
                {showDropdown && (
                  <div className="absolute z-10 mt-1 bg-white rounded-md shadow-lg border border-gray-200 divide-y divide-gray-200">
                    {searchResults.length > 0 ? (
                      searchResults.map((result) => (
                        <NavLink key={result.id} to={`/details/${result.id}`} onClick={() => { setSearchQuery(''); setShowDropdown(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <p className="truncate">{result.name}</p>
                        </NavLink>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-700">{showNote ? 'No results found.' : ''}</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr className="md:hidden" />
        <div className='md:mt-5 border container mx-auto p-5 grid grid-cols-12 gap-5'>
          <div className='md:col-span-4 lg:col-span-3 hidden md:block'>
            <MainCategory />
          </div>
          <div className='col-span-12 md:col-span-8 lg:col-span-9'>
            <SlideShow />
          </div>
          <br />
        </div>
        <div className="hidden md:block">
          <FirstInfo />
        </div>
        <NewArrivals />
        <Products />
        <FirstInfo />
        <MainCategoryList />
        <br />
        <br />
      </div>
    </>
  );
};
