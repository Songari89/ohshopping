import React, { useEffect, useState } from "react";
import styles from "../components/Header.module.css";
import { Link } from "react-router-dom";
import { TbPencilPlus } from "react-icons/tb";
import { login, logout, onUserStateChange } from "../api/firebase";
import User from "./User";

export default function Header() {
  const [user, setUser] = useState();
  useEffect(() => {
    onUserStateChange((user) => setUser(user))
    console.log(user);
  }, []);

  return (
    <div className={styles.container}>
      <Link to="/">
        <img className={styles.logo} src="../logo.svg" alt="Logo" />
      </Link>
      <nav>
        <Link to="/products">PRODUCTS</Link>
        <Link to="/cart">CART</Link>
        <Link to="/newproduct">
          <TbPencilPlus className={styles.pencil} />
        </Link>
        {user && <User user={user}/>}
        {!user && <button onClick={login}>LOGIN</button>}
        {user && <button onClick={logout}>LOGOUT</button>}
      </nav>
    </div>
  );
}
