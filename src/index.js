import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'
import { BUGSNAG_KEY } from './config';

Bugsnag.start({
  enabledReleaseStages: [ 'production', 'staging' ],
  apiKey: BUGSNAG_KEY,
  plugins: [new BugsnagPluginReact()]
});

const ErrorBoundary = Bugsnag.getPlugin('react')
  .createErrorBoundary(React);

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
