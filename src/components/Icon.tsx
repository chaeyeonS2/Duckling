import { useRef, useEffect, useState, useMemo } from "react";

export interface IconProps {
  id: IconIds;
  size: "small" | "medium" | "large";
}
export function StaticIcon({ id, size, ...props }: IconProps & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src">) {
  const iconUrl = useMemo(() => new URL(`../assets/icons/${id}.svg`, import.meta.url).href.replace(".svg", ""), [id]);
  const sizeStyle = size ? resolveSize(size) : "";

  return (
    <img
      style={
        size
          ? {
              width: sizeStyle,
              height: sizeStyle,
            }
          : {}
      }
      src={`${iconUrl}.svg`}
      {...props}
    />
  );
}

type SVGRComponent = typeof import("*.svg?react")["default"];
export function DynamicIcon({ id, size, ...props }: IconProps & React.ComponentProps<SVGRComponent>) {
  const sizeStyle = resolveSize(size);
  const prop = Object.assign(
    {
      style: {
        width: sizeStyle,
        height: sizeStyle,
      },
    },
    props
  );
  const { svgIcon } = useDynamicSVGImport(id, prop);

  return svgIcon;
}

function resolveSize(size: "small" | "medium" | "large") {
  return size === "small" ? "18px" : size === "medium" ? "24px" : size === "large" ? "32px" : undefined;
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
  | "home-fill"
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
  onCompleted?: (name: string, svgIcon: React.ReactNode) => void;
  onError?: (err: unknown) => void;
  retryInterval?: number;
  retryCount?: number;
}
function useDynamicSVGImport(
  name: string,
  props?: React.ComponentProps<SVGRComponent>,
  { onCompleted, onError, retryInterval = 2000, retryCount = 3 }: UseDynamicSVGImportOptions = {}
) {
  const [importedIcon, setImportedIcon] = useState<React.ReactNode>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const importIcon = async (): Promise<void> => {
      setLoading(true);
      for (let i = 0; i < retryCount; i++) {
        try {
          const { default: II } = await import(`../assets/icons/${name}.svg?react`);
          const Icon = <II {...props} />;
          if (!II) {
            console.log(`아이콘을 찾을 수 없음: ${"../assets/icons/${name}.svg?react"}`);
          } else {
            setImportedIcon(Icon);
            onCompleted?.(name, Icon);
          }

          break;
        } catch (err) {
          onError?.(err);
          setError(err);
          await new Promise((resolve) => setTimeout(resolve, retryInterval));
        }
      }
      setLoading(false);
    };
    importIcon();
  }, [name, onCompleted, onError]);

  return { error, loading, svgIcon: importedIcon };
}
