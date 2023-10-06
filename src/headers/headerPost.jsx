import { useState } from "react";
import styles from "../css/header/header.module.css";
import { useNavigate } from "react-router-dom";

const HeaderPost = (props) => {
  const navigate = useNavigate();

  const checkClick = () => {
    props.uploadClick();
  };

  const closeClick = () => {
    //props.closeModal();
    navigate(-1);
  };
  return (
    <header className={styles.header}>
      <div className={styles.headerBtnGroup}>
        <div className={styles.leftBtnGroup}>
          <button className={styles.btn_close} onClick={closeClick}>
            <img src={"/img/close.png"} img alt="my image" />
          </button>
        </div>
        <div className={styles.rightBtnGroup}>
          <button className={styles.btn_check} onClick={checkClick}>
            <img src={"/img/writing/check.png"} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderPost;
