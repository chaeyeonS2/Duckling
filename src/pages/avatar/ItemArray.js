import axios from 'axios';
import { useEffect, useState } from 'react';


export const ItemArray = props => {
    const [data, setData] = useState(null);
    const [dataType, setDataType] = useState([]); //area, kind
    
    useEffect(() => {

    const getItemInfo = async () => {
        
    await axios.get(`https://us-central1-netural-app.cloudfunctions.net/api/assets/${props.area}/${props.kind}`)
    .then(response =>{
        setData(response.data);
        console.log(data[0].assetID);
        
    })
      
      .catch(e => {
        console.error(e);
      })
            
        }
        getItemInfo();
        }, [props.area, props.kind]);
    return(
        <></>
    )
}

const dataArrays = {
    top: [ 
        process.env.PUBLIC_URL + "/png/top/daniel_top.png",
    process.env.PUBLIC_URL + "/png/top/hani_top.png",
    process.env.PUBLIC_URL + "/png/top/hb_daniel_top.png",
    process.env.PUBLIC_URL + "/png/top/hb_hani_top.png",
    process.env.PUBLIC_URL + "/png/top/hb_herin_top.png",
    process.env.PUBLIC_URL + "/png/top/hb_hyein_top.png",
    process.env.PUBLIC_URL + "/png/top/hb_minji_top.png",
    process.env.PUBLIC_URL + "/png/top/herin_top.png",
    process.env.PUBLIC_URL + "/png/top/hyein_top.png",
    process.env.PUBLIC_URL + "/png/top/minji_top.png"
    
    ],
    bottom: [ 
        process.env.PUBLIC_URL + "/png/bottom/daniel_skirt.png",
    process.env.PUBLIC_URL + "/png/bottom/hani_pants.png",
    process.env.PUBLIC_URL + "/png/bottom/hb_DANIEL_pants.png",
    process.env.PUBLIC_URL + "/png/bottom/hb_hani_pants.png",
    process.env.PUBLIC_URL + "/png/bottom/hb_HYEIN_pants.png",
    process.env.PUBLIC_URL + "/png/bottom/hb_HYERIN_skirt.png",
    process.env.PUBLIC_URL + "/png/bottom/hb_minji_skirt.png",
    process.env.PUBLIC_URL + "/png/bottom/herin_skirt.png",
    process.env.PUBLIC_URL + "/png/bottom/hyein_pants.png",
    process.env.PUBLIC_URL + "/png/bottom/minji_pants.png"
],
    shoes:[process.env.PUBLIC_URL + "/png/shoes/Pumps_Hill_Black.png",
    process.env.PUBLIC_URL + "/png/shoes/Pumps_Hill_Blue.png",
    process.env.PUBLIC_URL + "/png/shoes/Pumps_Hill_Pink.png",
    process.env.PUBLIC_URL + "/png/shoes/Pumps_Hill_Purple.png",
    process.env.PUBLIC_URL + "/png/shoes/Sneakers_Green.png",
    process.env.PUBLIC_URL + "/png/shoes/Sneakers_Yellow.png"
    ],
    etc:[process.env.PUBLIC_URL + "/png/etc/airpods_black.png",
    process.env.PUBLIC_URL + "/png/etc/airpods_blue.png",
    process.env.PUBLIC_URL + "/png/etc/airpods_green.png",
    process.env.PUBLIC_URL + "/png/etc/airpods_white.png",
    process.env.PUBLIC_URL + "/png/etc/beani_black.png",
    process.env.PUBLIC_URL + "/png/etc/beani_pink.png",
    process.env.PUBLIC_URL + "/png/etc/beani_white.png",
    process.env.PUBLIC_URL + "/png/etc/butterfly_pin.png",
    process.env.PUBLIC_URL + "/png/etc/CD_bag_black.png",
    process.env.PUBLIC_URL + "/png/etc/CD_bag_red.png",
    process.env.PUBLIC_URL + "/png/etc/CD_bag_white.png",
    process.env.PUBLIC_URL + "/png/etc/damagochi_blue.png",
    process.env.PUBLIC_URL + "/png/etc/damagochi_green.png",
    process.env.PUBLIC_URL + "/png/etc/damagochi_pink.png",
    process.env.PUBLIC_URL + "/png/etc/damagochi_white.png",
    process.env.PUBLIC_URL + "/png/etc/DS_bag.png",
    process.env.PUBLIC_URL + "/png/etc/hairband.png",
    process.env.PUBLIC_URL + "/png/etc/heart_nk.png",
    process.env.PUBLIC_URL + "/png/etc/KR_sh_bag.png",
    process.env.PUBLIC_URL + "/png/etc/Light_stick.png",
    process.env.PUBLIC_URL + "/png/etc/PT_bag.png",
    process.env.PUBLIC_URL + "/png/etc/ribbon_pin.png",
    process.env.PUBLIC_URL + "/png/etc/ST_bag.png"
    
    ],
    eye:[process.env.PUBLIC_URL + "/png/eye/face_arch_eye.png",
    process.env.PUBLIC_URL + "/png/eye/face_crying_eye.png",
    process.env.PUBLIC_URL + "/png/eye/face_DANIEL_eyes.png",
    process.env.PUBLIC_URL + "/png/eye/face_HAERIN_eyes.png",
    process.env.PUBLIC_URL + "/png/eye/face_HANI_eyes.png",
    process.env.PUBLIC_URL + "/png/eye/face_HYEIN_eyes.png",
    process.env.PUBLIC_URL + "/png/eye/face_MINJI_eyes.png",
    process.env.PUBLIC_URL + "/png/eye/face_wink_eye.png",
    process.env.PUBLIC_URL + "/png/eye/face_XD_eye.png",
    process.env.PUBLIC_URL + "/png/eye/face_ZZ_eye.png"
    ],
    mouth:[process.env.PUBLIC_URL + "/png/mouth/face_brrr_mouth.png",
    process.env.PUBLIC_URL + "/png/mouth/face_DANIEL_mouth.png",
    process.env.PUBLIC_URL + "/png/mouth/face_HAERIN_mouth.png",
    process.env.PUBLIC_URL + "/png/mouth/face_HANI_mouth.png",
    process.env.PUBLIC_URL + "/png/mouth/face_HYEIN_mouth.png",
    process.env.PUBLIC_URL + "/png/mouth/face_merong_outh.png",
    process.env.PUBLIC_URL + "/png/mouth/face_MINJI_mouth.png",
    process.env.PUBLIC_URL + "/png/mouth/face_O_mouth.png",
    process.env.PUBLIC_URL + "/png/mouth/face_smilewithteeth_mouth.png",
    process.env.PUBLIC_URL + "/png/mouth/face_smirking_mouth.png"
    ],

    gltfEye:[process.env.PUBLIC_URL + "/gltf/eye/CUSTOM_arch_eye.gltf",
    process.env.PUBLIC_URL + "/gltf/eye/CUSTOM_crying_eye.gltf",
    process.env.PUBLIC_URL + "/gltf/eye/NewJeans_DANIEL_eye.gltf",
    process.env.PUBLIC_URL + "/gltf/eye/NewJeans_HAERIN_eye.gltf",
    process.env.PUBLIC_URL + "/gltf/eye/NewJeans_HANI_eye.gltf",
    process.env.PUBLIC_URL + "/gltf/eye/NewJeans_HYEIN_eye.gltf",
    process.env.PUBLIC_URL + "/gltf/eye/NewJeans_MINJI_eye.gltf",
    process.env.PUBLIC_URL + "/gltf/eye/CUSTOM_wink_eye.gltf",
    process.env.PUBLIC_URL + "/gltf/eye/CUSTOM_XD_eye.gltf",
    process.env.PUBLIC_URL + "/gltf/eye/CUSTOM_ZZ_eye.gltf",
    ],
    gltfMouth:[process.env.PUBLIC_URL + "/gltf/mouth/CUSTOM_brrr_mouth.gltf",
    process.env.PUBLIC_URL + "/gltf/mouth/NewJeans_DANIEL_mouth.gltf",
    process.env.PUBLIC_URL + "/gltf/mouth/NewJeans_HAERIN_mouth.gltf",
    process.env.PUBLIC_URL + "/gltf/mouth/NewJeans_HANI_mouth.gltf",
    process.env.PUBLIC_URL + "/gltf/mouth/NewJeans_HYEIN_mouth.gltf",
    process.env.PUBLIC_URL + "/gltf/mouth/CUSTOM_merong_mouth.gltf",
    process.env.PUBLIC_URL + "/gltf/mouth/NewJeans_MINJI_mouth.gltf",
    process.env.PUBLIC_URL + "/gltf/mouth/CUSTOM_O_mouth.gltf",
    process.env.PUBLIC_URL + "/gltf/mouth/CUSTOM_smilewithteeth_mouth.gltf",
    process.env.PUBLIC_URL + "/gltf/mouth/CUSTOM_smirking_mouth.gltf",
    ],
    gltfTop:[process.env.PUBLIC_URL + "/gltf/top/daniel_top.gltf",
    process.env.PUBLIC_URL + "/gltf/top/hani_top.gltf",
    process.env.PUBLIC_URL + "/gltf/top/hb_daniel_top.gltf",
    process.env.PUBLIC_URL + "/gltf/top/hb_hani_top.gltf",
    process.env.PUBLIC_URL + "/gltf/top/hb_herin_top.gltf",
    process.env.PUBLIC_URL + "/gltf/top/hb_hyein_top.gltf",
    process.env.PUBLIC_URL + "/gltf/top/hb_minji_top.gltf",
    process.env.PUBLIC_URL + "/gltf/top/herin_top.gltf",
    process.env.PUBLIC_URL + "/gltf/top/hyein_top.gltf",
    process.env.PUBLIC_URL + "/gltf/top/minji_top.gltf"
    ],
    gltfBottom:[process.env.PUBLIC_URL + "/gltf/bottom/daniel_skirt.gltf",
    process.env.PUBLIC_URL + "/gltf/bottom/hani_pants.gltf",
    process.env.PUBLIC_URL + "/gltf/bottom/hb_DANIEL_pants.gltf",
    process.env.PUBLIC_URL + "/gltf/bottom/hb_hani_pants.gltf",
    process.env.PUBLIC_URL + "/gltf/bottom/hb_HYEIN_pants.gltf",
    process.env.PUBLIC_URL + "/gltf/bottom/hb_HYERIN_skirt.gltf",
    process.env.PUBLIC_URL + "/gltf/bottom/hb_minji_skirt.gltf",
    process.env.PUBLIC_URL + "/gltf/bottom/herin_skirt.gltf",
    process.env.PUBLIC_URL + "/gltf/bottom/hyein_pants.gltf",
    process.env.PUBLIC_URL + "/gltf/bottom/minji_pants.gltf"
    ],
    gltfShoes:[process.env.PUBLIC_URL + "/gltf/shoes/Pumps_Hill_Black.glb",
    process.env.PUBLIC_URL + "/gltf/shoes/Pumps_Hill_Blue.glb",
    process.env.PUBLIC_URL + "/gltf/shoes/Pumps_Hill_Pink.glb",
    process.env.PUBLIC_URL + "/gltf/shoes/Pumps_Hill_Purple.glb",
    process.env.PUBLIC_URL + "/gltf/shoes/Sneakers_Green.glb",
    process.env.PUBLIC_URL + "/gltf/shoes/Sneakers_Yellow.glb"
    ],
    gltfEtc:[process.env.PUBLIC_URL + "/gltf/etc/Airpods_black_H.glb",
    process.env.PUBLIC_URL + "/gltf/etc/Airpods_blue_H.glb",
    process.env.PUBLIC_URL + "/gltf/etc/Airpods_green_H.glb",
    process.env.PUBLIC_URL + "/gltf/etc/Airpods_white_H.glb",
    process.env.PUBLIC_URL + "/gltf/etc/Beani_black.glb",
    process.env.PUBLIC_URL + "/gltf/etc/Beani_pink.glb",
    process.env.PUBLIC_URL + "/gltf/etc/Beani_white.glb",
    process.env.PUBLIC_URL + "/gltf/etc/butterfly_pin.glb",
    process.env.PUBLIC_URL + "/gltf/etc/CD_bag_baige.glb",
    process.env.PUBLIC_URL + "/gltf/etc/CD_bag_black.glb",
    process.env.PUBLIC_URL + "/gltf/etc/CD_bag_red.glb",
    process.env.PUBLIC_URL + "/gltf/etc/damagochi2_blue.glb",
    process.env.PUBLIC_URL + "/gltf/etc/damagochi2_green.glb",
    process.env.PUBLIC_URL + "/gltf/etc/damagochi2_pink.glb",
    process.env.PUBLIC_URL + "/gltf/etc/damagochi2_white.glb",
    process.env.PUBLIC_URL + "/gltf/etc/DS_bag.glb",
    process.env.PUBLIC_URL + "/gltf/etc/Hairband.glb",
    process.env.PUBLIC_URL + "/gltf/etc/Heart_nk.glb",
    process.env.PUBLIC_URL + "/gltf/etc/KR_sh_bag_w.glb",
    process.env.PUBLIC_URL + "/gltf/etc/Light_stick.glb",
    process.env.PUBLIC_URL + "/gltf/etc/PT_bag.glb",
    process.env.PUBLIC_URL + "/gltf/etc/Pt_bag.gltf",
    process.env.PUBLIC_URL + "/gltf/etc/Ribbon_pin.glb",
    process.env.PUBLIC_URL + "/gltf/etc/ST_bag.glb",
    ],

    myPost:[
        process.env.PUBLIC_URL + "/img/home/myPost/mypost1_1.png",
        process.env.PUBLIC_URL + "/img/home/myPost/mypost1_2.png",
        process.env.PUBLIC_URL + "/img/home/myPost/mypost1_3.png",
        process.env.PUBLIC_URL + "/img/home/myPost/mypost1_4.png",
        process.env.PUBLIC_URL + "/img/home/myPost/mypost1_5.png",
        process.env.PUBLIC_URL + "/img/home/myPost/mypost1_6.png",
        process.env.PUBLIC_URL + "/img/home/myPost/mypost1_7.png",
        process.env.PUBLIC_URL + "/img/home/myPost/mypost1.png",
        process.env.PUBLIC_URL + "/img/home/myPost/mypost3.png"
    ],
  };
  
export default dataArrays;

