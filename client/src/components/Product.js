import React from "react";

import "./Product.css";

const Product = ({
  details,
  setClickedProductDetails,
  onIncrement,
  onToggle,
  // currencyDetails
}) => {
  const { _id, name, description, imageUrl } = details;

  return (
    <div
      className="product"
      // onClick={() => {
      //   setClickedProductDetails(details);
      // }}
    >
      <img
        className="product-image"
        src={imageUrl}
        alt={description}
        onClick={() => {
          setClickedProductDetails(details);
        }}
      />
      <div className="product-description">
        <p className="title">{name}</p>
        <p className="cost">{description}</p>
      </div>
      <button
        className="add-to-cart-button"
        onClick={() => {
          onIncrement(details);
          onToggle(false);
          // onClick({
          // ...currencyDetails,
          // selectedCurrency: selectedCurrency || defaultCurrency,
          // });
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
