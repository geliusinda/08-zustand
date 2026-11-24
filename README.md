# NoteHub

Домашнє завдання №8. Застосунок для нотаток на Next.js та TypeScript.

Можна шукати, створювати й видаляти нотатки, а також переглядати їх на окремій сторінці. Список і деталі завантажуються на сервері, далі з даними працює TanStack Query.

## Як запустити

```sh
npm install
```

Скопіюйте `.env.example` у `.env.local` і додайте свій токен:

```env
NOTEHUB_TOKEN=ваш_токен
```

```sh
npm run dev
```

Відкрийте http://localhost:3000.

## Перевірка

```sh
npm run typecheck
npm run lint
npm run format:check
npm run build
```

## Маршрути й деплой

Список нотаток відкривається на `/notes/filter/all`. Меню фільтрує нотатки за тегами. Посилання зі списку відкриває деталі в модальному вікні, а прямий перехід на `/notes/{id}` відкриває окрему сторінку.

Сторінка створення нотатки доступна на `/notes/action/create`. Чернетка зберігається в браузері та очищається після успішного створення.

У Vercel оберіть Next.js і додайте `NOTEHUB_TOKEN` у змінні оточення.

Стилі: https://github.com/goitacademy/react-notehub-styles/tree/hw-08.
