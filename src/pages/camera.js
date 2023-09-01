import React from "react";
import { useNavigate } from "react-router-dom";

const Camera = () => {
  const navigate = useNavigate();

  const homeClick = () => {
    navigate("/home");
  };
  const imageUrl = process.env.PUBLIC_URL + "img/cameraPage.jpg";

  const containerStyle = {
    position: "relative", // 상대적 위치 설정
    width: "100vw",
    height: "100vh",
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const closeButtonStyle = {
    position: "absolute", // 절대적 위치 설정
    top: "20px", // 원하는 위치로 조정
    right: "20px", // 원하는 위치로 조정
    fontSize: "20px",
    cursor: "pointer",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "5px 10px",
    borderRadius: "5px",
  };

  return (
    <div style={containerStyle}>
      <button style={closeButtonStyle} onClick={homeClick}>
        x
      </button>
      {/* 내용이 필요하다면 여기에 추가 */}
    </div>
  );
};

export default Camera;
