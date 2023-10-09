import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import * as styles from "./xrealLogin.css";

export default function XrealLogin() {
  const navigate = useNavigate(); // useNavigate 훅을 컴포넌트 내부에서 사용

  const [userName, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const handleLogin = async () => {
    try {
      await axios.post("/api/users", {
        uid: uid,
        profileImg: "/img/home/profile_img.jpg",
        userName: userName,
      });
      console.log("login upload success");
      localStorage.setItem("id", uid);
      localStorage.setItem("profileImg", "/img/home/profile_img.jpg");
      localStorage.setItem("userName", userName);
      navigate("/home");
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };
  return (
    <div className={styles.pageContainer}>
      <input
        type="uid"
        placeholder="UID"
        value={uid}
        onChange={(e) => setUid(e.target.value)}
        className={styles.textInput}
      />
      <input
        type="userName"
        placeholder="userName"
        value={userName}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.textInput}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
