import PropTypes from 'prop-types';
import { Component } from 'react';
import {
  SearchForm,
  SearchInput,
  SearchButton,
  SearchLabel,
  Container,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    search: '',
  };
  handleChange = event => {
    this.setState({ search: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { search } = this.state;
    this.props.onSubmitSearch(search);
    this.setState({ search: '' });
  };

  render() {
    const { search } = this.state;

    return (
      <Container>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <SearchLabel />
          </SearchButton>

          <SearchInput
            type="text"
            name="query"
            value={search}
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </SearchForm>
      </Container>
    );
  }
}

Searchbar.propTypes = {
  onSubmitSearch: PropTypes.func.isRequired,
};
