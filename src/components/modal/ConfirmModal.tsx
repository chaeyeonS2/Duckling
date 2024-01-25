import { overlays } from "@/utils/overlays";
import BaseModal, { BaseModalProps } from "./BaseModal";
import * as styles from "./modal.css";

export interface ConfirmModalProps extends BaseModalProps {
  onYes?: () => void;
  yesText?: string;
  onNo?: () => void;
  noText?: string;
}
export default function ConfirmModal({
  yesText = "네",
  noText = "아니요",
  onYes,
  onNo,
  overlayId,
  ...props
}: ConfirmModalProps) {
  return (
    <BaseModal {...props}>
      <div className={styles.btnGroup}>
        <button
          className={styles.btnNo}
          onClick={() => {
            onNo?.();
            if (overlayId !== undefined) overlays.close(overlayId);
          }}
        >
          {noText}
        </button>
        <button
          className={styles.btnOk}
          onClick={() => {
            onYes?.();
            if (overlayId !== undefined) overlays.close(overlayId);
          }}
        >
          {yesText}
        </button>
      </div>
    </BaseModal>
  );
}
