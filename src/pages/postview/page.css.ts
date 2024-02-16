import { style } from "@vanilla-extract/css";

export const layout = style({
  display: "grid",
  gridTemplateRows: "auto 1fr auto",
  height: "100%",
  width: "100%",
  overflow: "hidden",
});

export const container = style({
  border: "2px inset black",
  borderTop: "6px solid black",
  borderBottom: "none",
  borderRadius: "20px 20px 0 0",

  display: "grid",
  gridTemplateRows: "auto 1fr auto",
  height: "100%",
  width: "100vw",
  overflowY: "auto",
  overflowX: "hidden",
  selectors: {
    "&::-webkit-scrollbar": {
      width: 0,
    },
  },
});

export const postHeader = style({
  padding: "16px 24px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const title = style({
  fontSize: "20px",
  fontWeight: "500",
  whiteSpace: "nowrap",
});

export const timestemp = style({
  fontSize: "14px",
  color: "#B8B8B8",
});

export const content = style({
  padding: "16px 20px",
  fontSize: "16px",
  maxWidth: "70ch",
  width: "100vw",
});

export const postImgBig = style({
  borderRadius: "8px",
  marginRight: "8px",
  height: "100%",
  objectFit: "contain",
  maxWidth: "420px",
  "@media": {
    "screen and (max-width: 420px)": {
      width: "max(100%, 0px)",
    },
    "screen and (min-width: 420px)": {
      width: "max(50%, 420px)",
    },
  },
});

export const metadataContainer = style({
  padding: "11px 18px",
  backgroundColor: "black",
  color: "white",
});

export const commentBottomSheet = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  backgroundColor: "white",
});

export const commentsContainer = style({
  padding: "15px 20px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
});

export const comment = style({
  width: "100%",
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const commentHeader = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const commentDate = style({
  fontSize: "12px",
  color: "#B8B8B8",
  alignSelf: "flex-end",
});

export const commentInputContainer = style({
  display: "flex",
  height: "50px",
  border: "1px solid #000",
});

export const commentInput = style({
  flex: 1,
  padding: "12.5px",
  border: "none",
  background: "transparent",
  resize: "none",
  fontSize: "18px",
  fontWeight: 600,
  selectors: {
    "&::placeholder": {
      color: "#d9d9d9",
    },
  },
});

export const submitButton = style({
  border: "none",
  borderLeft: "1px solid #000",
  background: "#e3e3e3",
  width: "50px",
  height: "100%",
});
