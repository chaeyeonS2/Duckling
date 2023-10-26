import { Link } from "react-router-dom";
import * as styles from "./header.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <div className={styles.rightBtnGroup}>
          <Link to="/share" className={styles.headerBtn}>
            <img src="/img/share.png" />
          </Link>
          <Link to="/deco" className={styles.headerBtn}>
            <img src="/img/home/deco.png" />
          </Link>
          <a className={styles.headerBtn}>
            <img src="/img/home/settings.png" />
          </a>
        </div>
      </div>
    </header>
  );
}
