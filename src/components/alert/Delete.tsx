import * as styles from "./delete.css";

export interface DeleteProps {
  onClose: () => void;
}
export default function Delete({ onClose }: DeleteProps) {
  return (
    <div className={styles.alertlayout}>
      <div className={styles.textBoxDelete}>
        <p className={styles.textBoxDeleteText}>해당 글은 영구적으로 삭제 됩니다.</p>
        <p className={styles.textBoxDeleteText}>정말 삭제 하실건가요? (˙ᴖ˙ก̀)</p>
      </div>
      <div className={styles.btnBoxDelete}>
        <button className={styles.btnNo} onClick={onClose}>
          아니오
        </button>
        <button className={styles.btnOk}>네, 삭제할게요</button>
      </div>
    </div>
  );
}
