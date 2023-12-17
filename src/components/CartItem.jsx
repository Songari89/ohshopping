import React from "react";
import styles from "./CartItem.module.css";
import { LuMinusSquare, LuPlusSquare } from "react-icons/lu";
import {TbTrashXFilled} from 'react-icons/tb'
import { addOrUpdateToCart, removeFromCart } from "../api/firebase";

export default function CartItem({ product , userId }) {
  const { id, title, image, option, price, quantity } = product;
  const handleMinus = () => {
    if(product.length < 2) return;
    addOrUpdateToCart(userId, {...product, quantity: quantity - 1})
  };
  const handlePlus = () => {addOrUpdateToCart(userId, { ...product, quantity: quantity + 1 });};
  const handleDelete = () => {removeFromCart(userId, id)};
  return (
    <li className={styles.item}>
      <img className={styles.image} src={image} alt={title} />
      <div className={styles.productinfo}>
        <p className={styles.title}>
          {title}
        </p>
        <p>
          {option}
        </p>
        <p>
          {quantity}
        </p>
        <p className={styles.price}>
          ₩{price}
        </p>
      </div>
      <div className={styles.quantitybox}>
        <LuMinusSquare className={styles.quantitybtn} onClick={handleMinus} />
        <span className={styles.quantity}>{quantity}</span>
        <LuPlusSquare className={styles.quantitybtn} onClick={handlePlus} />
        <TbTrashXFilled className={styles.quantitybtn} onClick={handleDelete} />
      </div>
    </li>
  );
}
