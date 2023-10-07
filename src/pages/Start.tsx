import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();
  //4초 뒤 화면 전환
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/login");
    }, 4000);
    // 컴포넌트 언마운트 시 타이머 클리어
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  // TODO: page style 따로 css module로 분리하기
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#BDFF6B",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div>
        <img
          style={{
            width: "90vw",
            height: "50%",
            marginTop: "20vh",
            objectFit: "contain",
          }}
          src={"/img/login/loadingGif.gif"}
        />
        {/* 로딩 이미지 넣을 자리 */}
      </div>
    </div>
  );
};
export default Start;
