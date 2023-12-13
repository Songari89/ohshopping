import React from "react";
import styles from "./User.module.css";

export default function User({ user }) {
  const { displayName, photoURL } = user;
  return (
    <div className={styles.container}>
      {photoURL && (
        <img className={styles.imgbox} src={photoURL} alt={displayName} />
      )}
      {!photoURL && subImage()}
      <p>{displayName}</p>
    </div>
  );
}

function subImage() {
  return <div className={styles.imgbox}></div>;
}
