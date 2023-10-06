<<<<<<< HEAD
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
=======
// import { ARCanvas, ARMarker } from "@artcom/react-three-arjs";
// import { useState } from "react";
// import ReactDOM from "react-dom";

// function Camera() {
//   function Box() {
//     const [selected, setSelected] = useState(false);

//     return (
//       <mesh onClick={() => setSelected(!selected)}>
//         <boxGeometry args={[1, 1, 1]} />
//         <meshStandardMaterial color={selected ? "yellow" : "hotpink"} />
//       </mesh>
//     );
//   }

//   return (
//     <ARCanvas
//       onCameraStreamReady={() => console.log("Camera stream ready")}
//       onCameraStreamError={() => console.error("Camera stream error")}
//       sourceType={"webcam"}
//     >
//       <ambientLight />
//       <pointLight position={[10, 10, 0]} intensity={10.0} />
//       <ARMarker
//         debug={true}
//         params={{ smooth: true }}
//         type={"pattern"}
//         patternUrl={"data/patt.hiro"}
//         onMarkerFound={() => {
//           console.log("Marker Found");
//         }}
//       >
//         <Box />
//       </ARMarker>
//     </ARCanvas>
//   );
// }

// export default Camera;
>>>>>>> 5798e01a669e721d3130f323b449a522954baeda
