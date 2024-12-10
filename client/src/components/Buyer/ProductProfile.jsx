import axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function productProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
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
        navigate("/Dashboard");
      }
    } catch (error) {
      setMessage("This is a Buyer Account Only");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  //data fetch
  const getData = useCallback(async (endpoint) => {
    try {
      const responseData = await axios.get(endpoint, {
        withCredentials: true,
      });
      console.log(responseData);
      if (!responseData.data.data) {
        setMessage(
          "Couldn't find the Product, will redirecting you to PRODUCTS "
        );
        setTimeout(() => {
          //navigate("/products");
        }, 5000);
      } else {
        setProduct(responseData.data.data);
      }
    } catch (error) {
      setMessage(
        "Couldn't find the Product, will redirecting you to PRODUCTS "
      );
      setTimeout(() => {
        //navigate("/products");
      }, 5000);
    }
  });

  useEffect(() => {
    getData(`http://localhost:9000/api/v1/products/product-profile/${id}`);
  }, [getData]);

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
                    {/*{role.toUpperCase}*/}BUYER
                  </button>
                </li>
                <li className="inline-block mr-5">
                  <Link
                    to="/login"
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
