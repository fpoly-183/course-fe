import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/containers/ErrorBoundary';
import TheContainer from './components/containers/TheContainer';
import './i18n/config';
import store from './store';

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <TheContainer />
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
