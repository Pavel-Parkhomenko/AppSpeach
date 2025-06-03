import { Box } from "../components/Box";
import React, { useState, useEffect, useCallback } from "react";
import dataJson from "../extr/data.json"
import ReactHowler from "react-howler";

import { preloadImages } from '../services/loadImgs.js';

export function Speach() {
    const [cnt, setCnt] = useState(0);
    const [cntRepeat, setCntRepeat] = useState(0);
    const [boxs, setBoxs] = useState([
      {
        level: 0,
        text: "????",
        img: "",
      },
    ]);
  
    function getRandom() {
      return Math.floor(Math.random() * 5) + 3;
      // return Math.random() < 0.7; // 70% вероятность
    }
  
    //----- audio
    const [trackIndex, setTrackIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
  
    const [playlist, setPlaylist] = useState(["../extr/fo0n.mp3"])
    const [text, setText] = useState([])
    const [imgs, setImgs] = useState([])
  
    const [cntRand, setCntRand] = useState(0)
  
    const handleEnd = useCallback(() => {  
      if (cnt === text.length + 1) {
        setPlaying(false);
        return;
      }
    
      setCnt(prev => prev + 1);
    
      setTrackIndex(prev => {
        if (prev < playlist.length - 1) {
          return prev + 1;
        } else {
          setPlaying(false);
          return prev;
        }
      });
    }, [text.length, playlist.length, cnt]); // Минимальные зависимости
  
    useEffect(() => {
      let text = dataJson.text
      text = [...text, "????"]
      let imgs = dataJson.imgs
      imgs = [...imgs, imgs[imgs.length - 1], imgs[imgs.length - 1]]
      const audio = dataJson.audio

      preloadImages(imgs).catch(console.error);
  
      setImgs([...imgs])
      setText([...text])
      setPlaylist(() => ["../extr/fon.mp3", ...audio])
    }, [])
  
    function startApp() {
      setCntRand(() => getRandom())
      setPlaying(!playing)
    }
    //---- audio
  
    useEffect(() => {
      if (cnt > 0) {
        setBoxs(prev => {
          if(prev.length % 4 == 0) {
            setCntRand(getRandom())
            return [{
              level: cntRepeat,
              text: text[cnt - 1],
              img: imgs[cnt - 1],
            }]
          }
          else {
            return [
              ...prev,
              {
                level: cntRepeat,
                text: text[cnt - 1],
                img: imgs[cnt - 1],
              }
            ]
          }
        })
      }
    }, [cnt]);
  
    function addBox(currentLevel) {   
      if (currentLevel === 0) {
        return (
          <Box
            level={currentLevel}
            cntBoxs={boxs.length}
            text={boxs[currentLevel].text}
            img={imgs[cnt]}
          />
        );
      }
  
      return (
        <Box
          level={currentLevel}
          cntBoxs={boxs.length}
          text={boxs[currentLevel].text}
          img={""}
        >
          {addBox(currentLevel - 1)}
        </Box>
      );
    }
  
    return (
      <div className="container">
        <div>
          <ReactHowler
            src={playlist[trackIndex]}
            playing={playing}
            onEnd={handleEnd} 
            html5={true}   
        />
        </div>
        {addBox(boxs.length - 1)}
        <button onClick={() => startApp()} style={{ marginTop: "150px" }}>
          Start {playing ? "yes" : "no"}
        </button>
      </div>
    );
  }