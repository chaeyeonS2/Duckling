import Icon from "@/components/Icon";
import * as styles from "./footer.css";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const { pathname } = useLocation();

  return (
    <footer className={styles.footer}>
      <Link to="/look" className={styles.footerBtn} aria-checked={pathname == "/look"}>
        <Icon className={styles.icon} id={"home-" + (pathname == "/look" ? "fill" : "outline")} />
      </Link>
      <Link to="/home" className={styles.footerBtn} aria-checked={pathname == "/home"}>
        <Icon className={styles.icon} id={"avatar-" + (pathname == "/home" ? "fill" : "outline")} />
      </Link>
      <Link to="/camera" className={styles.footerBtn} aria-checked={pathname == "/camera"}>
        <Icon className={styles.icon} id={"camera-" + (pathname == "/camera" ? "fill" : "outline")} />
      </Link>
    </footer>
  );
}
