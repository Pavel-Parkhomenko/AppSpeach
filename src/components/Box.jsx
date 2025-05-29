import React from "react";
import "../styles/Box.css";

const getBoxStyle = (level) => ({
  width: `${400 - level * 60}px`,
  height: `${400 - level * 114}px`,
  borderColor: getDimmedColor(level),
});

const getImg = (img) => ({
  backgroundImage: `url(${img || ""})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
})

const getTextStyle = (level, length) => ({
  fontSize: `${Math.max(18, 40 - level * 5 - length * 1)}px`,
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
      <div className="box-main" style={getImg(img)}>
        {children}
      </div>
      <div className="box-into">
        <p className="text" style={getTextStyle(cntBoxs - level - 1, text.length)}>
          {text}
        </p>
      </div>
    </div>
  );
}
