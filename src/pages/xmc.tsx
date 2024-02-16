import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const XrealLogin = () => {
  const navigate = useNavigate(); // useNavigate 훅을 컴포넌트 내부에서 사용

  const [userName, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const handleLogin = async () => {
    try {
      await axios.post("/api/users", {
        uid: crypto.randomUUID(), // TODO: let server give me the uid.
        userName: userName,
        access_token: null,
        access_token_secret: null,
      });
      console.log("login upload success");
      localStorage.setItem("id", uid);
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
