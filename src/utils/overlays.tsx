import { Fragment, useEffect, useReducer } from "react";
import { createPortal } from "react-dom";

let stack = 0;
let listener = () => {};
const overlayElements: Map<number, JSX.Element> = new Map();
function open(Component: React.FC<{ overlayId: number }>) {
  overlayElements.set(
    stack,
    <div style={{ position: "absolute", inset: 0, width: "fit-content", height: "fit-content" }}>
      <Component overlayId={stack} />
    </div>
  );
  listener();
  return stack++;
}

function close(id: number) {
  overlayElements.delete(id);
  listener();
}

function closeAll() {
  overlayElements.clear();
  listener();
}

export function OverlayAnchor() {
  const [, forceUpdate] = useReducer((c) => c + 1, 0);

  useEffect(() => {
    listener = () => forceUpdate();
  }, [forceUpdate]);

  return createPortal(
    <div>
      {Array.from(overlayElements.entries()).map(([id, elem]) => (
        <Fragment key={id}>{elem}</Fragment>
      ))}
    </div>,
    document.getElementById("modal-root")!
  );
}

export const overlays = { open, close, closeAll };
