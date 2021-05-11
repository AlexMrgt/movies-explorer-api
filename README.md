# Проект "Movie-explorer".
## Описание

Это `backend` проекта "Movie-explorer".

[Перейти на сайт проекта.](Фронтенд в разработке)

## Функционал
### Роуты для регистрации/авторизации

+ `POST` /signup - принимает email и пароль для регистрации нового пользователя
+ `POST` /signin - принимает email и пароль для авторизации пользователя 
+ `DELETE` /signout - удяляет cookie, в которой хранится ваш токен

### Роуты для пользователей (нужна авторизация)

+ `GET` /users/me - возвращает данные пользователя в формате JSON: 
  ```
  {
    "name": "",
    "_id": "",
    "email": "",
    "__v": 
  }

+ `PATCH` /users/me - изменяет имя/описание и возвращает пользователя в формате JSON

### Роуты для кароточек (нужна авторизация)

+ `GET` /movies - возвращает карточки в формате JSON: 
```j
 {
       "_id": "",
        "owner": "",
        "country": "",
        "director": "",
        "duration": (number),
        "year": "",
        "description": "",
        "image": "",
        "trailer": "",
        "thumbnail": ",
        "movieId": 1,
        "nameRU": "",
        "nameEN": "",
        "__v": 
    },
    ...
```

+ `POST` /movies - создает новую карточку и возвращает ее в формате JSON
+ `DELETE` /movies/:movieId - удаляет карточку по соответствующему ID, если она принадлежит пользователю

## Технологии

+ Expressjs
+ MongoDB
+ mongoose
+ cors
+ celebrate
+ validator
+ jsonwebtoken
+ helmet
+ bcryptjs
+ winston
+ express-winston
+ dotenv
+ eslint
+ nodemon
