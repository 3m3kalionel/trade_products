import React, { useState, useEffect } from "react";

import UploadForm from "./UploadForm";
import { retrieveToken } from "../utils";

const SellPage = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const userTokenDetails = JSON.parse(retrieveToken());
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
    <div className="App">
      <header className="App-header">
        <UploadForm
          setImage={setImage}
          selectedImage={selectedImage}
          previewImage={previewImage}
          productOwnerId={userDetails._id}
        />
      </header>
      <div></div>
    </div>
  );
};

export default SellPage;
