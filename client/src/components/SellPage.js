import React, { useState } from "react";

import UploadForm from "./UploadForm";

const SellPage = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

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
        />
      </header>
      <div></div>
    </div>
  );
};

export default SellPage;
