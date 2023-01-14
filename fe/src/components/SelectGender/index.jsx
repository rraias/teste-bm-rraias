import PropTypes from 'prop-types';

import Select from '../Select';

import { Container } from './styles';

export default function SelectGender({ value, onChange }) {
  return (
    <Container>
      <p>Gênero:</p>
      <Select
        value={value}
        onChange={onChange}
      >
        <option value="">Não informar</option>
        <option value="masc">Masculino</option>
        <option value="fem">Feminino</option>
      </Select>
    </Container>
  );
}

SelectGender.propTypes = {
  value: PropTypes.node,
  onChange: PropTypes.func.isRequired,
};

SelectGender.defaultProps = {
  value: '',
};
