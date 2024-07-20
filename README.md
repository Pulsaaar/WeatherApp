## Technology list
* Backend
    + FastAPI
    + SQLalchemy
* Frontend
    + ReactJs
    + Vite
    + Tailwind

## ToDo

- [ ] написаны тесты
- [x] всё это помещено в докер контейнер
- [x] сделаны автодополнение (подсказки) при вводе города
- [ ] при повторном посещении сайта будет предложено посмотреть погоду в городе, в котором пользователь уже смотрел ранее
- [x] будет сохраняться история поиска для каждого пользователя, и будет API, показывающее сколько раз вводили какой город

## Installation
```
pip install -r requirements.txt
cd WeatherApp
npm i
npm run build
```

## Start Services
```
uvicorn main:app --reload &   
cd WeatherApp
npn run preview &
```

## Docker
```
# docker-compose up --build  
```

