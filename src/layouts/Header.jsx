import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import { ROUTES } from '../utils/constants';

// https://vast-temple-42123.herokuapp.com/

const Header = ({ cart }) => {
  const [catrItemsCount, setCartItems] = useState(0);

  useEffect(() => {
    setCartItems(cart.itemsList.length);
  }, [cart.itemsList.length]);

  return (
    <>
      <header>
        <div className="wrapper" role="banner">
          <div className="left">
            <h1>Holds</h1>
            <h2>для скелелазних тренажерів</h2>
          </div>
        </div>
      </header>
      <nav>
        <div className="wrapper">
          <div className="left">
            <ul>
              <li>
                <NavLink to="/" className="header-link">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/structures" className="header-link">
                  Рельєфи
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/lcollection" className="header-link">
                  Великі
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="right">
            <NavLink className="header-link" to={ROUTES.cart}>
              Кошик
              {catrItemsCount > 0 && (
                <span className="cart-count">{catrItemsCount}</span>
              )}
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default inject('cart')(observer(Header));
