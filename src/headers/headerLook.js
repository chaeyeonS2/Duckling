import styles from '../css/header/headerLook.module.css';
import React, { useState } from "react";

const HeaderLook = () => {
    // Tab Menu 중 현재 어떤 Tab이 선택되어 있는지 확인하기 위한 currentTab 상태와 currentTab을 갱신하는 함수가 존재해야 하고, 초기값은 0.
  const [currentTab, clickTab] = useState("최신");  //default tap type : 인기 게시물

  const selectMenuHandler = (type) => {
    // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
    //console.log(type);
    clickTab(type);
  };


    return (
        <header className={styles.header}>
            {/* 선택 시 className에 {styles.focused} 추가 */}
            <div className={`${styles.tab} ${currentTab === "인기" ? styles.focused : ''}`}
                 onClick={() => selectMenuHandler("인기")}>
                <img src={currentTab === "인기" ? process.env.PUBLIC_URL + '/img/looking/popular.png' : process.env.PUBLIC_URL + '/img/looking/popular_non.png'}></img>
                <text>인기</text>
            </div>
            {/* 선택 시 className에 {styles.focused} 추가 */}
            <div className={`${styles.tab} ${currentTab === "최신" ? styles.focused : ''}`}
                 onClick={() => selectMenuHandler("최신")}>
                <img src={currentTab === "최신" ? process.env.PUBLIC_URL + '/img/looking/new.png' : process.env.PUBLIC_URL + '/img/looking/new_non.png'}></img>
                <text>최신</text>
            </div>
        </header>
    )
}

export default HeaderLook