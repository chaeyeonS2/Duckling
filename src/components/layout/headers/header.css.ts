import { style } from "@vanilla-extract/css";

export const header = style({
  display: "flex",
  justifyContent: "flex-end",
  padding: "12px 24px",
});

export const btnGroup = style({ display: "flex", gap: "6px" });
