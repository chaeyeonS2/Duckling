import "../../css/layout.css";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Footer from '../../footer';
import HeaderComment from "../../headers/headerComment";
import styles from "../../css/writing/commentPage.module.css";
import axios from 'axios';


const userID = localStorage.getItem("id");
var getUid  = "";
const photoURL = localStorage.getItem("profileImg");
const userName = localStorage.getItem("userName");
var pid = '';
var commentCount = -1;
export function getCommentInfo(postid, commentNum){
  pid = postid;
  commentCount = commentNum;
}

const CommentPage = () => {
    
    const [comment, setComment] = useState('');
    const [upload, setUpload] = useState('');

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
              "userID" : userID,
              "rootID" : pid, 
              "writerID" : userName
            }
          );
          console.log("Document uploaded:", response.data);
          if(response.data){
            //window.location.reload();
            setUpload("aa");
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
    const [profileImg, setProfileImg] = useState(''); // 상태 추가
    const getUserProfileImg = async () => {
        try {
        const response = await axios.get(`https://us-central1-netural-app.cloudfunctions.net/api/users/${getUid}`);
        setProfileImg(response.data.profileImg); // 상태 업데이트

        } catch(e) {
        console.error(e);
        }
    }
    //유저 정보 받아오기


    useEffect(() => {
        getUserProfileImg();
      }, [getUid]);

    const [data, setData] = useState(null);
    const [update, setUpdate] = useState(null);
    
    //댓글 받아오기
    const getComment = async () => {
        try {
        const response = await axios.get(`https://us-central1-netural-app.cloudfunctions.net/api/comments/root/${pid}`);
        //etData(response.data);
        console.log("success");
        getUid = response.data.userID;

        setData(response.data.slice().sort((a, b) => a.time - b.time));

        } catch(e) {
        console.error(e);
        }
    }
    //유저 정보 받아오기


    useEffect(() => {

        getComment();
      }, [upload]);


  
    


    return (
        <div className="layout">
            {/* 고정 헤더 */}
            <HeaderComment
              commentNum = {commentCount}
            />
            <div className={styles.content}>
            {data && 
            <div className="BottomSheet-content">
               <div className="comment-get-layout" style={{height:"80%"}}>
                    {/* 댓글 */}
                    {data.map((comment) => (
                        <div className="commentBox">
                            <div className='commentTop'>
                                <div className={styles.profileImg} style={{backgroundImage:`url(${profileImg})`}}>
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