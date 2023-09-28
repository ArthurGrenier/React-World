import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
      <div className="navigation">
        <ul>
          <NavLink to="/" className={(nav) => nav.isActive ? "nav-active" : ""}>
            <li>home</li>
          </NavLink>
          <NavLink to="/about" className={(nav) => nav.isActive ? "nav-active" : ""}>
            <li>about</li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;