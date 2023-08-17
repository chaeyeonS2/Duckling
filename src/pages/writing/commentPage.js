import "../../css/layout.css";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Footer from '../../footer';
import HeaderComment from "../../headers/headerComment";
import styles from "../../css/writing/commentPage.module.css";
import axios from 'axios';

const userID = localStorage.getItem("id");
const photoURL = localStorage.getItem("profileImg");
const userName = localStorage.getItem("userName");

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
      const handleUpload = async () => {
        try {
          const response = await axios.post(
            "https://us-central1-netural-app.cloudfunctions.net/api/comments",
            {
              "text" : comment,
              "rootID" : "haha", 
              "writerID" : "팜하니" 
            }
          );
          console.log("Document uploaded:", response.data);
          if(response.data){
            window.location.reload();
          }
        } catch (error) {
          console.error("Error uploading document:", error);
        }
      };
      handleUpload();
      console.log('댓글 제출:', comment);
      setUpdate(comment);
      setComment(''); // 댓글 입력란 초기화
      getComment();
      
    };

    const [data, setData] = useState(null);
    const [update, setUpdate] = useState(null);
    
    //댓글 받아오기
    const getComment = async () => {
        try {
        const response = await axios.get("https://us-central1-netural-app.cloudfunctions.net/api/comments/root/haha");
        //etData(response.data);
        console.log("success");

        setData(response.data.slice().sort((a, b) => a.time - b.time));

        } catch(e) {
        console.error(e);
        }
    }
    //유저 정보 받아오기


    useEffect(() => {

        getComment();
      }, []);


  
    


    return (
        <div className="layout">
            {/* 고정 헤더 */}
            <HeaderComment/>
            <div className={styles.content}>
            {data && 
            <div className="BottomSheet-content">
               <div className="comment-get-layout" style={{height:"80%"}}>
                    {/* 댓글 */}
                    {data.map((comment) => (
                        <div className="commentBox">
                            <div className='commentTop'>
                                <div className={styles.profileImg} style={{backgroundImage:`url(${photoURL})`}}>
                                </div> 
                                <div className="userName">
                                    {comment.writerID}
                                </div>
                            </div>
                            <div className='commentContent'>
                                {comment.text}
                            </div>
                        </div>
                    ))}
                    

                    
                    
                    {/* 댓글 끝 */}
                    
            
                </div> 
                
            </div>
            }
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

// //전달되는 포스트 정보
// {
//     "commentID": "commentID",
//     "text": "text",
//     "rootID": "rootID",
//     "writerID": "writerID",
//     "time": "time",
//     "date": "date"
// }