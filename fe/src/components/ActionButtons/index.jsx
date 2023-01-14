import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Container from './styles';

export default function ActionButtons({
  isFormValid, ButtonText, LinkText, LinkPath, onClick,
}) {
  return (
    <Container>
      <button
        disabled={!isFormValid}
        type="button"
        onClick={onClick}
      >
        <strong>{ButtonText}</strong>
      </button>
      <Link to={`${LinkPath}`}>
        <strong>{LinkText}</strong>
      </Link>
    </Container>
  );
}

ActionButtons.propTypes = {
  ButtonText: PropTypes.string.isRequired,
  LinkText: PropTypes.string.isRequired,
  LinkPath: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isFormValid: PropTypes.bool,
};

ActionButtons.defaultProps = {
  isFormValid: true,
};
