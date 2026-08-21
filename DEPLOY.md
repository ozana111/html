# Деплой на Cloudflare Pages

У Claude Code в этой сессии нет доступа к Cloudflare (ни API-токена, ни авторизации wrangler), поэтому подключение делается вручную через панель Cloudflare — займёт 3-5 минут.

## 1. Подключить репозиторий

1. Зайти в Cloudflare Dashboard → **Workers & Pages** → **Create application** → вкладка **Pages** → **Connect to Git**.
2. Выбрать GitHub-аккаунт `ozana111`, репозиторий **html**.
3. Ветка для продакшена: **`claude/yalas-motors-l8hfbi`** (или смёрджить в `main`/`master` и указать её — как удобнее).
4. Настройки сборки:
   - **Framework preset**: None
   - **Build command**: оставить пустым
   - **Build output directory**: `/` (корень репозитория — `index.html` лежит прямо в нём)
5. **Save and Deploy**. Cloudflare выдаст временный адрес вида `https://html-xxx.pages.dev` — это сразу рабочий сайт.

## 2. Подключить домен (когда определитесь с доменом)

Если домен уже есть и заведён в Cloudflare (Zone добавлена):
1. В проекте Pages → **Custom domains** → **Set up a custom domain** → ввести домен (например `yalasmotors.md`) → Cloudflare сам добавит нужную CNAME-запись в DNS.

Если домена ещё нет:
1. Зарегистрировать домен (Cloudflare Registrar или любой другой регистратор — Cloudflare Registrar продаёт по себестоимости, без наценки).
2. Если регистрировали не через Cloudflare — добавить домен как Zone в Cloudflare (**Add a site**) и прописать NS-записи у регистратора на серверы Cloudflare.
3. Повторить шаг «Custom domains» выше.

## 3. Дальнейшие деплои

Push в ветку `claude/yalas-motors-l8hfbi` (или в ту, что укажете как production branch) — Cloudflare Pages передеплоит сайт автоматически, ничего вручную делать не нужно.

## Альтернатива: доступ через API-токен

Если хотите, чтобы Claude Code сам подключил Pages и домен через `wrangler`/Cloudflare API — нужно создать API-токен (Cloudflare Dashboard → My Profile → API Tokens → Create Token, права минимум: `Account.Cloudflare Pages: Edit`, при работе с доменом ещё `Zone.DNS: Edit`) и передать его как переменную окружения `CLOUDFLARE_API_TOKEN` в новой сессии.
