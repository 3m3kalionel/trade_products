import React from "react";

import "./UploadForm.css";
import ProgressBar from "./ProgressBar";

const UploadForm = ({ selectedImage, setImage }) => {
  return (
    <>
      {selectedImage && (
        <ProgressBar selectedImage={selectedImage} setImage={setImage} />
      )}
      <form method="post" encType="multipart/form-data">
        <div>
          <label htmlFor="image_uploads">
            Choose images to upload (PNG, JPG)
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
        {!selectedImage && (
          <div className="preview">
            <p>No files currently selected for upload</p>
          </div>
        )}
      </form>
    </>
  );
};

export default UploadForm;
