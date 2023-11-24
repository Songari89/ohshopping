import React from "react";
import styles from "../components/Header.module.css";
import { Link } from "react-router-dom";
import { TbPencilPlus } from "react-icons/tb";

export default function Header() {
  return (
    <div className={styles.container}>
      <Link to="/">
        <img className={styles.logo} src="../logo.svg" alt="Logo" />
      </Link>
      <div className={styles.menu}>
        <Link to="/products">PRODUCTS</Link>
        <Link to="/cart">CART</Link>
        <Link to="/newproduct">
          <TbPencilPlus className={styles.pencil} />
        </Link>
        <Link>LOG IN</Link>
      </div>
    </div>
  );
}
