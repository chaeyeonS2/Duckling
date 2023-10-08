import "@/css/alert/alertLayout.css";
import "@/css/alert/delete.css";

export interface DeleteProps {
  onClose: () => void;
}
export default function Delete({ onClose }: DeleteProps) {
  return (
    <div className="alertlayout">
      <div className="textBox_delete">
        <p>해당 글은 영구적으로 삭제 됩니다.</p>
        <p>정말 삭제 하실건가요? (˙ᴖ˙ก̀)</p>
      </div>
      <div className="btnBox_delete">
        <button className="btn_NO" onClick={onClose}>
          아니오
        </button>
        <button className="btn_OK">네, 삭제할게요</button>
      </div>
    </div>
  );
}
