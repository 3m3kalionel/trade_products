import React, { useState, useEffect } from "react";

import "./App.css";
import UploadForm from "./components/UploadForm";
import Product from "./components/Product";
import Modal from "./components/Modal";
import AuthForm from "./components/AuthForm";

import axiosApi from "./api/axiosApi";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [productsList, setProductsList] = useState([]);
  const [clickedProductDetails, setClickedProductDetails] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      const {
        data: { products },
      } = await axiosApi.get("/product");
      setProductsList(products);
    }

    fetchProducts();
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
    // <div className="App">
    //   <header className="App-header">
    //     <UploadForm
    //       setImage={setImage}
    //       selectedImage={selectedImage}
    //       previewImage={previewImage}
    //     />
    //   </header>
    //   <div></div>
    // </div>
    <>
      <AuthForm />
      {/* <div id="full-page">
        <div id="nav">
          <div id="left-section">
            <ul>
              <li>TRADE MARKET</li>
              <li>Shop</li>
              <li>Learn</li>
            </ul>
          </div>
          <div id="right-section">
            <ul>
              <li>Account</li>
              <li onClick={() => {}}>
                <span>NGN 400</span>
              </li>
            </ul>
          </div>
        </div>
        <div id="header">
          <div id="header-lhs">
            <h1>All Products</h1>
            <h4>
              A 360<span>&#176;</span> look at Trade Market
            </h4>
          </div>
          <div id="header-rhs">
            <select disabled name="filter" id="disabled-filter">
              <option>Filter by</option>
            </select>
          </div>
        </div>
        <div id="body">
          <div id="body-container">
            {productsList.map((product, key) => {
              return (
                <Product
                  details={product}
                  key={key}
                  setClickedProductDetails={setClickedProductDetails}
                />
              );
            })}
          </div>
        </div>
      </div>
      {clickedProductDetails && (
        <Modal
          clickedProductDetails={clickedProductDetails}
          setClickedProductDetails={setClickedProductDetails}
        />
      )} */}
    </>
  );
}

export default App;
