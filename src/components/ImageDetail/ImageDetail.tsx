// src/components/ImageDetail.tsx
import React from "react";
import "./ImageDetail.css";
import { Image } from "../../types/types";

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
      <button onClick={() => setSelectedImage(null)}>Back to Gallery</button>
      <img
        src={image.thumbnailUrl}
        alt={image.title}
        style={{ maxWidth: "500px" }}
      />
      <h2>{image.title}</h2>
    </div>
  );
};

export default ImageDetail;
