import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Urequest() {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/login");
    }, 4000);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div>Unauthorized request! Redirecting to Login Page in {count}...</div>
  );
}
