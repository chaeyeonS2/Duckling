import * as styles from "./headerLook.css";
import { useState } from "react";

export default function HeaderLook() {
  const [currentTab, setCurrentTab] = useState("최신");

  const selectMenuHandler = (type: string) => {
    setCurrentTab(type);
  };

  return (
    <header className={styles.header}>
      {/* 선택 시 className에 {styles.focused} 추가 */}
      <div
        className={`${styles.tab} ${currentTab === "인기" ? styles.focused : ""}`}
        onClick={() => selectMenuHandler("인기")}
      >
        <img src={currentTab === "인기" ? "/img/looking/popular.png" : "/img/looking/popular_non.png"}></img>
        <p className={`${styles.tabText} ${currentTab === "인기" ? styles.focusedText : ""}`}>인기</p>
      </div>
      {/* 선택 시 className에 {styles.focused} 추가 */}
      <div
        className={`${styles.tab} ${currentTab === "최신" ? styles.focused : ""}`}
        onClick={() => selectMenuHandler("최신")}
      >
        <img src={currentTab === "최신" ? "/img/looking/new.png" : "/img/looking/new_non.png"}></img>
        <p className={`${styles.tabText} ${currentTab === "인기" ? styles.focusedText : ""}`}>최신</p>
      </div>
    </header>
  );
}
