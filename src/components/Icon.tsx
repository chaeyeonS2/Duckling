import { useRef, useEffect, useState, useMemo } from "react";
import * as styles from "./Icon.css";

export interface IconProps {
  id: IconIds;
  size?: "small" | "medium" | "large";
}
export function StaticIcon({
  id,
  size,
  className = "",
  ...props
}: IconProps & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src">) {
  const iconUrl = useMemo(() => new URL(`../assets/icons/${id}.svg`, import.meta.url).href.replace(".svg", ""), [id]);

  return <img className={(size ? styles.iconSize[size] : "") + " " + className} src={`${iconUrl}.svg`} {...props} />;
}

type SVGRComponent = typeof import("*.svg?react")["default"];
export function DynamicIcon({ id, size, className = "", ...props }: IconProps & React.ComponentProps<SVGRComponent>) {
  const { SvgIcon } = useDynamicSVGImport(id);

  if (!SvgIcon) return;
  return <SvgIcon className={(size ? styles.iconSize[size] : "") + " " + className} {...props} />;
}

type IconIds =
  | "!"
  | "avatarmotion-camera"
  | "back"
  | "body"
  | "camera-fill"
  | "camera"
  | "cancel"
  | "candy-fill"
  | "candy"
  | "clothe-fill"
  | "clothes"
  | "comment"
  | "edit"
  | "face"
  | "home"
  | "check"
  | "image"
  | "link"
  | "mypage-fill"
  | "mypage"
  | "new"
  | "newpost"
  | "popular"
  | "reset"
  | "save"
  | "send"
  | "setting-fiil"
  | "settings"
  | "share-avartar"
  | "share-fill"
  | "share"
  | "trash-can"
  | "Twitter"
  | "warning"
  | "X-logo";

interface UseDynamicSVGImportOptions {
  onCompleted?: (name: string, SvgIcon: React.FC<React.SVGProps<SVGSVGElement>> | undefined) => void;
  onError?: (err: unknown) => void;
}
function useDynamicSVGImport(name: string, options: UseDynamicSVGImportOptions = {}) {
  const ImportedIconRef = useRef<React.FC<React.SVGProps<SVGSVGElement>>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const { onCompleted, onError } = options;
  useEffect(() => {
    setLoading(true);
    const importIcon = async (): Promise<void> => {
      try {
        ImportedIconRef.current = (await import(`../assets/icons/${name}.svg?react`)).default;
        onCompleted?.(name, ImportedIconRef.current);
      } catch (err) {
        onError?.(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [name, onCompleted, onError]);

  return { error, loading, SvgIcon: ImportedIconRef.current };
}
