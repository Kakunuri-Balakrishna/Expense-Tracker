import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Modal from 'react-modal'
import { SnackbarProvider } from 'notistack';
Modal.setAppElement('#root')

createRoot(document.getElementById('root')).render(
  <SnackbarProvider maxSnack={1}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SnackbarProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
