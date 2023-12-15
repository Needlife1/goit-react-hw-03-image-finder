import { Component } from 'react';
import { StyledModal } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.props.closeModal);
  }

  render() {
    const { url, alt, closeModal } = this.props;

    return (
      <StyledModal className="overlay" onClick={closeModal}>
        <div className="Modal">
          <img src={url} alt={alt} />
        </div>
      </StyledModal>
    );
  }
}
