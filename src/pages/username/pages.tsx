import { Link, useParams } from "react-router-dom";

import * as styles from "../home/page.css";
import AvatarCanvas from "@/components/AvatarCanvas";
import AvatarModelGroup from "@/components/AvatarModelGroup";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/headers/Header";
import { DynamicIcon } from "@/components/Icon";

export default function UsernamePage() {
  const { userID } = useParams();

  return (
    <main className={styles.pageContainer}>
      <Header>
        <Link to={"/share/" + userID}>
          <DynamicIcon id="share" size="medium" />
        </Link>
      </Header>
      <AvatarCanvas style={{ transform: `translateY(-56px)` }}>
        <AvatarModelGroup userId={userID ?? null} position={[0, -0.05, 0]} />
      </AvatarCanvas>
      <Footer />
    </main>
  );
}
