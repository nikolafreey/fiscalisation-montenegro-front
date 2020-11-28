import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import AppRouter from './routes/AppRouter';
import { authService } from './services/AuthService';
import { getUser } from './store/actions/UserActions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (authService.isAuthenticated())
      dispatch(getUser());
  }, [dispatch]);
  
  return (
    <AppRouter />
  );
}

export default App;
