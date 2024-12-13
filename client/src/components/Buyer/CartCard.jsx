import React, { useState, useEffect, useCallback } from "react";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";

export default function CartCard({ id, quantity, item, onRemove, value }) {
  const [product, setProduct] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Data fetch function
  const getData = useCallback(async (endpoint) => {
    try {
      const responseData = await axios.get(endpoint, {
        withCredentials: true,
      });
      console.log(responseData.data.data);

      if (!responseData.data.data) {
        setMessage("Couldn't find the Product.");
      } else {
        setProduct(responseData.data.data);
      }
    } catch (error) {
      setMessage("Couldn't find the Product.");
    }
  }, []);

  useEffect(() => {
    getData(`http://localhost:9000/api/v1/products/product-profile/${id}`);
  }, [id]);

  // Handle the removal of the item from the cart
  const handleRemove = () => {
    if (onRemove) {
      console.log(id);

      onRemove(id); // Call the remove handler passed from the parent
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-[25px]">
      <li className="cart-item flex items-center justify-between p-6 bg-[#995634] rounded-xl shadow-md mb-7 mx-20 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-2 hover:border-[#9dced2] hover:ring-2 hover:ring-[#9dced2]">
        {/* Display message if no product found */}
        {message && (
          <div className="mt-8 mb-8 text-center text-2xl">{message}</div>
        )}

        {/* Product Image with 3D Tilt and Zoom */}
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-24 h-24 rounded-lg object-cover mr-6 transform transition-all duration-300 hover:scale-110 hover:rotate-1 hover:shadow-xl cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/product-profile/${product._id}`);
            }}
          />
        ) : (
          <div className="w-24 h-24 bg-gray-300 rounded-lg mr-6" />
        )}

        {/* Product Info */}
        <div
          className="flex-1 transition-all duration-300 hover:translate-x-1 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/product-profile/${product._id}`);
          }}
        >
          <h3 className="text-lg font-semibold text-gray-800 hover:text-gray-900 transition-colors duration-300">
            {product.title}
          </h3>
          <p className="text-sm mt-2">
            Price:
            <span className="font-bold text-[#9dced2]">
              {" "}
              &#8377; {product.price}
            </span>
          </p>
          <p className="text-sm text-[#94a9b1] mt-2">Quantity: {quantity}</p>
        </div>

        {/* Interactive Buttons */}
        {value ? (
          <button
            onClick={handleRemove}
            className="bg-[#5b1414] text-[#c99d6b] px-6 py-3 rounded-lg font-medium relative overflow-hidden transition-all duration-300 hover:bg-[#c99d6b] hover:text-[#5b1414] hover:scale-105 active:scale-95"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#9dced2] to-[#5b1414] opacity-0 hover:opacity-10 transition-opacity"></span>
            Remove
          </button>
        ) : (
          <button className="bg-[#5b1414] text-[#c99d6b] px-6 py-3 rounded-lg font-medium relative overflow-hidden transition-all duration-300 hover:bg-[#c99d6b] hover:text-[#5b1414] hover:scale-105 active:scale-95">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#9dced2] to-[#5b1414] opacity-0 hover:opacity-10 transition-opacity"></span>
            Shipping Details
          </button>
        )}
      </li>
    </div>
  );
}
