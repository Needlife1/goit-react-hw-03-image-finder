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
    currentPages: null,
    loading: false,
    modalUrl: '',
    modalAlt: '',
    openModal: false,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.inputValue !== this.state.inputValue) {
      this.setState({ currentPages: null }, () => this.getPictures());
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  handleChangeInputValue = inputValue => {
    if (inputValue !== this.state.inputValue) {
      this.setState({ currentPages: null });
    }

    this.setState(
      prev => ({
        inputValue,
        currentPages: prev.currentPages + 12,
      }),
      () => this.getPictures()
    );
  };

  getPictures = async () => {
    this.setState({ loading: true });

    try {
      const data = await getAllPictures(
        this.state.inputValue,
        this.state.currentPages
      );

      if (this.state.pictures.length === 0) {
        this.setState({ pictures: data.hits });
      } else if (data.total <= this.state.pictures.length) {
        alert('Картинки закончились =(');
      } else {
        this.setState({ pictures: [...data.hits] });
      }
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
          pictures.length !== 0 && (
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
