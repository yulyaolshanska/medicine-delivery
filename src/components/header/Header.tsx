import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <nav className={styles.container}>
          <p className={styles.homeNav}>
            <NavLink to="/">Shop</NavLink>
          </p>
          <p className={styles.homeNav}>
            <NavLink to="/shopping-card">Shopping cart</NavLink>
          </p>
        </nav>
      </div>
    </header>
  );
};

export default Header;
