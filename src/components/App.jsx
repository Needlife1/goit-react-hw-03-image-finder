import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getAllPictures } from '../picturse/pictures';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    pictures: [],
    inputValue: '',
    loading: false,
    modalUrl: '',
    modalAlt: '',
    openModal: false,
    page: 1,
  };

  componentDidMount() {
    this.getPictures();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.inputValue !== this.state.inputValue ||
      prevState.page !== this.state.page
    ) {
      this.getPictures();
    }
  }

  handleChangeInputValue = inputValue => {
    if (inputValue !== this.state.inputValue) {
      this.setState({ page: 1, pictures: [], inputValue });
    } else {
      this.setState(prev => ({ page: prev.page + 1, inputValue }));
    }
  };

  getPictures = async () => {
    this.setState({ loading: true });

    try {
      const data = await getAllPictures(this.state.inputValue, this.state.page);

      this.setState(
        prev => ({
          pictures: [...prev.pictures, ...data.hits],
        }),
        () => {
          if (data.total <= this.state.pictures.length) {
            alert('Картинки закінчились =(');
          }
        }
      );
    } catch (error) {
      alert('Щось пішло не так...');
      console.error('Error fetching pictures:', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  openModal = (url, alt) => {
    this.setState({ modalUrl: url, modalAlt: alt, openModal: true });
    document.addEventListener('keydown', this.closeModal);
  };

  closeModal = e => {
    if (e.target.tagName !== 'DIV' && e.key !== 'Escape') {
      return;
    }
    this.setState({ modalUrl: '', modalAlt: '', openModal: false });
    document.removeEventListener('keydown', this.closeModal);
  };

  render() {
    const { pictures, inputValue, loading, modalUrl, modalAlt, openModal } =
      this.state;

    return (
      <>
        <Searchbar
          getPictures={this.handleChangeInputValue}
          inputValue={inputValue}
        />
        <ImageGallery pictures={pictures} openModal={this.openModal} />
        {loading ? (
          <Loader />
        ) : (
          pictures.length >= 12 && (
            <Button onClick={this.handleChangeInputValue} />
          )
        )}
        {openModal && (
          <Modal url={modalUrl} alt={modalAlt} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}
