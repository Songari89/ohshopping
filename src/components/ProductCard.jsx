import React from "react";
import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';

export default function ProductCard({product}) {
  const {id, title, image, price} = product;
  const navigate = useNavigate();
  return (
  <li className={styles.prdlist} onClick={() => {
    navigate(`/products/${id}`, {state:{product}})
  }}> 
    <div className={styles.container}>
      <img src={image} alt={title}/>
      <p className={styles.title}>{title}</p>
      <p className={styles.price}>{`₩${price}`}</p>
    </div>
  </li>);
}
