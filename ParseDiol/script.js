//
// Названия картинок и аудио 1.* 2.* 3.*
//

// Don't forget create data.txt file!!
function readTxtFile() {
    fetch('http://localhost:3000/read-txt')
    .then(response => {
        if (!response.ok) throw new Error('Ошибка загрузки');
        return response.text();
    })
    .then(text => {
      const lines = text.split(/\r?\n/)
      parseTxtFile(lines)
    })
    .catch(error => console.error('Ошибка:', error));
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

function writeJSONToFile(jsonData) {

  fetch('http://localhost:3000/save-json', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonData),
})
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error('Ошибка:', error));
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

    writeJSONToFile(jsonData)
    showDataToHtml(jsonData)
}

function showDataToHtml(jsonData) {
  const box = document.querySelector(".container")

  if(jsonData.text.length === 0) {
    console.log("Ошибка поля text")
    return
  }

  for(let i = 0; i < jsonData.text.length; i++) {
    let pText = document.createElement('p');

    if(i % 2 === 0) pText.classList.add('man-1');
    else pText.classList.add('man-2');

    pText.textContent = jsonData.text[i]
    box.append(pText)
  }

  copyText(box)
}

function copyText(box) {
  box.addEventListener('click', (event) => {
    const pText = event.target

    if(event.target.tagName !== 'P') return

    if(!pText.classList.contains("was-copy")) {
      if(pText.textContent.trim() !== '') {
        navigator.clipboard.writeText(pText.textContent.trim())
        .then(() => {
          pText.classList.add("was-copy")
        })
        .catch(err => console.error("Ошибка копирования: ", err))
      }
    }
  })
}

readTxtFile()