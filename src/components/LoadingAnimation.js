import React from 'react';
import Lottie from "lottie-react";
import loadingAnimation from '../animation/Loading.json';

export default function LoadingAnimation() {

  return (
    <div style={{display:'flex', justifyContent:'center'}}>
      <Lottie animationData={loadingAnimation} loop={true} style={{width:'25vw', height:'25vw'}}/>
    </div>
  );
};
