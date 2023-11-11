import { Link } from "react-router-dom";
import * as styles from "./header.css";

export default function HeaderDeco({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <header className={styles.header + " " + className} {...props}>
      <div className={styles.rightBtnGroup}>
        <Link className={styles.btnClose} to="/home">
          <img src="/img/close.png" />
        </Link>
      </div>
    </header>
  );
}
