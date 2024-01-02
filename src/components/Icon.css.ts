import { styleVariants } from "@vanilla-extract/css";

export const iconSize = styleVariants({
  small: { width: "18px", height: "18px" },
  medium: { width: "24px", height: "24px" },
  large: { width: "32px", height: "32px" },
});
