//https://github.com/Temzasse/react-modal-sheet#vanilla-css
import Sheet from "react-modal-sheet";
import { useState } from "react";
import style from "styled-components";

const CustomSheet = style(Sheet)`
  margin: 0 auto;
  max-width: 680px;

  .react-modal-sheet-container {
    background-color: #222 !important;
  }

  .react-modal-sheet-backdrop {
    background-color: rgba(0, 0, 0, 0.3) !important;
  }

  .react-modal-sheet-drag-indicator {
    background-color: #666 !important;
  }
`;

export default function MyPost() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div>
        <button onClick={() => setOpen(true)}>Open sheet</button>
      </div>

      <Sheet isOpen={true} onClose={() => setOpen(true)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div>aaa</div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
}
