import useSWRImmutable from "swr/immutable";
import * as styles from "./postBox.css";

export interface PostBoxProps {
  post: Post;
}
export default function PostBox({ post: data }: PostBoxProps) {
  const { data: userData } = useSWRImmutable<APIUserResponse>(`/api/users/${data.userID}`);

  return (
    <div className={styles.postBox}>
      <div>
        <div className={styles.postProfile}>
          <div className={styles.profileImg} style={{ backgroundImage: `url(${userData?.profileImg})` }}></div>
          <div className={styles.userName}>{data.writerID}</div>
          <div className={styles.date}>{data.date}</div>
        </div>
      </div>

      <div className={styles.postImgLayout}>
        <div className={styles.postImgBack}>
          <div className={styles.back}></div>
          <div className={styles.postImgContainer}>
            <img className={styles.postImg} src={data.postImg[0]} />
          </div>
        </div>
      </div>
      <div className={styles.postInfo2}>
        <div>
          <img src="/img/looking/cookie.png" />
        </div>
        <p className={styles.postInfoText}>{data.likes}</p>
        <div>
          <img src="/img/looking/comment.png" />
        </div>
        <p className={styles.postInfoText}>{data.commentCount}</p>
      </div>

      <div className={styles.postContentContainer}>
        <p className={styles.postContent}>{data.body}</p>
      </div>
    </div>
  );
}
