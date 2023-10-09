import * as styles from "./postShare.css";

export interface PostShareProps {
  onClose: () => void;
}
export default function PostShare({ onClose }: PostShareProps) {
  return (
    <div className={styles.container}>
      <div>
        <img className={styles.imageBox} src={"/img/home.png"} />
      </div>
      <div>
        <p>주소가 복사되었습니다. :-D</p>
        <p className={styles.text}>원하는 곳에 붙여넣기 해주세요!</p>
      </div>
      <div>
        <button onClick={onClose}>확인</button>
      </div>
    </div>
  );
}
