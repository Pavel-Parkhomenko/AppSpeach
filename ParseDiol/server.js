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

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});