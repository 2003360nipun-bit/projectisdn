import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ links  }) {
  return (
    <div className="sidebar">
      <h3>Navigation</h3>
      {links.map(l => (
        <NavLink key={l.to} to={l.to} end className={({isActive}) => isActive ? "active" : ""}>
          {l.label}
        </NavLink>
      ))}
    </div>
  );
}

