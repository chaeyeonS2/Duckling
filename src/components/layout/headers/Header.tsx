import { DynamicIcon } from "@/components/Icon";
import { Link } from "react-router-dom";
import * as styles from "./header.css";

export default function Header({ children, closable }: React.PropsWithChildren<{ closable?: boolean }>) {
  return (
    <header className={styles.header}>
      {closable && (
        <Link to="/home" style={{ flex: 1, textAlign: "left" }}>
          <DynamicIcon id="cancel" size="medium" />
        </Link>
      )}
      <div className={styles.btnGroup}>{children}</div>
    </header>
  );
}
