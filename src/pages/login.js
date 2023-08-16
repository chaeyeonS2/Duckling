import { auth } from '../firebase/config'
import { getAuth, signInWithPopup,TwitterAuthProvider } from 'firebase/auth';
import React from 'react';

const twitterLogin = () => {
    // Twitter 로그인 팝업 띄우기
    const provider = new TwitterAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)                      
    .then((result) => {
            //This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        //You can use these server side with your app's credentials to access the Twitter API.
            const credential = TwitterAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const secret = credential.secret;

    // 로그인 성공 시, Firebase 사용자 객체에서 필요한 정보를 가져옴
    const user = result.user;
    const userID = user.uid;
    const photoURL = user.photoURL;  //tiwtter 프로필 사진 가져옴
    console.log('Firebase userID:', userID);

    })
    .catch((error) => {
    console.error('Twitter 로그인 에러:', error);
            const errorCode = error.code;
        const errorMessage = error.message;
            const credential = TwitterAuthProvider.credentialFromError(error);
    });             
}

const Login = () => {
    return (
        <div>
            {/* <button id='twitter-sign-in-btn' onClick={twitterLogin}>
              트위터 로그인  
            </button> */}

            <div style={
                { position:"relative" ,width: "100%", height: "100vh",   display: "flex",
                justifyContent: 'center'}
            }>
                <img style={
                {width: "80vw",height: "10%", marginTop:"35vh", objectFit:"contain" }
            }
                src = {process.env.PUBLIC_URL + '/img/login/logo.png'} />
                <div style={{position:"absolute"}} id='twitter-sign-in-btn' onClick={twitterLogin}>
                <img style={
                    {width: "90vw",height: "10%", marginTop:"70vh", objectFit:"contain" }
                }
                    src = {process.env.PUBLIC_URL + '/img/login/twitter.png'} />
                    
                </div>
            
            </div>
        </div>
        
    )
}
export default Login
