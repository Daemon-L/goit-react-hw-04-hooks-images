import React, { Component } from 'react';
import fetchImages from "./Services/api";
import Searchbar from './Components/Searchbar/Searchbar';
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import LoadMoreButton from "./Components/Button/Button";
import Modal from './Components/Modal/Modal';
import Loader from './Components/Loader/Loader';


class App extends Component { 

  state = {
    searchImages: "",
    images: [],
    page: 1,

    showModal: false,
    loading: false,

    modalImage: "",
    modalAlt: "",         
  };
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchImages !== this.state.searchImages) {
      this.setState({ images: [] });
      this.fetchPictures();
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.fetchPictures();
    }
  };


  fetchPictures = () => {
    const { searchImages, page } = this.state;

    this.setState({ loading: true });
    
    fetchImages(searchImages, page)
      .then((res) => {
        const images = res.data.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => {
            return { id, tags, webformatURL, largeImageURL, };
          }
        );

        if (images.length === 0) {
          this.setState({ loading: false });
          alert(`Sorry, nothing found`);
          return;
        }

        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
        }));
        this.setState({ loading: false });
      });
  };

  handleFormSubmit = searchImages => {
    this.setState({ searchImages, page: 1 });
  };

  onLoadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };


  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  setModal = (largeImageURL, tags ) => {
    this.setState({ modalImage: largeImageURL });
    this.setState({modalAlt: tags});
    this.toggleModal();
  };

  
  render() {
    const { images, loading, showModal, modalImage, modalAlt } = this.state;
    const { handleFormSubmit, onLoadMore, toggleModal, setModal } = this;
      
    return (
      <div>
        <Searchbar onSubmit={handleFormSubmit} />

        {images.length > 0 && (
          <ImageGallery setModal={setModal} images={images} />
        )}

        {loading ?
          // (<p>Загрузка ...</p>) :
          (<Loader/>) :
          ( this.state.images.length > 0 &&
            this.state.images.length % 12 === 0 &&
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
}
export default App;
