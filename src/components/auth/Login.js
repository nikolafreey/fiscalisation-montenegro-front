import React from 'react'
import { Form, Formik } from 'formik';
import $t from '../../lang';
import { useDispatch } from 'react-redux';
import InputField from '../shared/forms/InputField';
import { loginUser } from '../../store/actions/UserActions';

const Login = () => {
  const dispatch = useDispatch();

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
        
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default Login;

