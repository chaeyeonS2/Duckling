import "../../css/item.css";
import React, { useState, Suspense, useRef, useEffect } from "react";
import * as AvatarDeco from "./avatarDeco";

const Itembox = props => {
    var itemtype = props.type;
    var imgSrc = props.imgSrc;
    var index = props.index;

    var gltfPath = process.env.PUBLIC_URL + '/gltf/bottom/minji_pants.gltf';
    
    var itemTypeArray = ['eye', 'mouth', 'top', 'bottom', 'shoes', 'etc'];
    
    const [isitemClick, setClick] = useState(false);
    // var getDataOn = () =>{
    //     //isClick = getGltfPath;
    //     props.getData(isClick);
    //   }
    const putGltf = () =>
    {
        //서버로 요청하는 코드 추가
        //AvatarDeco.js로 보내는 코드
        //setClick(true);
        AvatarDeco.isClick(index, itemtype);
        // isClick = true;
        // props.getData(isClick);
        // console.log('thisisitembox');
        // console.log(addGltfPath);

    }
    const [content, setContent] = useState(itemtype);
    const handleItemContent = ()=> 
    {
        //서버 연동하면 사용
        setContent(
            //클릭하면 ui 변경 추가해야함;
            <img className="item_img" src={imgSrc} onClick={() => putGltf()}></img>
        )
        // itemTypeArray.map((n)=>{
        //     if(itemtype === "eye"){
        //         //console.log(itemtype);
        //         return(
        //             setContent(
        //                 //<img className="item_img" src={process.env.PUBLIC_URL + "/img/item/jean.png"}/>
        //                 <img className="item_img" src={imgSrc}/>

        //             )
        //         )
        //     }
        //     else if (itemtype === "상의" || itemtype === "mouth" ){
        //         //console.log(itemtype);
        //         return(
        //             setContent(
        //                 <img className="item_img" src={imgSrc}/>
        //                // <img className="item_img" src={process.env.PUBLIC_URL + "/img/item/cloth_1.png"} img alt="my image"/>
        //             )
        //         )
        //     }
        //     else{
        //         return(
        //             setContent(
        //                 <img className="item_img" src={imgSrc}/>
        //                 //<img className="item_img" src={process.env.PUBLIC_URL + "/img/item/jean.png"} img alt="my image"/>
        //             )
        //         )
        //     }
        // })
    }
    // useEffect를 사용하여 컴포넌트가 로드되자마자 myFunction을 실행합니다.
    useEffect(() => {
        handleItemContent();
    }, [itemtype]);
    
    return (
        <div className="item_box">
            {content}
        </div>
    )
}
export default Itembox