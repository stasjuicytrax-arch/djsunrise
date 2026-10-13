# Как запустить верстку в терминале (по шагам)

Копируйте команды по одной строке, вставляйте в окно и жмите Enter. Дождитесь, пока команда закончится, и только потом вводите следующую.

## Шаг 1. Открыть терминал
Нажмите клавишу **Win**, напечатайте `PowerShell`, нажмите **Enter**.

## Шаг 2. Перейти в папку проекта
```
cd "C:\Users\G13\Desktop\CLAUDE\DJSUNRISE\_PRESSKIT\site"
```

## Шаг 2.5. Собрать видео (один раз)
Видео пришли кусочками, эта команда склеит их и уберет кусочки:
```
powershell -ExecutionPolicy Bypass -File scripts\join-videos.ps1
```
В конце должно быть написано «Готово».

## Шаг 3. Подключить папку к GitHub и отправить файлы (один раз)
```
git init -b main
```
```
git add .
```
```
git commit -m "Подготовка к верстке: ТЗ v2, дизайн-система v2, ассеты, видео"
```
```
git remote add origin https://github.com/stasjuicytrax-arch/djsunrise.git
```
```
git push -u origin main
```
Если откроется окно входа в GitHub, войдите в свой аккаунт, и отправка продолжится сама.
Если на `git commit` появится ошибка «Please tell me who you are», введите две строки и повторите `git commit`:
```
git config --global user.email "stasjuicytrax@gmail.com"
```
```
git config --global user.name "stasjuicytrax-arch"
```

## Шаг 4. Скопировать скиллы в проект (один раз)
```
New-Item -ItemType Directory -Force .claude\skills
```
```
Copy-Item -Recurse -Force $HOME\.agents\skills\impeccable .claude\skills\
```
```
Copy-Item -Recurse -Force $HOME\.agents\skills\design-taste-frontend .claude\skills\
```
```
Copy-Item -Recurse -Force $HOME\.agents\skills\high-end-visual-design .claude\skills\
```

## Шаг 5. Запустить Claude Code
```
claude
```

## Шаг 6. Вставить стартовое сообщение
Откройте файл `docs\START-PROMPT.md`, скопируйте весь текст, вставьте в Claude Code, нажмите Enter.

## Дальше
Claude делает один шаг, пушит его на GitHub и пишет отчет. Посмотрели, всё ок — пишете «дальше». Не ок — пишете, что поправить.

В следующий раз запускать так: Шаг 1 → Шаг 2 → Шаг 5.
