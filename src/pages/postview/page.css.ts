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
  width: "100%",
  overflow: "hidden",
});

export const postHeader = style({
  padding: "16px 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const title = style({
  fontSize: "20px",
  fontWeight: "500",
  whiteSpace: "nowrap",
});

export const timestemp = style({
  marginTop: "8px",
  fontSize: "14px",
  color: "#B8B8B8",
});

export const content = style({
  padding: "16px 20px",
  fontSize: "16px",
});

export const metadataContainer = style({
  display: "flex",
  color: "white",
  backgroundColor: "black",
  gap: "15px",
  padding: "11px 18px",
});

export const metadata = style({
  display: "flex",
  alignItems: "center",
  gap: "3px",
});
