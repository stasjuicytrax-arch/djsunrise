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
- Из 21st.dev берем только Tilted Grid Hero (галерея, код `docs/21st/tilted-grid-hero.md`), перекрашен в токены. Velvet Haze (WebGL) убран из-за нагрузки на главный поток: фон Contact статичный CSS-закат с зерном. Остальное (папки-стекло, орбиты, tracing-линия, футер; числа через CountUp) делаем нативно, без внешних реестров.
- Галерея на живых фото `public/gallery/show-*.webp`, данные в `data/gallery.ts`; афиши и кадры в `data/posters.ts`.
- Цвета/шрифты/радиусы/easing только из DESIGN-SYSTEM. Ноль em-dash и en-dash в видимом тексте.
- Работать по TZ §11 по шагам. После каждого шага: коммит + `git push origin main`, затем коротко отчитаться и ждать «дальше».
