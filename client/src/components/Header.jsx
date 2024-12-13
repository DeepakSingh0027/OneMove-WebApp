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
      setTimeout(() => {}, 3000);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/users/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      navigate("/login");
    } catch (error) {
      alert("Logout Button not Working");
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
          navigate("/Urequest"); // Redirect to login if the user is not authenticated
        } else {
          setFullName(responseData.data.data.fullname);
          setARole(responseData.data.data.activeRole);
          setCEmail(responseData.data.data.email);
        }
      } catch (error) {
        console.log(error);
        alert("Need to Login First");
        navigate("/Urequest"); // Redirect to login in case of error
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
                <li className="inline-block mr-14">
                  <button
                    onClick={updateARole}
                    type="reset"
                    className="bg-[#5b1414] px-3 py-1 text-[#c99d6b] rounded-lg font-medium relative overflow-hidden transition-all duration-300 hover:bg-[#c99d6b] hover:text-[#5b1414] hover:scale-105 active:scale-95"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#9dced2] to-[#5b1414] opacity-0 hover:opacity-10 transition-opacity"></span>
                    {role.toUpperCase()}
                  </button>
                </li>
                {role === "buyer" && (
                  <li className="inline-block mr-5">
                    <Link
                      to="/products"
                      className="font-mono text-lg text-[#41290c] hover:text-[#000000] pr-12"
                    >
                      <u>Products</u>
                    </Link>
                  </li>
                )}
                <li className="inline-block mr-5">
                  <Link
                    to="/products"
                    className="font-mono text-lg text-[#41290c] hover:text-[#000000] pr-12"
                  >
                    About
                  </Link>
                </li>
                <li className="inline-block mr-5">
                  <Link className="font-mono text-lg text-[#41290c] hover:text-[#000000] pr-12">
                    {fullname}
                  </Link>
                </li>
                {role === "buyer" && (
                  <li className="inline-block mr-5">
                    <Link
                      to="/order"
                      className="font-mono text-lg text-[#41290c] hover:text-[#000000] pr-12"
                    >
                      Orders
                    </Link>
                  </li>
                )}
                <li className="inline-block mr-12">
                  <button
                    onClick={handleLogout}
                    className="bg-[#5b1414] px-3 py-1 text-[#c99d6b] rounded-lg font-medium relative overflow-hidden transition-all duration-300 hover:bg-[#c99d6b] hover:text-[#5b1414] hover:scale-105 active:scale-95"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#9dced2] to-[#5b1414] opacity-0 hover:opacity-10 transition-opacity"></span>
                    Logout
                  </button>
                </li>
              </ul>
              {role === "buyer" && (
                <Link to={"/cart"}>
                  <img
                    src="/images/cart.png"
                    alt="Cart"
                    width={30}
                    height={30}
                    className="inline-block mr-5"
                  />
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}
