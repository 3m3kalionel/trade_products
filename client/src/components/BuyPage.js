import React, { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { IoCartOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";

import Product from "./Product";
import Modal from "./Modal";
import Cart from "./Cart";

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

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemTotal, setCartItemTotal] = useState(0);
  const [width, setCartWidth] = useState(0);

  let nextStateCartWidth;
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

  useEffect(() => {
    let newArray = [];
    cart.forEach((value, index) => {
      productsList.forEach(product => {
        if (product._id === value._id) {
          newArray.push({
            ...product,
            quantity: value.quantity,
          });
        }
      });
    });
    setCart(newArray);
  }, [productsList, width]);

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

  const toggleCart = isCartOpen => {
    nextStateCartWidth = isCartOpen === true ? 0 : "600px";
    setIsCartOpen(!isCartOpen);
    setCartWidth(nextStateCartWidth);
  };

  const getCartItemsTotal = newCart =>
    newCart.reduce((acc, obj) => {
      acc += obj.quantity;
      return acc;
    }, 0);

  const getCartItem = productId =>
    cart.find(element => element._id === productId);

  const handleAddCartItem = product => {
    const { _id } = product;
    const cartItem = getCartItem(_id);
    if (!cartItem) {
      const newCart = [...cart, { ...product, quantity: 1 }];
      setCart(newCart);
      setCartItemTotal(getCartItemsTotal(newCart));
    } else {
      const newCart = cart.map(element => {
        if (element._id === _id) {
          return { ...product, quantity: cartItem.quantity + 1 };
        } else {
          return element;
        }
      });
      setCart(newCart);
      setCartItemTotal(getCartItemsTotal(newCart));
    }
  };

  const deleteCartItem = _id => {
    const newCart = cart.filter(item => item._id !== _id);
    setCart(newCart);
    setCartItemTotal(getCartItemsTotal(newCart));
  };

  const handleRemoveCartItem = product => {
    const { _id, quantity } = product;
    const cartItem = getCartItem(_id);
    if (cartItem.quantity === 1) {
      deleteCartItem(product._id);
    } else {
      const newCart = cart.map(item => {
        if (item._id === _id) {
          return { ...product, quantity: quantity - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
      setCartItemTotal(getCartItemsTotal(newCart));
    }
  };

  const cartActions = {
    onIncrement: handleAddCartItem,
    onDecrement: handleRemoveCartItem,
    onDelete: deleteCartItem,
    onToggle: () => toggleCart(isCartOpen),
    // onClick: setCurrencyDetails,
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
              <li
                onClick={() => {
                  toggleCart(isCartOpen);
                }}
              >
                <IconContext.Provider value={{ size: "20px" }}>
                  <IoCartOutline />
                </IconContext.Provider>
                <span> {cartItemTotal}</span>
              </li>
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
                  onIncrement={handleAddCartItem}
                  onToggle={toggleCart}
                  // onClick={setCurrencyDetails}
                  // currencyDetails={currencyDetails}
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
      <Cart
        cart={cart}
        cartActions={cartActions}
        // currencyList={currencyList}
        width={width}
        // currencyDetails={currencyDetails}
      />
    </>
  );
};

export default BuyPage;
