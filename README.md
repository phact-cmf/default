# Шаблон проекта на phact cmf


## Развернуть проект:

```bash
./init.sh
```

Скрипт:
1. Создает папки www/media, app/runtime, app/Modules
2. Устанавливает composer.phar
3. Устанавливает зависимости с помощью composer.phar
4. Устанавливает модули по-умолчанию
5. Устанавливает зависимости npm

## Поехали!

Запуск сервера php (тут я буду использовать yarn, но равнозначно
можно использовать и npm)

```bash
yarn run php-server
```

Сервер запустится на 8000 порту.

## Работа со статикой

Стартуем dev-server от webpack для работы со статикой на лету:

```bash
yarn run server
```

После старта ваш проект откроется в браузере, но уже на 9000 порту.

*Всё это работает примерно следующим образом*: webpack собирает наши
статические файлы и складирует их в оперативную память
(а не на диск, наши SSD вздохнут спокойно).
Доступ к ним осуществляется как раз через веб-сервер по 9000 порту.
Если запрашиваемый файл не найден в сборке - webpack проксирует запрос
до backend-сервера (который ожидается на 8000 порту) и мы видим страницы
и медиа-файлы. Единственное, что пишется на диск - это manifest.json,
по которому phact создает пути до статических файлов.

### Статика модулей

Чтобы выполнить сборку статики в папку для статики модулей
(*/www/static_modules*) выполняем:

```bash
php ./www/index.php Base StaticModules
```

или (если удобнее всё запускать через yarn)

```bash
yarn run modules
```

**Как минимум, это необходимо для корректной работы Editor модуля**

### Билды в production

Собрать статику для фронтенда:

```bash
yarn run build
```

Собрать статику для админки:

```bash
yarn run build_admin
```

### Я олдфаг, идите в лес со своим Hot reload / Hot replacement. Я хочу просто watch!

Пожалуйста:

```bash
yarn run watch
```

Ну и для админки:

```bash
yarn run watch_admin
```