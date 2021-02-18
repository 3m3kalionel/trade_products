import React, { useState } from "react";

import "./Modal.css";
import axiosApi from "../api/axiosApi";

const Modal = ({ clickedProductDetails, setClickedProductDetails }) => {
  const [message, setMessage] = useState("");
  const { name, description, imageUrl, productOwnerId } = clickedProductDetails;

  const handleOnSubmit = async payload => {
    await axiosApi.post("/user/notify", payload);
    setMessage("");
  };

  const payload = {
    senderId: "602b342267f05a305d29d101",
    recipientId: productOwnerId._id,
    message,
  };

  return (
    <>
      <div
        id="backdrop"
        onClick={event => {
          if (event.target.id === "backdrop") {
            setClickedProductDetails(null);
          }
        }}
      >
        <div id="image-form">
          <div id="lhs">
            <img src={imageUrl} alt="expanded-selected-image" />
          </div>
          <div id="rhs">
            <form
              id="comments-form"
              onSubmit={event => {
                event.preventDefault();
                handleOnSubmit(payload);
              }}
            >
              <div id="form-body">
                <div className="owner-section">
                  <div className="owner-name">{productOwnerId.username}</div>
                  <div className="product-name">{name}</div>
                  <div className="product-description">{description}</div>
                </div>
                <div className="owner-section">
                  <div className="commenter-name">thenotoriousmma</div>
                  <div className="user-comment">This really is nice. RIP</div>
                </div>
                <div className="owner-section">
                  <div className="commenter-name">thenotoriousmma</div>
                  <div className="user-comment">Makaveli The Don</div>
                </div>
                <div className="owner-section">
                  <div className="commenter-name">thenotoriousmma</div>
                  <div className="user-comment">RIP Tupac</div>
                </div>

                <div id="message-row">
                  <input
                    value={message}
                    onChange={({ target: { value } }) => setMessage(value)}
                    placeholder="Enter your message"
                    required
                  />
                  <button type="submit" id="send-button">
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
