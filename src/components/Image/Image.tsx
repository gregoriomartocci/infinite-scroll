import React from 'react';

import './ImageItem.css';
import { Image } from '../../types/types';

interface ImageItemProps {
  image: Image;
  setSelectedImage: (image: Image) => void;
}

const ImageItem: React.FC<ImageItemProps> = ({ image, setSelectedImage }) => (
  <div className="image-item" onClick={() => setSelectedImage(image)}>
    <img src={image.thumbnailUrl} alt={image.title} />
    <p>{image.title}</p>
  </div>
);

export default ImageItem;
