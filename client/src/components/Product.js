import React from "react";

import "./Product.css";

const Product = ({ details }) => {
  const { _id, name, description, imageUrl } = details;

  return (
    <div className="product">
      <img className="product-image" src={imageUrl} alt={description} />
      <div className="product-description">
        <p className="title">{name}</p>
        <p className="cost">{description}</p>
      </div>
      <button className="add-to-cart-button" disabled>
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
