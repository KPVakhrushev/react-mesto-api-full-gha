[![Статус тестов](../../actions/workflows/tests.yml/badge.svg)](../../actions/workflows/tests.yml)

# react-mesto-api-full
Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями.
Бэкенд расположен в директории `backend/`, а фронтенд - в `frontend/`.


## Ссылки на проект
Frontend https://mesto.kavay.ru/
Backend https://api.mesto.kavay.ru/

# front-end
## **Функционал**
В проекте реализован следующий функционал:
* динамическое формирование страницы на основе template
* всплывающие формы для редактирования профиля и добавления мест
* просмотр детального изображения во всплывающем окне
* удаление мест
* лайк мест
* плавное открытие и закрытие всплывающих окон
* закрытие всплывающих окон кнопкой escape и кликом на overlay
* динамическая валидация форм с отображением ошибок
* взаимодействие с сервером
* регистрация, авторизация
* валидация форм
* обработка загрузки м ошибки изображений в всплывающих окнах
* адаптивный дизайн с использованием  useMediaQuery from 'react-responsive'

## **Используемые технологии**

В проектете демострируются следующие технологии:
* Flex
* Grid
* адаптивная верстка
* методология БЭМ (блоки, элементы, модификаторы, файловая структура)
* оновы обращения с DOM через JavaScript (popup, редактирование текста, добавление/удаление классов)
* классы, наследование, слабое связывание между классами
* для сборки проекта используется webpack
* HTTP запросы
* Promise
* React
* useMediaQuery from 'react-responsive
* пользовательские хуки
* Рефы (useRef)


# back-end
## Используемые технологии

В проектете демострируются следующие технологии:
* node.js
* express
* mongodb
* аутентификация с использованием JWT через cookies

## Функционал
В проекте реализован следующий функционал:
* Добавление, реадктирование пользователей
* Добавление, реадктирование, лайк карточек

## Директории
`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  

## Запуск проекта
`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

# Планы по доработке проекта
Работы над проектом завершены
