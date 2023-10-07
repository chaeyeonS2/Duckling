import "../css/alert/alertLayout.css";
import ReactDOM from "react-dom";

export interface ModalProps {
  isOpen: boolean;
}
export default function Modal({
  isOpen,
  children,
}: React.PropsWithChildren<ModalProps>) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay ">
      <div className="modal ">
        {children}
        {/* <button onClick={onClose}>Close</button> */}
      </div>
    </div>,
    document.getElementById("modal")!
  );
}
