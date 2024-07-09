// src/components/ImageList/ImageList.tsx
import React from "react";
import ImageItem from "../Image/Image.tsx";
import { useImageContext } from "../../context/ImageContext.tsx";

const ImageList = () => {
  const { filteredImages, loading, error } = useImageContext();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching images</p>;

  return (
    <div className="image-list">
      {filteredImages.map((image) => (
        <ImageItem key={image.id} image={image} />
      ))}
    </div>
  );
};

export default ImageList;
