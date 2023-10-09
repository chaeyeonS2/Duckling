import { style } from "@vanilla-extract/css";

export const imgUploadBox = style({
  width: "100%",
  marginTop: "10px",
  display: "grid",
  gridGap: "4px",
  gridTemplateColumns: "repeat(3,minmax(auto,1fr))",
  alignItems: "center",
  justifyContent: "space-around",
});

export const marignBox = style({
  padding: "0.5vw",
  width: "99vw",
  textAlign: "center",
});

export const title = style({
  height: "45px",
  padding: "10px",
  borderRadius: "20px 20px 0 0",
  borderLeft: "1px solid black",
  borderRight: "1px solid black",
  borderTop: "5px solid black",
});

export const titleInput = style({
  width: "90vw",
  height: "40px",
  background: "transparent",
  border: "0",
  marginTop: "3px",
});

export const toolBar = style({
  width: "100vw",
  height: "50px",
  backgroundColor: "white",
  borderTop: "1px solid #ddd",
  position: "fixed",
  bottom: "88px",
});

export const writing = style({
  height: "80vh",
  padding: "10px",
  border: "1px solid black",
});

export const writingInput = style({
  width: "90vw",
  marginTop: "10px",
  background: "transparent",
  border: "0",
});

export const camera = style({
  display: "block",
  width: "50px",
  height: "50px",
  paddingLeft: "20px",
  paddingTop: "5px",
});
export const cameraIcon = style({
  width: "40px",
  height: "40px",
});

export const imgUploadPreview = style({ width: "28vw", position: "relative", marginRight: "5px", marginLeft: "5px" });

export const closeIconContainer = style({
  position: "absolute",
  width: "20px",
  margin: "3px",
  right: "0px",
});

export const previewImg = style({
  width: "100%",
  height: "100%",
  background: "#d9d9d9",
  objectFit: "contain",
});
