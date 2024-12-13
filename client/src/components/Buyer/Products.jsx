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
        alert("Failed To Sync Products");
        navigate("/login"); // Redirect to login in case of error
      }
    },
    [setFullName, navigate, setARole]
  );

  useEffect(() => {
    getProducts("http://localhost:9000/api/v1/products/get-all-products");
  }, [getProducts]);

  return (
    <div>
      <div className="mt-8 mb-1 text-center text-2xl">
        Welcome To OneMove an Ecommerce Site.
      </div>
      <section className="offer">
        {/* Limited Time Offer Announcement */}
        <div className="bg-[#5b1414] text-[#f0e7d8] py-2 mb-5">
          <h2 className="text-center text-2xl font-bold animate-marquee whitespace-nowrap">
            Limited Time Offer - Only 24 Hours Left! Grab it Before it's Gone!
            🚀
          </h2>
        </div>

        <div className="max-w-[1200px] mx-auto px-[20px]">
          <div className="flex flex-wrap items-center">
            {/* Image Section */}
            <div className="w-full md:w-1/2 mb-8 pr-5 md:mb-0">
              <div className="relative group">
                <img
                  src="/images/product- (13).png"
                  alt="PS4 Controller"
                  width={500}
                  height={500}
                  className="w-full h-full object-contain rounded-xl pr-7 group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 ease-in-out"
                />
              </div>
            </div>

            {/* Text Section */}
            <div className="w-full md:w-1/2">
              <h2 className="text-5xl font-extrabold mb-4 text-[#41290c] group-hover:tracking-wider transition-all duration-300">
                Sony PS4 Controller
              </h2>
              <p className="text-base text-[#5b1414] mb-4">
                The most popular controller in 2021, with ergonomic design,
                artificial leather at the grip, anti-sweat and anti-skid, L1 and
                R1 buttons, and more features.
              </p>
              <p className="mb-6 text-[#5b1414]">
                <span className="text-xl line-through text-[#bf695b]">
                  &#8377; 22,999
                </span>
                <br />
                <span className="text-3xl font-bold text-[#41290c]">
                  &#8377; 12,999
                </span>
              </p>
              <Link
                to="/products"
                className="bg-[#41290c] text-white px-8 py-3 rounded-full shadow-lg transform hover:scale-105 hover:shadow-xl hover:bg-[#775021] transition-all duration-500 ease-in-out"
              >
                Buy Now &#8594;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="max-w-[1080px] mx-auto px-6 sm:px-12">
          <h2 className="text-3xl font-bold text-center mb-8 ">
            Exclusive Categories
          </h2>
          <div className="flex flex-wrap -mx-4">
            {["Fashion", "Beauty", "Technology"].map((category, i) => (
              <div key={i} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8 group">
                <div className="overflow-hidden rounded-lg shadow-md bg-white">
                  <img
                    src={`/images/categories-${i + 1}.jpg`}
                    alt={`Category ${i + 1}`}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mt-4 text-gray-700 group-hover:text-[#51372a] transition-colors">
                  {category}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-[25px]">
        <div className="text-3xl font-bold text-center mb-8 pb-5">
          Exclusive Products
        </div>
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
      <section className="mt-56">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-8">Famous Brands</h2>
          <div className="flex flex-wrap justify-around">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-32 h-32 mb-8">
                <img
                  src={`/images/logo (${i}).png`}
                  alt={`Brand ${i}`}
                  width={160}
                  height={100}
                  className="w-full h-full object-contain hover:transform hover:-translate-y-1 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
