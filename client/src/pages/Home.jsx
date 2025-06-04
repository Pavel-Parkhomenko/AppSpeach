import React from 'react'
import "../styles/Home.css"

export function Home() {
  return (
    <div className="container">
      <h1>Welcome!</h1>
      <h3>Как пользоваться</h3>
      <ol>
        <li>Сформируйте исходники
          <ul>
            <li>Текстовый файл с диалогом <span className='span-home'>/server/data.txt</span></li>
            <li>Картики в папке <span className='span-home'>/server/source-img</span></li>
            <li>Аудио в папке <span className='span-home'>/server/source-aud</span></li>
          </ul>
        </li>
        <li>Запустите сервер
          <ul>
            <li>Путь <span className='span-home'>/AppSpeach/server</span></li>
            <li>Команда <span className='span-home'>node server.js</span></li>
          </ul>
        </li>
        <li>Перейдите на вкладку /Make
          <ul>
            <li>Нажите кнопку <span className='span-home'>TXT</span></li>
            <li>Нажите кнопку <span className='span-home'>IMG</span></li>
            <li>Нажите кнопку <span className='span-home'>AUD</span></li>
          </ul>
        </li>
        <li>Откройте вкладку <span className='span-home'>/Speach</span></li>
        <li>Нажмите <span className='span-home'>Enter</span></li>
      </ol>
      <p className="p-text-home">PS: Для формирования аудио необходимо пользовать сторонним сервисом.
        Для удобства строки диалога можно копировать просто кликнув на них.
        </p>
    </div>
  )
}