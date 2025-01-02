import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import DemoPage from "./components/Login/Demo";
import LoginPage from "./components/Login/Login";
import Products from "./components/Buyer/Products";
import UserContextProvider from "./context/UserContextProvider";
import ProductProfile from "./components/Buyer/ProductProfile";
import Dashboard from "./components/Seller/Dashboard";
import ListProduct from "./components/Seller/listProduct";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Buyer/Cart";
import Order from "./components/Buyer/Orders";
import PProfile from "./components/Seller/Productprofile2";
import OrderS from "./components/Seller/OrderS";
import Urequest from "./components/URequest";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DemoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/products"
            element={
              <>
                <Header />
                <Products />
                <Footer />
              </>
            }
          />
          <Route
            path="/product-profile/:id"
            element={
              <>
                <Header />
                <ProductProfile />
                <Footer />
              </>
            }
          />
          <Route
            path="/Dashboard"
            element={
              <>
                <Header />
                <Dashboard />
                <Footer />
              </>
            }
          />
          <Route
            path="/listProduct"
            element={
              <>
                <Header />
                <ListProduct />
                <Footer />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <Header />
                <Cart />
                <Footer />
              </>
            }
          />
          <Route
            path="/order"
            element={
              <>
                <Header />
                <Order />
                <Footer />
              </>
            }
          />
          <Route
            path="/orderS"
            element={
              <>
                <Header />
                <OrderS />
                <Footer />
              </>
            }
          />
          <Route
            path="/pprofile/:id"
            element={
              <>
                <Header />
                <PProfile />
                <Footer />
              </>
            }
          />
          <Route path="/Urequest" element={<Urequest />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
