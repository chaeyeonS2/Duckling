import { auth } from "../firebase/config";
import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const XrealLogin = () => {
  const navigate = useNavigate(); // useNavigate 훅을 컴포넌트 내부에서 사용

  const [userName, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uid, setUid] = useState("");
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://us-central1-netural-app.cloudfunctions.net/api/users",
        {
          uid: uid,
          profileImg: process.env.PUBLIC_URL + "/img/home/profile_img.jpg",
          userName: userName,
          userAvatar: {
            eyes: "",
            mouth: "",
            top: "",
            bottom: "",
            accessory: "",
            shoes: "",
          },
        },
      );
      console.log("login upload success");
      localStorage.setItem("id", uid);
      localStorage.setItem(
        "profileImg",
        process.env.PUBLIC_URL + "/img/home/profile_img.jpg",
      );
      localStorage.setItem("userName", userName);
      navigate("/home");
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <input
        type="uid"
        placeholder="UID"
        value={uid}
        onChange={(e) => setUid(e.target.value)}
        style={{ marginBottom: "10px" }} // 마진 추가
      />
      <input
        type="userName"
        placeholder="userName"
        value={userName}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: "10px" }} // 마진 추가
      />
      {/* <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: '10px' }} // 마진 추가
      /> */}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
export default XrealLogin;
