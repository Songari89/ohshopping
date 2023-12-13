import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/firebase";
import NotFound from "../pages/NotFound";
import ProductCard from "./ProductCard";
import styles from "./ShowProducts.module.css";

export default function ShowProducts() {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
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
