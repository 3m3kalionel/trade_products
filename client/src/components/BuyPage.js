import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Product from "./Product";
import Modal from "./Modal";

import axiosApi from "../api/axiosApi";
import { deleteToken, setToken } from "../utils";

const BuyPage = () => {
  const defaultInputValues = {
    min: 0,
    max: 0,
    unit: "km",
  };

  const [productsList, setProductsList] = useState([]);
  const [clickedProductDetails, setClickedProductDetails] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [values, setValues] = useState(defaultInputValues);

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

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleOnSubmit = async payload => {
    const { min, max, unit } = values;
    const { coordinates, _id } = userDetails;
    const {
      data: { products: fetchedProductsByLocation },
    } = await axiosApi.get("/products/search", {
      params: {
        lng: coordinates[0],
        lat: coordinates[1],
        minimumDistance: min,
        maximumDistance: max,
        distanceUnit: unit,
        userId: _id,
      },
    });

    setProductsList(fetchedProductsByLocation);
  };

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
            <form
              id="filter"
              onSubmit={event => {
                event.preventDefault();
                handleOnSubmit(values);
              }}
            >
              Filter Products:
              <input
                type="number"
                name="min"
                placeholder="Min"
                onChange={event => handleChange(event)}
              />
              <input
                type="text"
                name="max"
                placeholder="Max"
                onChange={event => handleChange(event)}
              />
              <div className="radio-container">
                <input
                  type="radio"
                  id="km"
                  name="unit"
                  value="km"
                  checked={values.unit === "km"}
                  onChange={event => handleChange(event)}
                />
                <label htmlFor="km">km</label>
              </div>
              <div className="radio-container">
                <input
                  type="radio"
                  id="miles"
                  name="unit"
                  value="miles"
                  checked={values.unit === "miles"}
                  onChange={event => handleChange(event)}
                />
                <label htmlFor="miles">miles</label>
              </div>
              <button type="submit" id="filter-button">
                Filter
              </button>
            </form>
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
