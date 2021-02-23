import React from "react";
import { IconContext } from "react-icons";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import CurrencyFormat from "react-currency-format";

import CartItem from "./CartItem";
import "./Cart.css";

const Cart = props => {
  const { cart, cartActions, width } = props;

  const { onIncrement, onDecrement, onDelete, onToggle, onClick } = cartActions;

  const getCartPriceTotal = cart.reduce((acc, obj) => {
    acc += obj.price * obj.quantity;
    return acc;
  }, 0);

  return (
    <div id="cart" style={{ width }}>
      <div id="content-container">
        <div id="cart-title">
          <button id="close-cart">
            <IconContext.Provider value={{ size: "24px" }}>
              <IoArrowForwardCircleOutline onClick={onToggle} />
            </IconContext.Provider>
          </button>
          <h5>YOUR CART</h5>
        </div>

        <div>
          {cart.map((cartItem, key) => (
            <CartItem
              key={key}
              itemDetails={cartItem}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              onDelete={onDelete}
            />
          ))}
        </div>

        <div id="fixed-footer">
          <div id="details">
            <div>Subtotal</div>
            <span>
              {`NGN `}
              <CurrencyFormat
                value={getCartPriceTotal}
                thousandSeparator={true}
                displayType={"text"}
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </span>
          </div>

          <button id="checkout" disabled>
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
