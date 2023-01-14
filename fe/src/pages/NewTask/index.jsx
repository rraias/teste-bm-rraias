import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import useErrors from '../../hooks/useErrors';

import Form from './style';
import ActionButtons from '../../components/ActionButtons';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import Select from '../../components/Select';

import api from '../../services/api';

export default function NewTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('high');
  const [expiresIn, setExpiresIn] = useState('');
  const [stage, setStage] = useState('to-do');
  const [isLoading, setIsLoading] = useState(true);

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const { id } = useParams();

  const isFormValid = ((!!title && !!description && !!expiresIn) && errors.length === 0);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  function handleTitleChange(event) {
    setTitle(event.target.value);
    if (!event.target.value) {
      setError({ field: 'title', message: 'Título é obrigatório.' });
    } else {
      removeError('title');
    }
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
    if (!event.target.value) {
      setError({ field: 'description', message: 'Descrição é obrigatório.' });
    } else {
      removeError('description');
    }
  }

  function handlePriorityChange(event) {
    setPriority(event.target.value);
  }

  function handleExpiresInChange(event) {
    setExpiresIn(event.target.value);
    if (!event.target.value) {
      setError({ field: 'expiresIn', message: 'Insira a validade da tarefa!' });
    } else {
      removeError('expiresIn');
    }
  }

  function handleStageChange(event) {
    setStage(event.target.value);
  }

  async function handleRegisterTask(id, {
    title, description, priority, expiresIn, stage,
  }) {
    try {
      setIsLoading(true);
      await api.post(`/${id}/newtask`, {
        id, title, description, priority, expiresIn, stage,
      });
      toast.success('Tarefa cadastrada com sucesso!', {
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

      <h1>Cadastrar tarefa</h1>
      <h3>Todos os campos são obrigatórios.</h3>
      <Input
        error={getErrorMessageByFieldName('title')}
        placeholder="Título"
        value={title}
        onChange={handleTitleChange}
      />

      <Input
        error={getErrorMessageByFieldName('description')}
        placeholder="Descrição"
        value={description}
        onChange={handleDescriptionChange}
      />

      <div className="priority">
        <p>Prioridade:</p>
        <Select
          value={priority}
          onChange={handlePriorityChange}
        >
          <option value="high">Alta</option>
          <option value="medium">Média</option>
          <option value="low">Baixa</option>
        </Select>
      </div>

      <div className="expires-in">
        <p>Expira em:</p>
        <Input
          type="date"
          value={expiresIn}
          onChange={handleExpiresInChange}
        />
      </div>

      <div className="stage">
        <p>Etapa:</p>
        <Select
          value={stage}
          onChange={handleStageChange}
        >
          <option value="to-do">A fazer</option>
          <option value="doing">Fazendo</option>
          <option value="done">Feita</option>
        </Select>
      </div>

      <ActionButtons
        ButtonText="Cadastrar"
        onClick={() => handleRegisterTask(id, {
          title, description, priority, expiresIn, stage,
        })}
        isFormValid={isFormValid}
        LinkText="Voltar"
        LinkPath={`/${id}/tasks`}
      />

    </Form>
  );
}
