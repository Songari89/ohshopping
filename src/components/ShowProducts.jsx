import React from "react";
import NotFound from "../pages/NotFound";
import ProductCard from "./ProductCard";
import styles from "./ShowProducts.module.css";
import useProducts from "../hooks/useProducts";

export default function ShowProducts() {
  const {getProducts: {isLoading, error, data: products}} = useProducts();
  return (
    <div className={styles.container}>
      {isLoading && <p>페이지를 읽어오는 중...</p>}
      {error && <NotFound />}
      <ul className={styles.lists}>
        {console.log(products)}
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </div>
  );
}
