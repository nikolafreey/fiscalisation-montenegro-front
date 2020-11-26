import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Buyers from './components/Buyers';
import Partneri from './components/Partneri';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <Provider store={store}>
      <Buyers />
      <Partneri />
      <AppRouter />
    </Provider>
  );
}

export default App;
