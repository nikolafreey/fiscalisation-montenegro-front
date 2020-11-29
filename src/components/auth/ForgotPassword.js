import React from 'react'
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
        email: ''
      }}
      onSubmit={(values) => dispatch(forgotPassword(values))}
    >
      <Form>
        <InputField
          name="email"
          label={$t('auth.email')}
          placeholder={$t('')}
          type="email"
        />
        
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default ForgotPassword;

