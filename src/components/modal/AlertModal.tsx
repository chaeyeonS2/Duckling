import { overlays } from "@/utils/overlays";
import BaseModal, { BaseModalProps } from "./BaseModal";
import * as styles from "./modal.css";

export interface AlertModalProps extends BaseModalProps {
  onClose?: () => void;
}
export default function AlertModal({ onClose, overlayId, ...props }: AlertModalProps) {
  return (
    <BaseModal {...props}>
      <button
        className={styles.btnOk}
        onClick={() => {
          onClose?.();
          if (overlayId !== undefined) overlays.close(overlayId);
        }}
      >
        확인
      </button>
    </BaseModal>
  );
}
