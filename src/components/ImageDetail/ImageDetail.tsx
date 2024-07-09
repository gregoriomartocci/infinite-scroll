// src/components/ImageDetail.tsx
import React from "react";

import "./ImageDetail.css";
import { Image } from "../../types/types";
import { Link } from "react-router-dom";

interface ImageDetailProps {
  image: Image;
  setSelectedImage: (image: Image | null) => void;
}

const ImageDetail: React.FC<ImageDetailProps> = ({
  image,
  setSelectedImage,
}) => {
  return (
    <div className="image-detail">
      <Link to="/" className="back-link">
        Back to Gallery
      </Link>
      <img
        src={image?.thumbnailUrl ?? ""}
        alt={image?.title ?? ""}
        style={{ maxWidth: "500px" }}
      />
      <h2>{image?.title ?? "Image Title"}</h2>
    </div>
  );
};

export default ImageDetail;
