import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { Image } from "../types/types";

interface ImageContextProps {
  images: Image[];
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  selectedImage: Image | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<Image | null>>;
}

const initialImageContext: ImageContextProps = {
  images: [],
  setImages: () => {},
  loading: false,
  setLoading: () => {},
  error: false,
  setError: () => {},
  selectedImage: null,
  setSelectedImage: () => {},
};

const ImageContext = createContext<ImageContextProps>(initialImageContext);

export const useImageContext = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/photos?_page=1&_limit=10`
        );
        console.log("🚀 ~ fetchImages ~ response:", response)
        setImages(response.data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };

    fetchImages();
  }, []);

  return (
    <ImageContext.Provider
      value={{
        images,
        setImages,
        loading,
        setLoading,
        error,
        setError,
        selectedImage,
        setSelectedImage,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export default ImageContext;
