# Air Hockey Game

Современная реализация классической игры "Аэрохоккей" с использованием:
- Next.js
- TypeScript
- Styled Components
- Canvas API

Ractangle Co-Ordinates Top Left (124,826) Bottom Right (435,828) - точки где рандомно повялется шайба у игрока, если ему забили 
Ractangle Co-Ordinates Top Left (123,189) Bottom Right (431,184) - координаты точек у робота, если у него забили и шайба на его стороне, рандомано в одной из точек 

Ractangle Co-Ordinates Top Left (279,505) - это центр пола точка для шайбы 

сделай повяление шайб только в этих точках 

554 на 1024 размер фото поля 

Ractangle Co-Ordinates Top Left (195,977) Bottom Right (360,977) - это на карте место для ворот начало и конец отрезка, туда вписать ворота у игрока 
Ractangle Co-Ordinates Top Left (195,42) Bottom Right (360,42) - аналогично для робота 


## Особенности проекта

- Полностью написан на TypeScript
- Реализация игровой логики в виде React хука
- Современный UI и анимации
- Масштабируемая архитектура проекта
- Контейнеризация с помощью Docker

## Запуск проекта

### С использованием Docker

Для запуска приложения в режиме разработки:

```bash
docker-compose up dev
```

Для запуска в production режиме:

```bash
docker-compose up app
```

### Локальный запуск (без Docker)

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для production
npm run build

# Запуск production версии
npm run start
```

## Структура проекта

```
.
├── public                # Статические файлы
├── src                   # Исходный код
│   ├── components        # React компоненты
│   ├── hooks             # Кастомные React хуки
│   ├── pages             # Страницы Next.js
│   ├── styles            # Глобальные стили
│   └── utils             # Утилиты и типы
├── Dockerfile            # Основной Dockerfile для production
├── Dockerfile.dev        # Dockerfile для разработки
├── docker-compose.yml    # Конфигурация Docker Compose
├── package.json          # Зависимости проекта
└── tsconfig.json         # Конфигурация TypeScript
```

## Управление игрой

- Управление вашей клюшкой осуществляется с помощью мыши
- Компьютер автоматически контролирует свою клюшку
- Счет отображается в верхней части экрана 