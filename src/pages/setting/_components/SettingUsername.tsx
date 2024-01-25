import axios from "axios";
import { useState } from "react";
import useSWRImmutable from "swr/immutable";
import showAsyncModal from "@/utils/showAsyncModal";

import { DynamicIcon } from "@/components/Icon";

import * as styles from "../page.css";

export default function SettingUsername() {
  const { data: user, mutate } = useSWRImmutable(`/api/users/${localStorage.getItem("id")}`);

  const [usernameValue, setUsernameValue] = useState(user?.userName ?? "");
  const [inputState, setInputState] = useState<"idle" | "invalid" | "confirm">("idle");
  const handleUsernameChange = async () => {
    await showAsyncModal(
      axios.patch(`/api/users/${localStorage.getItem("id")}`, {
        userName: usernameValue,
      }),
      {
        progress: "프로필 닉네임을 변경중입니다",
        sucessed: "프로필 닉네임이 변경되었습니다",
        failed: "프로필 닉네임 변경에 실패했습니다",
        onSuccessed: () => {
          setInputState("confirm");
          localStorage.setItem("userName", usernameValue);
        },
        onFailed: () => {
          setInputState("invalid");
        },
      }
    );
    mutate();
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState("idle");
    setUsernameValue(e.target.value);
  };

  return (
    <>
      <label htmlFor="nicknameInput" className={styles.inputLabel}>
        닉네임
      </label>
      <div className={styles.usernameContainer}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            id="nicknameInput"
            placeholder="닉네임"
            onChange={handleInputChange}
            className={styles.input}
            value={usernameValue || ""}
          />
          <DynamicIcon id="check" size="small" className={styles.inputIcon} aria-hidden={inputState != "confirm"} />
          <DynamicIcon id="!" size="small" className={styles.inputIcon} aria-hidden={inputState != "invalid"} />
        </div>

        <button className={styles.inputButton} onClick={handleUsernameChange} data-state={inputState}>
          변경하기
        </button>
      </div>
    </>
  );
}
