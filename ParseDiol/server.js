const { parseTxtFile, getRandom } = require('./services.js')

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

let countUnit = 0
let jsonDataForImg = {}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Разрешаем все домены (*)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    // Явно отвечаем на OPTIONS-запрос
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

app.get('/read-txt', (req, res) => {
    const filePath = path.join(__dirname, "data.txt");

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('Файл не найден');
    }

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Ошибка чтения файла');
        }
        
        const lines = data.split(/\r?\n/)
        const jsonData = parseTxtFile(lines)
				jsonDataForImg = jsonData
        countUnit = jsonData.text.length
        res.type('json').send(JSON.stringify({text: jsonData.text}));
    });
});

function saveJson(data, namesImg) {
    const filename = "data.json"

		for(let i = 0; i < data.text.length; i++) {
			data.imgs.push("/img/" + namesImg[i])
		}

    if (!data) {
        return res.status(400).send('Данные отсуствуют!');
    }

    const filePath = path.join(__dirname, ".." , "public/", filename);

    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.log('Ошибка записи файла');
        }
        console.log('Файл успешно сохранен!');
    });
}

app.post("/action-img", (req, res) => {
  const SOURCE_DIR = path.join(__dirname, "/source-img");
  const TARGET_DIR = path.join(__dirname, "..", 'public/img')

  if(!fs.existsSync(SOURCE_DIR)) {
    return res.status(400).json({
      error: `Папка ${SOURCE_DIR} не существует`
    })
  }

	if(fs.existsSync(TARGET_DIR)) {
		fs.rmSync(TARGET_DIR, { recursive: true, force: true }, (err) => {
			if (err) {
					return console.error(err);
			}
			console.log('Папка и все ее содержимое успешно удалены!');
		});
		fs.mkdirSync(TARGET_DIR)
	} else {
		fs.mkdirSync(TARGET_DIR)
	}

  const files = fs.readdirSync(SOURCE_DIR)
    .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))


  if(files.length === 0) {
    return res.json({message: 'Нет изображений для обработки'})
  }

	const shuffledFiles = [...files].sort(() => Math.random() - 0.5);
	const selectedFiles = shuffledFiles.slice(0, countUnit);

	let namesImg = []

  selectedFiles.forEach((file, index) => {
    const ext = path.extname(file);
    const newName = `${index}${ext}`;
		namesImg.push(newName)
    const sourcePath = path.join(SOURCE_DIR, file);
    const targetPath = path.join(TARGET_DIR, newName);
    fs.copyFileSync(sourcePath, targetPath);
	});

	saveJson(jsonDataForImg, namesImg)

  res.json({
    message: "Картинки успешно сформированны!",
	})
})

app.post("/action-aud", (req, res) => {
  const SOURCE_DIR = path.join(__dirname, "/source-aud");
  const TARGET_DIR = path.join(__dirname, "..", 'public/audio')

  if(!fs.existsSync(SOURCE_DIR)) {
    return res.status(400).json({
      error: `Папка ${SOURCE_DIR} не существует`
    })
  }

	if(fs.existsSync(TARGET_DIR)) {
		fs.rmSync(TARGET_DIR, { recursive: true, force: true }, (err) => {
			if (err) return console.error(err);
		})

		console.log('Папка и все ее содержимое успешно удалены!');
		fs.mkdirSync(TARGET_DIR)

	} else {
		fs.mkdirSync(TARGET_DIR)
	}

  const files = fs.readdirSync(SOURCE_DIR)
    .filter(file => /\.(mp3)$/i.test(file))


  if(files.length === 0) {
    return res.json({message: 'Нет аудио для обработки'})
  }

  files.forEach((file, index) => {
    const ext = path.extname(file);
    const newName = `${index}${ext}`;
    const sourcePath = path.join(SOURCE_DIR, file);
    const targetPath = path.join(TARGET_DIR, newName);
    fs.copyFileSync(sourcePath, targetPath);
	});

  res.json({
    message: "Аудио успешно сформированны!",
	})
})

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});