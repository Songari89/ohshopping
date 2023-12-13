import React from "react";
import styles from "../pages/Products.module.css";
import ShowProducts from "../components/ShowProducts";

export default function Products() {
  return (
    <div className={styles.container}>
      <ul className={styles.categories}>
        <li>전체</li>
        <li>상의</li>
        <li>하의</li>
        <li>기타</li>
      </ul>
      <div className={styles.productsbox}>
        <ShowProducts />
      </div>
    </div>
  );
}
