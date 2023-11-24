import React from 'react';
import styles from '../pages/NotFound.module.css'
import {BiSolidMessageSquareError} from 'react-icons/bi';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <p><BiSolidMessageSquareError/>페이지를 찾을 수 없습니다.</p>
    </div>
  );
}

