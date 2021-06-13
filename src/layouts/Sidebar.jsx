import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => (
  <aside>
    <h1>Каталог</h1>
    <ul role="navigation">
      <li>
        <NavLink to="/" exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/collections/lcollection">Великі</NavLink>
      </li>
      <li>
        <NavLink to="/collections/structures">Рельєфи</NavLink>
      </li>
    </ul>
  </aside>
);

export default Sidebar;
