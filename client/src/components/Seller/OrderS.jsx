import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderCard from "./OrderCard";

export default function OrderS() {
  const [orderItems, setOrder] = useState([]); // State to hold order items
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  // Fetch order items from the backend
  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:9000/api/v1/order/get-order-sold",
          {
            withCredentials: true,
          }
        ); // Assuming the endpoint to get the order items
        console.log(response);
        setOrder(response.data.data);
        console.log(orderItems);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderItems();
  }, []);

  if (loading) return <p>Loading your orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="mt-8 mb-8 text-center text-2xl">Your Orders</h1>
      {orderItems.length === 0 ? (
        <p className="text-center">You have no orders yet.</p> // Personalized message
      ) : (
        <ul>
          {orderItems.map((item, index) => (
            <OrderCard
              key={item._id} // Use unique key for list rendering
              id={item.product._id} // Pass the product ID to the child component
              quantity={item.quantity}
              item={item._id} // Pass the order item ID
              name={item.buyer.fullname}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
