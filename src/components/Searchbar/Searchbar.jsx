import { Component } from 'react';
import { SearchbarStyled } from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  getValue = e => {
    this.setState({ inputValue: e.target.value.toLowerCase() });
  };

  handleInputChenge = e => {
    e.preventDefault();
    this.props.getPictures(this.state.inputValue);
  };

  render() {
    return (
      <SearchbarStyled className="searchbar">
        <form className="SearchForm" onSubmit={this.handleInputChenge}>
          <button type="submit" className="SearchForm-button">
            <ImSearch />
          </button>

          <input
            className="SearchForm-input"
            onChange={this.getValue}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </SearchbarStyled>
    );
  }
}
