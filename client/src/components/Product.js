import React from "react";

import "./Product.css";

const Product = ({
  details,
  setClickedProductDetails,
  onIncrement,
  onToggle,
}) => {
  const { _id, name, description, imageUrl, price } = details;

  return (
    <div className="product">
      <img
        className="product-image"
        src={imageUrl}
        alt={description}
        onClick={() => {
          setClickedProductDetails(details);
        }}
      />
      <div className="user-product-description">
        <p className="title">{name}</p>
        <p className="cost">From {price}</p>
      </div>
      <button
        className="add-to-cart-button"
        onClick={() => {
          onIncrement(details);
          onToggle(false);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
