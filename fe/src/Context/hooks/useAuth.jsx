import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin(email, password) {
    try {
      setLoading(true);

      if (!email || !password) {
        return toast.error('Sem email ou senha!', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }

      const response = await api.post('/auth', { email, password });
      const { id, token } = response.data;

      localStorage.setItem('token', JSON.stringify(token));
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
      history.push(`/welcome/${id}`);
    } catch (error) {
      toast.error(error.response.data.error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
    history.push('/');
  }

  return {
    loading, authenticated, handleLogin, handleLogout,
  };
}
