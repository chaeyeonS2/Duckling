import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.svg?react";
import Icon from "@/components/Icon";
import axios from "axios";

import * as styles from "./page.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleUpload = async (
    userID: string,
    photoURL: string,
    userName: string,
    token: string,
    secret: string
    // access_token: string,
    // access_token_secret: string
  ) => {
    try {
      await axios.post("/api/users", {
        uid: userID,
        profileImg: photoURL,
        userName: userName,
        access_token: token,
        access_token_secret: secret,
        // access_token: ,
        // access_token_secret: secret,
      });
      console.log("login upload success");
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  const twitterLogin = () => {
    // Twitter 로그인 팝업 띄우기
    const provider = new TwitterAuthProvider();
    console.log("provider: ", provider);
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        //This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        //You can use these server side with your app's credentials to access the Twitter API.
        const credential = TwitterAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
          const secret = credential.secret;
          console.log(credential);
          console.log("token:", token);
          console.log("secret:", secret);

          // 로그인 성공 시, Firebase 사용자 객체에서 필요한 정보를 가져옴
          const user = result.user;
          const userID = user.uid;
          const userName = user.displayName;
          const photoURL = user.photoURL; //tiwtter 프로필 사진 가져옴
          //const accessToken = user.accessToken;

          console.log("Firebase result:", result);

          if (!userName) throw new Error("userName does not exist!");
          if (!photoURL) throw new Error("photoURL does not exist!");

          // local storage에 저장
          localStorage.setItem("id", userID);
          localStorage.setItem("profileImg", photoURL);
          localStorage.setItem("userName", userName);

          //서버에 올리기
          if (token !== undefined && secret !== undefined) {
            handleUpload(userID, photoURL, userName, token, secret);
          }

          if (user != null) {
            navigate("/home");
          }
        }
      })
      .catch((error) => {
        console.error("Twitter 로그인 에러:", error);
      });
  };

  return (
    <div className={styles.pageContainer}>
      <Logo className={styles.logoImage} />
      <button className={styles.button} onClick={twitterLogin}>
        <Icon className={styles.buttonIcon} id="x-logo" size="small" />
        <span>X로 시작하기</span>
      </button>
    </div>
  );
}
