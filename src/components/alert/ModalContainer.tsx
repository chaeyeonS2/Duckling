import { createPortal } from "react-dom";

export default function ModalContainer({ children }: React.PropsWithChildren) {
  return createPortal(<>{children}</>, document.getElementById("modal")!);
}
