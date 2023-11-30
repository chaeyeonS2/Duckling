import * as styles from "./header.css";

export default function Header({ children }: React.PropsWithChildren) {
  return (
    <header className={styles.header}>
      <div className={styles.btnGroup}>{children}</div>
    </header>
  );
}
