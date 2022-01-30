import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as MyIcon } from '../icons/search.svg';
import {Wrapper, SearchForm, SearchFormBtn, SearchInput } from './Searchbar.styled';

class Searchbar extends Component {

  state = {
    searchImages: "",
  };

  handleSearch = (evt) => {
     this.setState({ searchImages: evt.currentTarget.value.toLowerCase() });   
  };

  handleSubmit = (evt) => {
    const { searchImages } = this.state;
    const { onSubmit } = this.props;

    evt.preventDefault();
    if (searchImages.trim() === "") {
      alert("Enter request");
      return;
    }
    onSubmit(searchImages);
    this.setState({ searchImages: "" });
  };

  static propTypes = {
      onSubmit: PropTypes.func.isRequired,
  };
  
  render() {
    return (
      <Wrapper>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormBtn
            type="submit"
            aria-label="search-button"
            onClick={this.handleSubmit}>
            <MyIcon width='30' height='30' fill='blue' />
          </SearchFormBtn>
          <SearchInput
            type="text"
            autocomplete="off"
            placeholder="Search images and photos"
            value={this.state.searchImages}
            onChange={this.handleSearch}
          />
        </SearchForm>
      </Wrapper>
    );
  }
}
export default Searchbar;