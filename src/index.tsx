import './index.css';
import './pagination.css';

import React from 'react';
import { render } from 'react-dom';
import { ToastContainer } from 'react-toastify';

import App from './App';

render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode >,
  document.getElementById('root')
);