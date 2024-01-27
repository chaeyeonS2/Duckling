//https://github.com/Temzasse/react-modal-sheet#vanilla-css
import useSWR from "swr";
import { useRef } from "react";
import useSWRImmutable from "swr/immutable";
import { useNavigate } from "react-router-dom";

import { DynamicIcon } from "@/components/Icon";
import Sheet, { SheetRef } from "react-modal-sheet";

import * as styles from "./MyPostBottomSheet.css.ts";

export default function MyPostBottomSheet() {
  const ref = useRef<SheetRef>();
  const snapTo = (i: number) => ref.current?.snapTo(i);

  return (
    <Sheet
      isOpen={true}
      onClose={() => snapTo(1)}
      snapPoints={[500, 80]}
      initialSnap={1}
      style={{
        marginBottom: "88px",
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
            height: "88px",
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
          <Sheet.Scroller draggableAt="both" style={{ overflowX: "hidden" }}>
            <CustomContent />
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop style={{ backgroundColor: "rgba(0,0,0,0)" }} />
    </Sheet>
  );
}

function CustomHeader() {
  const { data: user } = useSWRImmutable(`/api/users/${localStorage.getItem("id")}`);
  const navigate = useNavigate();
  const newpostClick = () => {
    navigate("/newPost");
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.profileImg} style={{ backgroundImage: `url(${user?.profileImg})` }} />
      <div className={styles.userName}>{localStorage.getItem("userName")}</div>
      <div onClick={newpostClick}>
        <DynamicIcon id="newpost" size="large" />
      </div>
    </div>
  );
}

function CustomContent() {
  const { data: posts } = useSWR(`/api/posts/writer/${localStorage.getItem("id")}`);

  const navigate = useNavigate();
  const handlePostClick = (postID: string) => {
    navigate(`/postview/${postID}`);
  };

  return (
    <div className={styles.content}>
      {posts?.map((post, index) => (
        <img
          key={index}
          className={styles.postImage}
          onClick={() => handlePostClick(post.postID)}
          src={post.postImg[0]}
          alt=""
        />
      ))}
    </div>
  );
}
