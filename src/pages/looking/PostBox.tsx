import "@/css/lookiing/postBox.css";
import useSWRImmutable from "swr/immutable";

export interface PostBoxProps {
  post: Post;
}
export default function PostBox({ post: data }: PostBoxProps) {
  const { data: userData } = useSWRImmutable<APIUserResponse>([
    `/api/users/${data.userID}`,
  ]);

  return (
    <div className="one-post-box">
      <div className="one-post-info">
        <div className="one-post-profile">
          <div
            className="profileImg"
            style={{ backgroundImage: `url(${userData?.profileImg})` }}
          ></div>
          <div className="userName">{data.writerID}</div>
          <div className="date">{data.date}</div>
        </div>
      </div>

      <div className="one-post-img-layout">
        <div className="one-post-img-back">
          <div className="back"></div>
          <div className="one-post-img">
            <img className="" src={data.postImg[0]} />
          </div>
        </div>
      </div>
      <div className="one-post-info2">
        <div>
          <img src={"/img/looking/cookie.png"} />
        </div>
        <text>{data.likes}</text>
        <div>
          <img src={"/img/looking/comment.png"} />
        </div>
        <text>{data.commentCount}</text>
      </div>

      <div className="one-post-content">
        <p>{data.body}</p>
      </div>
    </div>
  );
}
