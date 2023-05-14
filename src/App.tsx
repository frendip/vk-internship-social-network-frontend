import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/styles.module.scss';
import AppRouter from './components/AppRouter/AppRouter';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
