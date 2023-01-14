import { useState, useContext } from 'react';
import { Context } from '../../Context/AuthContext';

import 'react-toastify/dist/ReactToastify.css';

import ActionButtons from '../../components/ActionButtons';
import Input from '../../components/Input';

import Form from './styles';

import isEmailValid from '../../utils/isEmailValid';
import useErrors from '../../hooks/useErrors';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = ((!!email && !!password) && errors.length === 0);

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'Email inválido.' });
    } else {
      removeError('email');
    }
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  const { handleLogin } = useContext(Context);

  return (
    <Form>
      <h1>Faça login: </h1>

      <Input
        error={getErrorMessageByFieldName('email')}
        placeholder="Usuário"
        value={email}
        onChange={handleEmailChange}
      />

      <Input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={handlePasswordChange}
      />

      <ActionButtons
        ButtonText="Entrar"
        isFormValid={isFormValid}
        onClick={() => handleLogin(email, password)}
        LinkText="Cadastrar"
        LinkPath="/new"
      />
    </Form>

  );
}
