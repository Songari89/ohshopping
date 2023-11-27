import React from "react";
import styles from "./User.module.css";

export default function User({user}) {
  const {displayName,photoURL } = user;
  return (
    <div className={styles.container}>
      <img src={photoURL} alt={displayName}/>
      <p>{displayName}</p>
    </div>
  );
}
