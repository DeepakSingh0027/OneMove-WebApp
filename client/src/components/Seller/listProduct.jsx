import React from "react";
import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

export default function ListProduct() {
  const { role, setARole } = useContext(UserContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState();

  return <div></div>;
}
