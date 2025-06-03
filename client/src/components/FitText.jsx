import React, { useEffect, useRef } from 'react';
import "../styles/FitText.css"

export function FitText({ colorProp, children }) {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const fitty = require('fitty').default;
    const instance = fitty(textRef.current, {
      maxSize: 28,
      minSize: 14,
      multiLine: true,
    });

    return () => instance.unsubscribe(); 
  }, [children]);

  return (
    <span style={{color: colorProp}} ref={textRef}>{children}</span>
  );
}