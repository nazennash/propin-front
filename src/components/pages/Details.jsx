import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../../components/pages/stores/Cart";
import gif from "../../assets/thank_you.gif";
import { useAuth } from "../Auth";
import { axiosInstance } from "../../apiconfig.jsx";

export const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const { productId } = useParams(); // Getting the productId from the URL parameters
  const [productData, setProductData] = useState({});
  const dispatch = useDispatch();
  const auth = useAuth();

  useEffect(() => {
    const getProductData = async () => {
      try {
        // Ensure the productId is passed correctly in the API request
        const response = await axiosInstance.get(
          `/products/products/${productId}/`
        );
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error.message);
      }
    };

    // Fetch product data when the component mounts and when productId changes
    if (productId) {
      getProductData();
    }
  }, [productId]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: productData.id,
        description: productData.description,
        ...productData,
        quantity: 1,
      })
    );
  };

  const buyNow = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const phoneNumber = localStorage.getItem("phoneNumber");
      const price = parseInt(productData.discounted_price);

      const response = await axiosInstance.post(
        "/products/payment/",
        {
          price,
          phone_number: phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setShowModal(true);
      } else {
        console.error("Failed to process payment");
      }
    } catch (error) {
      console.error("Error processing payment:", error.message);
    }
  };

  return (
    <div className="container mx-auto lg:p-10">
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Success!</h2>
            <img src={gif} alt="" width={300} />
            <p>Thank you for buying {productData.brand}</p>
            <p>Bridging the digital divide</p>
            <button
              className="mt-4 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="grid lg:grid-cols-10 border grid-cols-2 mt-10">
        <div className="col-span-4 lg:m-auto mx-auto mt-10">
          <img
            // className='w-[100px] h-[100px] lg:w-[300px] lg:h-[300px]'
            src={productData.image}
            alt={productData.name}
            // style={{ objectFit: 'cover' }}
            className="w-full h-[200px] object-cover object-center"
            style={{ maxHeight: "500px" }}
          />
        </div>
        <div className="col-span-5 p-10 border-l">
          <div className="">
            <div className="font-bold text-3xl">{productData.brand}</div>
            <div className="font-bold text-red-500">
              Kshs. {productData.discounted_price}
            </div>
            <br />
            <hr />
            <div className="mt-5 mb-5">
              <p className="font-bold mb-5">Product Description:</p>
              <small>{productData.description}</small>
            </div>
            <hr />
            <br />
            <div className="mb-5">
              <span className="font-bold">Color: </span>
              <span>{productData.color}</span>
            </div>
            <div className="mb-5">
              <span className="font-bold">Size: </span>
              <span>{productData.size}</span>
            </div>
            <div className="flex">
              <span className="font-bold">
                <Heart size={23} color="red" />
              </span>
              <span>- Save for later</span>
            </div>
            <br />
            {auth.user ? (
              <div className="flex text-center">
                <button
                  onClick={buyNow}
                  className="bg-green-700 p-2 rounded-md text-[14px] text-white mr-4"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  className="bg-blue-500 p-2 rounded-md text-[14px] text-white hover:text-blue-800"
                >
                  Add to Cart
                </button>
              </div>
            ) : (
              <div className="text-center text-red-500 mb-2">
                <span>
                  Please{" "}
                  <Link to="/register" className="hover:text-blue-600">
                    login
                  </Link>{" "}
                  to buy now
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};
