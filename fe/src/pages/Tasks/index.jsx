import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';

import Loader from '../../components/Loader';
import { Container, Task } from './styles';
import Modal from '../../components/Modal';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState('');

  const { id } = useParams();

  const userTasks = useMemo(() => (tasks.filter((task) => (
    task.authorId === id
  ))), [tasks]);

  useEffect(() => {
    async function loadTasks() {
      try {
        setIsLoading(true);
        const { data } = await api.get(`/${id}/tasks`);
        setTasks(data);
      } catch (error) {
        toast.error('Ocorreu um erro', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } finally {
        setIsLoading(false);
      }
    }
    loadTasks();
  }, [stage]);

  function handleExpiredTask(expiresIn) {
    const expireDateInMs = Date.parse(expiresIn);
    const today = Date.now();

    const isExpired = (expireDateInMs - today) < 0;
    return isExpired;
  }

  useEffect(() => {
    tasks.forEach((task) => (handleExpiredTask(task.expiresIn)
      ? toast.error(`A tarefa ${task.title} expirou!`, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 7000,
      }) : null));
  }, []);

  async function handleStageChange(taskId, stage) {
    try {
      setIsLoading(true);
      setStage(stage);
      const task = await api.post(`/${taskId}/updatetask`, { stage });
      setTasks((prevState) => prevState.filter((task) => task.id !== id));
      setTasks((prevState) => [...prevState, task]);
      toast.success('Etapa da tarefa alterada com sucesso!', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (error) {
      toast.error('Ocorreu um erro ao alterar a etapa da tarefa!', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleDeleteTask(task) {
    setIsDeleteModalVisible(true);
    setTaskToDelete(task);
  }

  function handleCloseDeleteTask() {
    setIsDeleteModalVisible(false);
    setTaskToDelete(null);
  }

  async function deleteTask(id) {
    try {
      setIsLoading(true);
      await api.delete(`/${id}/deletetask`, id);
      const { data } = await api.get(`/${id}/tasks`);
      setTasks(data);
      setTaskToDelete(null);
      toast.success('Tarefa deletada com sucesso!', {
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
    <Container>

      <Modal
        danger
        visible={isDeleteModalVisible}
        title={`Tem certeza que deseja deletar a tarefa ${taskToDelete?.title}?`}
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteTask}
        onConfirm={() => deleteTask(taskToDelete?.id)}
        isLoading={isLoading}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>

      <Loader isLoading={isLoading} />

      <h1>Lista de tarefas:</h1>

      <div className="priority">
        <h3>Prioridades:</h3>
        <strong className="high">Alta</strong>
        <strong className="medium">Média</strong>
        <strong className="low">Baixa</strong>
      </div>

      {userTasks.map((task) => (

        <Task
          key={task.id}
          priority={task.priority}
          stage={task.stage}
        >
          <button
            type="button"
            onClick={() => handleDeleteTask(task)}
          >
            X
          </button>
          <h4>
            Tarefa:
            {' '}
            {task.title}
          </h4>
          <small>
            Descrição:
            {' '}
            {task.description}
          </small>
          <div className="execution">
            <p>Etapa de execução:</p>
            <select
              value={task.stage}
              onChange={() => handleStageChange(task.id, event.target.value)}
            >
              <option value="to do">A fazer</option>
              <option value="doing">Fazendo</option>
              <option value="done">Feita</option>
            </select>
          </div>
          <p>
            {handleExpiredTask(task.expiresIn)
              ? `Expirou em: ${task.expiresIn}` : `Irá expirar em: ${task.expiresIn}`}

          </p>
        </Task>
      ))}
      <div className="links">
        <Link to={`/${id}/newtask`}>Cadastrar nova tarefa</Link>
        <Link to={`/welcome/${id}`}>Voltar</Link>
      </div>
    </Container>
  );
}
