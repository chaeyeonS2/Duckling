import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

export default function Login() {
  const navigate = useNavigate();

  const handleUpload = async (
    userID: string,
    photoURL: string,
    userName: string
  ) => {
    try {
      await axios.post<
        unknown,
        AxiosResponse<unknown, APIPostsPostRequest>,
        APIUsersPostRequest
      >("/api/users", {
        uid: userID,
        profileImg: photoURL,
        userName: userName,
      });
      console.log("login upload success");
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  const twitterLogin = () => {
    // Twitter 로그인 팝업 띄우기
    const provider = new TwitterAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        //This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        //You can use these server side with your app's credentials to access the Twitter API.
        TwitterAuthProvider.credentialFromResult(result);

        // 로그인 성공 시, Firebase 사용자 객체에서 필요한 정보를 가져옴
        const user = result.user;
        const userID = user.uid;
        const userName = user.displayName;
        const photoURL = user.photoURL; //tiwtter 프로필 사진 가져옴
        console.log("Firebase userID:", userName);

        // TODO: photoURL과 userName이 null일 때 어떻게 해야 하는가
        if (!userName) throw new Error("userName does not exist!");
        if (!photoURL) throw new Error("photoURL does not exist!");

        // local storage에 저장
        localStorage.setItem("id", userID);
        localStorage.setItem("profileImg", String(photoURL));
        localStorage.setItem("userName", String(userName));

        //서버에 올리기
        handleUpload(userID, photoURL, userName);

        if (user != null) {
          navigate("/home");
        }
      })
      .catch((error) => {
        console.error("Twitter 로그인 에러:", error);
      });
  };

  // TODO: page style 따로 css module로 분리하기
  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          style={{
            width: "80vw",
            height: "10%",
            marginTop: "35vh",
            objectFit: "contain",
          }}
          src={"/img/login/logo.png"}
        />
        <div
          style={{ position: "absolute" }}
          id="twitter-sign-in-btn"
          onClick={twitterLogin}
        >
          <img
            style={{
              width: "300px",
              height: "",
              marginTop: "70vh",
              objectFit: "contain",
            }}
            src={"/img/login/twitter.png"}
          />
        </div>
        <Link
          to="/xmc"
          style={{
            position: "absolute",
            bottom: "100px", // 조정하여 링크 위치를 조절할 수 있습니다.
            textDecoration: "none",
          }}
        >
          XMC용 로그인 페이지로 이동
        </Link>
      </div>
    </div>
  );
}