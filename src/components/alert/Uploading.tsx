import * as styles from "./uploading.css";

export default function Uploading() {
  return (
    <div className={styles.uploadContainer}>
      <div className={styles.loadingBar}>
        <img src={"/img/writing/upload_loading.gif"} />
      </div>
      <div className={styles.textBoxUpload}>게시글이 올라가고 있어요-!</div>
    </div>
  );
}
