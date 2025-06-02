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
      showDataToHtml(JSON.parse(text))
    })
    .catch(error => console.error('Ошибка:', error));
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

document.querySelector('.btn-img').addEventListener('click', async (event) => {

  try {
    const response = await fetch('http://localhost:3000/action-img', {
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
})

document.querySelector('.btn-aud').addEventListener('click', async (event) => {

  try {
    const response = await fetch('http://localhost:3000/action-aud', {
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
})

readTxtFile()