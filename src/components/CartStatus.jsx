import React from 'react';
import { PiShoppingCartSimple} from 'react-icons/pi'
import styles from './CartStatus.module.css';
import useCart from "../hooks/useCart";

export default function CartStatus() {
  const {cartQuery: {data:products}} = useCart();
  return (
    <div className={styles.container}>
      <p>CART</p>
      <PiShoppingCartSimple className={styles.cart}/>
      {products && products.length > 0 && <p className={styles.count}>{products.length}</p>}
      {/* 장바구니에 제품이 담기지 않으면 data가 없어 undefined를 반환하는데 undefined는 length 속성을 가질 수 없어서 오류가 발생한다. */}
    </div>
  );
}

