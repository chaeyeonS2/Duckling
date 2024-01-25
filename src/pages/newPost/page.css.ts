import { style } from "@vanilla-extract/css";

export const layout = style({
  display: "grid",
  gridTemplateRows: "auto 1fr auto",
  height: "100%",
  width: "100%",
  overflow: "hidden",
});

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "18px 12px",
});

export const headerButton = style({
  border: "none",
  background: "transparent",
  cursor: "pointer",
});

export const formContainer = style({
  padding: "0.5vw",
  border: "2px inset black",
  borderTop: "6px solid black",
  borderBottom: "none",
  borderRadius: "20px 20px 0 0",

  display: "grid",
  gridTemplateRows: "auto 1fr auto",
  height: "100%",
  width: "100%",
  overflow: "hidden",
});

export const titleInput = style({
  backgroundColor: "transparent",
  border: "none",
  padding: "18px 22px",
  fontSize: "20px",
  selectors: {
    "&::placeholder": {
      color: "#B9B9B9",
    },
    "&:focus": {
      outline: "none",
    },
  },
});

export const writingInput = style({
  backgroundColor: "transparent",
  padding: "16px 20px",
  fontSize: "16px",
  border: "none",
  resize: "none",
  width: "100%",
  selectors: {
    "&::placeholder": {
      color: "#B9B9B9",
    },
    "&:focus": {
      outline: "none",
    },
  },
});

export const imgUploadBox = style({
  width: "100%",
  marginTop: "10px",
  display: "grid",
  gridGap: "4px",
  gridTemplateColumns: "repeat(3,minmax(auto,1fr))",
  alignItems: "center",
  justifyContent: "space-around",
});

export const imgUploadPreview = style({ width: "28vw", position: "relative", marginRight: "5px", marginLeft: "5px" });

export const closeIconContainer = style({
  position: "absolute",
  right: "0px",
});

export const previewImg = style({
  width: "100%",
  height: "100%",
  background: "#d9d9d9",
  objectFit: "contain",
  border: "1px solid black",
});

export const toolBar = style({
  height: "50px",
  borderTop: "1px solid #ddd",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
});
