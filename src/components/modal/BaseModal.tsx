import { overlays } from "@/utils/overlays";
import * as styles from "./modal.css";
import mergeClassName from "@/utils/mergeClassName";

export type BaseModalProps = {
  logoImgSrc?: string | JSX.Element;
  title?: React.ReactNode;
  description?: React.ReactNode;
} & (
  | {
      overlayId?: number;
      disableBackdrop: true;
      disableBackdropClick?: never;
    }
  | {
      overlayId?: number;
      disableBackdrop?: false;
      disableBackdropClick: true;
    }
  | {
      overlayId: number;
      disableBackdrop?: false;
      disableBackdropClick?: false;
    }
);
export default function BaseModal({
  logoImgSrc,
  title,
  description,
  disableBackdrop = false,
  disableBackdropClick,
  overlayId,
  className,
  children,
  ...props
}: React.PropsWithElementProps<"div", BaseModalProps>) {
  const handleBackdropClick = () => {
    if (disableBackdropClick) return;

    if (overlayId === undefined) {
      throw new Error("overlayId is required when disableBackdrop and disableBackdropClick are both false");
    }
    overlays.close(overlayId);
  };

  return (
    <div>
      {!disableBackdrop && <div className={styles.backdrop} onClick={handleBackdropClick} />}
      <div className={mergeClassName(styles.alertlayout, className)} {...props}>
        {typeof logoImgSrc === "string" ? <img className={styles.image} src={logoImgSrc} /> : logoImgSrc}
        <div className={styles.textBox}>
          {title && <p className={styles.text1}>{title}</p>}
          {description && <p className={styles.text2}>{description}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
