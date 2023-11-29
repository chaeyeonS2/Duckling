import * as styles from "./isImage.css";

export interface AlertModalProps {
  logoImgSrc?: string | JSX.Element;
  title?: string;
  description?: string;
}
export default function AlertModal({
  logoImgSrc,
  title,
  description,
  children,
}: React.PropsWithChildren<AlertModalProps>) {
  return (
    <div className={styles.alertlayout}>
      {typeof logoImgSrc === "string" ? <img className={styles.image} src={logoImgSrc} /> : logoImgSrc}
      <div className={styles.textBox}>
        {title && <p className={styles.text1}>{title}</p>}
        {description && <p className={styles.text2}>{description}</p>}
      </div>
      {children}
    </div>
  );
}
