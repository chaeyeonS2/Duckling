import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.svg?react";
import { DynamicIcon } from "@/components/Icon";
import axios from "axios";

import * as styles from "./page.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    twitterLogin()
      .then(() => navigate("/home"))
      .catch(console.log);
  };

  return (
    <div className={styles.pageContainer}>
      <Logo className={styles.logoImage} />
      <button className={styles.button} onClick={handleLoginClick}>
        <DynamicIcon className={styles.buttonIcon} id="X-logo" size="small" />
        <span>X로 시작하기</span>
      </button>
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
    localStorage.setItem("profileImg", photoURL);
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
