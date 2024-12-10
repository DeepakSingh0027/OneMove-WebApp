import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/userContext";
import axios from "axios";

export default function Header() {
  const { fullname, role, email, setFullName, setARole, setCEmail } =
    useContext(UserContext);
  const navigate = useNavigate();
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
        if (role === "seller") {
          navigate("/products");
        } else {
          navigate("/Dashboard");
        }
      }
    } catch (error) {
      alert(`This is a ${role} account Only`);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
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
          //navigate("/login"); // Redirect to login if the user is not authenticated
        } else {
          setFullName(responseData.data.data.fullname);
          setARole(responseData.data.data.activeRole);
          setCEmail(responseData.data.data.email);
        }
      } catch (error) {
        console.log(error);
        alert("Need to Login First");
        //navigate("/login"); // Redirect to login in case of error
      }
    },
    [navigate, setFullName, setARole, setCEmail]
  );

  useEffect(() => {
    getData("http://localhost:9000/api/v1/users/current-user");
  });

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
    </div>
  );
}
