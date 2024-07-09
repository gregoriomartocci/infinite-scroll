// src/components/ImageList/ImageList.tsx
import React from "react";
import ImageItem from "../Image/Image.tsx";
import { useImageContext } from "../../context/ImageContext.tsx";

const ImageList = () => {
  const { images, loading, error } = useImageContext();
  console.log("🚀 ~ ImageList ~ images:", images)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching images</p>;

  return (
    <div className="image-list">
      {images.map((image) => (
        <ImageItem key={image.id} image={image} />
      ))}
    </div>
  );
};

export default ImageList;
