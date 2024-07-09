import React, { useContext } from "react";
import "./ImageItem.css";
import { Image } from "../../types/types";
import { Link } from "react-router-dom";
import { useImageContext } from "../../context/ImageContext.tsx"; // Importa el contexto

interface ImageItemProps {
  image: Image;
}

const ImageItem: React.FC<ImageItemProps> = ({ image }) => {
  const { setSelectedImage } = useImageContext();

  const handleImageClick = () => {
    setSelectedImage(image); // Establece la imagen seleccionada en el contexto
  };

  return (
    <Link
      to={`/image/${image.id}`}
      className="image-item"
      onClick={handleImageClick}
    >
      <img src={image?.thumbnailUrl ?? ""} alt={image?.title ?? ""} />
      <p>{image?.title ?? ""}</p>
    </Link>
  );
};

export default ImageItem;
