import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CookiesProvider } from "react-cookie";
import { Provider } from 'react-redux'
import { store } from './store/store';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './CustomTheme/CustomTheme';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CookiesProvider>        
            <App />
        </CookiesProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
