import React, { useContext, useEffect, useState } from "react";
import styles from "../components/Header.module.css";
import { Link } from "react-router-dom";
import { TbPencilPlus } from "react-icons/tb";
import User from "./User";
import { useUserContext } from "../context/UserProvider";

export default function Header() {
  const { user, login, logout } = useUserContext();
  return (
    <div className={styles.container}>
      <Link to="/">
        <img className={styles.logo} src="../logo.svg" alt="Logo" />
      </Link>
      <nav>
        <Link to="/products">PRODUCTS</Link>
        {user && <Link to="/cart">CART</Link>}
        {user && user.isAdmin && (
          <Link to="/newproduct">
            <TbPencilPlus className={styles.pencil} />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <button onClick={login}>LOGIN</button>}
        {user && <button onClick={logout}>LOGOUT</button>}
      </nav>
    </div>
  );
}
