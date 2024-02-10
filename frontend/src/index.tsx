import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import '@fontsource/noto-sans-kr/latin-400.css';
import '@fontsource/noto-sans-kr/latin-600.css';
import '@fontsource/noto-sans-kr/latin-700.css';
import '@fontsource/noto-sans-kr/korean-400.css';
import '@fontsource/noto-sans-kr/korean-600.css';
import '@fontsource/noto-sans-kr/korean-700.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
