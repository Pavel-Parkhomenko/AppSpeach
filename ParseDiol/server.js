const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Разрешаем все домены (*)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
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
        res.type('text').send(data);
    });
});

app.post('/save-json', (req, res) => {
    const data = req.body
    const filename = "data.json"

    if (!data) {
        return res.status(400).send('Данные отсуствуют!');
    }

    const filePath = path.join(__dirname, filename);

    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Ошибка записи файла');
        }
        res.send('Файл успешно сохранен!');
    });
});

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

app.post("/action-img", (req, res) => {
    const { folderPath, countUnit } = req.body

    const SOURCE_DIR = 'source_images';
    const TARGET_DIR = 'processed_images';

    if(fs.existsSync(SOURCE_DIR)) {
        return res.status(400).json({
            error: `Папка ${SOURCE_DIR} не существует`
        })
    }

    if(fs.existsSync(TARGET_DIR)) {
        fs.mkdirSync(TARGET_DIR)
    }

    const files = fs.readFileSync(SOURCE_DIR)
        .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))

    if(files.length === 0) {
        return res.json({message: 'Нет изображений для обработки'})
    }

    let randIndexImgs = []
    for(let i = 0; i < countUnit; i++) {
        randIndexImgs.push(getRandom(0, files.length - 1))
    }

    randIndexImgs.map((unit, ind) => {
        const ext = path.extname(files[unit])
        const newName = `${ind}`
        const sourcePath = path.join(SOURCE_DIR, files[ind])
        
    })
})

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});