import PropTypes from 'prop-types';
import { Container, InputField } from './styles';

export default function Input({
  error, placeholder, value, onChange, type,
}) {
  return (
    <Container>
      <InputField
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
      />
      {error && <small>{error}</small>}
    </Container>
  );
}

Input.propTypes = {
  error: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};

Input.defaultProps = {
  error: null,
  placeholder: '',
  type: 'text',
};
