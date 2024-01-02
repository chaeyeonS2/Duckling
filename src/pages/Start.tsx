import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as styles from "./start.css";

export default function Start() {
  const navigate = useNavigate();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/login");
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div className={styles.pageContainer}>
      <div>
        <img className={styles.loadingImage} src="/img/loadingGif.gif" />
      </div>
    </div>
  );
}
