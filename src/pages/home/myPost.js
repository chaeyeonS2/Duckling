import useFetch from "@/hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";
import useLocalStorageState from "use-local-storage-state";

import "@/css/customBottomSheet.css";

export default function MyPost() {
  const [photoURL] = useLocalStorageState("profileImg");
  const [userName] = useLocalStorageState("userName");
  const postInfoArray = useFetch(
    `https://us-central1-netural-app.cloudfunctions.net/api/posts/writer/${userName}`,
    []
  );

  const navigate = useNavigate();
  const handleNewPostClick = () => {
    navigate("/newPost");
  };
  const handlePostClick = (postID) => {
    navigate(`/postview/${userName}/${postID}`);
  };

  return (
    <BottomSheet
      className="homeSheet"
      id="parentDiv-home"
      open
      blocking={false}
      skipInitialTransition
      snapPoints={({ maxHeight }) => [80, maxHeight / 2]}
      header={
        <div className="bottom_header">
          <div
            className="profileImg"
            style={{ backgroundImage: `url(${photoURL})` }}
          />
          <div className="userName">{userName}</div>
          <div className="btnAddNew" onClick={handleNewPostClick}>
            <img
              src={process.env.PUBLIC_URL + "/img/writing/add.png"}
              alt="+"
            />
          </div>
        </div>
      }
    >
      <div className="bottom_content">
        {postInfoArray.map((info) => (
          <div
            key={info.postId}
            className="postImg"
            onClick={() => handlePostClick(info.postId)}
          >
            <img className="item_img" src={info.postImg[0]} alt="postImg" />
          </div>
        ))}
      </div>
    </BottomSheet>
  );
}
