import * as styles from "./isImage.css";

export interface IsImageProps {
  onClose: () => void;
}
export default function IsImage({ onClose }: IsImageProps) {
  return (
    <div className={styles.alertlayout}>
      <div className={styles.imageBox}>
        <img className={styles.image} src={"/img/home.png"} />
      </div>
      <div className={styles.textBox}>
        <p className={styles.text1}>사진을 첨부해야 업로드 할 수 있어요</p>
        <p className={styles.text2}>덕질 일상을 다채롭게 기록해보아요</p>
      </div>
      <div className={styles.btnBox}>
        <button className={styles.btnOk} onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
}
