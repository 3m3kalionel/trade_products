import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Product from "./Product";
import Modal from "./Modal";

import axiosApi from "../api/axiosApi";
import { deleteToken, setToken } from "../utils";

const BuyPage = () => {
  const [productsList, setProductsList] = useState([]);
  const [clickedProductDetails, setClickedProductDetails] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const history = useHistory();

  useEffect(() => {
    async function fetchProducts() {
      const {
        data: { products },
      } = await axiosApi.get("/products");
      setProductsList(products);
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    const userTokenDetails = setToken();
    setUserDetails(userTokenDetails);
  }, []);

  return (
    <>
      <div id="full-page">
        <div id="nav">
          <div id="left-section">
            <ul>
              <li>TRADE MARKET</li>
              <li>Shop</li>
              <li>Learn</li>
            </ul>
          </div>
          <div id="right-section">
            <ul>
              <li>Account</li>
              <li onClick={() => {}}>
                <span
                  id="logout"
                  onClick={() => {
                    deleteToken();
                    history.push("/");
                  }}
                >
                  Logout
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div id="header">
          <div id="header-lhs">
            <h1>All Products</h1>
            <h4>
              A 360<span>&#176;</span> look at Trade Market
            </h4>
          </div>
          <div id="header-rhs">
            <select disabled name="filter" id="disabled-filter">
              <option>Filter by</option>
            </select>
          </div>
        </div>
        <div id="body">
          <div id="body-container">
            {productsList.map((product, key) => {
              return (
                <Product
                  details={product}
                  key={key}
                  setClickedProductDetails={setClickedProductDetails}
                />
              );
            })}
          </div>
        </div>
      </div>
      {clickedProductDetails && (
        <Modal
          clickedProductDetails={clickedProductDetails}
          setClickedProductDetails={setClickedProductDetails}
          userDetails={userDetails}
        />
      )}
    </>
  );
};

export default BuyPage;
