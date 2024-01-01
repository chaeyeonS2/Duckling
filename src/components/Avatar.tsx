import useSWRImmutable from "swr/immutable";
import * as styles from "./Avatar.css";

export interface AvatarProps {
  userId: string;
}
export default function Avatar({ userId }: AvatarProps) {
  const { data: user } = useSWRImmutable(`/api/users/${userId}`);
  if (!user) return null;

  return (
    <div className={styles.container}>
      <img className={styles.avatarImage} src={user.profileImg} alt="" />
      <span>{user.userName}</span>
    </div>
  );
}
