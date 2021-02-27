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
  const defaultInputValues = {
    name: "",
    description: "",
    price: 0,
  };

  const [values, setValues] = useState(defaultInputValues);
  const [progressBarDisplay, setProgressBarDisplay] = useState(false);
  const [savedImageUrl, setSavedImageUrl] = useState(null);
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({
    type: "Point",
    coordinates: [],
  });

  useEffect(() => {
    async function saveProduct() {
      const { name, description, price } = values;
      await axiosApi.post("/product", {
        name,
        description,
        price,
        productOwnerId,
        imageUrl: savedImageUrl,
        address,
        location,
      });
    }

    if (savedImageUrl) {
      saveProduct();
      toggleProgressBarDisplay();
      setValues(defaultInputValues);
    }
  }, [savedImageUrl]);

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
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
                className="auth-form-input upload-form-input"
                placeholder="Product name"
                value={values.name}
                autoComplete="name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <input
                name="description"
                type="text"
                className="auth-form-input upload-form-input"
                placeholder="Product description"
                value={values.description}
                autoComplete="description"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <input
                name="price"
                type="number"
                className="auth-form-input upload-form-input"
                placeholder="Price"
                value={values.price}
                onChange={handleChange}
                required
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
