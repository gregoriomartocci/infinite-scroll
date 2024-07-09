import React from 'react';
import './ImageList.css';
import { Image } from '../../types/types.ts';
import ImageItem from '../Image/Image.tsx';

interface ImageListProps {
  images: Image[];
  loading: boolean;
  error: boolean;
  setSelectedImage: (image: Image) => void;
}

const ImageList: React.FC<ImageListProps> = ({ images, loading, error, setSelectedImage }) => {
  return (
    <div className="image-list">
      {images.map(image => (
        <ImageItem key={image.id} image={image} setSelectedImage={setSelectedImage} />
      ))}
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error fetching data. Please try again.</p>}
    </div>
  );
};

export default ImageList;
