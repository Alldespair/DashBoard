import React from 'react';
import { Link } from 'react-router-dom';

import './header.sass';

const Header = () => {

  return (
    <div className='header'>
      <div className='logo'>Books</div>
      <ul className='navigation'>
        <li><Link to='/'>Dashboard</Link></li>
        <li><Link to='/addbook'>Add a book</Link></li>
      </ul>
    </div>
  )
};

export default Header