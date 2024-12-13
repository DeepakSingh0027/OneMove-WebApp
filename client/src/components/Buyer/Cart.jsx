// Import necessary libraries and modules
import React, { useEffect, useState } from "react";
import axios from "axios";
import CartCard from "./CartCard";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]); // State to hold cart items
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors
  const [Message, setMessage] = useState("");
  const navigate = useNavigate();

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
        ); // Assuming the endpoint to get the cart items
        console.log(response);
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
      ); // Assuming the endpoint to delete a cart item
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
      <div className="mt-7 text-center text-2xl">{Message}</div>
      <h1 className="mt-8 mb-8 text-center text-2xl">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="mt-7 text-center text-2xl">Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <CartCard
              key={item._id} // Use unique key for list rendering
              id={item.product}
              quantity={item.quantity}
              itemId={item._id} // Assuming you want to pass the cart item id
              onRemove={handleRemoveItem} // Pass the remove handler if CartCard needs it
              value={true}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
