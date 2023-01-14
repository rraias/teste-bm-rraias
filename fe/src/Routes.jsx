import { Switch, Route } from 'react-router-dom';
import { useContext } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import { Context } from './Context/AuthContext';

import Edit from './pages/Edit';
import Home from './pages/Home';
import NewTask from './pages/NewTask';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import Users from './pages/Users';
import Welcome from './pages/Welcome';
import NotFound from './pages/NotFound';

function CustomRoute({ isPrivate, ...rest }) {
  const { authenticated, handleLogout } = useContext(Context);

  if (isPrivate && !authenticated) {
    toast.error('Erro na autentição do usuário!', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    return handleLogout();
  }

  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Switch>
      <CustomRoute exact path="/" component={Home} />
      <CustomRoute path="/new" component={Register} />
      <CustomRoute isPrivate exact path="/welcome/:id" component={Welcome} />
      <CustomRoute isPrivate exact path="/edit/:id" component={Edit} />
      <CustomRoute isPrivate exact path="/:id/users" component={Users} />
      <CustomRoute isPrivate exact path="/:id/tasks" component={Tasks} />
      <CustomRoute isPrivate exact path="/:id/newtask" component={NewTask} />
      <CustomRoute component={NotFound} />
    </Switch>
  );
}

CustomRoute.propTypes = {
  isPrivate: PropTypes.bool,
};

CustomRoute.defaultProps = {
  isPrivate: false,
};
