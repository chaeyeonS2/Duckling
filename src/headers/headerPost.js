import { useState } from 'react';
import styles from "../css/header/header.module.css";
import { Link } from "react-router-dom";


const HeaderPost = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerBtnGroup}>
                <div className={styles.leftBtnGroup}>
                    <button className={styles.btn_close}>
                        <img src={process.env.PUBLIC_URL + "/img/close.png"} img alt="my image"/></button>
                </div>
                <div className={styles.rightBtnGroup}>
                    <button className={styles.btn_check}>
                        <img src={process.env.PUBLIC_URL + "/img/writing/check.png"} /></button>                    
                </div>
                
            </div>
        </header>
    )
}

export default HeaderPost