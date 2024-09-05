import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../apiconfig.jsx"; // Importing axiosInstance

export const MainCategoryList = () => {
  const [category, setMainCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null); // To store next page URL
  const [prevPageUrl, setPrevPageUrl] = useState(null); // To store previous page URL

  useEffect(() => {
    getMainCategory(currentPage);
  }, [currentPage]);

  const getMainCategory = async (page) => {
    try {
      const response = await axiosInstance.get(
        `/products/main_category/?page=${page}`
      ); // Add page param for pagination
      setMainCategory(response.data.results); // Access 'results' from the paginated response
      setNextPageUrl(response.data.next); // Store the next page URL
      setPrevPageUrl(response.data.previous); // Store the previous page URL
    } catch (error) {
      console.error("Error fetching category:", error.message);
    }
  };

  const nextPage = () => {
    if (nextPageUrl) {
      // Only move to next page if a next page exists
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (prevPageUrl && currentPage > 1) {
      // Only move to previous page if it exists and we're not on the first page
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-white container mx-auto">
      <div className="mx-auto px-4 py-10 sm:px-6 sm:py-15">
        <h2>
          <span className="text-2xl font-bold text-gray-900">Category |</span>{" "}
          Don't miss this opportunity at a special discount Up
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:gap-x-8 m-3 sm:mx-0">
          {category.map((category) => (
            <div
              key={category.id}
              className="group relative border rounded-lg p-3"
            >
              <Link to={`/category/${category.id}/`}>
                <div className="object-cover w-[120px] h-[120px] md:w-[150px] md:h-[150px] xl:w-[200px] xl:h-[200px] mx-auto overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-40 object-cover overflow-hidden object-center"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-md text-gray-700 font-bold">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevPage}
            disabled={!prevPageUrl} // Disable button if there's no previous page
            className={`flex items-center text-gray-600 px-4 py-2 border rounded ${
              !prevPageUrl ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ArrowLeft className="mr-2" /> Previous
          </button>
          <button
            onClick={nextPage}
            disabled={!nextPageUrl} // Disable button if there's no next page
            className={`flex items-center text-gray-600 px-4 py-2 border rounded ${
              !nextPageUrl ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next <ArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};
