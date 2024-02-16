import axios from "axios";
import { useRef } from "react";
import useSWRImmutable from "swr/immutable";
import convertFileToDataUrl from "@/utils/convertBlobToDataUrl";

import * as styles from "../page.css";
import showAsyncModal from "@/utils/showAsyncModal";

export default function SettingAvatar() {
  const { data: user, mutate } = useSWRImmutable(`/api/users/${localStorage.getItem("id")}`);

  const inputFileRef = useRef<HTMLInputElement>(null);
  const handleProfileImgClick = () => {
    inputFileRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const { result: dataUrl } = await showAsyncModal(convertFileToDataUrl(e.target.files[0]), {
      progress: "프로필 이미지를 읽는 중...",
      success: "프로필 이미지 읽기에 성공했습니다",
      failure: "프로필 이미지 읽기에 실패했습니다",
    });
    if (!dataUrl) return;

    await showAsyncModal(
      axios.patch(`/api/users/${localStorage.getItem("id")}`, {
        profileImg: dataUrl.toString(),
      }),
      {
        progress: "프로필 이미지를 변경중...",
        success: "프로필 이미지가 변경되었습니다",
        failure: "프로필 이미지 변경에 실패했습니다",
        onSucceed: () => mutate(),
      }
    );
  };

  return (
    <>
      <img src={user?.profileImg ?? ""} alt="" className={styles.avatar} onClick={handleProfileImgClick} />
      <input
        ref={inputFileRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        multiple
        onChange={handleAvatarChange}
      />
    </>
  );
}
