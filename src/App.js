import { Box } from "./components/Box";
import React, { useState, useEffect } from "react";
import dataJson from "./data.json"
import ReactHowler from "react-howler";

export function App() {
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

  const [playlist, setPlaylist] = useState(["./any/fon.mp3"])
  const [text, setText] = useState([])
  const [imgs, setImgs] = useState([])

  const [cntRand, setCntRand] = useState(0)

  const handleEnd = () => {
    if(cnt === text.length + 1) {
      setPlaying(false)
      return
    }
    setCnt((prevCnt) => {
      const newCnt = prevCnt + 1;
      return newCnt;
    });

    if (trackIndex < playlist.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setPlaying(false);
    }
  };

  useEffect(() => {
    const text = dataJson.text
    const imgs = dataJson.imgs
    const audio = dataJson.audio

    setImgs([...imgs])
    setText([...text])
    setPlaylist(() => ["./audio/fon.mp3", ...audio, "./audio/fon.mp3"])
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
    <div>
      <div>
        <ReactHowler
          src={playlist[trackIndex]}
          playing={playing}
          onEnd={handleEnd} 
          html5={true}   
      />
      </div>
      {addBox(boxs.length - 1)}
      <button onClick={() => startApp()} style={{ marginTop: "300px" }}>
        Start {playing ? "yes" : "no"}
      </button>
    </div>
  );
}
