import React from "react";

function Card({ index, name, category, price, link, onCardClick }) {
  return (
    <div className="w-full object-contain hover:transform hover:-translate-y-1 transition duration-300 ">
      <img
        src={`${link}`}
        alt={product.name}
        width={200}
        height={200}
        className="w-full mb-1"
        onClick={() => onCardClick(index)}
      />
      <h4 className="text-lg font-semibold">{product.name}</h4>
      <p className="text-gray-600 ">Category:{product.category}</p>
      <p className="text-gray-800">&#8377; {product.price}</p>
    </div>
  );
}

export default Card;
