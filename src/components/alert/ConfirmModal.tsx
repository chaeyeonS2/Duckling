import BaseModal, { BaseModalProps } from "./BaseModal";
import * as styles from "./modal.css";

export interface ConfirmModalProps extends BaseModalProps {
  onYes?: () => void;
  onNo?: () => void;
}
export default function ConfirmModal({ onYes, onNo, ...props }: ConfirmModalProps) {
  return (
    <BaseModal {...props}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px" }}>
        <button className={styles.btnNo} onClick={onNo}>
          아니오
        </button>
        <button className={styles.btnOk} onClick={onYes}>
          네
        </button>
      </div>
    </BaseModal>
  );
}
