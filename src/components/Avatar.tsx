import useSWRImmutable from "swr/immutable";
import * as styles from "./Avatar.css";
import { Link } from "react-router-dom";

export interface AvatarProps {
  userId: string;
}
export default function Avatar({ userId }: AvatarProps) {
  const { data: user } = useSWRImmutable(`/api/users/${userId}`);
  if (!user) return null;

  return (
    <Link className={styles.container} to={`/username/${user.uid}`}>
      <img className={styles.avatarImage} src={user.profileImg} alt="" />
      <span>{user.userName}</span>
    </Link>
  );
}
