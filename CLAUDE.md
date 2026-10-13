# CLAUDE.md · SUNRISE e-press-kit

Перед любой работой прочитать: `docs/TZ.md` (v2), `docs/DESIGN-SYSTEM.md` (v2), `docs/CONTENT.md`, `docs/ASSETS.md`, `docs/design-refs/`.

## Скиллы (обязательно)
- **impeccable**: `/impeccable init` на старте; перед правкой UI читать `reference/craft-floor.md`; `/impeccable critique` после каждого блока; slop-проверка (`/impeccable audit`, `/impeccable hooks on`) и `/impeccable polish` перед каждым пушем.
- **design-taste-frontend** + **high-end-visual-design** (tasteskill): Design Read + dials 8/8/3, AI Tells §9, Pre-Flight Check.
- **awesome-design-md**: доноры в `docs/design-refs/` (ferrari, runwayml).

## Жесткие правила
- Структура = порядок слайдов PromoKit (TZ §2). Новых смысловых секций не придумывать.
- Тексты, имена, цифры только из `docs/CONTENT.md`.
- Видео V1–V5 из `public/video/` и все 11 дат тура обязательны.
- Из 21st.dev берем только два компонента: Tilted Grid Hero (галерея, код `docs/21st/tilted-grid-hero.md`) и Velvet Haze (фон Contact, код `docs/21st/velvet-haze.md`), оба перекрашены в токены. Остальное (папки-стекло, орбиты, tracing-линия, футер; числа рангов и счетчиков обычным Outfit через CountUp, без цифр из баров) делаем нативно по DESIGN-SYSTEM §7.2, без внешних реестров.
- Галерея пока на заглушках `public/gallery/`, данные в `data/gallery.ts`.
- Цвета/шрифты/радиусы/easing только из DESIGN-SYSTEM. Ноль em-dash и en-dash в видимом тексте.
- Работать по TZ §11 по шагам. После каждого шага: коммит + `git push origin main`, затем коротко отчитаться и ждать «дальше».
