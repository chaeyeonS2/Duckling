//https://github.com/Temzasse/react-modal-sheet#vanilla-css
import Sheet, { SheetRef } from "react-modal-sheet";
import { useRef } from "react";
import * as styles from "./myPost.css";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

export default function MyPost() {
  const ref = useRef<SheetRef>();
  const snapTo = (i: number) => ref.current?.snapTo(i);

  return (
    <>
      <Sheet
        isOpen={true}
        onClose={() => snapTo(1)}
        snapPoints={[500, 80]}
        initialSnap={1}
        style={{
          marginBottom: "75px",
          borderLeft: "1px solid black",
          borderRight: "1px solid black",
        }}
      >
        <Sheet.Container
          style={{
            borderTopRightRadius: "20px",
            borderTopLeftRadius: "20px",
          }}
        >
          <Sheet.Header
            style={{
              height: "55px",
              borderRadius: "20px 20px 0 0",
              borderTop: "5px solid black",
              boxShadow: "0px -2px 0px rgba(0, 0, 0, 0.3)",
              paddingTop: "12px",
              paddingBottom: "12px",
            }}
          >
            <CustomHeader />
          </Sheet.Header>
          <Sheet.Content>
            <Sheet.Scroller draggableAt="both">
              <CustomContent />
            </Sheet.Scroller>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop style={{ backgroundColor: "rgba(0,0,0,0)" }} />
      </Sheet>
    </>
  );
}

function CustomHeader() {
  const navigate = useNavigate();
  const newpostClick = () => {
    navigate("/newPost");
  };
  return (
    <div>
      <div className={styles.profileImg} style={{ backgroundImage: `url(${localStorage.getItem("photoURL")})` }} />
      <div className={styles.userName}>{localStorage.getItem("userName")}</div>
      <div className={styles.btnAddNew} onClick={newpostClick}>
        <img className={styles.btnAddNewImage} src="/img/writing/add.png" alt="" />
      </div>
    </div>
  );
}

function CustomContent() {
  const { data: posts } = useSWR<APIPostsWriterReponse>("/api/posts/writer/" + localStorage.getItem("userName"));

  const navigate = useNavigate();
  const handlePostClick = (userName: string, postID: string) => {
    navigate(`/postview/${userName}/${postID}`);
  };
  return (
    <div className={styles.content}>
      {posts &&
        posts.map((post, index) => (
          <div key={index} className={styles.postImg} onClick={() => handlePostClick(post.writerID, post.postID)}>
            <img className={styles.item_img} src={post.postImg[0]} alt="" />
          </div>
        ))}
    </div>
  );
}
