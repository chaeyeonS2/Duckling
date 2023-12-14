export interface IconProps {
  id: string;
  size?: "small" | "medium" | "large";
}
export default function Icon({ id, size, style, ...props }: IconProps & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      style={{
        width: size === "small" ? "18px" : size === "medium" ? "24px" : size === "large" ? "32px" : "",
        height: size === "small" ? "18px" : size === "medium" ? "24px" : size === "large" ? "32px" : "",
        ...style,
      }}
      {...props}
    >
      <use href={`/icons.svg#${id}`} />
    </svg>
  );
}
