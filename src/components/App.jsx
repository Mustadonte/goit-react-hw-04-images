import { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { apiService } from 'services/apiService';
import { Loader } from './Loader/Loader';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton';
import { ToastContainer } from 'react-toastify';
import { Modal } from 'components/Modal/Modal';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const perPage = 12;

  const [query, setQuery] = useState('');
  const [images, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [modalImg, setModalImg] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setLoading(true);
    apiService(query, perPage, page)
      .then(resp => setImage(images => [...images, ...resp]))
      .finally(() => setLoading(false));
  }, [query, page]);

  const onSubmit = data => {
    if (query === data) {
      console.log(data);
      return;
    }
    setQuery(data);
    setImage([]);
  };

  const onImgClick = clickedImg => {
    setModalImg(clickedImg);
    toggleModal();
  };

  const onLoadmoreButton = () => {
    setPage(page + 1);
    setTimeout(() => {
      console.log(window.innerHeight);
      window.scrollBy({
        top: window.innerHeight * 0.95,
        behavior: 'smooth',
      });
    }, 100);
  };

  const toggleModal = () => {
    return setShowModal(!showModal);
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {images.length > 0 && <ImageGallery images={images} data={onImgClick} />}
      {loading && <Loader />}
      {images.length > 0 ? <LoadMoreButton onClick={onLoadmoreButton} /> : ''}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={modalImg.src} alt={modalImg.alt} />
        </Modal>
      )}

      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
