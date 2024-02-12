import { style } from "@vanilla-extract/css";

export const headerContainer = style({
  display: "flex",
  alignItems: "center",
  padding: "0 24px",
  gap: "20px",
});

export const profileImg = style({
  width: "50px",
  height: "50px",
  borderRadius: "100%",
  backgroundColor: "#d9d9d9",
  backgroundSize: "cover",
});

export const userName = style({ flex: 1, width: "auto", height: "fit-content", fontSize: "22px" });

export const content = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
});

export const postImage = style({ height: "100%", objectFit: "cover", backgroundColor: "#f0f0f0", flex: 1 });
 