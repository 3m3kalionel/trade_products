import React, { useState } from "react";
import Comments from "./Comments";

import "./Modal.css";
import axiosApi from "../api/axiosApi";

const Modal = ({
  clickedProductDetails,
  setClickedProductDetails,
  userDetails,
}) => {
  const [allComments, setComments] = useState(
    clickedProductDetails.comments || []
  );

  const { name, description, imageUrl, productOwnerId } = clickedProductDetails;

  const handleOnSubmit = async payload => {
    axiosApi
      .post("/products/message", {
        productId: clickedProductDetails._id,
        senderId: userDetails._id,
        message: payload.message,
        parentId: payload.parent,
      })
      .then(function (response) {
        axiosApi.post("/user/notify", {
          recipientId: productOwnerId._id,
          senderId: userDetails._id,
          message: payload.message,
        });
      })
      .catch(function (error) {
        console.log("@@@error here", error);
      });
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
                handleOnSubmit();
              }}
            >
              <div id="form-body">
                <div className="owner-section">
                  <div className="owner-name">{productOwnerId.username}</div>
                  <div className="product-name">{name}</div>
                  <div className="product-description">{description}</div>
                </div>

                {allComments && (
                  <Comments
                    allComments={allComments}
                    handleSave={handleOnSubmit}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
