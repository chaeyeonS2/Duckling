import { overlays } from "@/utils/overlays";
import BaseModal, { BaseModalProps } from "./BaseModal";
import * as styles from "./modal.css";

export type AlertModalProps = BaseModalProps & {
  onClose?: () => void;
};
export default function AlertModal({ onClose, ...props }: AlertModalProps) {
  return (
    <BaseModal {...props}>
      <button
        className={styles.btnOk}
        onClick={() => {
          onClose?.();
          if (props.overlayId !== undefined) overlays.close(props.overlayId);
        }}
      >
        확인
      </button>
    </BaseModal>
  );
}
