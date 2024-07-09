// src/components/ImageItem/ImageItem.tsx
import React from "react";
import "./ImageItem.css";
import { Image } from "../../types/types";
import { Link } from "react-router-dom";
import { useImageContext } from "../../context/ImageContext.tsx";

interface ImageItemProps {
  image: Image;
}

const ImageItem: React.FC<ImageItemProps> = ({ image }) => {
  const { setSelectedImage } = useImageContext();

  const handleImageClick = () => {
    setSelectedImage(image);
  };

  return (
    <Link to={`/image/${image.id}`} className="image-item-link">
      <div className="image-item" onClick={handleImageClick}>
        <img src={image?.thumbnailUrl ?? ""} alt={image?.title ?? ""} />
        <p>{image?.title ?? ""}</p>
      </div>
    </Link>
  );
};

export default ImageItem;
