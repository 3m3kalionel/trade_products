import React, { useState } from "react";

import "./App.css";
import UploadForm from "./components/UploadForm";
import PreviewImage from "./components/PreviewImage";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

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
        <UploadForm setImage={setImage} selectedImage={selectedImage} />
        <div id="images-container" className="container">
          {previewImage && <PreviewImage imageSrc={previewImage} />}
        </div>
      </header>
      <div></div>
    </div>
  );
}

export default App;
