import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'contexts/SnackbarContext';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <SnackbarProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
