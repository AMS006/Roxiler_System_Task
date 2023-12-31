import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { MyContextProvider } from './MyContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyContextProvider >
      <App />
    </MyContextProvider>
  </React.StrictMode>
);

