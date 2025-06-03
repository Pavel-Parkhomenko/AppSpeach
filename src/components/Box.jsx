import React from "react";
import "../styles/Box.css";

import { FitText } from './FitText'

const getBoxStyle = (level) => ({
  width: `${500 - level * 55}px`,
  height: `${500 - level * 100}px`,
});

const getImg = (level, img) => ({
  backgroundImage: `url(${img || ""})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderColor: getDimmedColor(level),
})


const getDimmedColor = (level) => {
  const baseR = 148;
  const baseG = 145;
  const baseB = 145;
  const step = 20;

  const r = Math.max(0, baseR - level * step);
  const g = Math.max(0, baseG - level * step);
  const b = Math.max(0, baseB - level * step);

  return `rgb(${r}, ${g}, ${b})`;
};

const getStyleBoxInto = (level) => {
  return {
    borderColor: getDimmedColor(level),
    height: `${64 - level * 10}px`,
  }
}

export function Box({ level = 0, text, cntBoxs, children, img }) {
  return (
    <div className="container" style={getBoxStyle(cntBoxs - level - 1)}>
      {/* {JSON.stringify(getTextStyle(cntBoxs - level - 1, text?.length))} */}
      <div className="moving-box"></div>
      <div className="box-main" style={getImg(cntBoxs - level - 1, img)}>
        {children}
      </div>
      <div className="box-into" style={getStyleBoxInto(cntBoxs - level - 1)}>
        <FitText colorProp={getDimmedColor(cntBoxs - level - 1)}>
          {text}
        </FitText>
      </div>
    </div>
  );
}
