import { StyledImageGallary } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ pictures, openModal }) => {
  return (
    <StyledImageGallary>
      {pictures.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={largeImageURL}
          onOpenModal={openModal}
          id={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          alt={tags}
        />
      ))}
    </StyledImageGallary>
  );
};
