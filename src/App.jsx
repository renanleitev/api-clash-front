import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import history from './services/history';
import RoutesController from './routes';
import Header from './components/Header/Header';
import GlobalStyle from './config/GlobalStyle';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <BrowserRouter history={history}>
      <Header />
      <RoutesController />
      <GlobalStyle />
      <ToastContainer autoClose={3000} className="toast-container" />
    </BrowserRouter>
  );
}

export default App;
