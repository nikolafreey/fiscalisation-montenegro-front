import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AppLayout from './components/layout/AppLayout';
import AppRouter from './routes/AppRouter';
import { authService } from './services/AuthService';
import { getUser } from './store/actions/UserActions';
import './main.scss';

import i18n from 'i18n-js';
import ScrollToTop from './routes/ScrollToTop';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCsrfCookie();
    if (authService.isAuthenticated()) dispatch(getUser());
  }, [dispatch]);

  const [language, setLanguage] = useState('sr');
  i18n.locale = language;

  return (
    <AppLayout>
      <ScrollToTop />
      <AppRouter />
    </AppLayout>
  );
}

export default App;
