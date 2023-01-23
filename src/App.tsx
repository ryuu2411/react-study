import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RouterConfig } from './RouterConfig';

function App() {
  return (
    <BrowserRouter>
      <RouterConfig />
    </BrowserRouter>
  );
}

export default App;
