import * as styles from "./Avatar.css";
import { Link } from "react-router-dom";
import useSWR from "swr";

export interface AvatarProps {
  userId: string;
}
export default function Avatar({
  userId,
  className,
  ...props
}: AvatarProps & Omit<React.HTMLAttributes<HTMLAnchorElement>, "href">) {
  const { data: user } = useSWR(`/api/users/${userId}`);
  if (!user) return null;

  return (
    <Link className={styles.container + " " + (className || "")} to={`/username/${user.uid}`} {...props}>
      <img className={styles.avatarImage} src={user.profileImg} alt="" />
      <span style={{ color: user.userName ? "inherit" : "gray" }}>{user.userName || "(알 수 없음)"}</span>
    </Link>
  );
}
