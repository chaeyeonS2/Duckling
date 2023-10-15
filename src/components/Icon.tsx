export interface IconProps {
  id: string;
}
export default function Icon({ id, ...props }: IconProps & React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props}>
      <use href={`/icons.svg#${id}`} />
    </svg>
  );
}
