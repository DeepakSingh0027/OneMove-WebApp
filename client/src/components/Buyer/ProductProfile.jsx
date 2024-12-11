import axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProductProfile() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [message, setMessage] = useState("");
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    id,
    quantity: 1,
    address: "",
  });

  //Handle Cart
  const handleCart = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        productID: id,
        quantity: orderDetails.quantity,
      };
      await axios.post(
        "http://localhost:9000/api/v1/cart/list-cart",
        orderData,
        {
          withCredentials: true,
        }
      );
      setMessage("Product added to Cart successfully!");
    } catch (error) {
      setMessage("Failed to add Product to Cart.");
    }
  };

  // Data fetch function
  const getData = useCallback(async (endpoint) => {
    try {
      const responseData = await axios.get(endpoint, {
        withCredentials: true,
      });

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

  const handleBuyNow = () => {
    setShowOrderForm(true);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        productID: id,
        quantity: orderDetails.quantity,
        address: orderDetails.address,
      };
      await axios.post(
        "http://localhost:9000/api/v1/order/list-order",
        orderData,
        {
          withCredentials: true,
        }
      );
      setMessage("Order placed successfully!");
      setShowOrderForm(false);
    } catch (error) {
      setMessage("Failed to place order.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setShowOrderForm(false);
  };

  return (
    <div className="mb-7 mt-7">
      <div className="text-center text-2xl text-red-600">{message}</div>
      {product && (
        <main className="container mx-auto mt-8 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-cover h-full rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto object-cover"
              />
              <div className="flex justify-center mt-12">
                <button
                  onClick={handleBuyNow}
                  className="glowing-button bg-[#3f220e] text-white font-bold py-3 px-8 rounded-md"
                >
                  Buy Now
                </button>
              </div>
            </div>

            <div className="rounded-lg p-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {product.title}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                Category:{" "}
                <span className="font-semibold">{product.category_name}</span>
              </p>
              <p className="text-2xl font-bold text-green-600 mb-4">
                &#8377; {product.price}
              </p>

              <p className="text-gray-700 mb-4">{product.description}</p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Specifications:
              </h3>
              <ul className="list-disc pl-5 mb-4">
                {product.specifications?.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>

              <div className="flex items-center mb-4">
                <label htmlFor="quantity" className="mr-2 font-semibold">
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max={product.quantity || 100}
                  defaultValue="1"
                  onChange={handleInputChange}
                  className="border-gray-300 border rounded-md p-2 w-20"
                />
              </div>

              <button
                onClick={handleCart}
                className="bg-[#361707] text-white font-bold py-2 px-4 rounded-md hover:bg-[#c99d6b] hover:text-[#412608] transition-all"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </main>
      )}

      {showOrderForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-[blanchedalmond] p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <form onSubmit={handleOrderSubmit}>
              <div className="mb-4">
                <label htmlFor="quantity" className="block font-semibold mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={orderDetails.quantity}
                  onChange={handleInputChange}
                  min="1"
                  max={product.quantity || 100}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block font-semibold mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={orderDetails.address}
                  onChange={handleInputChange}
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
    </div>
  );
}
