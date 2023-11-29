import Icon from "@/components/Icon";
import * as styles from "./page.css";
import { overlays } from "@/overlays";
import ConfirmModal from "@/components/alert/ConfirmModal";
import AlertModal from "@/components/alert/AlertModal";
import { useNavigate } from "react-router-dom";
import BaseModal from "@/components/alert/BaseModal";
import { useEffect } from "react";

export default function SettingPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    overlays.open(({ overlayId }) => (
      <ConfirmModal
        title="로그아웃 하시겠습니까?"
        onNo={() => overlays.close(overlayId)}
        onYes={() => {
          // TODO: 로그아웃 처리
        }}
        noText="취소"
        yesText="로그아웃"
      />
    ));
  };

  const handleSignout = () => {
    overlays.open(({ overlayId: signoutConfirmId }) => (
      <ConfirmModal
        title="정말 탈퇴하실건가요?"
        onNo={() => overlays.close(signoutConfirmId)}
        onYes={() => {
          overlays.close(signoutConfirmId);
          overlays.open(({ overlayId: reallyConfirmId }) => (
            <ConfirmModal
              title={
                <>
                  덕클링 탈퇴시,
                  <br />
                  계정 정보 복구는 불가능합니다
                </>
              }
              description="덕클링 이력, 덕클링 닉네임, 덕클링 활동 이력이 전부 삭제됩니다."
              onNo={() => overlays.close(reallyConfirmId)}
              onYes={() => {
                overlays.close(signoutConfirmId);
                // TODO: 탈퇴 처리
                overlays.open(({ overlayId }) => (
                  <AlertModal
                    logoImgSrc={<Icon id="warning" size="medium" />}
                    title="탈퇴가 완료되었습니다"
                    onClose={() => {
                      overlays.close(overlayId);
                      navigate("/");
                    }}
                  />
                ));
              }}
              noText="취소"
              yesText="탈퇴하기"
            />
          ));
        }}
        noText="취소"
        yesText="탈퇴하기"
      />
    ));
  };

  const handleAvatarChange = () => {
    // TODO: 프로필 사진 변경

    overlays.open(({ overlayId }) => {
      useEffect(() => {
        setTimeout(() => {
          overlays.close(overlayId);
        }, 3000);
      }, []);
      return <BaseModal title="프로필 이미지가 변경되었습니다" />;
    });
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Icon id="close" size="medium" />
        <p>설정</p>
        <div />
      </header>
      <div className={styles.container}>
        <div className={styles.avatar}></div>
        <label htmlFor="nicknameInput" className={styles.inputLabel}>
          닉네임
        </label>
        <div className={styles.inputContainer}>
          <input type="text" id="nicknameInput" placeholder="닉네임" className={styles.input} />
          <button className={styles.inputButton}>변경하기</button>
        </div>
      </div>
      <div className={styles.footer}>
        <hr />
        <button className={styles.logoutBtn} onClick={handleLogout}>
          로그아웃
        </button>
        <button className={styles.signoutBtn} onClick={handleSignout}>
          서비스 탈퇴
        </button>
      </div>
    </div>
  );
}
