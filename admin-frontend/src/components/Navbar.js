import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {

  const logout = () => {
    console.log("logged out!")
    // localStorage.setItem('accToken', "");
    localStorage.removeItem('accToken');
  }

  return (
    <div>
      <header className="main-header">
        <div>
          {/* <button className="toggle-button"> */}
            {/* <span className="toggle-button__bar"></span>
            <span className="toggle-button__bar"></span>
            <span className="toggle-button__bar"></span> */}
            
            {/* <Link to="/">Home</Link> */}
          {/* </button> */}
          <a href="/" className="main-header__brand">
          </a>
        </div>
        <nav className="main-nav">
          <ul className="main-nav__items">
            <li className="main-nav__item">
              <Link to="/blogs">Blogs</Link>
            </li>
            
            <li className="main-nav__item">
              <Link to="/about">About</Link>
            </li>
            
            <li className="main-nav__item main-nav__item--cta">
              <Link to="/" onClick={logout}>Log out</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
