import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Buyers from './components/Buyers';
import Partneri from './components/Partneri';

function App() {
  return (
    <Provider store={store}>
      <Buyers />
      <Partneri />
    </Provider>
  );
}

export default App;
