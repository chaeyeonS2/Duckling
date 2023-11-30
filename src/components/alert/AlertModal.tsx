import BaseModal, { BaseModalProps } from "./BaseModal";
import * as styles from "./modal.css";

export interface AlertModalProps extends BaseModalProps {
  onClose?: () => void;
}
export default function AlertModal({ onClose, ...props }: AlertModalProps) {
  return (
    <BaseModal {...props}>
      <button className={styles.btnOk} onClick={onClose}>
        확인
      </button>
    </BaseModal>
  );
}
