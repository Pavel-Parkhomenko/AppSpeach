import React, { useEffect, useRef } from 'react';
import "../styles/FitText.css"

export function FitText({ children }) {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const fitty = require('fitty').default;
    const instance = fitty(textRef.current, {
      maxSize: 24,
      minSize: 12,
      multiLine: true, // Включить перенос текста
    });

    return () => instance.unsubscribe(); 
  }, [children]);

  return (
    <span ref={textRef}>{children}</span>
  );
}