import { DynamicIcon } from "./Icon";
import { useNavigate } from "react-router-dom";
import * as styles from "./PostMetadataBar.css";
import axios from "axios";
import { useRef, useState } from "react";

export interface PostMetadataBarProps {
  postData: Post;
}
export default function PostMetadataBar({ postData }: PostMetadataBarProps) {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(postData.likes.length);
  const candyRef = useRef<HTMLInputElement>(null);

  const cookieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLikes((prev) => prev + (e.target.checked ? 1 : -1));
    axios.patch(`/api/posts/likes/${postData.postID}/${localStorage.getItem("id")}`);
  };
  const commentClick = () => {
    navigate("/comment", { state: { postID: postData.postID } });
  };

  return (
    <div className={styles.metadataContainer}>
      <label
        htmlFor="candy-button"
        className={styles.metadata}
        aria-selected={candyRef.current?.checked || postData.likes.includes(localStorage.getItem("id") || "")}
      >
        <DynamicIcon id="candy" size="medium" />
        <span>{likes}</span>
      </label>
      <input
        id="candy-button"
        type="checkbox"
        ref={candyRef}
        onChange={cookieChange}
        defaultChecked={postData.likes.includes(localStorage.getItem("id") || "")}
        style={{ position: "absolute", visibility: "hidden" }}
      />
      <div onClick={commentClick} className={styles.metadata}>
        <DynamicIcon id="comment" size="medium" />
        <span>{postData?.commentCount}</span>
      </div>
    </div>
  );
}
