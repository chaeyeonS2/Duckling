import Icon from "@/components/Icon";
import * as styles from "./footer.css";
import { Link, useLocation } from "react-router-dom";

const tabIdx = [["/look", "/postview", "/comment"], ["/home", "/newPost"], ["/camera"]];
export default function Footer() {
  const { pathname } = useLocation();

  return (
    <footer className={styles.footer}>
      <Link to="/look" className={styles.footerBtn} aria-checked={tabIdx[0].includes(pathname)}>
        <Icon className={styles.icon} id={"home-" + (tabIdx[0].includes(pathname) ? "fill" : "outline")} />
      </Link>
      <Link to="/home" className={styles.footerBtn} aria-checked={tabIdx[1].includes(pathname)}>
        <Icon className={styles.icon} id={"avatar-" + (tabIdx[1].includes(pathname) ? "fill" : "outline")} />
      </Link>
      <Link to="/camera" className={styles.footerBtn} aria-checked={tabIdx[2].includes(pathname)}>
        <Icon className={styles.icon} id={"camera-" + (tabIdx[2].includes(pathname) ? "fill" : "outline")} />
      </Link>
    </footer>
  );
}
