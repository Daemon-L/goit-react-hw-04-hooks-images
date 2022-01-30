import React from 'react';
import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import {ImageList} from './ImageGallery.styled';

const ImageGallery = ({ images, setModal }) => {
    return (
        <ImageList>
            {images.map((image) => (
                <ImageGalleryItem
                    key={image.id}
                    image={image}
                    setModal={setModal}
                />
            ))}
        </ImageList>
    );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
  setModal: PropTypes.func.isRequired,
};
export default ImageGallery;