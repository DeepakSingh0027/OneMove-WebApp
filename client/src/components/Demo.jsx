import React from "react";
import { Link } from "react-router-dom";
import Card from "./ProductCard";

function DemoPage() {
  return (
    <div className="m-0 p-0 box-border bg-gradient-radial from-blanchedalmond to-[#d9b89e]">
      <header className="bg-[url('/images/background2.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="container mx-auto px-6 max-w-7xl">
          <nav className="flex items-center justify-between py-5">
            <div className="logo">
              <img
                src="./images/logo.jpg"
                alt="Logo"
                width={125}
                height={125}
              />
            </div>
            <ul className="flex space-x-5 text-right pr-20">
              <li>
                <Link
                  to="/"
                  className="font-mono text-lg text-[#41290c] hover:text-[#88f87b] pr-20"
                >
                  <u>Home</u>
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="font-mono text-lg text-[#41290c] hover:text-[#8f887b] pr-20"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="font-mono text-lg text-[#41290c] hover:text-[#8f887b] pr-20"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="font-mono text-lg text-[#41290c] hover:text-[#8f887b] pr-20"
                >
                  Login
                </Link>
              </li>
            </ul>
            <img
              src="/images/cart.png"
              alt="Cart"
              width={30}
              height={30}
              className="cart"
            />
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-12 max-w-7xl">
          <div className="flex flex-wrap items-center justify-around">
            <div className="w-full md:w-1/2">
              <h1 className="text-amber-950 text-5xl font-bold leading-tight mb-6">
                Get UpToDate with
                <br />
                Upcoming Fashion Trends
              </h1>
              <p className="text-gray-600 mb-8">
                Style is something each of us already has, all we need to do is
                find it.
              </p>
              <Link
                to="/login"
                className="bg-[#41290c] text-white px-8 py-3 rounded-full hover:bg-[#775021] transition duration-300"
              >
                Latest Trends &#8594;
              </Link>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <img
                src="/images/model1.png"
                alt="Model"
                className="max-w-full px-0 py-12 pl-[150px]"
                width={500}
                height={500}
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-4">
          <div className="max-w-[1080px] mx-auto px-[25px]">
            <div className="flex flex-wrap -mx-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-full sm:w-1/3 px-4 mb-4">
                  <img
                    src={`/images/categories-${i}.jpg`}
                    alt={`Category ${i}`}
                    width={400}
                    height={300}
                    className="w-full h-full object-contain hover:transform hover:-translate-y-1 transition duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-8">
          <div className="max-w-[1080px] mx-auto px-[25px]">
            <h2 className="text-center mx-auto mb-20 relative leading-[60px] text-[#41290c] text-2xl font-bold after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-20 after:h-1 after:bg-[#41290c] after:rounded-md">
              Featured Products and Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  name: "Apple MacBook Air",
                  category: "Electronics",
                  price: "62,990",
                },
                {
                  name: "Nike Air Jordans",
                  category: "Fashion",
                  price: "25,999",
                },
                {
                  name: "DSLR Camera",
                  category: "Electronics",
                  price: "35,999",
                },
                { name: "Perfumes", category: "Beauty", price: "3,999" },
              ].map((product, index) => (
                <div
                  key={index}
                  className="w-full object-contain hover:transform hover:-translate-y-1 transition duration-300"
                >
                  <img
                    src={`/images/product- (${index + 1}).jpg`}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full mb-1"
                  />
                  <h4 className="text-lg font-semibold">{product.name}</h4>
                  <p className="text-gray-600 ">Category:{product.category}</p>
                  <p className="text-gray-800">&#8377; {product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-[1080px] mx-auto px-[25px] py-8">
          <h2 className="text-center mx-auto mb-20 relative leading-[60px] text-[#41290c] text-2xl font-bold after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-20 after:h-1 after:bg-[#41290c] after:rounded-md">
            Latest Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                name: "SPARK Drone",
                category: "Electronics",
                price: "29,999",
                image: "product- (5).jpg",
              },
              {
                name: "Leather Boots",
                category: "Fashion",
                price: "3,999",
                image: "product- (6).jpg",
              },
              {
                name: "IPhone 15 Pro Max",
                category: "Electronics",
                price: "1,35,999",
                image: "product- (7).jpg",
              },
              {
                name: "Glow Face Pack",
                category: "Beauty",
                price: "1,999",
                image: "product- (8).jpg",
              },
              {
                name: "Apple Desktop",
                category: "Electronics",
                price: "1,12,990",
                image: "product- (9).jpg",
              },
              {
                name: "Lady Boot",
                category: "Fashion",
                price: "13,999",
                image: "product- (10).jpg",
              },
              {
                name: "BoAt Headset",
                category: "Electronics",
                price: "2,999",
                image: "product- (11).jpg",
              },
              {
                name: "Microphone",
                category: "Electronics",
                price: "12,999",
                image: "product- (12).jpg",
              },
            ].map((product) => (
              <div
                key={product.name}
                className="w-full object-contain hover:transform hover:-translate-y-1 transition duration-300"
              >
                <img
                  src={`/images/${product.image}`}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="mb-1 w-full"
                />
                <h4 className="text-lg font-semibold">{product.name}</h4>
                <p className="text-gray-600 ">Category: {product.category}</p>
                <p className="text-gray-800">&#x20b9; {product.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Offer */}
        <section className="offer">
          <div className="max-w-[1080px] mx-auto px-[25px]">
            <div className="flex flex-wrap items-center">
              <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <img
                  src="/images/product- (13).png"
                  alt="PS4 Controller"
                  width={500}
                  height={500}
                  className="w-full h-full object-contain hover:transform hover:-translate-y-1 transition duration-300 pr-12"
                />
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-lg mb-4">
                  Offer Available Exclusively on ONEMove
                </p>
                <h2 className="text-4xl font-bold mb-4">Sony PS4 Controller</h2>
                <p className="text-sm mb-4">
                  The most popular controller in 2021, with ergonomic design,
                  artificial leather at the grip, anti-sweat and anti-skid, L1
                  and R1 buttons, and more features.
                </p>
                <p className="mb-6">
                  <span className="text-xl line-through">&#8377; 22,999</span>
                  <br /> &#8377; 12,999
                </p>
                <Link
                  to="/login"
                  className="bg-[#41290c] text-white px-8 py-3 rounded-full hover:bg-[#775021] transition duration-300"
                >
                  Buy Now &#8594;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Brands */}
        <section className="py-8">
          <div className="container mx-auto px-6 max-w-7xl">
            <h2 className="text-center mx-auto mb-20 relative leading-[60px] text-[#41290c] text-2xl font-bold after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-20 after:h-1 after:bg-[#41290c] after:rounded-md">
              Famous Brands
            </h2>
            <div className="flex flex-wrap justify-around">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-32 h-32 mb-8">
                  <img
                    src={`/images/logo (${i}).png`}
                    alt={`Brand ${i}`}
                    width={160}
                    height={100}
                    className="w-full h-full object-contain hover:transform hover:-translate-y-1 transition duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

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

export default DemoPage;
