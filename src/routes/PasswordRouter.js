import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import ForgotPassword from '../components/auth/ForgotPassword';
import ResetPassword from '../components/auth/ResetPassword';
import ForgotPasswordSuccess from '../components/auth/ForgotPasswordSuccess';
import { AUTH, ERRORS } from '../constants/routes';

const PasswordRouter = () => {
  return (
    <Switch>
       <Route path={AUTH.FORGOT_SUCCESS}>
        <ForgotPasswordSuccess />
      </Route>
      <Route path={AUTH.FORGOT}>
        <ForgotPassword />
      </Route>
      <Route path={AUTH.RESET_SUCCESS}>
        <ForgotPasswordSuccess />
      </Route>
      <Route path={AUTH.RESET}>
        <ResetPassword />
      </Route>
      <Redirect to={ERRORS.NOT_FOUND} />
    </Switch>
  )
}

export default PasswordRouter
