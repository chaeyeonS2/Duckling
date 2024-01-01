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
});

export const postImgBig = style({ objectFit: "contain" });

export const metadataContainer = style({
  padding: "11px 18px",
  backgroundColor: "black",
  color: "white",
});
