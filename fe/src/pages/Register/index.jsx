import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import ActionButtons from '../../components/ActionButtons';
import Input from '../../components/Input';
import SelectGender from '../../components/SelectGender';
import Loader from '../../components/Loader';

import Form from './styles';

import useErrors from '../../hooks/useErrors';
import isEmailValid from '../../utils/isEmailValid';
import api from '../../services/api';
import isPasswordValid from '../../utils/isPasswordValid';

export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = ((!!email && !!password && !!name && !!birthday) && errors.length === 0);

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'Email inválido.' });
    } else {
      removeError('email');
    }
  }

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório.' });
    } else {
      removeError('name');
    }
  }

  function handleBirthdayChange(event) {
    setBirthday(event.target.value);
  }

  function handleGenderChange(event) {
    setGender(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);

    if (event.target.value && !isPasswordValid(event.target.value)) {
      setError({
        field: 'password', message: `A senha precisa de no mínimo 8 caracteres, uma letra
      minúscula, uma letra maiúscula, um número e um caractere especial.`,
      });
    } else {
      removeError('password');
    }
  }

  async function handleRegister(name, birthday, gender, email, password) {
    try {
      setIsLoading(true);
      await api.post('/new', {
        name, birthday, gender, email, password,
      });
      toast.success('Usuário cadastrado com sucesso!', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      history.push('/');
    } catch (error) {
      toast.error(error.response?.data.error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form>

      <Loader isLoading={isLoading} />

      <h1>Registre-se gratuitamente!</h1>
      <h3>Todos os campos são obrigatórios.</h3>
      <Input
        error={getErrorMessageByFieldName('email')}
        placeholder="E-mail"
        value={email}
        onChange={handleEmailChange}
      />

      <Input
        error={getErrorMessageByFieldName('password')}
        type="password"
        placeholder="Senha"
        value={password}
        onChange={handlePasswordChange}
      />

      <Input
        error={getErrorMessageByFieldName('name')}
        placeholder="Nome Completo"
        value={name}
        onChange={handleNameChange}
      />

      <Input
        type="date"
        placeholder="Data de nascimento"
        value={birthday}
        onChange={handleBirthdayChange}
      />

      <SelectGender
        value={gender}
        onChange={handleGenderChange}
      />

      <ActionButtons
        ButtonText="Cadastrar"
        isFormValid={isFormValid}
        onClick={() => handleRegister(name, birthday, gender, email, password)}
        LinkText="Home"
        LinkPath="/"
      />

    </Form>
  );
}
