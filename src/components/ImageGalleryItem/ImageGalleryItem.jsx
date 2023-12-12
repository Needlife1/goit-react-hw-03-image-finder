import { StyledImageGallery } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  alt,
  largeImageURL,
  onOpenModal,
}) => {
  return (
    <StyledImageGallery
      className="gallery-item"
      id={id}
      onClick={() => onOpenModal(largeImageURL, alt)}
    >
      <img className="ImageGalleryItem-image" src={webformatURL} alt={alt} />
    </StyledImageGallery>
  );
};
