import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ItemProvider } from './hooks/useItems';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <ItemProvider>
      <App />
    </ItemProvider>
);