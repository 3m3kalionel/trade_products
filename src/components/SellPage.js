import React, { useState, useEffect } from "react";

import { useHistory, Link } from "react-router-dom";

import UploadForm from "./UploadForm";
import { setToken, deleteToken } from "../utils";

const SellPage = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  const history = useHistory();

  useEffect(() => {
    const userTokenDetails = setToken();
    setUserDetails(userTokenDetails);
  }, []);

  const setImage = file => {
    if (file) {
      const imageSrc = URL.createObjectURL(file);
      setPreviewImage(imageSrc);
      setSelectedImage(file);
    } else {
      setPreviewImage(null);
      setSelectedImage(null);
    }
  };

  return (
    <div id="full-page">
      <div id="nav">
        <div id="left-section">
          <ul>
            <li>TRADE MARKET</li>
            <li>
              <Link to="/sell">Sell</Link>
            </li>
            <li>
              <Link to="/buy">Buy</Link>
            </li>
          </ul>
        </div>
        <div id="right-section">
          <ul>
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

      <div id="upload-form-container">
        <UploadForm
          setImage={setImage}
          selectedImage={selectedImage}
          previewImage={previewImage}
          productOwnerId={userDetails._id}
        />
      </div>
    </div>
  );
};

export default SellPage;
