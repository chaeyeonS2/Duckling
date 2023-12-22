import Icon from "@/components/Icon";
import * as styles from "./page.css";
import { overlays } from "@/utils/overlays";
import ConfirmModal from "@/components/modal/ConfirmModal";
import AlertModal from "@/components/modal/AlertModal";
import { useNavigate } from "react-router-dom";
import BaseModal from "@/components/modal/BaseModal";
import { useEffect, useRef, useState } from "react";
import useSWRImmutable from "swr/immutable";
import axios from "axios";
import convertFileToDataUrl from "@/utils/convertFileToDataUrl";
import { getAuth } from "firebase/auth";

export default function SettingPage() {
  const navigate = useNavigate();
  const { data: user, mutate } = useSWRImmutable(`/api/users/${localStorage.getItem("id")}`);

  const handleLogout = () => {
    overlays.open(({ overlayId }) => (
      <ConfirmModal
        title="로그아웃 하시겠습니까?"
        onNo={() => overlays.close(overlayId)}
        onYes={() => {
          overlays.close(overlayId);
          getAuth()
            .signOut()
            .then(() => {
              navigate("/");
            })
            .catch(console.log);
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
              logoImgSrc={<Icon id="warning" size="medium" />}
              description="덕클링 이력, 덕클링 닉네임, 덕클링 활동 이력이 전부 삭제됩니다."
              onNo={() => overlays.close(reallyConfirmId)}
              onYes={async () => {
                overlays.close(reallyConfirmId);
                const inProgressModal = overlays.open(() => (
                  <BaseModal logoImgSrc={<Icon id="warning" size="medium" />} title="탈퇴중..." />
                ));
                await axios.delete(`/api/users/${localStorage.getItem("id")}`);
                overlays.close(inProgressModal);

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

  const inputFileRef = useRef<HTMLInputElement>(null);
  const handleProfileImgClick = () => {
    inputFileRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const overlayId = overlays.open(() => <BaseModal title="프로필 이미지를 변경중입니다" />);
    const file = e.target.files[0];
    const dataUrl = await convertFileToDataUrl(file);
    try {
      await axios.patch(`/api/users/${localStorage.getItem("id")}`, {
        profileImg: dataUrl as string,
      });
    } catch (e) {
      overlays.open(({ overlayId }) => (
        <AlertModal
          logoImgSrc={<Icon id="warning" size="medium" />}
          title="프로필 이미지 변경에 실패했습니다"
          description="잠시 후 다시 시도해주세요"
          onClose={() => {
            overlays.close(overlayId);
          }}
        />
      ));
      return;
    } finally {
      overlays.close(overlayId);
    }

    localStorage.setItem("profileImg", dataUrl as string);
    mutate();
    overlays.open(({ overlayId }) => {
      useEffect(() => {
        setTimeout(() => {
          overlays.close(overlayId);
        }, 3000);
      }, []);
      return <BaseModal title="프로필 이미지가 변경되었습니다" />;
    });
  };

  const [usernameValue, setUsernameValue] = useState(() => user?.userName ?? "");
  const [inputState, setInputState] = useState<"idle" | "invalid" | "confirm">("idle");
  const handleUsernameChange = async () => {
    axios
      .patch(`/api/users/${localStorage.getItem("id")}`, {
        userName: usernameValue,
      })
      .then(() => {
        setInputState("confirm");
        mutate();
      })
      .catch(() => {
        setInputState("invalid");
        mutate();
      });
    localStorage.setItem("userName", usernameValue);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState("idle");
    setUsernameValue(e.target.value);
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Icon id="close" size="medium" onClick={() => navigate(-1)} />
        <p>설정</p>
        <div style={{ width: "24px", height: "24px" }} />
      </header>
      <div className={styles.container}>
        <img src={user?.profileImg ?? ""} alt="" className={styles.avatar} onClick={handleProfileImgClick} />
        <label htmlFor="nicknameInput" className={styles.inputLabel}>
          닉네임
        </label>
        <div className={styles.usernameContainer}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              id="nicknameInput"
              placeholder="닉네임"
              onChange={handleInputChange}
              className={styles.input}
              value={(usernameValue || user?.userName) ?? ""}
            />
            <Icon id="check" size="small" className={styles.inputIcon} aria-hidden={inputState != "confirm"} />
            <Icon id="exclam" size="small" className={styles.inputIcon} aria-hidden={inputState != "invalid"} />
          </div>

          <button className={styles.inputButton} onClick={handleUsernameChange} data-state={inputState}>
            변경하기
          </button>
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

      <input
        ref={inputFileRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        multiple
        onChange={handleAvatarChange}
      />
    </div>
  );
}
