import Icon from "@/components/Icon";
import { useState } from "react";

import * as styles from "./headerLook.css";

export default function HeaderLook() {
  const [currentTab, setCurrentTab] = useState("최신");

  return (
    <header className={styles.header}>
      <div className={styles.tab} onClick={() => setCurrentTab("인기")} aria-selected={currentTab === "인기"}>
        <Icon id="finger-heart" size="medium" />
        <p className={styles.tabText}>인기</p>
      </div>
      <div className={styles.tab} onClick={() => setCurrentTab("최신")} aria-selected={currentTab === "최신"}>
        <Icon id="finger-rock" size="medium" />
        <p className={styles.tabText}>최신</p>
      </div>
    </header>
  );
}
