import { Link, useParams } from "react-router-dom";

import * as styles from "../home/page.css";
import AvatarCanvas from "@/components/AvatarCanvas";
import AvatarModelGroup from "@/components/AvatarModelGroup";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/headers/Header";

export default function UsernamePage() {
  const { userID } = useParams();

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
        <AvatarModelGroup userId={userID ?? null} />
      </AvatarCanvas>
      <Footer />
    </main>
  );
}
