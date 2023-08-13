import React, { useState, useRef } from "react";
import "../../css/lookiing/postBox.css";

const PostBox = () => {
    return(
        <div className='one-post-box'>
            <div className='one-post-info'>
                <div className='one-post-profile'>
                    <div className="profileImg">
                        {/* 서버에서 받아온 이미지 넣기 */}
                    </div> 
                    <div className="userName">
                        팜하니
                    </div>
                    <div className='date'>2023.08.11</div>
                </div>

            </div>
            
            <div className='one-post-img-layout'>

            
            <div className='one-post-img-back'>
                <div className='back'></div>
                <div className='one-post-img'>
                    <img className='' src={process.env.PUBLIC_URL + "/img/writing/example.jpeg"}/> 
                </div>
            </div>
            </div>
            <div className='one-post-info2'>
                <div><img src={process.env.PUBLIC_URL + "/img/writing/cookie.png"}/></div>
                <div>215</div>
                <div><img src={process.env.PUBLIC_URL + "/img/writing/comment.png"}/></div>
                <div >423</div>
                
            </div>

            <div className='one-post-content'>
                <p>오늘은 하니가 다녀간 소품샵 방문 쨩귀 (🎀•͈з•͈ )<br/>
                진짜 지구뿌셔 오늘 너무 재미었다 깔ㄲ까라락ㄹ....
                </p>
            </div>
        </div>
    )
}
export default PostBox