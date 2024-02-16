import axios from "axios";
import { DynamicIcon } from "./Icon";
import React, { useRef, useState } from "react";

import * as styles from "./PostMetadataBar.css";
import mergeClassName from "@/utils/mergeClassName";

export interface PostMetadataBarProps {
  defLikes: number;
  liked: boolean;
  commentCount: number;
  postID: string;
  onCommentClick?: () => void;
}

export default function PostMetadataBar({
  defLikes,
  liked,
  commentCount,
  postID,
  onCommentClick,
  className,
  ...props
}: React.PropsWithElementProps<"div", PostMetadataBarProps>) {
  const [likes, setLikes] = useState(defLikes);
  const candyRef = useRef<HTMLInputElement>(null);

  const cookieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLikes((prev) => prev + (e.target.checked ? 1 : -1));
    axios.patch(`/api/posts/likes/${postID}/${localStorage.getItem("id")}`);
  };

  return (
    <div className={mergeClassName(className, styles.metadataContainer)} {...props}>
      <label htmlFor={`candy-button-${postID}`} className={styles.metadata}>
        <DynamicIcon id="candy" size="medium" className={styles.candyIcon} />
        <span className={styles.candyNumber}>{likes}</span>
      </label>
      <input
        id={`candy-button-${postID}`}
        type="checkbox"
        ref={candyRef}
        onChange={cookieChange}
        className={styles.input}
        checked={candyRef.current ? candyRef.current.checked : liked}
        style={{ position: "absolute", visibility: "hidden" }}
      />
      <div className={styles.metadata} onClick={onCommentClick}>
        <DynamicIcon id="comment" size="medium" />
        <span>{commentCount}</span>
      </div>
    </div>
  );
}
