export default function mergeClassName(...classNames: (string | undefined)[]) {
  return classNames.filter(Boolean).join(" ");
}
