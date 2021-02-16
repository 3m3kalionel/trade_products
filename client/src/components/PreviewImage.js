import React from "react";

import "./PreviewImage.css";

const PreviewImage = ({ imageSrc }) => {
  return (
    <div className="image-container">
      <img src={imageSrc} alt="selected-pic" />
      <span>x</span>
    </div>
  );
};

export default PreviewImage;
