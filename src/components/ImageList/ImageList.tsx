// src/components/ImageList/ImageList.tsx
import React, { useEffect, useRef } from "react";
import ImageItem from "../Image/Image.tsx";
import { useImageContext } from "../../context/ImageContext.tsx";
import "./ImageList.css";
import axios from "axios";

const ImageList = () => {
  const {
    filteredImages,
    loading,
    setImages,
  } = useImageContext();

  const observer = useRef<IntersectionObserver | null>(null);
  const lastImageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        loadMoreImages();
      }
    };

    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 0.75, // Trigger at 75% visibility
    });

    if (lastImageRef.current) {
      observer.current.observe(lastImageRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [filteredImages]); // Ensure useEffect runs when filteredImages change

  const loadMoreImages = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?_page=${Math.ceil(
          filteredImages.length / 10
        ) + 1}&_limit=10`
      );
      setImages((prevImages) => [...prevImages, ...response.data]);
    } catch (error) {
      console.error("Error loading more images:", error);
    }
  };

  return (
    <div className="image-list">
      {filteredImages.map((image, index) => {
        if (index === filteredImages.length - 1) {
          return (
            <div key={image.id} ref={lastImageRef}>
              <ImageItem image={image} />
            </div>
          );
        } else {
          return <ImageItem key={image.id} image={image} />;
        }
      })}
      {loading && <p>Loading...</p>}
      {!loading && filteredImages.length === 0 && <p>No images found.</p>}
    </div>
  );
};

export default ImageList;
