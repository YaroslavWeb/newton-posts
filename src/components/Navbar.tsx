import React from "react";
import { Link } from "react-router-dom";

export const Navbar: React.FC = () => {
  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper blue darken-1 px1">
          <Link to="/" className="brand-logo center">
            Newton BLOG
          </Link>
        </div>
      </nav>
    </div>
  );
};
