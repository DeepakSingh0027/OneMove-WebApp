import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OrderCard({ name, Pid, quantity, item, updates, id }) {
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [updated, setUpdated] = useState(updates);
  const navigate = useNavigate();

  function validateUpdates(fullname) {
    console.log("Validating fullname:", fullname); // Debugging log
    if (!fullname) {
      return "Updates is required.";
    }

    const regex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    console.log("Regex test result:", regex.test(fullname)); // Debugging log

    if (!regex.test(fullname)) {
      return "Full name should contain only letters and spaces, with no consecutive spaces.";
    }

    return false; // Valid input
  }
  // Update Shipment Handler
  const updateShipment = useCallback(
    async (e) => {
      e.preventDefault();
      if (validateUpdates(updated)) {
        alert(validateUpdates(updated));
        return;
      }

      try {
        const payload = { updates: updated, id };

        // Send the PATCH request to update shipment details
        const response = await axios.patch(
          "http://localhost:9000/api/v1/order/updateShippment",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // Ensures cookies are sent
          }
        );

        // Check response and handle success
        if (response?.status === 200 || response?.status === 201) {
          alert("Shipment details updated successfully!");
        } else {
          alert("Unexpected response from the server. Please try again.");
        }
      } catch (error) {
        // Handle errors and provide feedback to the user
        console.error("Error updating shipment details:", error);
        alert(
          "Failed to update shipment details. Please check your inputs and try again."
        );
      }
    },
    [updated, id] // Dependencies for `useCallback`
  );

  // Fetch Product Data
  const getData = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/v1/products/product-profile/${Pid}`,
        { withCredentials: true }
      );

      if (response.data && response.data.data) {
        setProduct(response.data.data);
      } else {
        setMessage("Couldn't find the Product.");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      setMessage("Couldn't find the Product.");
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  // Navigate to Product Profile
  const handleNavigate = (e) => {
    e.preventDefault();
    navigate(`/pprofile/${product?._id}`);
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
        {product?.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-20 h-20 rounded-lg object-cover mr-4 border-2 border-[#df9949] transition-transform duration-300 hover:scale-105"
            onClick={handleNavigate}
          />
        ) : (
          <div className="w-20 h-20 bg-gray-300 rounded-lg mr-4" />
        )}

        <div className="flex-1 cursor-pointer" onClick={handleNavigate}>
          <h3 className="text-lg font-semibold text-gray-900 hover:text-[#41290c] transition-colors duration-300">
            {product?.title || "Loading..."}
          </h3>
          <p className="text-sm mt-1">
            Price:
            <span className="font-bold text-[#9dced2] ml-1">
              &#8377; {product?.price || "N/A"}
            </span>
          </p>
          <p className="text-sm text-[#94a9b1] mt-1">
            Quantity:
            <span className="font-medium ml-1">{quantity}</span>
          </p>
          {updated !== "Cancelled" && (
            <div className="flex items-center mt-1">
              <p className="text-sm text-gray-800">Buyer:</p>
              <p className="pl-2 text-sm text-[#df9949] font-medium">{name}</p>
            </div>
          )}
        </div>

        <div className="flex mr-12">
          <p className="text-xl font-semibold text-gray-700 pt-1">Earning: </p>
          <p className="font-bold ml-1 text-2xl glowing-text">
            &#8377; {quantity * (product?.price || 0)}
          </p>
        </div>

        {updated !== "Cancelled" && (
          <div>
            <input
              type="text"
              value={updated}
              className="border-2 border-[#df9949] rounded-lg px-4 py-2 w-64 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#c99d6b] focus:border-[#c99d6b] transition-all duration-300"
              placeholder="Update status..."
              onChange={(e) => setUpdated(e.target.value)}
            />

            <button
              className="bg-[#5b1414] text-[#c99d6b] px-6 py-3 rounded-lg font-medium relative overflow-hidden transition-all duration-300 hover:bg-[#c99d6b] hover:text-[#5b1414] hover:scale-105 active:scale-95"
              onClick={updateShipment}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#9dced2] to-[#5b1414] opacity-0 hover:opacity-10 transition-opacity"></span>
              Update Shipping Details
            </button>
          </div>
        )}

        {updated === "Cancelled" && (
          <button className="bg-[#5b1414] text-[#c99d6b] px-6 py-3 rounded-lg font-medium relative overflow-hidden transition-all duration-300 hover:bg-[#c99d6b] hover:text-[#5b1414] hover:scale-105 active:scale-95">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#9dced2] to-[#5b1414] opacity-0 hover:opacity-10 transition-opacity"></span>
            Cancelled
          </button>
        )}
      </li>
    </div>
  );
}
