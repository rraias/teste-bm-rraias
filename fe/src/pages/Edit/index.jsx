import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import useErrors from '../../hooks/useErrors';
import useAuth from '../../Context/hooks/useAuth';

import api from '../../services/api';

import ActionButtons from '../../components/ActionButtons';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import SelectGender from '../../components/SelectGender';

import Form from './styles';

export default function Edit() {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { handleLogout } = useAuth();
  const { id } = useParams();

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (!!errors);

  useEffect(() => {
    async function loadContact() {
      try {
        setIsLoading(true);
        const { data } = await api.get(`/welcome/${id}`);
        setName(data.name);
        setBirthday(data.birthday);
        setGender(data.gender);
      } catch (error) {
        handleLogout();
        toast.error(error.response?.data.error, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } finally {
        setIsLoading(false);
      }
    }
    loadContact();
  }, []);

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório!' });
    } else {
      removeError('name');
    }
  }

  function handleBirthdayChange(event) {
    setBirthday(event.target.value);
    if (!event.target.value) {
      setError({ field: 'birthday', message: 'Data de nascimento é obrigatório!' });
    } else {
      removeError('birthday');
    }
  }

  function handleGenderChange(event) {
    setGender(event.target.value);
  }

  async function editUser(name, birthday, gender) {
    try {
      setIsLoading(true);
      await api.put(`/edit/${id}`, { name, birthday, gender });
      toast.success('Usuário editado com sucesso!', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
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
      <Input
        error={getErrorMessageByFieldName('name')}
        placeholder="Nome"
        value={name}
        onChange={handleNameChange}
      />
      <Input
        error={getErrorMessageByFieldName('birthday')}
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
        ButtonText="Editar"
        isFormValid={isFormValid}
        onClick={() => editUser(name, birthday, gender)}
        LinkText="Voltar"
        LinkPath={`/welcome/${id}`}
      />
    </Form>

  );
}
