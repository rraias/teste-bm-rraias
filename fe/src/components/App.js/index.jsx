import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

import Header from '../Header';
import Container from './styles';

import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes./default';

import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from '../../Context/AuthContext';

import Routes from '../../Routes';

export default function App() {
  return (

    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <AuthProvider>
          <GlobalStyles />
          <ToastContainer autoClose={2000} />
          <Container>
            <Header />
            <Routes />
          </Container>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
