import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "inherit",
  textDecoration: "none",
});

export const avatarImage = style({
  width: "30px",
  height: "30px",
  borderRadius: "100%",
});
