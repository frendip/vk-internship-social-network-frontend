import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import './styles/styles.module.scss';
import Registration from './pages/Registration/Registration';
import Login from './pages/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div>main</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<div>not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
