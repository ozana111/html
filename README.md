# Yalas Motors — сайт-визитка

Одностраничный статический сайт (RO/RU переключатель без перезагрузки, логотип встроен через base64 внутри `index.html`). Сборка не нужна — это чистые HTML/CSS/JS.

## Структура

```
index.html           — вся страница
public/favicon.ico
public/favicon-16x16.png
public/favicon-32x32.png
public/apple-touch-icon.png
public/android-chrome-192x192.png
public/android-chrome-512x512.png
public/site.webmanifest
public/yalas-motors-logo.png   — исходный логотип (512×484, прозрачный фон), источник для favicon
```

Favicon сгенерирован из `yalas-motors-logo.png` (дополнен до квадрата прозрачными полями, чтобы не сжимать пропорции).

## Локальный просмотр

```
python3 -m http.server 8123
# открыть http://localhost:8123/index.html
```

## Деплой

См. `DEPLOY.md` — пошаговая инструкция для Cloudflare Pages.

## Открытые вопросы (не решались в этой сессии)

- Часы работы — на сайте пока нет блока с ними, плейсхолдера тоже нет
- Домен (yalasmotors.md / .com / поддомен) — не выбран
- Текст на RO/RU — не вычитан носителем языка
