import axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ProductProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [message, setMessage] = useState();

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
      <div className="text-center text-2xl">{message}</div>
    </div>
  );
}
