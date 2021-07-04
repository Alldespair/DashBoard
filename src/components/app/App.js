import React from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';

import './app.sass';

const App = () => {

  return (
    <React.StrictMode>
      <div className='container'>
        <Header />
        <Main />
      </div>
    </React.StrictMode>
  )
};

export default App