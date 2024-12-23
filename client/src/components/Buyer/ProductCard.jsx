import React from "react";

function Card({ index, name, category, price, link, onCardClick }) {
  return (
    <div className="w-full object-contain group hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out rounded-lg">
      <img
        src={`${link}`}
        alt={name}
        width={200}
        height={200}
        className="w-full mb-1 group-hover:scale-110 transition-all duration-300 ease-in-out rounded-lg"
        onClick={() => onCardClick(index)}
      />
      <h4 className="text-center text-lg font-semibold mt-2 group-hover:text-[#41290c] transition duration-300">
        {name}
      </h4>
      <p className="text-center text-gray-600 group-hover:text-gray-800 transition duration-300">
        Category: {category}
      </p>
      <p className="text-center text-gray-800 group-hover:text-[#775021] transition duration-300">
        &#8377; {price}
      </p>
    </div>
  );
}

export default Card;
