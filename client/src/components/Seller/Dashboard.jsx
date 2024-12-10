import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/userContext";
import axios from "axios";
import Card from "../Buyer/ProductCard";

export default function Dashboard() {
  const { fullname, role, email, setFullName, setARole, setCEmail } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState();

  //load all products
  const getProducts = useCallback(
    async (endpoint) => {
      try {
        const responseData = await axios.get(endpoint, {
          withCredentials: true,
        });
        //console.log(responseData);

        if (!responseData.data.success) {
          alert("Failed To Sync Products");
          //navigate("/login");
        } else {
          setProducts(responseData.data.data);
          if (products.length === 0) {
            //console.log(products);
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
    getProducts("http://localhost:9000/api/v1/users/get-user-products");
  }, [getProducts]);

  return (
    <div>
      <div className="flex items-start justify-center">
        <Link
          to="/listProduct"
          className="mt-8 bg-[#41290c] text-white px-8 py-3 rounded-full hover:bg-[#775021] transition duration-300"
        >
          List Products &#8594;
        </Link>
      </div>

      <div className="mt-7 text-center text-2xl">Your Products</div>
      <div className="text-center text-2xl">{message}</div>
      <div className="mt-5 mb-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((product, index) => {
          <Card
            index={product._id}
            name={product.title}
            category={product.category}
            price={product.price}
            link={product.image}
            onCardClick={handleCardClick}
          ></Card>;
        })}
      </div>
    </div>
  );
}
