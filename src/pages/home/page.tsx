import AvatarModelGroup from "@/components/AvatarModelGroup";
import Header from "@/components/layout/headers/Header";
import AvatarCanvas from "@/components/AvatarCanvas";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";

import * as styles from "./page.css";
import MyPost from "./_components/MyPost";
import { DynamicIcon } from "@/components/Icon";

export default function HomePage() {
  return (
    <main className={styles.pageContainer}>
      <Header>
        <Link to={"/share/" + localStorage.getItem("id")}>
          <DynamicIcon id="share" size="medium" />
        </Link>
        <Link to="/deco">
          <DynamicIcon id="clothes" size="medium" />
        </Link>
        <Link to="/setting">
          <DynamicIcon id="settings" size="medium" />
        </Link>
      </Header>
      <AvatarCanvas style={{ transform: `translateY(-56px)` }}>
        <AvatarModelGroup position={[0, -0.05, 0]} />
      </AvatarCanvas>
      <MyPost />
      <Footer />
    </main>
  );
}
