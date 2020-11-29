import React from 'react'
import { Form, Formik } from 'formik';
import $t from '../../lang';
import { useDispatch } from 'react-redux';
import InputField from '../shared/forms/InputField';
import { resetPassword } from '../../store/actions/UserActions';
import { useRouteMatch } from 'react-router-dom';

const ResetPassword = () => {
  const dispatch = useDispatch();

  const { params } = useRouteMatch();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        password_confirmation: '',
        token: params.token
      }}
      onSubmit={(values) => dispatch(resetPassword(values))}
    >
      <Form>
        <InputField
          name="email"
          label={$t('auth.email')}
          placeholder={$t('')}
          type="email"
        />
        <InputField
          name="password"
          label={$t('auth.password')}
          placeholder={$t('')}
          type="password"
        />
        <InputField
          name="password_confirmation"
          label={$t('auth.password')}
          placeholder={$t('')}
          type="password"
        />
        
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default ResetPassword;