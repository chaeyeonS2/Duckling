import { DynamicIcon } from "@/components/Icon";
import SettingAvatar from "./_components/SettingAvatar";
import SettingLogout from "./_components/SettingLogout";
import SettingSignout from "./_components/SettingSignout";
import SettingUsername from "./_components/SettingUsername";

import { useNavigate } from "react-router-dom";

import * as styles from "./page.css";

export default function SettingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <DynamicIcon id="cancel" size="medium" onClick={() => navigate(-1)} />
        <p>설정</p>
        <div style={{ width: "24px", height: "24px" }} />
      </header>
      <div className={styles.container}>
        <SettingAvatar />
        <SettingUsername />
      </div>
      <div className={styles.footer}>
        <hr />
        <SettingLogout />
        <SettingSignout />
      </div>
    </div>
  );
}
