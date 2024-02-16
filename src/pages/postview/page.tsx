import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import useSWR from "swr";
import axios from "axios";
import useSWRImmutable from "swr/immutable";
import { useParams } from "react-router-dom";

import Avatar from "@/components/Avatar";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Pagination } from "@egjs/flicking-plugins";

import { DynamicIcon } from "@/components/Icon";
import Footer from "@/components/layout/Footer";
import Sheet, { SheetRef } from "react-modal-sheet";
import PostMetadataBar from "@/components/PostMetadataBar";
import HeaderPostView from "@/components/layout/headers/HeaderPostView";

import * as styles from "./page.css";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/pagination.css";

export default function PostViewPage() {
  const _plugins = [new Pagination({ type: "bullet" })];
  const { postID } = useParams();
  const { data: postData } = useSWRImmutable(`/api/posts/${postID}`);

  return (
    <div className={styles.layout}>
      <HeaderPostView postData={postData} />
      <div className={styles.container}>
        <div className={styles.postHeader}>
          {postData && <Avatar userId={postData.writerID} />}
          <p className={styles.title}>{postData?.title}</p>
          <p className={styles.timestemp}>{postData?.date}</p>
        </div>
        <div style={{ paddingBottom: "88px" }}>
          <Flicking autoResize align="prev" circular={false} bound={false} plugins={_plugins}>
            {postData?.postImg.map((image, index) => (
              <img className={styles.postImgBig} src={image} alt={`Slide ${index}`} key={index} />
            ))}
            <ViewportSlot>
              <div className="flicking-pagination"></div>
            </ViewportSlot>
          </Flicking>
          <p className={styles.content}>{postData?.body}</p>
          <CommentBottomSheet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

const snapPoints = [500, 46];
function CommentBottomSheet() {
  const { postID } = useParams();
  const { data: postData } = useSWRImmutable(`/api/posts/${postID}`);
  const { data: comments, mutate } = useSWR(`/api/comments/${postID}`, { fallbackData: [] });

  const ref = useRef<SheetRef>();
  useEffect(() => {
    if (!ref.current) return;
    ref.current.snapTo(1);
  }, []);

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

  const [commentBottom, setCommentBottom] = useState(0);
  const mobileType = navigator.userAgent.toLowerCase();

  useEffect(() => {
    if (window) {
      let prevVisualViewport = window.visualViewport?.height;
      const handleVisualViewportResize = () => {
        const currentVisualViewport = Number(window.visualViewport?.height);
        if (prevVisualViewport && prevVisualViewport - 30 > currentVisualViewport) {
          const scrollHeight = Number(window.document.scrollingElement?.scrollHeight);
          const scrollTop = scrollHeight - Number(window.visualViewport?.height);
          if (mobileType.indexOf("android") > -1) {
            setCommentBottom(scrollTop);
          } else {
            setCommentBottom(scrollTop - 88);
          }
        } else if (prevVisualViewport && currentVisualViewport > prevVisualViewport) {
          // 키보드가 내려오는 경우 처리
          setCommentBottom(0); // 입력창을 원래 위치로 이동시킴
        }
        prevVisualViewport = currentVisualViewport;
      };

      if (window.visualViewport) {
        window.visualViewport.onresize = handleVisualViewportResize;
      }
    }
  }, []);

  return (
    <Sheet
      isOpen={true}
      onClose={() => ref.current?.snapTo(1)}
      snapPoints={snapPoints}
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
                onCommentClick={() => {
                  if (!ref.current) return;
                  let nearestIdx = 0;
                  const y = ref.current.y.get();
                  for (let i = 0; i < snapPoints.length; i++) {
                    if (Math.abs(snapPoints[i] - y) < Math.abs(snapPoints[nearestIdx] - y)) {
                      nearestIdx = i;
                    }
                  }

                  ref.current.snapTo(nearestIdx);
                }}
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

              <form
                onSubmit={handleSubmit}
                className={styles.commentInputContainer}
                style={{ position: "relative", bottom: `${commentBottom}px` }}
              >
                <textarea
                  className={styles.commentInput}
                  rows={3}
                  placeholder="댓글을 입력하세요..."
                  value={comment}
                  onChange={handleCommentChange}
                  style={{ backgroundColor: "white" }}
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
  );
}
