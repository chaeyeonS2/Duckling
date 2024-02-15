import useSWRImmutable from "swr/immutable";
import { useParams } from "react-router-dom";

import Slider from "react-slick";
import Sheet, { SheetRef } from "react-modal-sheet";
import Avatar from "@/components/Avatar";
import Footer from "@/components/layout/Footer";
import PostMetadataBar from "@/components/PostMetadataBar";
import HeaderPostView from "@/components/layout/headers/HeaderPostView";

import * as styles from "./page.css";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { DynamicIcon } from "@/components/Icon";
import axios from "axios";
import useSWR from "swr";

export default function PostViewPage() {
  const { postID } = useParams();
  const { data: postData } = useSWRImmutable(`/api/posts/${postID}`);
  const { data: comments, mutate } = useSWR(`/api/comments/${postID}`, { fallbackData: [] });

  const ref = useRef<SheetRef>();
  const snapTo = () => ref.current?.snapTo(1);

  const [comment, setComment] = useState("");
  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (comment === "") return;
    setComment("");

    const userID = localStorage.getItem("id");
    const userName = localStorage.getItem("userName");
    if (!comments) throw new Error("comments does not exist!");
    if (!userName) throw new Error("userName does not exist!");
    if (!userID) throw new Error("userID does not exist!");
    if (!postID) throw new Error("postID does not exist!");

    await axios.post("/api/comments", {
      text: comment,
      userID,
      rootID: postID,
      writerID: userID,
    });
    mutate([
      ...comments,
      {
        text: comment,
        commentID: "-1",
        rootID: postID,
        writerID: userID,
        time: new Date().getMilliseconds(),
        date: new Date().toTimeString(),
      },
    ]);
  };

  return (
    <div className={styles.layout}>
      <HeaderPostView postData={postData} />
      <div className={styles.container}>
        <div className={styles.postHeader}>
          {postData && <Avatar userId={postData.writerID} />}
          <p className={styles.title}>{postData?.title}</p>
          <p className={styles.timestemp}>{postData?.date}</p>
        </div>
        <div>
          <Slider dots variableWidth arrows={false} infinite={false}>
            {postData?.postImg.map((image, index) => (
              <img className={styles.postImgBig} src={image} alt={`Slide ${index}`} key={index} />
            ))}
          </Slider>
          <p className={styles.content}>{postData?.body}</p>
        </div>
      </div>

      <Sheet
        isOpen={true}
        onClose={snapTo}
        snapPoints={[500, 46]}
        initialSnap={1}
        ref={ref}
        style={{
          marginBottom: "88px",
        }}
      >
        <Sheet.Container style={{ boxShadow: "none", backgroundColor: "transparent" }}>
          <Sheet.Header>
            <div className={styles.metadataContainer}>
              {postData && (
                <PostMetadataBar
                  liked={postData.likes.includes(localStorage.getItem("id") || "")}
                  defLikes={postData.likes.length}
                  commentCount={postData.commentCount}
                  postID={postData.postID}
                />
              )}
            </div>
          </Sheet.Header>
          <Sheet.Content>
            <Sheet.Scroller draggableAt="both">
              <div className={styles.commentBottomSheet}>
                <div className={styles.commentsContainer}>
                  {comments?.map((comment) => (
                    <div className={styles.comment} key={comment.commentID}>
                      <div className={styles.commentHeader}>
                        <Avatar userId={comment.writerID} />
                        <span className={styles.commentDate}>{new Date(comment.time).toLocaleString()}</span>
                      </div>
                      <p>{comment.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className={styles.commentInputContainer}>
                  <textarea
                    className={styles.commentInput}
                    rows={3}
                    placeholder="댓글을 입력하세요..."
                    value={comment}
                    onChange={handleCommentChange}
                  />

                  <button className={styles.submitButton} type="submit">
                    <DynamicIcon id="send" size="medium" />
                  </button>
                </form>
              </div>
            </Sheet.Scroller>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
      <Footer />
    </div>
  );
}
