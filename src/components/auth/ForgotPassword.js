import React from 'react';
import { Form, Formik } from 'formik';
import $t from '../../lang';
import { useDispatch } from 'react-redux';
import InputField from '../shared/forms/InputField';
import { forgotPassword } from '../../store/actions/UserActions';

const ForgotPassword = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      onSubmit={(values) => dispatch(forgotPassword(values))}
    >
      <Form>
        <InputField
          name="email"
          obavezno
          label={$t('auth.forgot_password')}
          placeholder={$t('auth.forgot_password')}
          type="email"
        />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default ForgotPassword;
