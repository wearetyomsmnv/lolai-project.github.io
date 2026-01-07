# LOLAI - Quick Setup Guide

## 📦 Распаковка

```bash
tar -xzf lolai-jekyll-site.tar.gz
cd lolai
```

## 🚀 Быстрый старт

### Локальная разработка

```bash
# Установить зависимости
bundle install

# Запустить сервер
bundle exec jekyll serve

# Открыть http://localhost:4000
```

### Deploy на GitHub Pages

#### Вариант 1: Через GitHub Actions (Рекомендуется)

1. Создать репозиторий на GitHub
2. Push код:
```bash
git init
git add .
git commit -m "Initial commit: LOLAI Jekyll site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lolai.git
git push -u origin main
```

3. В Settings → Pages:
   - Source: GitHub Actions
   - Workflow уже настроен в `.github/workflows/jekyll.yml`

4. Сайт будет доступен по адресу: `https://YOUR_USERNAME.github.io/lolai`

#### Вариант 2: Deploy из ветки

1. Push код в репозиторий
2. Settings → Pages → Source: "Deploy from a branch"
3. Branch: main / (root)
4. Save

## 📝 Добавление нового агента

Создайте файл в `_agents/`:

```bash
nano _agents/your-agent.md
```

Используйте шаблон:

```yaml
---
layout: agent
title: Agent Name
vendor: Company
category: Code Assistant
platforms:
  - Windows
  - macOS
  - Linux
version: "1.0"
privilege_level: User
capabilities:
  - Capability 1
  - Capability 2
mitre_techniques:
  - T1059
---

## Description
...

## Attack Vectors
...

## Artifacts
...

## Detection
...

## Prevention
...

## References
...
```

## 🎨 Кастомизация

### Изменить цвета

Редактировать `assets/css/style.css`:

```css
:root {
    --primary-color: #2563eb;    /* Основной цвет */
    --secondary-color: #7c3aed;  /* Дополнительный */
    --dark-bg: #0f172a;          /* Фон */
}
```

### Изменить название и описание

Редактировать `_config.yml`:

```yaml
title: LOLAI
description: Your description here
url: "https://yourusername.github.io"
```

### Добавить Google Analytics

В `_layouts/default.html` перед `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 📁 Структура проекта

```
lolai/
├── _agents/              # Markdown файлы агентов
│   ├── github-copilot.md
│   ├── cursor-ai.md
│   ├── autogpt.md
│   └── open-interpreter.md
├── _layouts/             # Jekyll шаблоны
│   ├── default.html      # Основной layout
│   └── agent.html        # Layout для страниц агентов
├── assets/
│   ├── css/
│   │   └── style.css     # Основные стили
│   └── js/
│       └── search.js     # Поиск и фильтрация
├── agents/
│   └── index.html        # Страница списка всех агентов
├── _config.yml           # Конфигурация Jekyll
├── index.html            # Главная страница
├── about.html            # О проекте
├── categories.html       # Категории
├── Gemfile              # Ruby зависимости
└── README.md            # Документация
```

## 🔧 Troubleshooting

### Bundle install не работает

```bash
# Установить Ruby и Bundler
sudo apt-get install ruby-full build-essential zlib1g-dev
gem install bundler
```

### Jekyll serve выдает ошибку

```bash
# Очистить кэш
bundle exec jekyll clean

# Переустановить зависимости
rm Gemfile.lock
bundle install
```

### GitHub Pages не деплоится

1. Проверить Actions: Repository → Actions
2. Проверить логи workflow
3. Убедиться что Pages включен: Settings → Pages

## 🌐 Custom Domain

Если хотите использовать свой домен:

1. Создать файл `CNAME` в корне:
```bash
echo "yourdomain.com" > CNAME
```

2. Настроить DNS:
```
Type: A
Name: @
Value: 185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153

Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
```

3. Settings → Pages → Custom domain: yourdomain.com

## 📊 Примеры категорий

- **Code Assistant** - Copilot, Cursor, Tabnine
- **Autonomous Agent** - AutoGPT, BabyAGI, AgentGPT
- **Security Tool** - AI scanners, pentest tools
- **System Automation** - RPA tools
- **Research Assistant** - Research-focused agents

## ⚠️ Security Best Practices

- Не публиковать работающие эксплойты
- Не включать реальные credentials
- Использовать Responsible Disclosure
- Проверять MITRE ATT&CK техники
- Добавлять ссылки на источники

## 🤝 Contributing

1. Fork репозиторий
2. Создать ветку: `git checkout -b feature/new-agent`
3. Добавить агента в `_agents/`
4. Commit: `git commit -am 'Add XYZ agent'`
5. Push: `git push origin feature/new-agent`
6. Открыть Pull Request

## 📞 Support

- GitHub Issues: https://github.com/YOUR_USERNAME/lolai/issues
- Twitter: @YOUR_HANDLE
- Email: your@email.com

---

**Готово!** Ваш сайт LOLAI готов к использованию 🚀
