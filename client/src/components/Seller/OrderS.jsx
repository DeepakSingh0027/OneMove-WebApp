import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderCard from "./OrderCard";

export default function OrderS({ totalProducts }) {
  const [orderItems, setOrder] = useState([]); // State to hold order items
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors
  const [Earning, setEarning] = useState(0); // State for total earnings

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
        ); // Fetch order items
        setOrder(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderItems();
  }, []); // This runs once when the component mounts

  // Calculate total earnings after orderItems are updated
  useEffect(() => {
    if (orderItems.length > 0) {
      const totalEarnings = orderItems.reduce((total, item) => {
        return total + item.product.price * item.quantity; // Assuming item.product.price is a number
      }, 0);
      setEarning(totalEarnings); // Update the earning state
    }
  }, [orderItems]); // This effect runs when orderItems change

  if (loading) return <p>Loading your orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="bg-[#9e7240] p-6 rounded-lg shadow-xl max-w-md mx-auto mt-8 relative glowing-border">
        <div className="flex justify-between items-center mb-4 border-b-2 border-gray-300 pb-3">
          <p className="text-xl font-semibold text-gray-700 glowing-text">
            Total Products:
          </p>
          <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
        </div>

        <div className="flex justify-between items-center mb-4 border-b-2 border-gray-300 pb-3">
          <p className="text-xl font-semibold text-gray-700 glowing-text">
            Total Orders:
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {orderItems.length}
          </p>
        </div>

        <div className="flex justify-between items-center pt-3">
          <p className="text-xl font-semibold text-gray-700 glowing-text">
            Total Earnings:
          </p>
          <p className="text-2xl font-bold text-green-600">
            &#8377; {Earning.toFixed(2)}
          </p>
        </div>

        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>Keep up the great work!</p>
        </div>
      </div>

      <h1 className="mt-8 mb-8 text-center text-2xl">Your Orders</h1>
      {orderItems.length === 0 ? (
        <p className="text-center">You have no orders yet.</p> // Personalized message
      ) : (
        <ul>
          {orderItems.map((item) => (
            <OrderCard
              key={item._id} // Use unique key for list rendering
              Pid={item.product._id} // Pass the product ID to the child component
              quantity={item.quantity}
              item={item._id} // Pass the order item ID
              name={item.buyer.fullname}
              updates={item.updates}
              id={item._id}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
