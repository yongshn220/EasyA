import Lottie from "lottie-react";
import loadingAnimation from "../../animation/MainLoading.json"
import React from "react";

export default function LoadingCircle() {
  return (
    <div style={{display:'flex', justifyContent:'center'}}>
      <Lottie animationData={loadingAnimation} loop={true} style={{width:'10vw', height:'10vw'}}/>
    </div>
  )
}
