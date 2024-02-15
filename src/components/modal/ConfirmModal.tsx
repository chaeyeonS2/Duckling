import { overlays } from "@/utils/overlays";
import BaseModal, { BaseModalProps } from "./BaseModal";
import * as styles from "./modal.css";

export type ConfirmModalProps = BaseModalProps & {
  onYes?: () => void;
  yesText?: string;
  onNo?: () => void;
  noText?: string;
};
export default function ConfirmModal({ yesText = "네", noText = "아니요", onYes, onNo, ...props }: ConfirmModalProps) {
  return (
    <BaseModal {...props}>
      <div className={styles.btnGroup}>
        <button
          className={styles.btnNo}
          onClick={() => {
            onNo?.();
            if (props.overlayId !== undefined) overlays.close(props.overlayId);
          }}
        >
          {noText}
        </button>
        <button
          className={styles.btnOk}
          onClick={() => {
            onYes?.();
            if (props.overlayId !== undefined) overlays.close(props.overlayId);
          }}
        >
          {yesText}
        </button>
      </div>
    </BaseModal>
  );
}
