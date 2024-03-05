import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.container}>
          <p className={styles.homeNav}>
            <NavLink to="/">Shop</NavLink>
          </p>
          <button>
            <Link to={"/shopping-card"}>Shopping cart</Link>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
