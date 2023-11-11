import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/headers/Header";

import "@/css/customBottomSheet.css";
import Mypost from "./_components/MyPost";
import AvatarModelGroup from "@/components/AvatarModelGroup";
import AvatarCanvas from "@/components/AvatarCanvas";

export default function HomePage() {
  return (
    <div>
      <Header />
      <div
        className="content"
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: "url(/img/home/background.png)",
        }}
      >
        <AvatarCanvas style={{ background: "transparent", position: "absolute", width: "100%", height: "100%" }}>
          <AvatarModelGroup />
        </AvatarCanvas>
      </div>
      <Mypost />

      <Footer />
    </div>
  );
}
