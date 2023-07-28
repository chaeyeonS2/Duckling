import "../../css/item.css";
import React, { useState, Suspense, useRef, useEffect } from "react";
  
const Itembox = props => {
    const itemtype = props.type;

    var itemTypeArray = ['eye', 'mouth', '상의', '하의', '한벌의상'];
    const [content, setContent] = useState(itemtype);
    const handleItemContent = ()=> {
        itemTypeArray.map((n)=>{
            if(itemtype === n){
                //console.log(itemtype);
                return(
                    setContent(
                        <img className="item_img" src={process.env.PUBLIC_URL + "/img/item/jean.png"} img alt="my image"/>
                    )
                )
            }
        })
    }
    // useEffect를 사용하여 컴포넌트가 로드되자마자 myFunction을 실행합니다.
    useEffect(() => {
        handleItemContent();
    });
    return (
        <div className="item_box">
            {content}
        </div>
    )
}
export default Itembox