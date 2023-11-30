import * as styles from "./modal.css";

export interface BaseModalProps {
  logoImgSrc?: string | JSX.Element;
  title?: React.ReactNode;
  description?: React.ReactNode;
}
export default function BaseModal({
  logoImgSrc,
  title,
  description,
  children,
}: React.PropsWithChildren<BaseModalProps>) {
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
