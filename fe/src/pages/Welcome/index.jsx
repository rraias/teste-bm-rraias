import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';

import { toast } from 'react-toastify';

import Container from './styles';

import { Context } from '../../Context/AuthContext';

import api from '../../services/api';
import Loader from '../../components/Loader';

export default function Welcome() {
  const [name, setName] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const { handleLogout } = useContext(Context);

  useEffect(() => {
    async function getUserName() {
      try {
        setIsLoading(true);
        const { data } = await api.get(`/welcome/${id}`);
        setName(data.name);
      } catch (error) {
        toast.error(error.response?.data.error, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    }
    getUserName();
  }, []);

  function handleClickLogout() {
    handleLogout();
    toast.success('Deslogado com sucesso!', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  }
  return (
    <Container>

      <Loader isLoading={isLoading} />

      <h1>
        Seja bem vindo,
        {' '}
        {name}
      </h1>

      <div className="actions">
        <Link to={`/edit/${id}`}>Editar perfil</Link>
        <Link to={`/${id}/users`}>Ver usuários cadastrados</Link>
        <Link to={`/${id}/tasks`}>Tarefas</Link>
        <button
          type="button"
          onClick={handleClickLogout}
        >
          Sair

        </button>
      </div>

    </Container>
  );
}
