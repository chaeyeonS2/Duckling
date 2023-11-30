import BaseModal, { BaseModalProps } from "./BaseModal";
import * as styles from "./modal.css";

export interface ConfirmModalProps extends BaseModalProps {
  onYes?: () => void;
  yesText?: string;
  onNo?: () => void;
  noText?: string;
}
export default function ConfirmModal({ yesText = "네", noText = "아니요", onYes, onNo, ...props }: ConfirmModalProps) {
  return (
    <BaseModal {...props}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px" }}>
        <button className={styles.btnNo} onClick={onNo}>
          {noText}
        </button>
        <button className={styles.btnOk} onClick={onYes}>
          {yesText}
        </button>
      </div>
    </BaseModal>
  );
}
