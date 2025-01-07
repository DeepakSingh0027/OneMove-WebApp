import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import CartCard from "./CartCard";

export default function Order() {
  const [orderItems, setOrderItems] = useState([]); // State to hold cart items
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.patch(
        `http://localhost:9000/api/v1/order/cancel-order/${itemId}`,
        {},
        {
          withCredentials: true,
        }
      );
      setMessage("Order Removed");
      setTimeout(() => {
        setMessage("");
      }, 5000);
      navigate(0);
    } catch (error) {
      setError(error.message);
    }
  };

  // Fetch cart items from the backend
  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:9000/api/v1/order/get-order",
          {
            withCredentials: true,
          }
        ); // Assuming the endpoint to get the cart items
        console.log(response);
        setOrderItems(response.data.data); // Set the cart items into state
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderItems();
  }, []);

  if (loading) return <p>Loading orders items...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <h1 className="mt-8 mb-8 text-center text-2xl">Your Orders</h1>
      {orderItems.length === 0 ? (
        <p className="mt-8 mb-1 text-center text-2xl">
          You have No orders till date..
        </p>
      ) : (
        <ul>
          <p className="mt-8 mb-1 text-center text-2xl">{message}</p>
          {orderItems.map((item, index) => (
            <CartCard
              key={item._id} // Use unique key for list rendering
              id={item.product}
              quantity={item.quantity}
              itemId={item._id} // Assuming you want to pass the cart item id
              onRemove={handleRemoveItem} // Pass the remove handler if CartCard needs it
              value={false}
              updates={item.updates}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
