import React from 'react';
import './ImageItem.css';
import { Image } from '../../types/types';
import { Link } from 'react-router-dom';

interface ImageItemProps {
  image: Image;
}

const ImageItem: React.FC<ImageItemProps> = ({ image }) => (
  <Link to={`/image/${image.id}`} className="image-item">
    <img src={image?.thumbnailUrl ?? ""} alt={image?.title ?? ""} />
    <p>{image?.title ?? ""}</p>
  </Link>
);

export default ImageItem;
