import { style } from "@vanilla-extract/css";

export const header = style({
  backgroundColor: "white",
  display: "flex",
});

export const tab = style({
  flex: 1,
  padding: "14px 0",
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  paddingLeft: "15%",
  borderBottom: "5px solid #b5b5b5",
  color: "#B5B5B5",
  selectors: {
    "&[aria-selected=true]": {
      borderBottom: "5px solid black",
      color: "black",
    },
  },
});

export const tabText = style({
  fontSize: "22px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "100%",
  marginLeft: "5px",
});
