import { StrictMode, Suspense } from 'react'
import React from 'react';
import  ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import i18n from './i18n'; // import i18n initialization
import { I18nextProvider } from 'react-i18next';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   <Suspense fallback= {<div>Loading translations......</div>}>
      <I18nextProvider i18n={i18n}>
         <App />
     </I18nextProvider>
   </Suspense>
  </React.StrictMode>
 
);

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { I18nextProvider } from 'react-i18next';
// import i18n from './i18n'; // your i18n setup file
// import App from './App.jsx';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <I18nextProvider i18n={i18n}>
//       <App />
//     </I18nextProvider>
//   </React.StrictMode>
// );
