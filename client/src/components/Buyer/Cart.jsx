import React, { useEffect, useState } from "react";
import axios from "axios";
import CartCard from "./CartCard";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]); // State to hold cart items
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [message, setMessage] = useState(""); // Message state to show success/error messages
  const navigate = useNavigate();
  const [address, SetAddress] = useState("");

  const handleCheckout = async () => {
    setShowOrderForm(true);
  };

  // Handle order form submission
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear message before placing the order

    try {
      // Iterate over cart items and place the order
      for (const item of cartItems) {
        const orderData = {
          productID: item.product,
          quantity: item.quantity,
          address: address,
        };

        // Sending the order data to backend
        await axios.post(
          "http://localhost:9000/api/v1/order/list-order",
          orderData,
          {
            withCredentials: true,
          }
        );
      }

      // Once orders are placed, now remove cart items
      await Promise.all(
        cartItems.map(async (item) => {
          await axios.patch(
            `http://localhost:9000/api/v1/cart/remove-item-cart/${item._id}`,
            {},
            {
              withCredentials: true,
            }
          );
        })
      );

      setMessage("Order placed successfully!"); // Show success message
      setTimeout(() => {
        setMessage(""); // Clear message after a delay
      }, 5000);

      navigate(0); // Reload the page after order placement and cart update
    } catch (error) {
      setMessage("Failed to place the order. Please try again."); // Show error message
      console.error("Error placing the order:", error);
    } finally {
      setShowOrderForm(false); // Close the order form after submission
    }
  };

  const handleCancel = () => {
    setShowOrderForm(false);
  };

  // Fetch cart items from the backend
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:9000/api/v1/cart/get-cart",
          {
            withCredentials: true,
          }
        );
        setCartItems(response.data.data); // Set the cart items into state
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Handle the removal of an item from the cart
  const handleRemoveItem = async (itemId) => {
    try {
      await axios.patch(
        `http://localhost:9000/api/v1/cart/remove-item-cart/${itemId}`,
        {},
        {
          withCredentials: true,
        }
      );
      setMessage("Item Removed");
      setTimeout(() => {
        setMessage("");
      }, 5000);
      navigate(0);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading cart items...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="mt-7 text-center text-2xl">{message}</div>
      <h1 className="mt-8 mb-8 text-center text-2xl">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="mt-7 text-center text-2xl">Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <CartCard
              key={item._id}
              id={item.product}
              quantity={item.quantity}
              itemId={item._id}
              onRemove={handleRemoveItem}
              value={true}
              updates={item.updates}
            />
          ))}
        </ul>
      )}
      {showOrderForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-[blanchedalmond] p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <form onSubmit={handleOrderSubmit}>
              <div className="mb-4">
                <label htmlFor="address" className="block font-semibold mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={address}
                  onChange={(e) => SetAddress(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#361707] text-[#c99d6b] font-bold py-2 px-4 rounded-md w-full hover:bg-[#c99d6b] hover:text-[#412608]"
              >
                Submit Order
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-[#5b1414] text-[#c99d6b] font-bold py-2 px-4 rounded-md w-full mt-2 hover:text-[#5b1414] hover:bg-[#c99d6b]"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      {cartItems.length && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleCheckout}
            className="glowing-button bg-[#3f220e] text-white font-bold py-3 px-8 rounded-md"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
