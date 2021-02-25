import React, { useState } from "react";

import "./Modal.css";
import axiosApi from "../api/axiosApi";

const Modal = ({
  clickedProductDetails,
  setClickedProductDetails,
  userDetails,
}) => {
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);

  const { name, description, imageUrl, productOwnerId } = clickedProductDetails;

  const handleOnSubmit = async payload => {
    await axiosApi.post("/user/notify", payload);
    setMessagesList([
      ...messagesList,
      {
        message: payload.message,
        sender: userDetails.username,
      },
    ]);
    setMessage("");
  };

  const payload = {
    senderId: userDetails._id,
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
            <img src={imageUrl} alt="description" />
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

                {messagesList &&
                  messagesList.map((message, key) => (
                    <div className="owner-section" key={key}>
                      <div className="commenter-name">{message.sender}</div>
                      <div className="user-comment">{message.message}</div>
                    </div>
                  ))}
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
