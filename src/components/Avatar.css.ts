import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const avatarImage = style({
  width: "30px",
  height: "30px",
  borderRadius: "100%",
});
