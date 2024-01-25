import { style } from "@vanilla-extract/css";

export const pageContainer = style({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  backgroundImage: "url(/img/background.png)",
});

export const bottomContainer = style({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  position: "fixed",
  bottom: 0,
  pointerEvents: "none",
});

export const topActionsContainer = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  marginBottom: "12px",
  padding: "0 21px",
  zIndex: 99,
  pointerEvents: "fill",
});

export const categorySelectGroup = style({
  border: "1px solid black",
  padding: "5px",
  display: "flex",
  width: "fit-content",
  flexDirection: "column",
  backgroundColor: "white",
  gap: "5px",
});

export const categorySelectButton = style({
  width: "36px",
  height: "36px",
  backgroundColor: "white",
  border: "none",
  selectors: {
    "&[aria-selected=true]": {
      backgroundColor: "black",
      color: "#bdff6b",
    },
  },
});

export const iconImg = style({ maxWidth: "100%", maxHeight: "100%" });

export const decorationListContainer = style({
  height: "50%",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  overflowY: "auto",
  overflowX: "hidden",
  // * 스크롤바 너비 때문에 임의로 오른쪽 패딩을 -10함
  padding: "21px 11px 8px 21px",
  zIndex: 99,
  pointerEvents: "fill",
});

export const buttonGroup = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginBottom: "16px",
  pointerEvents: "fill",
  position: "sticky",
  top: "0px",
});

export const button = style({
  width: "fit-content",
  height: "fit-content",
  padding: "6px 14px",
  border: "1px solid #000",
  textAlign: "center",
  whiteSpace: "nowrap",
  background: "#fff",
  selectors: {
    "&[aria-selected=true]": {
      background: "#bdff6b",
      boxShadow: "2px 2px",
    },
  },
});

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
