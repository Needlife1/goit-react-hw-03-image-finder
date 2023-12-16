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

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  handleChangeInputValue = inputValue => {
    if (inputValue !== this.state.inputValue) {
      this.setState({ page: 1, pictures: [], inputValue }, () =>
        this.getPictures()
      );
    } else {
      this.setState(
        prev => ({ page: prev.page + 1, inputValue }),
        () => this.getPictures()
      );
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
            alert('Картинки закончились =(');
          }
        }
      );
    } catch (error) {
      alert('Что-то пошло не так...');
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
            <Button onClick={() => this.handleChangeInputValue(inputValue)} />
          )
        )}
        {openModal && (
          <Modal url={modalUrl} alt={modalAlt} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}
