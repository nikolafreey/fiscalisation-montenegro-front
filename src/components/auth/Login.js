import React from 'react'
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
        password: ''
      }}
      onSubmit={(values) => dispatch(loginUser(values))}
    >
      <Form>
        <InputField
          name="email"
          label={$t('auth.email')}
          placeholder={$t('')}
        />
        <InputField
          name="password"
          label={$t('auth.password')}
          placeholder={$t('')}
        />

        {!!loginError.errors && <div>{loginError.errors.email}</div>}

        <Link to={AUTH.FORGOT}>{$t('auth.zaboravljenaSifra')}</Link>
        
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default Login;
