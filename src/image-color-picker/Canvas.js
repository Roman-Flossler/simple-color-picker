import React, { useRef, useLayoutEffect } from 'react';

const Canvas = React.memo(({ img, imgUrl, sizeX, sizeY, roundness, getCtx }) => {
  const canvasrRef = useRef();

  useLayoutEffect(() => {    
    const ctx = canvasrRef.current.getContext("2d");    
    const calcImgSize = (x,y) => {
      let imgRatio = x / y;
      let setRatio = sizeX / sizeY;      
      let finalWidth, finalHeight;
      if (imgRatio > setRatio) {
        finalWidth = sizeX;
        finalHeight = Math.round( sizeX / imgRatio );
      } else {
        finalWidth = Math.round( sizeY * imgRatio );
        finalHeight = sizeY;
      }
      return [ finalWidth, finalHeight]
    }
    
    if (img) {
      let imgSize = calcImgSize(img.width, img.height);
      canvasrRef.current.width = imgSize[0];
      canvasrRef.current.height = imgSize[1];
      ctx.drawImage(img, 0, 0, imgSize[0], imgSize[1]);
    } else {
      const ctx = canvasrRef.current.getContext("2d");
      const img = new Image();       
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      }
      img.src = imgUrl;
    } 
    getCtx(ctx);
  },[img, imgUrl, getCtx, sizeY, sizeX ]);
    
    return (
      <canvas ref={canvasrRef} style={{borderRadius:roundness-13}} width={ sizeX } height={ sizeY } />
    );
})

export default Canvas;
