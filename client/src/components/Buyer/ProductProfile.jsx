import axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [message, setMessage] = useState("");

  // Data fetch function
  const getData = useCallback(
    async (endpoint) => {
      try {
        const responseData = await axios.get(endpoint, {
          withCredentials: true,
        });

        if (!responseData.data.data) {
          setMessage("Couldn't find the Product, redirecting you to PRODUCTS");
          setTimeout(() => {
            navigate("/products");
          }, 5000);
        } else {
          setProduct(responseData.data.data);
        }
      } catch (error) {
        setMessage("Couldn't find the Product, redirecting you to PRODUCTS");
        setTimeout(() => {
          navigate("/products");
        }, 5000);
      }
    },
    [navigate]
  );

  useEffect(() => {
    getData(`http://localhost:9000/api/v1/products/product-profile/${id}`);
  }, [id]);

  return (
    <div className="mb-7 mt-7">
      <div className="text-center text-2xl text-red-600">{message}</div>
      {product && (
        <main className="container mx-auto mt-8 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="bg-cover h-full bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto object-cover"
              />
              <div class="flex justify-center mt-12">
                <button class="glowing-button bg-[#3f220e] text-white font-bold py-3 px-8 rounded-md">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-lg shadow-lg p-6">
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

              {/* Product Description */}
              <p className="text-gray-700 mb-4">{product.description}</p>

              {/* Product Specifications */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Specifications:
              </h3>
              <ul className="list-disc pl-5 mb-4">
                {product.specifications?.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>

              {/* Quantity and Add to Cart */}
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
                  className="border-gray-300 border rounded-md p-2 w-20"
                />
              </div>

              <button className="bg-[#361707] text-white font-bold py-2 px-4 rounded-md hover:bg-[#c99d6b] hover:text-[#412608] transition-all">
                Add to Cart
              </button>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
