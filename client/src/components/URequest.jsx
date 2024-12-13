import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Urequest() {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const handleUR = async () => {
    for (let index = 3; index >= 0; index--) {
      setTimeout(() => {
        setCount(index);
      }, 1000);
    }
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  useEffect(() => {
    handleUR();
  }, []);

  return (
    <div>Unauthorized request! Redirecting to Login Page in {count}...</div>
  );
}
