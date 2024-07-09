import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./ImageDetail.css";
import { Image } from "../../types/types";
import { useImageContext } from "../../context/ImageContext.tsx";

interface ImageDetailProps {
  image: Image;
}

const ImageDetail: React.FC<ImageDetailProps> = () => {
  const { selectedImage, loading, error } = useImageContext();

  return (
    <div className="image-detail">
      <Link to="/" className="back-link">
        Back to Gallery
      </Link>
      <img
        src={selectedImage?.thumbnailUrl || ""}
        alt={selectedImage?.title || "Image Title"}
        style={{ maxWidth: "500px" }}
      />
      <h2>{selectedImage?.title || "Image Title"}</h2>
    </div>
  );
};

export default ImageDetail;
