import { Component } from 'react';
import { StyledModal } from './Modal.styled';

export class Modal extends Component {
  render() {
    const { url, alt } = this.props;
    document.addEventListener('keydown', this.props.closeModal);

    return (
      <StyledModal className="overlay" onClick={this.props.closeModal}>
        <div className="Modal">
          <img src={url} alt={alt} />
        </div>
      </StyledModal>
    );
  }
}
