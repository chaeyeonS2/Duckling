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
        <AvatarCanvas>
          <AvatarModelGroup />
        </AvatarCanvas>
      </div>
      <Mypost />

      <Footer />
    </div>
  );
}
