import axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PProfile() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [message, setMessage] = useState("");

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
                  value={product.quantity}
                  defaultValue="1"
                  className="border-gray-300 border rounded-md p-2 w-20"
                  readOnly
                />
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
