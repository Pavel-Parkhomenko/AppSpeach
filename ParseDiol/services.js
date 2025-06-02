function isLetter(char) {
    return /^[a-zA-Zа-яА-ЯёЁ!?.,)(*:;]$/.test(char);
  }
  
function trimUntilLetter(str) {
    for (let i = 0; i < str.length; i++) {
      if (isLetter(str[i])) {
        return str.slice(i);
      }
    }
    return '';
}

function parseTxtFile(lines) {
    let jsonData = {
      text: [],
      imgs: [],
      audio: []
    }

    let ind = 0
    for(let i = 0; i < lines.length; i++) {
        if(lines[i].length === 0) continue

        jsonData.text.push(trimUntilLetter(lines[i]))
        jsonData.imgs.push(`./img/${ind}.jpg`)
        jsonData.audio.push(`./audio/${ind}.mp3`)

        ind++
    }

    return jsonData
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    parseTxtFile,
    getRandom
};