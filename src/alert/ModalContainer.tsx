import { createPortal } from "react-dom";

function ModalContainer({ children }: React.PropsWithChildren) {
  return createPortal(<>{children}</>, document.getElementById("modal")!);
}

export default ModalContainer;
