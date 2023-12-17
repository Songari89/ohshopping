import React from "react";
import styles from "./Cart.module.css";
import { useQuery } from "@tanstack/react-query";
import { getCart} from "../api/firebase";
import { useUserContext } from "../context/UserProvider";
import CartItem from "../components/CartItem";
import PriceCard from "../components/PriceCard";
import { PiPlusCircle, PiEqualsBold } from "react-icons/pi";



export default function Cart() {
  const { uid: userId } = useUserContext();
  const { isLoading, data: products } = useQuery({
    queryKey: [],
    queryFn: () => getCart(userId),
  });
  if (isLoading) {
    return <p>페이지를 읽어오는 중...</p>;
  }

  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce(
      (prev, current) => prev + parseInt(current.price * current.quantity),
      0
    );
  const ShippingPee = totalPrice > 50000 ? 0 : 3000;
  return (
    <div className={styles.section}>
      <p className={styles.mycart}>내 장바구니</p>
      <div className={styles.container}>
        {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
        {hasProducts && (
          <>
            <ul>
              {products &&
                products.map((product) => (
                  <CartItem key={product.id} product={product} userId={userId}/>
                ))}
            </ul>
            <div className={styles.pricebox}>
              <PriceCard text="상품 총액" price={totalPrice} />
              <PiPlusCircle />
              <PriceCard text="배송비" price={ShippingPee} />
              <PiEqualsBold />
              <PriceCard text="총 금액" price={totalPrice + ShippingPee} />
            </div>
            <button className={styles.toorder}>주문하기</button>
          </>
        )}
      </div>
    </div>
  );
}

