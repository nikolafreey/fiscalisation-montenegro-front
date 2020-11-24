import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Buyers from './components/Buyers';

function App() {

  return (
    <Provider store={store}>
      <Buyers/>
    </Provider>
  );
}

export default App;
