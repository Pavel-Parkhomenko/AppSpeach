import React from "react";
import "../styles/Box.css";

const getBoxStyle = (level) => ({
  width: `${600 - level * 60}px`,
  height: `${600 - level * 114}px`,
  borderColor: getDimmedColor(level),
});

const getImg = (level, img) => ({
  backgroundImage: `url(${level < 4 ? img : ""})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
})

const getTextStyle = (level) => ({
  fontSize: `${24 - level * 3}px`,
  color: getDimmedColor(level),
});

const getDimmedColor = (level) => {
  const baseR = 148;
  const baseG = 145;
  const baseB = 145;
  const step = 15;

  const r = Math.max(0, baseR - level * step);
  const g = Math.max(0, baseG - level * step);
  const b = Math.max(0, baseB - level * step);

  return `rgb(${r}, ${g}, ${b})`;
};

export function Box({ level = 0, text, cntBoxs, children, img }) {
  return (
    <div style={getBoxStyle(cntBoxs - level - 1)}>
      <div className="box-main" style={getImg(cntBoxs - level - 1, img)}>
        {children}
      </div>
      <div className="box-into">
        <p className="text" style={getTextStyle(cntBoxs - level - 1)}>
          {text + "" + (cntBoxs - level - 1)}
        </p>
      </div>
    </div>
  );
}
