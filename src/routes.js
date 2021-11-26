import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './pages/Main';
import Repository from './pages/Repository';

export default function ApplicationRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/repos' element={<Main />} />
        <Route path='/repository/:repositoryName' element={<Repository />} />
      </Routes>
    </BrowserRouter>
  );
}
