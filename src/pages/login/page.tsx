import { DynamicIcon } from "@/components/Icon";
import Logo from "@/assets/logo.svg?react";

import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import showAsyncModal from "@/utils/showAsyncModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import * as styles from "./page.css";
import { overlays } from "@/utils/overlays";
import BaseModal from "@/components/modal/BaseModal";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleXLogin = () => {
    showAsyncModal(twitterLogin(), {
      progress: "X에 로그인 중...",
      success: null,
      onSucceed: () => navigate("/home"),
      failure: "로그인 실패!",
    });
  };

  const handleXMCLogin = async () => {
    let un = "";
    await new Promise<void>((res, rej) => {
      overlays.open(({ overlayId }) => {
        const [userName, setUserName] = useState("");
        un = userName;
        return (
          <BaseModal overlayId={overlayId} onBackdropClick={rej}>
            <div>
              <input
                type="text"
                placeholder="사용자 이름"
                required
                autoFocus
                onChange={(e) => setUserName(e.target.value)}
                className={styles.xmcLoginInput}
              />
              <button
                className={styles.xmcLoginSubmitButton}
                disabled={!userName}
                onClick={() => {
                  res();
                  overlays.close(overlayId);
                }}
              >
                로그인
              </button>
            </div>
          </BaseModal>
        );
      });
    });

    await showAsyncModal(xmcLogin(un), {
      progress: "XMC로 로그인 중...",
      success: null,
      onSucceed: () => navigate("/home"),
      failure: "로그인 실패!",
    });
  };

  return (
    <div className={styles.pageContainer}>
      <Logo className={styles.logoImage} />
      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleXLogin}>
          <DynamicIcon className={styles.buttonIcon} id="X-logo" size="small" />
          <span>X로 시작하기</span>
        </button>
        <button className={styles.xmcLoginButton} onClick={handleXMCLogin}>
          XMC 임시 로그인하기
        </button>
      </div>
    </div>
  );
}

function twitterLogin() {
  return new Promise(async (res, rej) => {
    const userCredential = await signInWithPopup(getAuth(), new TwitterAuthProvider()).catch(rej);
    if (!userCredential) return;

    const oauthCredential = TwitterAuthProvider.credentialFromResult(userCredential);
    if (!oauthCredential) return;

    const { secret, accessToken } = oauthCredential;
    const {
      user: { uid, photoURL, displayName },
    } = userCredential;

    if (!secret) throw new Error("secret does not exist!");
    if (!photoURL) throw new Error("photoURL does not exist!");
    if (!accessToken) throw new Error("accessToken does not exist!");
    if (!displayName) throw new Error("displayName does not exist!");

    // local storage에 저장
    localStorage.setItem("id", uid);
    localStorage.setItem("userName", displayName);

    //서버에 올리기
    await axios
      .post("/api/users", {
        uid: uid,
        profileImg: photoURL,
        userName: displayName,
        access_token: accessToken,
        access_token_secret: secret,
      })
      .then(res)
      .catch(rej);
  });
}

function xmcLogin(userName: string) {
  return new Promise(async (res, rej) => {
    const uid = crypto.randomUUID(); // TODO: let server give me the uid.
    localStorage.setItem("id", uid);
    localStorage.setItem("userName", userName);

    await axios
      .post("/api/users", {
        uid,
        userName: userName,
        access_token: "None",
        access_token_secret: "None",
      })
      .then(res)
      .catch(rej);
  });
}
