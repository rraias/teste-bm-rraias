import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';

import api from '../../services/api';

import { Context } from '../../Context/AuthContext';

import Container from './styles';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const { handleLogout } = useContext(Context);

  const { id } = useParams();

  useEffect(
    () => {
      async function loadUsers() {
        try {
          setIsLoading(true);
          const { data } = await api.get('/users');
          setUsers(data);
        } catch (error) {
          toast.error(error.response.data.error, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } finally {
          setIsLoading(false);
        }
      }
      loadUsers();
    },
    [],
  );

  function transformBirthdayToAge(birthday) {
    const birthdayInMs = Date.parse(birthday);
    const today = Date.now();

    const diff = Math.abs(today - birthdayInMs);
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    return age;
  }

  function handleDeleteUser(user) {
    setIsDeleteModalVisible(true);
    setUserToDelete(user);
  }

  function handleCloseDeleteUser() {
    setIsDeleteModalVisible(false);
    setUserToDelete(null);
  }

  async function deleteUser(idToDelete, userCallerId) {
    try {
      setIsLoading(true);
      await api.delete(`/delete/${idToDelete}`);

      if (idToDelete === parseInt(userCallerId, 10)) {
        handleLogout();
        return toast.error('Você deletou seu próprio usuário. Cadastre-se Novamente!', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
      const { data } = await api.get('/users');
      setUsers(data);
      setUserToDelete(null);
      toast.success('Usuário deletado com sucesso!', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (error) {
      toast.error(error.response?.data.error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } finally {
      setIsDeleteModalVisible(false);
      setIsLoading(false);
    }
  }

  return (
    <>
      <Container>

        <Loader isLoading={isLoading} />

        <Modal
          danger
          visible={isDeleteModalVisible}
          title={`Tem certeza que deseja deletar o usuário ${userToDelete?.name}?`}
          confirmLabel="Deletar"
          onCancel={handleCloseDeleteUser}
          onConfirm={() => deleteUser(userToDelete?.id, id)}
          isLoading={isLoading}
        >
          <p>Esta ação não poderá ser desfeita!</p>
        </Modal>

        {users.map((user) => (
          <div key={user.id} className="user">

            <div className="delete">
              <button
                type="button"
                onClick={() => handleDeleteUser(user)}
              >
                Excluir

              </button>
            </div>

            <div className="user-infos">
              <p>
                <span>Nome:</span>
                {' '}
                {user.name}
              </p>
              <p>
                <span>Email:</span>
                {' '}
                {user.email}
              </p>
              <p>
                <span>Idade:</span>
                {' '}
                {transformBirthdayToAge(user.birthday)}
                {' '}
                anos
              </p>
            </div>

          </div>
        ))}
      </Container>
      <Link to={`/welcome/${id}`}>Voltar</Link>
    </>

  );
}
