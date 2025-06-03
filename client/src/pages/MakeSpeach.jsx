import React, { useState, useEffect } from "react"
import "../styles/MakeSpeach.css"

export function MakeSpeach() {
  const [textArr, setTextArr] = useState([])

  async function readTxtFile() {
    try {
      const response = await fetch("http://localhost:3001/read-txt", {
        method: "GET",
      })

      const res = await response.json();
      let textArrExtr = []

      for(let i = 0; i < res.text.length; i++) {
        let pText = null
        if(i % 2 == 0) pText = <p key={i} onClick={(e) => copyText(e)} className="man-1">{res.text[i]}</p>
        else pText = <p key={i} onClick={(e) => copyText(e)} className="man-2">{res.text[i]}</p>

        textArrExtr.push(pText)
      }

      setTextArr([...textArrExtr])
      if (!response.ok) {
        throw new Error(`${res.error}. status: ${response.status}`);
      }
      else {
        console.log(res.message)
      }
    }
    catch(error) {
      console.error('(I) ', error);
    }
  }

  function copyText(event) {
    const pText = event.target

    if(!pText.classList.contains("was-copy")) {
      if(pText.textContent.trim() !== '') {
        navigator.clipboard.writeText(pText.textContent.trim())
        .then(() => {
          pText.classList.add("was-copy")
        })
        .catch(err => console.error("Ошибка копирования: ", err))
      }
    }
  }

  async function clickBtnImg() {
    try {
      const response = await fetch('http://localhost:3001/action-img', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
      });
  
      const res = await response.json();
      if (!response.ok) {
        throw new Error(`${res.error}. status: ${response.status}`);
      }
      else {
        console.log(res.message)
      }
    } 
    catch (error) {
      console.error('(I) ', error);
    }
  }

  async function clickBtnAud() {
    try {
      const response = await fetch('http://localhost:3001/action-aud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
      });
  
      const res = await response.json();
      if (!response.ok) {
        throw new Error(`${res.error}. status: ${response.status}`);
      }
      else {
        console.log(res.message)
      }
    } 
    catch (error) {
      console.error('(I) ', error);
    }
  }

  return (
    <div className="container">
        <h1>Speach</h1>
        <div className="btn-box">
            <button className="btn-img"  onClick={() => readTxtFile()} type="button">TXT</button>
            <button className="btn-img" onClick={() => clickBtnImg()} type="button">IMG</button>
            <button className="btn-aud" onClick={() => clickBtnAud()} type="button">AUD</button>
        </div>
        {textArr.map((text, ind) => <div key={ind}>{text}</div>)}
    </div>
  )
}