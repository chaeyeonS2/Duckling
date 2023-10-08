import "@/css/footer.css";
import { useNavigate } from "react-router-dom";

export interface FooterProps {
  btn?: number;
}
export default function Footer({ btn: active }: FooterProps) {
  // TODO: just use a tag
  const navigate = useNavigate();
  const homeClick = () => {
    navigate("/home");
  };
  const lookClick = () => {
    navigate("/look");
  };
  const cameraClick = () => {
    navigate("/camera");
  };

  //어떤 버튼이 활성화인지
  var homeImg = "/img/home.png";
  var avatarImg = "/img/person.png";
  var cameraImg = "/img/camera.png";

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
    <footer className="footer">
      <div id="footerBtnGroup">
        <button id="btn_home" onClick={lookClick}>
          <img src={homeImg} />
        </button>
        <button id="btn_avatar" onClick={homeClick}>
          <img src={avatarImg} />
        </button>
        <button id="btn_camera" onClick={cameraClick}>
          <img src={cameraImg} />
        </button>
      </div>
    </footer>
  );
}
