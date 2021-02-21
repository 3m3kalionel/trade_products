import React, { useState, useEffect } from "react";

import ProgressBar from "./ProgressBar";
import PreviewImage from "./PreviewImage";
import LocationSearch from "./LocationSearch";
import "./UploadForm.css";

import axiosApi from "../api/axiosApi";

const UploadForm = ({
  selectedImage,
  setImage,
  previewImage,
  productOwnerId,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [progressBarDisplay, setProgressBarDisplay] = useState(false);
  const [savedImageUrl, setSavedImageUrl] = useState(null);
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({
    type: "Point",
    coordinates: [],
  });

  useEffect(() => {
    async function saveProduct() {
      await axiosApi.post("/product", {
        name,
        description,
        productOwnerId,
        imageUrl: savedImageUrl,
        address,
        location,
      });
    }

    if (savedImageUrl) {
      saveProduct();
      toggleProgressBarDisplay();
      setName("");
      setDescription("");
    }
  }, [savedImageUrl]);

  const handleNameChange = ({ target: { value } }) => {
    setName(value);
  };

  const handleDescriptionChange = ({ target: { value } }) => {
    setDescription(value);
  };

  const toggleProgressBarDisplay = () => {
    setProgressBarDisplay(!progressBarDisplay);
  };

  const handleSelectedAddress = (newAddress, coordinates) => {
    const newCoordinates = [];

    setAddress(newAddress);
    newCoordinates.push(coordinates.lng);
    newCoordinates.push(coordinates.lat);

    setLocation({
      type: "Point",
      coordinates: newCoordinates,
    });
  };

  return (
    <>
      <form
        onSubmit={event => {
          event.preventDefault();
          toggleProgressBarDisplay();
        }}
      >
        <div id="authentication-form">
          {selectedImage && progressBarDisplay && (
            <ProgressBar
              selectedImage={selectedImage}
              setImage={setImage}
              setSavedImageUrl={setSavedImageUrl}
            />
          )}
          <div id="form-body">
            <h1 id="form-header">Upload Product</h1>
            <div className="form-row">
              <input
                name="name"
                type="text"
                className="auth-form-input"
                placeholder="Product name"
                value={name}
                autoComplete="name"
                onChange={handleNameChange}
                required
                className="upload-form-input"
              />
            </div>
            <div className="form-row">
              <input
                name="description"
                type="text"
                className="auth-form-input"
                placeholder="Product description"
                value={description}
                autoComplete="description"
                onChange={handleDescriptionChange}
                required
                className="upload-form-input"
              />
            </div>

            <div>
              <label htmlFor="image_uploads">
                Choose image to upload (PNG, JPG)
              </label>
              <input
                type="file"
                id="image_uploads"
                name="image_uploads"
                accept=".jpg, .jpeg, .png"
                onChange={event => {
                  const selected = event.target.files[0];
                  setImage(selected);
                }}
              />
            </div>
            <div>
              <LocationSearch handleSelectedAddress={handleSelectedAddress} />
            </div>
            {!selectedImage && (
              <div className="preview">
                <p>No files currently selected for upload</p>
              </div>
            )}
            {previewImage && <PreviewImage imageSrc={previewImage} />}

            <button type="submit" id="upload-button">
              Upload
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UploadForm;
