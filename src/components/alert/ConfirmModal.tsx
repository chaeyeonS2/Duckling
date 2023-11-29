import AlertModal, { AlertModalProps } from "./AlertModal";
import * as styles from "./isImage.css";

export interface ConfirmModalProps extends AlertModalProps {
  onClose?: () => void;
}
export default function ConfirmModal({ onClose, ...props }: ConfirmModalProps) {
  return (
    <AlertModal {...props}>
      <button className={styles.btnOk} onClick={onClose}>
        확인
      </button>
    </AlertModal>
  );
}
