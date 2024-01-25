import ConfirmModal from "@/components/modal/ConfirmModal";
import { overlays } from "@/utils/overlays";
import { deleteUser, getAuth } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { DynamicIcon } from "@/components/Icon";
import AlertModal from "@/components/modal/AlertModal";
import BaseModal from "@/components/modal/BaseModal";
import axios from "axios";
import * as styles from "../page.css";

export default function SettingSignout() {
  const navigate = useNavigate();

  const handleSignout = async () => {
    const isConfirmed = await new Promise((res) =>
      overlays.open(({ overlayId }) => (
        <ConfirmModal
          overlayId={overlayId}
          title="정말 탈퇴하실건가요?"
          onNo={() => {
            res(false);
          }}
          onYes={() => {
            res(true);
          }}
          noText="취소"
          yesText="탈퇴하기"
        />
      ))
    );
    if (!isConfirmed) return;

    const isConfirmedAgain = await new Promise((res) =>
      overlays.open(({ overlayId }) => (
        <ConfirmModal
          overlayId={overlayId}
          title={
            <>
              덕클링 탈퇴시,
              <br />
              계정 정보 복구는 불가능합니다
            </>
          }
          description="덕클링 이력, 덕클링 닉네임, 덕클링 활동 이력이 전부 삭제됩니다."
          logoImgSrc={<DynamicIcon id="warning" size="medium" />}
          onNo={() => {
            res(false);
          }}
          onYes={() => {
            res(true);
          }}
          noText="취소"
          yesText="탈퇴하기"
        />
      ))
    );
    if (!isConfirmedAgain) return;

    const inProgressModal = overlays.open(() => (
      <BaseModal logoImgSrc={<DynamicIcon id="warning" size="medium" />} title="탈퇴중..." />
    ));

    const user = getAuth().currentUser;
    if (!user) {
      overlays.close(inProgressModal);
      overlays.open(({ overlayId }) => (
        <AlertModal
          overlayId={overlayId}
          logoImgSrc={<DynamicIcon id="warning" size="medium" />}
          title="에러! firebase 연동이 예기치 못하게 중단됐습니다."
        />
      ));
      return;
    }

    const gotError = await deleteUser(user).catch((e) => {
      console.log(e);
      return true;
    });
    if (gotError) {
      overlays.close(inProgressModal);
      overlays.open(({ overlayId }) => (
        <AlertModal
          overlayId={overlayId}
          logoImgSrc={<DynamicIcon id="warning" size="medium" />}
          title="에러! firebase 연동 제거 중 예기치 못한 에러가 발생했습니다."
        />
      ));
      return;
    }

    const noError = await axios.delete(`/api/users/${localStorage.getItem("id")}`).catch(console.log);
    if (!noError) {
      overlays.close(inProgressModal);
      overlays.open(({ overlayId }) => (
        <AlertModal
          overlayId={overlayId}
          logoImgSrc={<DynamicIcon id="warning" size="medium" />}
          title="에러! 서버 요청 중 예기치 못한 에러가 발생했습니다."
        />
      ));
      return;
    }

    overlays.close(inProgressModal);
    overlays.open(({ overlayId }) => (
      <AlertModal
        overlayId={overlayId}
        logoImgSrc={<DynamicIcon id="warning" size="medium" />}
        title="탈퇴가 완료되었습니다"
        onClose={() => {
          navigate("/");
        }}
      />
    ));
  };

  return (
    <button className={styles.signoutBtn} onClick={handleSignout}>
      서비스 탈퇴
    </button>
  );
}
