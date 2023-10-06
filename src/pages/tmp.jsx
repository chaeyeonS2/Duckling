import React, { Fragment, useState } from "react";
import axios from "axios";

const Tmp = () => {
  const [data, setData] = useState(null);
  const onClick = () => {
    axios
      .get(
        "https://us-central1-netural-app.cloudfunctions.net/api/assets/top_1",
      )
      .then((reponse) => {
        setData(reponse.data);
      });
  };
  // const item = data.assetImg._path.segments[3];
  return (
    <div>
      <div>
        <h3>Axios 테스트해보기</h3>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && (
        <div>
          <br />
          Gltf : {data.assetGltf} <br />
          Image: {data.assetImg} <br />
          Kind : {data.kind} <br />
        </div>
      )}
      {/* {data.assetImg} */}
      {data && data.assetImg && <img src={data.assetImg} />}
    </div>
  );
};

export default Tmp;

// {
//     "kind": "top",
//     "assetGltf": "https://firebasestorage.googleapis.com/v0/b/netural-app.appspot.com/o/tops_gltf%2Fhani_top.gltf?alt=media&token=448e7601-2711-447d-8545-9bf1ba941bca",
//     "assetImg": "https://firebasestorage.googleapis.com/v0/b/netural-app.appspot.com/o/tops_png%2Fhani_top.png?alt=media&token=469e3555-9171-4ff4-8ba8-9591c0ef10e5"
// }
