// import { ARCanvas, ARMarker } from "@artcom/react-three-arjs";
// import { useState } from "react";
// import ReactDOM from "react-dom";

export default function Camera() {
  return <></>;
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
}
