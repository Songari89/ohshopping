import React, { useState } from "react";
import styles from "./NewProduct.module.css";
import { uploadImage } from "../api/uploader";
import { addNewProduct } from "../api/firebase";
import {useMutation, useQueryClient} from '@tanstack/react-query';

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState(); //file은 value 속성을 가질 수 없고 file의 url이 필요함으로 데이터를 따로 관리해준다.
  const [isUploading, setIsUploading] = useState(false); //초기에는 업로드 중이 아님
  const [success, setSuccess] = useState();
  const queryClient = useQueryClient();
  const addProduct = useMutation({mutationFn:({product, url}) => addNewProduct(product, url), 
    onSuccess: () => queryClient.invalidateQueries(['products']),//queryKey
  }); //addProduct가 호출되면서 받은 객체(product, url를 분해할당)를 addNewProduct에 전달
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      //file폼만 해당 방법으로 상태 업데이트를 해준다.
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    //제품의 사진을 cloudinary에 업로드하고 url을 받아온다.
    //firebase에 새로운 제품(product)을 추가해준다.
    uploadImage(file) //파일의 url을 반환
      .then((url) => {
        addProduct.mutate({product, url}, {
          onSuccess: () => {
            setSuccess('✅ 상품이 등록되었습니다.') 
          setTimeout(() => {
            setSuccess(null)
            setProduct({})
            setFile(null)
          }, 4000);
          }
        })
      })
      .finally(() => 
        setIsUploading(false)
        );
  };
  return (
    <div className={styles.container}>
      <h4>새로운 제품 등록</h4>
      {success && <p className={styles.sucess}>{success}</p>}
      {file && <img src={URL.createObjectURL(file)} alt="옷 이미지" />}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          name="file"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          value={product.title ?? ""}
          placeholder="제품명"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={product.price ?? ""}
          placeholder="가격"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          value={product.category ?? ""}
          placeholder="카테고리"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="제품설명"
          value={product.description ?? ""}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="options"
          value={product.options ?? ""}
          placeholder="옵션들(콤마(,)로 구분)"
          required
          onChange={handleChange}
        />
        <button disabled={isUploading}>
          {isUploading ? `업로드 중...` : `제품 등록하기`}
        </button>
      </form>
    </div>
  );
}
