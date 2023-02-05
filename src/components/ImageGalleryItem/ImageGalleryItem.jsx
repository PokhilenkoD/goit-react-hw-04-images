import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import { Image, ImageListItem } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  image: { webformatURL, largeImageURL, tags },
}) => {
  const [modalIsShow, setModalIsShow] = useState(false);

  const toggleModal = () => {
    setModalIsShow(!modalIsShow);
  };

  return (
    <ImageListItem>
      <Image src={webformatURL} alt={tags} onClick={toggleModal} />
      {modalIsShow && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </ImageListItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
