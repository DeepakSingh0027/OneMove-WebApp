import React, { useCallback, useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "./ProductCard";

export default function Products() {
  const { fullname, role, email, setFullName, setARole, setCEmail } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState();

  //Product Card Click
  const handleCardClick = (product) => {
    navigate(`/product-profile/${product}`);
  };

  //load all products
  const getProducts = useCallback(
    async (endpoint) => {
      try {
        const responseData = await axios.get(endpoint, {
          withCredentials: true,
        });
        console.log(responseData);

        if (!responseData.data.success) {
          alert("Failed To Sync Products");
        } else {
          const productsData = responseData.data.data; // Store the data in a variable
          setProducts(productsData);

          // Check if productsData is empty before setting the message
          if (productsData.length === 0) {
            setMessage("No Products Available.");
          }
        }
      } catch (error) {
        console.log(error);
        //alert("Failed To Sync Products");
        //navigate("/login"); // Redirect to login in case of error
      }
    },
    [setFullName, navigate, setARole]
  );

  useEffect(() => {
    getProducts("http://localhost:9000/api/v1/products/get-all-products");
  }, [getProducts]);

  return (
    <div>
      <div className="mt-8 mb-8 text-center text-2xl">{message}</div>
      <div className="mr-8 ml-8 mt-5 mb-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <Card
            key={product._id} // Use unique key for better performance
            index={product._id}
            name={product.title}
            category={product.category_name}
            price={product.price}
            link={product.image}
            onCardClick={() => handleCardClick(product._id)} // Pass product ID
          />
        ))}
      </div>
    </div>
  );
}
