import * as styles from "./footer.css";
import { Link } from "react-router-dom";

export interface FooterProps {
  btn?: number;
}
export default function Footer({ btn: active }: FooterProps) {
  //어떤 버튼이 활성화인지
  let homeImg = "/img/home.png";
  let avatarImg = "/img/person.png";
  let cameraImg = "/img/camera.png";

  // TODO: tab ui같은데 index를 내부적으로 제어하도록 만들기
  const btnActive = () => {
    if (active === 0) {
      homeImg = "/img/home_click.png"; //LookingActive
    } else if (active === 1) {
      //avatarActive
      avatarImg = "/img/person_click.png";
    } else {
      //camera active
      cameraImg = "/img/camera_click.png";
    }
  };
  btnActive();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerBtnGroup}>
        <Link to="/home" className={styles.footerBtn}>
          <img src={homeImg} />
        </Link>
        <Link to="/look" className={styles.footerBtn}>
          <img src={avatarImg} />
        </Link>
        <Link to="/camera" className={styles.footerBtn}>
          <img src={cameraImg} />
        </Link>
      </div>
    </footer>
  );
}
