/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext } from 'react';

import PropTypes from 'prop-types';
import useAuth from './hooks/useAuth';

import Loader from '../components/Loader';

const Context = createContext();

function AuthProvider({ children }) {
  const {
    authenticated, handleLogin, handleLogout, loading,
  } = useAuth();

  if (loading) {
    return <Loader isLoading={loading} />;
  }

  return (
    <Context.Provider value={{
      authenticated, handleLogin, handleLogout, loading,
    }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
