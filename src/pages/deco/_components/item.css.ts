import { style } from "@vanilla-extract/css";

export const itemBoxDiv = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
  gap: "10px",
});

export const itemBox = style({
  minWidth: "100px",
  minHeight: "100px",
  border: "1px solid black",
  backgroundColor: "rgb(0, 0, 0, 0.7)",
  objectFit: "contain",
  flex: 1,
  selectors: {
    "&[aria-selected=true]": {
      border: "2px solid #bdff6b",
      boxShadow: "3px 3px",
    },
  },
});

export const itemImg = style({ maxWidth: "100%", maxHeight: "100%" });
