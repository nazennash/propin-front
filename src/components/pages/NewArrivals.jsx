import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../components/pages/stores/Cart";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../apiconfig.jsx"; // Import axiosInstance

export const NewArrivals = () => {
  const carts = useSelector((store) => store.cart.items); // Access cart items from Redux store
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [nextPageUrl, setNextPageUrl] = useState(null); // Track next page URL
  const [prevPageUrl, setPrevPageUrl] = useState(null); // Track previous page URL

  useEffect(() => {
    getProducts(currentPage); // Fetch products when page changes
  }, [currentPage]);

  // Fetch new arrivals with pagination
  const getProducts = async (page) => {
    try {
      const response = await axiosInstance.get(
        `/products/products/new_arrivals/`,
        {
          params: { page: page },
        }
      );
      setProducts(response.data.results); // Update products state with paginated results
      setNextPageUrl(response.data.next); // Update next page URL
      setPrevPageUrl(response.data.previous); // Update previous page URL
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  // Handle pagination to the next page
  const nextPage = () => {
    if (nextPageUrl) {
      // Only move to the next page if it exists
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle pagination to the previous page
  const prevPage = () => {
    if (prevPageUrl && currentPage > 1) {
      // Only move to previous page if it exists
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle adding a product to the cart
  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        productId: product.id,
        description: product.description,
        ...product,
        quantity: 1,
      })
    );
  };

  return (
    <div className="bg-white mx-auto container">
      <div className="mx-auto px-4 py-10 sm:px-6 sm:py-24">
        <h2>
          <span className="text-2xl font-bold text-gray-900">
            New Arrivals |
          </span>{" "}
          Don't miss this opportunity
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:gap-x-8 m-3 sm:mx-0">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative border rounded-lg p-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className="bg-blue-500 text-white p-1 rounded-full text-[12px] font-bold text-center flex items-center justify-center"
                    style={{ width: "30px", height: "30px" }}
                  >
                    {product.discount_percentage}%
                  </span>
                  <span className="mt-1 text-sm text-gray-500">
                    {product.color}
                  </span>
                </div>
                <Link to={`/details/${product.id}/`}>
                  <div className="flex justify-center items-center mx-auto overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 h-[150px] mt-2">
                    <img
                      src={product.images[0]} // Assuming the first image is displayed
                      alt={product.name}
                      className="w-full h-40 object-cover overflow-hidden object-center"
                      style={{ maxHeight: "200px" }}
                    />
                  </div>
                </Link>
              </div>
              <div className="mt-4 flex justify-between items-end">
                <div>
                  <h3 className="text-md text-gray-700 font-bold">
                    <Link to={`/details/${product.id}/`}>{product.name}</Link>
                  </h3>
                  <p className="text-sm font-medium text-gray-900">
                    ${product.price}
                  </p>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-500 px-2 py-1 tracking-tight rounded-md text-sm text-white font-semibold sm:hover:text-white"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={prevPage}
            disabled={!prevPageUrl} // Disable if no previous page
            className={`mr-2 px-3 py-1 bg-blue-500 text-white rounded-md ${
              !prevPageUrl ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ArrowLeft />
          </button>
          <button
            onClick={nextPage}
            disabled={!nextPageUrl} // Disable if no next page
            className={`px-3 py-1 bg-blue-500 text-white rounded-md ${
              !nextPageUrl ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
