import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  SearchBarWrapper,
  SearchBarForm,
  SearchBarFormButton,
  SearchFormInput,
} from './SearchBar.styled';
import { BiSearch } from 'react-icons/bi';
import { toast } from 'react-toastify';

export const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query === '') {
      toast.warn('Введіть запит');
      return;
    }
    onSubmit(query);
  };

  return (
    <SearchBarWrapper>
      <SearchBarForm onSubmit={handleSubmit}>
        <SearchBarFormButton type="submit">
          <BiSearch size="40" />
        </SearchBarFormButton>
        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query.trim()}
          onChange={handleChange}
        />
      </SearchBarForm>
    </SearchBarWrapper>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
