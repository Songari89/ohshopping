import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./ProductDetail.module.css";
import useCart from "../hooks/useCart";


export default function ProductDetail() {
  const {addOrUpdateItem} = useCart();
  const location = useLocation();
  const { id, title, image, options, price, category, description } =
    location.state.product;
  const [selected, setSelected] = useState();
  const [success, setSuccess] = useState(""); 
  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = (e) => {
    //장바구니에 product와 selected 전달하기
    if (!selected) {
      alert("옵션을 선택하세요.");
      return;
    }
    const product = { id, image, title, price, option: selected, quantity: 1 };
    // const product = {...location.state.product, option: selected, quantity: 1}
    addOrUpdateItem.mutate(product);
    setSuccess('✅ 상품이 장바구니에 담겼습니다.')
    setTimeout(() => {
      setSuccess(null)
    }, 3000)
  };
  // const { state : {
  //   product: {id, image, title, options, category,price, description}
  // }} = useLocation();
  return (
    <div className={styles.container}>
      <p className={styles.category}>{category}</p>
      <div className={styles.prdbox}>
        <img src={image} alt={title} />
        <div className={styles.prdinfo}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.price}>₩{price}</p>
          <p className={styles.description}>{description}</p>
          <div className={styles.optionbox}>
            <label className={styles.option} htmlFor="option">
              옵션:
            </label>
            <select
              className={styles.userselect}
              id="option"
              onChange={handleSelect}
              value={selected}
              defaultValue="defaultvalue"
            >
              <option hidden value="defaultvalue">
                --- 선택 ---
              </option>
              {options &&
                options.map(
                  (
                    option,
                    index //동적으로 변경되는 배열 데이터는 절대 index를 키로 사용해서는 안된다. 다만 지금처럼 options를 처음 한번만 읽어오는 것이라면(변경될 상황이 아니라면) 예외적으로 인덱스를 키로 사용하는 것이 가능.
                  ) => <option key={index}>{option}</option>
                )}
            </select>
          </div>
          <div className={styles.selectedbox}>
            <p className={styles.check}>선택한 상품:</p>
            {selected && (
              <>
                <p>{title}</p>
                <p>{selected}</p>
                <p>₩{price}</p>
              </>
            )}
          </div>
          {success && <p className={styles.success}>{success}</p>}
          <button className={styles.tocart} onClick={handleClick}>
            장바구니에 담기
          </button>
        </div>
      </div>
    </div>
  );
}
