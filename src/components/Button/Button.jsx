import { LoadeMoreBtn } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ nextPage }) => {
  return (
    <LoadeMoreBtn type="button" onClick={nextPage}>
      Loade more
    </LoadeMoreBtn>
  );
};

Button.propTypes = {
  nextPage: PropTypes.func.isRequired,
};
