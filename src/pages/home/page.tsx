import AvatarModelGroup from "@/components/AvatarModelGroup";
import Header from "@/components/layout/headers/Header";
import AvatarCanvas from "@/components/AvatarCanvas";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";

import * as styles from "./page.css";
import MyPost from "./_components/MyPost";

export default function HomePage() {
  return (
    <main className={styles.pageContainer}>
      <Header>
        <Link to="/share">
          <img src="/img/share.png" />
        </Link>
        <Link to="/deco">
          <img src="/img/home/deco.png" />
        </Link>
        <Link to="/">
          <img src="/img/home/settings.png" />
        </Link>
      </Header>
      <AvatarCanvas>
        <AvatarModelGroup />
      </AvatarCanvas>
      <MyPost />
      <Footer />
    </main>
  );
}
