import Icon from "./Icon";
import { useNavigate } from "react-router-dom";
import * as styles from "./PostMetadataBar.css";
import axios from "axios";
import { useState } from "react";

export interface PostMetadataBarProps {
  postData: Post;
}
export default function PostMetadataBar({ postData }: PostMetadataBarProps) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const cookieClick = () => {
  };
  const commentClick = () => {
    navigate("/comment", { state: { postID: postData.postID } });
  };

  return (
    <div className={styles.metadataContainer}>
      <div onClick={cookieClick} className={styles.metadata} aria-selected={liked}>
        <Icon id="cookie" size="medium" />
        <span>{postData?.likes}</span>
      </div>
      <div onClick={commentClick} className={styles.metadata}>
        <Icon id="comment" size="medium" />
        <span>{postData?.commentCount}</span>
      </div>
    </div>
  );
}
