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
      onRemove(item); // Call the remove handler passed from the parent
    }
  };

  return (
    <div>
      <li className="cart-item flex items-center justify-between p-4 bg-[#995634] rounded-lg shadow-md mb-7 ml-20 mr-20">
        {/* Display message if no product found */}
        {message && (
          <div className="mt-8 mb-8 text-center text-2xl">{message}</div>
        )}
        {/* Display product image */}
        {product.image && (
          <img
            src={product.image}
            alt={product.title}
            className="w-20 h-20 rounded-lg object-cover mr-4"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/product-profile/${product._id}`);
            }}
          />
        )}
        <div
          className="flex-1"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/product-profile/${product._id}`);
          }}
        >
          {/* Display product title and details */}
          <h3 className="text-lg font-semibold text-gray-800">
            {product.title}
          </h3>
          <p className="text-sm mt-1">
            Price:{" "}
            <span className="font-bold text-[#9dced2]">${product.price}</span>
          </p>
          <p className="text-sm text-[#94a9b1] mt-1">Quantity: {quantity}</p>
        </div>
        {/* Remove button */}
        {value && (
          <button
            onClick={handleRemove}
            className="bg-[#5b1414] text-[#c99d6b] px-4 py-2 rounded-lg font-medium hover:text-[#5b1414] hover:bg-[#c99d6b] transition duration-300"
          >
            Remove
          </button>
        )}
        {!value && (
          <button className="bg-[#5b1414] text-[#c99d6b] px-4 py-2 rounded-lg font-medium hover:text-[#5b1414] hover:bg-[#c99d6b] transition duration-300">
            Shipping Details
          </button>
        )}
      </li>
    </div>
  );
}
