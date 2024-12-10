import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import DemoPage from "./components/Login/Demo";
import LoginPage from "./components/Login/Login";
import Products from "./components/Buyer/Products";
import { UserProvider } from "./context/userContext";
import productProfile from "./components/Buyer/ProductProfile";
import Dashboard from "./components/Seller/Dashboard";

function App() {
  const [fullname, setFullname] = useState("");
  const [role, setRole] = useState("buyer");
  const [email, setEmail] = useState("");

  const updateFullname = (newFullname) => {
    setFullname((prev) => newFullname);
  };

  const updateRole = (newRole) => {
    setRole((prev) => newRole);
  };

  const updateEmail = (newEmail) => {
    setEmail((prev) => newEmail);
  };

  return (
    <UserProvider
      value={{
        fullname,
        role,
        email,
        updateFullname,
        updateRole,
        updateEmail,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<DemoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product-profile/:id" element={<productProfile />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
