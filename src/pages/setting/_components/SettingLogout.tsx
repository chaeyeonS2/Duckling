import ConfirmModal from "@/components/modal/ConfirmModal";
import { overlays } from "@/utils/overlays";
import { getAuth } from "firebase/auth";

import * as styles from "../page.css";
import { useNavigate } from "react-router-dom";

export default function SettingSignout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    overlays.open(({ overlayId }) => (
      <ConfirmModal
        overlayId={overlayId}
        title="로그아웃 하시겠습니까?"
        onYes={async () => {
          await getAuth().signOut();
          navigate("/");
        }}
        noText="취소"
        yesText="로그아웃"
      />
    ));
  };

  return (
    <button className={styles.logoutBtn} onClick={handleLogout}>
      로그아웃
    </button>
  );
}
