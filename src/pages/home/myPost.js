import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";
import useLocalStorageState from "use-local-storage-state";

import "@/css/customBottomSheet.css";

export default function MyPost() {
  const [photoURL] = useLocalStorageState("profileImg", { defaultValue: "" });
  const [userName] = useLocalStorageState("userName", { defaultValue: "" });
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

  useEffect(() => {
    const childDivs = document.querySelectorAll("#parentDiv-home div");
    childDivs.forEach((childDiv) => {
      childDiv.classList.add("homeSheet");
    });
  }, []); // 이 코드들이 정말 의미있는지 검토해보세요.

  return (
    <BottomSheet
      className="homeSheet"
      id="parentDiv-home"
      open
      blocking={false}
      skipInitialTransition
      snapPoints={({ maxHeight }) => [80, maxHeight / 2]}
      header={
        <div className="bottom_header homeSheet">
          <div
            className="profileImg homeSheet"
            style={{ backgroundImage: `url(${photoURL})` }}
          />
          <div className="userName homeSheet">{userName}</div>
          <div className="btnAddNew homeSheet" onClick={handleNewPostClick}>
            <img
              src={process.env.PUBLIC_URL + "/img/writing/add.png"}
              alt="+"
            />
          </div>
        </div>
      }
    >
      <div className="bottom_content homeSheet">
        {postInfoArray.map((info) => (
          <div
            key={info.postId}
            className="postImg homeSheet"
            onClick={() => handlePostClick(info.postId)}
          >
            <img className="item_img" src={info.postImg[0]} alt="postImg" />
          </div>
        ))}
      </div>
    </BottomSheet>
  );
}
