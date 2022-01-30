import React from "react";
import {Picture} from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image, setModal }) => {
  const { webformatURL, largeImageURL, tags, id } = image;
  return (
    <li key={id}>
        <Picture
            onClick={() => setModal(largeImageURL)}
            src={webformatURL}
            alt={tags}
        />
    </li>
  );
}
export default ImageGalleryItem;
