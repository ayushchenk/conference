import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App/App';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';
import { setupAxios } from './util/Functions';

setupAxios();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);