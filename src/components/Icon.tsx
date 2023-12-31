import * as styles from "./Icon.css";

export interface IconProps {
  id: string;
  size?: "small" | "medium" | "large";
}
export default function Icon({ id, size, className, ...props }: IconProps & React.SVGProps<SVGSVGElement>) {
  return (
    <svg className={(size ? styles.iconSize[size] : "") + " " + className} {...props}>
      <use href={`/icons.svg#${id}`} />
    </svg>
  );
}
