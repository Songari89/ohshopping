import React from "react";
import styles from './Banner.module.css';

export default function Banner() {
  return (
    <div className={styles.container}>
      <img className={styles.banner} src="../image/banner.jpeg" alt="banner" />
      <div className={styles.text}>
        <p className={styles.head}>Valentino Online Boutique</p>
        <p className={styles.sub}>Meet Valentino at Your home.</p>
      </div>
    </div>
  );
}
