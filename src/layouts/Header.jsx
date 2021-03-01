import React from "react";
import { NavLink } from 'react-router-dom'

const Header = () => (
  <>
    <header>
      <div className="wrapper" role="banner">
        <div className="left">
          <h1>Holds</h1>
          <h2>для скалолазных тренажеров</h2>
        </div>
      </div>
    </header>
    <nav>
      <div className="wrapper">
        <div className="left">
          <ul>
            <li>
              <NavLink to="/" className="header-link">
              Home</NavLink>
            </li>
            <li>
              <NavLink to="/main" className="header-link">
              Main</NavLink>
            </li>
          </ul>
        </div>
        <div className="right">
          <span className="header-link">Cart</span>
        </div>
      </div>
    </nav>
  </>
)

export default Header;