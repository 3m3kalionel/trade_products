import { useState, useEffect } from "react";
import { projectStorage, projectFireStore } from "../firebase/config";

const useStorage = file => {
  const [percentageProgress, setPercentageProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFireStore.collection("images");

    storageRef.put(file).on(
      "state_changed",
      snapshot => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercentageProgress(percentage);
      },
      error => {
        setError(error);
      },
      async () => {
        const imageUrl = await storageRef.getDownloadURL();
        collectionRef.add({ imageUrl });
        setUrl(imageUrl);
      }
    );
  }, [file]);

  return { percentageProgress, url, error };
};

export default useStorage;
