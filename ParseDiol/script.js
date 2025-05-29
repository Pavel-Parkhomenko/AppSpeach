const fs = require('fs');

//
// Названия картинок и аудио 1.* 2.* 3.*
//

function writeJSONToFile(data) {
  const jsonString = JSON.stringify(data, null, 2); 
  fs.writeFile("data.json", jsonString, (err) => {
    if (err) {
      console.error('Ошибка при записи файла:', err);
    } else {
      console.log(`Файл успешно сохранён`);
    }
  });
}

// Don't forget create data.txt file!!
function readTxtFile() {
    const text = fs.readFileSync('./data.txt', 'utf8');
    const lines = text.split(/\r?\n/);

    parseTxtFile(lines)
}

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

let jsonData = {
    text: [],
    imgs: [],
    audio: []
}

function parseTxtFile(lines) {
    let ind = 0
    for(let i = 0; i < lines.length; i++) {
        if(lines[i].length === 0) continue

        jsonData.text.push(trimUntilLetter(lines[i]))
        jsonData.imgs.push(`./img/${ind}.jpg`)
        jsonData.audio.push(`./audio/${ind}.mp3`)

        ind++
    }

    writeJSONToFile(jsonData)
}

readTxtFile()