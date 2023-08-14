import styles from '../css/header/headerLook.module.css';
import React, { useState } from "react";

const HeaderLook = () => {
    // Tab Menu 중 현재 어떤 Tab이 선택되어 있는지 확인하기 위한 currentTab 상태와 currentTab을 갱신하는 함수가 존재해야 하고, 초기값은 0.
  const [currentTab, clickTab] = useState("인기");  //default tap type : 인기 게시물

  const menuArr = [
    { name: '인기', content: 'Tab menu ONE' },
    { name: '최신', content: 'Tab menu TWO' },
  ];

  const selectMenuHandler = (type) => {
    // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
    clickTab(type);
  };

    return (
        <header className={styles.header}>
            <div className={styles.tab} onClick={() => selectMenuHandler("인기")}>
                <img src={process.env.PUBLIC_URL + '/img/looking/popular.png'}></img>
                <text>인기</text>
            </div>
            <div className={styles.tab}>

            </div>
        </header>
        //Look.js에 name 전송
    )
}

export default HeaderLook