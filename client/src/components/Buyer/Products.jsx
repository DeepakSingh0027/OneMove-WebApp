import React, { useCallback, useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "./ProductCard";

export default function Products() {
  const { fullname, role, email, updateEmail, updateFullname, updateRole } =
    useUser();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState();

  //update ARole
  const updateARole = async () => {
    try {
      const responseData = await axios.patch(
        `http://localhost:9000/api/v1/users/update-role`,
        {}, // Empty object as no data is being sent
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (!responseData) {
        throw "error";
      } else {
        updateRole("Seller");
        navigate("/Dashboard");
      }
    } catch (error) {
      setMessage("This is a Buyer Account Only");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  //Product Card Click
  const handleCardClick = (product) => {
    navigate(`/product-profile/${product}`);
  };

  //load user
  const getData = useCallback(
    async (endpoint) => {
      try {
        const responseData = await axios.get(endpoint, {
          withCredentials: true,
        });
        console.log(responseData);

        if (!responseData.data.success) {
          alert("Failed To Sync");
          navigate("/login"); // Redirect to login if the user is not authenticated
        } else {
          updateFullname(responseData.data.data.fullname);
          updateRole(responseData.data.data.activeRole);
          updateEmail(responseData.data.data.email);
        }
      } catch (error) {
        console.log(error);
        //alert("Need to Login First");
        //navigate("/login"); // Redirect to login in case of error
      }
    },
    [navigate, updateFullname, updateRole, updateEmail]
  );

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
          //navigate("/login");
        } else {
          setProducts(responseData.data.data);
          if (products.length === 0) {
            console.log(products);
            setMessage("No Products Available.");
          }
        }
      } catch (error) {
        console.log(error);
        //alert("Failed To Sync Products");
        //navigate("/login"); // Redirect to login in case of error
      }
    },
    [updateFullname, navigate, updateRole]
  );

  useEffect(() => {
    getData("http://localhost:9000/api/v1/users/current-user");
    getProducts("http://localhost:9000/api/v1/products/get-all-products");
  }, [getData, getProducts]);

  return (
    <div>
      <header className="bg-[url('/images/background2.jpg')] bg-cover bg-center bg-no-repeat ">
        <div className="container mx-auto px-6 max-w-7xl">
          <nav className="flex items-center justify-between py-5 backdrop-blur-sm">
            <div className="logo">
              <img
                src="./images/logo.jpg"
                alt="Logo"
                width={125}
                height={125}
              />
            </div>
            <div className="flex-1 text-right">
              <ul className="inline-block list-none">
                <li className="inline-block mr-5">
                  <button
                    onClick={updateARole}
                    type="reset"
                    className="mr-12 font-mono flex items-center justify-center bg-[blanchedalmond] text-[#4b3412] border border-[#4b3412] h-[35px] w-[70px] cursor-pointer rounded-[3px] transition-colors duration-150 hover:bg-[#4b3412] hover:text-[blanchedalmond] active:opacity-80"
                  >
                    {role.toUpperCase()}
                  </button>
                </li>
                <li className="inline-block mr-5">
                  <Link
                    to="/products"
                    className="font-mono text-lg text-[#41290c] hover:text-[#000000] pr-12"
                  >
                    <u>Products</u>
                  </Link>
                </li>
                <li className="inline-block mr-5">
                  <Link
                    to="/login"
                    className="font-mono text-lg text-[#41290c] hover:text-[#000000] pr-12"
                  >
                    About
                  </Link>
                </li>
                <li className="inline-block mr-5">
                  <Link
                    to="/products"
                    className="font-mono text-lg text-[#41290c] hover:text-[#000000] pr-12"
                  >
                    {fullname}
                  </Link>
                </li>
              </ul>
              <img
                src="/images/cart.png"
                alt="Cart"
                width={30}
                height={30}
                className="inline-block mr-5"
              />
            </div>
          </nav>
        </div>
      </header>
      <div className="text-center text-2xl">{message}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
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
      <footer className="bg-[#1d1010] text-center py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-[#d9b89e] text-2xl font-bold mb-4">
            Thank You For Visiting
            <br />
            ONEMOVE
          </h2>
          <p className="text-[#92552f]">
            OneMove is an Ecommerce Website providing benefits to both Buyer and
            Seller.
          </p>
        </div>
      </footer>
    </div>
  );
}
