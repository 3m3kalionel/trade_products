import React, { useEffect } from "react";

import useStorage from "../hooks/useStorage";
import "./ProgressBar.css";

const ProgressBar = ({ selectedImage, setImage }) => {
  const { percentageProgress, url } = useStorage(selectedImage);
  useEffect(() => {
    if (url) {
      setImage(null);
    }
  });

  return (
    <div id="progress-bar" style={{ width: percentageProgress + "%" }}></div>
  );
};

export default ProgressBar;
