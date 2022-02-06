import { useState, useEffect } from "react";
import fetchImages from "./Services/api";
import Searchbar from './Components/Searchbar/Searchbar';
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import LoadMoreButton from "./Components/Button/Button";
import Modal from './Components/Modal/Modal';
import Loader from './Components/Loader/Loader';

function App() {
  const [searchImages, setSearchImages] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [modalAlt, setModalAlt] = useState("");

  useEffect(() => {

    if (searchImages === "") {
      return;
    }

    if (page === 1) {
      setImages([]);
    }
    setLoading(true);
    
    fetchImages(searchImages, page)
      .then((res) => {
        const images = res.data.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => {
            return { id, tags, webformatURL, largeImageURL, };
          }
        );

        if (images.length === 0) {
          alert(`Sorry, nothing found`);
          setLoading(false);
          return;
        }

        setImages((prevImages) => [...prevImages, ...images]);
        setLoading(false);
      })
  }, [searchImages, page]);

  const handleFormSubmit = (searchImages) => {
    setSearchImages(searchImages);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal((showModal) => !showModal);
  };
  const setModal = (largeImageURL, tags ) => {
    setModalImage(largeImageURL);
    setModalAlt(tags);
    toggleModal();
  };
   
  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />

      {images.length > 0 && (
        <ImageGallery setModal={setModal} images={images} />
      )}

      {loading ?
        (<Loader/>) :
        ( images.length > 0 &&
          images.length % 12 === 0 &&
          (<LoadMoreButton onClick={onLoadMore} />)
        )
      }

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={modalImage} alt={modalAlt} />
        </Modal>
      )}
    </div>
  );
}
export default App;
