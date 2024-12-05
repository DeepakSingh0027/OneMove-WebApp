import React from "react";

function Card({ index, name, category, price, link }) {
  return (
    <div>
      <img
        src={`./images/product- (${index}).jpg`}
        alt={product.name}
        width={200}
        height={200}
        className="w-full mb-4"
        placeholder="blur"
        sizes="(max-width: 200px) 100vw, 200px"
      />
      <h4 className="text-lg font-semibold mb-2">{category}</h4>
      <p className="text-gray-800">&#8377; {price}</p>
    </div>
  );
}

export default Card;
