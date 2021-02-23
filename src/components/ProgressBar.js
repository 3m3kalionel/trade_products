import React, { useEffect } from "react";

import useStorage from "../hooks/useStorage";
import "./ProgressBar.css";

const ProgressBar = ({ selectedImage, setImage, setSavedImageUrl }) => {
  const { percentageProgress, url } = useStorage(selectedImage);
  useEffect(() => {
    if (url) {
      setSavedImageUrl(url);
      setImage(null);
    }
  }, [setImage, url]);

  return (
    <div id="progress-bar" style={{ width: percentageProgress + "%" }}></div>
  );
};

export default ProgressBar;
