import React from "react";
import styles from "../pages/Main.module.css";
import ShowProducts from "../components/ShowProducts";
import Banner from "../components/Banner";

export default function Main() {
  return (
    <div className={styles.container}>
      <Banner />
      <p>PRODUCTS</p>
      <div className={styles.product}>
        <ShowProducts />
      </div>
    </div>
  );
}
