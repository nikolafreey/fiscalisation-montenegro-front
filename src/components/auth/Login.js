import React from 'react';
import { Form, Formik } from 'formik';
import $t from '../../lang';
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../shared/forms/InputField';
import { loginUser } from '../../store/actions/UserActions';
import { loginErrorSelector } from '../../store/selectors/ErrorSelector';
import { Link } from 'react-router-dom';
import { AUTH } from '../../constants/routes';

const Login = () => {
  const dispatch = useDispatch();

  const loginError = useSelector(loginErrorSelector());

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values) => dispatch(loginUser(values))}
    >
      <Form>
        <InputField name="email" obavezno label={$t('auth.email')} />
        <InputField name="password" obavezno label={$t('auth.password')} />

        {!!loginError.errors && <div>{loginError.errors.email}</div>}

        <Link to={AUTH.FORGOT}>{$t('auth.forgotPassword')}</Link>
        <br />
        <button type="submit">Uloguj se</button>
      </Form>
    </Formik>
  );
};

export default Login;
