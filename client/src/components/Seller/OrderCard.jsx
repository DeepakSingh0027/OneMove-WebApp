import React, { useState, useEffect, useCallback } from "react";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";

export default function OrderCard({ name, id, quantity, item }) {
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
      //alert("Yo");
      setMessage("Couldn't find the Product.");
    }
  }, []);

  useEffect(() => {
    console.log(id);

    getData(`http://localhost:9000/api/v1/products/product-profile/${id}`);
  }, [id]);

  // Navigate to product profile page
  const handleNavigate = (e) => {
    e.preventDefault();
    navigate(`/pprofile/${product._id}`);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-[25px]">
      <li className="cart-item flex items-center justify-between p-5 bg-[#995634] rounded-lg shadow-md mb-7 mx-20 hover:shadow-xl transition-shadow duration-300">
        {/* Display message if no product found */}
        {message && (
          <div className="mt-8 mb-8 text-center text-2xl text-gray-800">
            {message}
          </div>
        )}

        {/* Display product image */}
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-20 h-20 rounded-lg object-cover mr-4 border-2 border-[#df9949] transition-transform duration-300 hover:scale-105"
            onClick={handleNavigate}
          />
        ) : (
          <div className="w-20 h-20 bg-gray-300 rounded-lg mr-4" /> // Fallback if no image
        )}

        <div className="flex-1 cursor-pointer" onClick={handleNavigate}>
          {/* Product title and details */}
          <h3 className="text-lg font-semibold text-gray-900 hover:text-[#41290c] transition-colors duration-300">
            {product.title}
          </h3>
          <p className="text-sm mt-1">
            Price:
            <span className="font-bold text-[#9dced2] ml-1">
              &#8377; {product.price}
            </span>
          </p>
          <p className="text-sm text-[#94a9b1] mt-1">
            Quantity:
            <span className="font-medium ml-1">{quantity}</span>
          </p>
          <div className="flex items-center mt-1">
            <p className="text-sm text-gray-800">Buyer:</p>
            <p className="pl-2 text-sm text-[#df9949] font-medium">{name}</p>
          </div>
        </div>

        <div className="flex mr-12">
          <p className="text-xl font-semibold text-gray-700 pt-1">Earning: </p>
          <p className="font-bold ml-1 text-2xl glowing-text">
            &#8377; {quantity * product.price}
          </p>
        </div>

        {/* Update Shipping Details button */}
        <button className="bg-[#5b1414] text-[#c99d6b] px-6 py-3 rounded-lg font-medium relative overflow-hidden transition-all duration-300 hover:bg-[#c99d6b] hover:text-[#5b1414] hover:scale-105 active:scale-95">
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#9dced2] to-[#5b1414] opacity-0 hover:opacity-10 transition-opacity"></span>
          Update Shipping Details
        </button>
      </li>
    </div>
  );
}
