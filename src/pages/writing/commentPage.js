import "../../css/layout.css";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Footer from '../../footer';
import HeaderComment from "../../headers/headerComment";
import styles from "../../css/writing/commentPage.module.css";


const CommentPage = () => {
    
    const [comment, setComment] = useState('');

    const handleCommentChange = (event) => {
      setComment(event.target.value); 
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (comment === '') {
        return;
      }
      // 여기에 댓글을 서버에 보내는 로직을 추가할 수 있습니다.
      console.log('댓글 제출:', comment);
      setComment(''); // 댓글 입력란 초기화
    };

    return (
        <div className="layout">
            {/* 고정 헤더 */}
            <HeaderComment/>
            <div className={styles.content}>
            <div className="BottomSheet-content">
               <div className="comment-get-layout">
                    {/* 댓글 */}
                    <div className="commentBox">
                        <div className='commentTop'>
                            <div className="profileImg">
                                {/* 서버에서 받아온 이미지 넣기 */}
                            </div> 
                            <div className="userName">
                                팜하니
                            </div>
                        </div>
                        <div className='commentContent'>
                        너무 재미있어요. super shy~~~너무 재미있어요. super shy~~~너무 재미있어요. super shy~~~너무

                        </div>
                    </div>
                    {/* 댓글 끝 */}
                    
            
                </div> 
            </div>
            </div>


            <div className={styles.writeComment}>
                    <div >
                        <form onSubmit={handleSubmit} className={styles.commentInput}>
                            <textarea
                            rows="3"
                            placeholder="댓글을 입력하세요..."
                            value={comment}
                            onChange={handleCommentChange}
                            ></textarea>
                            <br />

                            <button className="Btn_comment" type="submit">
                            <img src={process.env.PUBLIC_URL + "/img/writing/comment-upload-true-btn.png"}/>
                            </button>
                        </form>
                    </div>

                </div>
            {/* 고정 푸터 btn 전달값 유저에 따라 수정해야함*/}
            <Footer btn = {1}/>
        </div>
    )
}

export default CommentPage