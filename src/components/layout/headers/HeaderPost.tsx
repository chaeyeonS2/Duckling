import { useNavigate } from "react-router-dom";
import * as styles from "./header.css";

export interface HeaderPostProps {
  uploadClick: () => void;
}
export default function HeaderPost({ uploadClick }: HeaderPostProps) {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div>
        <div className={styles.btnGroup}>
          <button onClick={() => navigate(-1)}>
            <img src="/img/close.png" alt="my image" />
          </button>
        </div>
        <div className={styles.btnGroup}>
          <button onClick={uploadClick}>
            <img src="/img/writing/check.png" />
          </button>
        </div>
      </div>
    </header>
  );
}
