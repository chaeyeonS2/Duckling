// const shareToTwitter = () => {
//     const sharedLink =
//       "text=" + encodeURIComponent(title + " \n ") + encodeURIComponent(url);
//     openWidnow(`https://twitter.com/intent/tweet?${sharedLink}`);
//   };
import AvatarModelGroup from "@/components/AvatarModelGroup";
import AvatarCanvas from "@/components/AvatarCanvas";
import { useEffect, useRef } from "react";
import { button } from "../deco/page.css";
import { RootState } from "@react-three/fiber";

export default function SharePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const rootStateRef = useRef<RootState>(null!);
  useEffect(() => {
    if (canvasRef.current == null) return;
    if (rootStateRef.current == null) return;
    rootStateRef.current.gl.render(rootStateRef.current.scene, rootStateRef.current.camera);
    console.log(canvasRef.current.toDataURL());
  }, []);

  return (
    <div>
      <div
        style={{
          margin: "45px 50px",
          border: "1px solid #000",
          boxShadow: "2px 2px",
        }}
      >
        <div className="content" style={{ width: "100%", height: "100%" }}>
          <AvatarCanvas ref={rootStateRef} canvasRef={canvasRef}>
            <AvatarModelGroup />
          </AvatarCanvas>
        </div>
      </div>
      <div
        style={{
          margin: "70px 60px",
          display: "flex",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <button className={button} aria-selected>
          Save
        </button>
        <button className={button}>twitter</button>
      </div>
    </div>
  );
}
