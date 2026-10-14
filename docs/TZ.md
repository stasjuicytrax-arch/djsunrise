# Техническое задание · SUNRISE e-press-kit

**Версия 2.0** (13.10.2026). Изменения против 1.0: hero = студийный портрет на красно-оранжевом фоне; из 21st.dev берутся только Tilted Grid Hero и Velvet Haze, остальные компоненты §7.2 делаются нативно; галерея на временных заглушках; видео уже перекодированы и лежат в репозитории; тяжелый `SUNRISE Movie.mp4` (2 ГБ) исключен; стек Next.js + shadcn (нужен для компонентов 21st.dev); добавлен скилл-донор awesome-design-md.

| | |
|---|---|
| Проект | SUNRISE · Bangkok // Pattaya |
| Тип | одностраничный e-press-kit, заменяет PDF «PromoKit SunRise» |
| Аудитория | букинг-агентства и промоутеры: требовательные, смотрят быстро, часто с телефона |
| Задача сайта | за 30–60 секунд убедить букера в уровне артиста и довести до контакта (WhatsApp / e-mail) |
| Тон | ультрасовременный, модный, кинематографичный, вау с первого экрана, много осмысленной анимации |
| Репозиторий | https://github.com/stasjuicytrax-arch/djsunrise (ветка `main`) |
| Документы | `docs/DESIGN-SYSTEM.md` (визуал) · `docs/CONTENT.md` (весь текст) · `docs/ASSETS.md` (файлы) · `docs/design-refs/` (доноры) |

---

## 1. Скиллы (обязательно, по шагам)

Установлены у заказчика в `C:\Users\G13\.agents\skills\`. В начале работы скопировать в проект `.claude/skills/` (команда в `docs/TERMINAL-STEPS.md`), чтобы Claude Code их точно видел.

| Скилл | Когда и как |
|---|---|
| **Impeccable** (impeccable.style) | **`/impeccable init` на старте** (PRODUCT.md из этого ТЗ, DESIGN.md = `docs/DESIGN-SYSTEM.md`). Перед каждой правкой UI читать `reference/craft-floor.md`. **`/impeccable critique` после каждого блока**. **Slop-проверка (`/impeccable audit` + детектор, `/impeccable hooks on`) и `/impeccable polish` перед каждым пушем.** Для hero и финала дополнительно `animate` и `overdrive` |
| **Taste Skill** (tasteskill.dev) | **`design-taste-frontend`**: перед кодом Design Read + dials 8/8/3 (DESIGN-SYSTEM §0), при верстке правила §3–§6, перед сдачей AI Tells §9 и Pre-Flight Check. **`high-end-visual-design`**: при выборе стиля каждого блока (свет, материал, глубина, кинематографичность) |
| **awesome-design-md** (github.com/voltagent/awesome-design-md) | доноры уже лежат в `docs/design-refs/`: `ferrari.DESIGN.md` (красный на почти черном, числа как спецификации, календарь → тур) и `runwayml.DESIGN.md` (медиа = интерфейс). Сверяться с ними при спорных решениях. Бренды не копировать |

Приоритет при конфликте правил: **бриф заказчика → DESIGN-SYSTEM.md → impeccable → taste → design-refs**.
Пример: impeccable ограничивает дисплей 6rem, а REF-4 требует гигантское имя. Решение: гигант только у слова SUNRISE в hero и у графических чисел (`--t-name`, `--t-giant`), все заголовки ≤ 6rem.

---

## 2. Структура (из PromoKit SunRise.pdf)

Порядок контента = 10 слайдов PDF. Свои смысловые секции не придумываются. Разрешено: объединять соседние слайды одной темы, вставлять видео-интерлюдии (DROP) в стыки, служебные блоки (навбар, футер, прелоадер).

| # | Секция `#якорь` | Слайды | Ритм | Видео / компонент |
|---|---|---|---|---|
| 0 | Preloader | — | — | мини-солнце |
| 1 | **Hero** `#top` | 1 | DROP | видео V1 / V2 full-bleed + нижняя панель |
| 1a | Name-strip | 3 (часть) | — | 8 имен Top 100 DJs полосой (REF-3) |
| 2 | **Residencies** `#residencies` | 2 | STATE | **Glass Folder Cards** + CountUp (ранги); **V3** в папке Space Plus |
| — | Club night | — | DROP | **V4** + **V5** (сторис) |
| 3 | **Play together** `#together` | 3, 4, 5 | LIST | **Polyrhythm Orbit List** (3 орбиты) |
| 4 | **Progress** `#progress` | 6, 7 | STATE | **Gradient Tracing** (таймлайн), CountUp (счетчики) |
| 5 | **Venues** `#venues` | 8 | LIST | фильтр + FLIP |
| 6 | **Gallery & posters** `#gallery` | 9 | STATE | **Tilted Grid Hero** (заглушки) + Arc-fan (10 афиш) |
| 7 | **October tour** `#tour` | 9 | LIST | табло + **Gradient Tracing** (маршрут) |
| 8 | **Contact** `#contact` | 10 | DROP + Persuade | **Velvet Haze** (ember) + закат |
| 9 | Footer | — | — | **Halftone Wordmark Footer** |

Проверка ритма: DROP → STATE → DROP → LIST → STATE → LIST → STATE → LIST → DROP. Два LIST подряд нет.

---

## 3. Посекционно

Тексты, имена, цифры только из `docs/CONTENT.md`. Видео из `public/video/`. Названия токенов из DESIGN-SYSTEM.

### 0 · Preloader (≤ 1.2 с, только если постер hero еще не готов)
Черный экран, мини-солнце: 16 лучей загораются по кругу по мере загрузки портрета и шрифтов. Без процентов. Если всё готово за 300 мс, прелоадер не показывать. Переход: мини-солнце = солнце hero (shared element).

### 1 · Hero (слайд 1): видео-первый (утверждено заказчиком 14.10.2026, эскиз `docs/hero-sketch.html`)
**Основа:** видео V1 (`v1-aftermovie-loop.mp4`, mobile V2 `v2-aftermovie-9x16-loop.mp4`) на весь первый экран с первого кадра, muted loop playsInline, постер `after-movie-grozzman-16x9.jpg` / `-9x16.jpg`. Без анимации раскрытия (лучи, веер, маска убраны).
**Слои:** постер/видео → виньетка (`radial` по краям + затемнение снизу `rgba(10,9,9,.92)` до 46 %) → тонкая линия-горизонт `--dawn-400` (1px, градиент по краям в прозрачность) на высоте нижней панели → панель → навбар.
**Нижняя панель** (высота `clamp(118px,17vh,170px)`, сетка 3 колонки): вордмарк SUNRISE из `logo-sunrise.svg` + `bangkok // pattaya` (`//` в `--dawn-400`); ранги `#7 Bootshaus · #43 Space Plus · #90 Republic` (Outfit 300) и мелкая подпись `DJ Mag Top 100 Clubs` (JetBrains Mono); справа кнопка «Sound on» (стеклянная пилюля, белый круг с play) и «Book a date» (красная пилюля с белым кругом-стрелкой, → WhatsApp).
**Звук:** «Sound on» подменяет источник того же `<video>` на полную версию V1 (V2 на mobile) со звуком и включает звук; повторное нажатие выключает звук.
**Навбар:** сверху, мини-солнце слева, стеклянная пилюля с якорями и «Book» справа; прячется при скролле вниз.
**Движение:** панель и навбар проявляются fade + 10px за ~0.5 с; больше входных анимаций нет. Reduced-motion: видео стоит на постере, без fade.
**Mobile (≤ 860px):** видео `72svh` (min 480px), линия-горизонт по нижнему краю видео, панель под видео на чистом `--ink-950`, ранги в ряд по ширине, подпись DJ Mag скрыта.
**Убрано:** студийный портрет и гигантское SUNRISE из hero; отдельный блок Showreel (V1 уже в hero). Портрет `portrait-cutout.webp` используется только в Contact.

### 1a · Name-strip (под hero, REF-3)
Одна строка из 8 имен Top 100 DJs (BLASTERJAXX, R3HAB, VINAI, LE TWINS, DIEGO MIRANDA, PLASTIK FUNK, KAAZE, 22 BULLETS — все есть на слайде 3), Outfit 500, `--fog-400`, медленный marquee. Без подписи сверху (запрет эйбрау). Слева короткая фраза в одну строку `played together with` (`--t-micro`), привязанная к строке.

### 2 · Residencies (слайд 2)
**Контент:** Republic 90 · Bootshaus 7 · Space Plus 43 (роли и города из CONTENT.md), подпись «DJ Mag Top 100 Clubs».
**Раскладка:** заголовок `residencies` слева; справа три **Glass Folder Cards** (tone dark, обложка «ember»), подпись папки = название клуба, meta = город. Под каждой папкой ранг (`#90`, `#7`, `#43`) обычным Outfit 600 `--t-giant`, белым со свечением `--sun-400`, **CountUp** (счет от 100 вниз к рангу, blur 12 → 0, ~1.2 с).
**Поведение:** папки «собираются» при скролле (appearDelay 0 / 140 / 280); hover — стекло наклоняется к курсору; клик — папка открывается и веером выдает «файлы»: роль, город, строку «#N club in the world», а у Space Plus еще и видео **V3** `v3-spaceplus-loop.mp4` (Media-frame 9:16). Повторный клик или Esc — закрыть. Клавиатура: Tab по папкам, Enter открывает.
Mobile: папки в колонку, открытие раскрывает содержимое под папкой.

### Club night (DROP)
**V4** `v4-clubnight-loop.mp4` и **V5** `v5-shortfilm-loop.mp4` как две «сторис» r=20 со смещением по высоте на фоне `--g-curtain`. Легкий параллакс глубины (≤ 80px). Тап/клик — звук (`*-full.mp4`). Mobile: горизонтальная лента со snap.

### 3 · Play together (слайды 3, 4, 5)
**Заголовок:** «play **together** in clubs with Top 100 DJs» (together на Highlight-pill, плашка наливается слева направо).
**Polyrhythm Orbit List (нативная реализация, см. DESIGN-SYSTEM §7.2):** в центре солнце SUNRISE; три орбиты = три группы: внутренняя Top 100 DJs (15), средняя Star DJs & artists (18), внешняя Festival warm-ups (18). Имена (Outfit 500) едут по орбитам с разной скоростью и направлением (полиритм, например 40 / 55 / 70 с на оборот). Hover на имени — остальные тускнеют, орбиты замедляются. Подписи орбит `--t-meta`.
Mobile: орбиты превращаются в 3 marquee-строки (по группе на строку).
Доступность: под орбитами `sr-only` список всех 51 позиции; reduced-motion — статичная сетка имен по группам.

### 4 · Progress (слайды 6, 7)
**Заголовок** `// progress`, 7 вех + «120 cities around the world» (CONTENT.md).
**Раскладка:** горизонтальный pin-скролл (desktop). Линия таймлайна = **Gradient Tracing** (градиент бежит по линии), маркер-солнце едет по линии вместе со скроллом. Каждая веха: год Outfit 600 `--t-display`, событие `--t-h3`, число людей (35,000 / 20,000) через CountUp (Outfit 600, `--dawn-400`, счет от 0 с blur 12 → 0). Вехи 2022 (Qatar) на фоне кубка из слайда 7 (`source/promokit/slide-07.jpg`, пока исходника нет — затемненный кроп, затем заменить).
**Финал:** «120» (`--t-giant`, Fact-column-стиль REF-4, цвет `--dawn-400`) + «cities around the world» + строка 19 стран.
Mobile: вертикальный таймлайн без pin.

### 5 · Venues (слайд 8)
34 площадки (CONTENT.md), 2 колонки desktop / 1 mobile, клуб `--t-h3`, город и страна `--t-meta`. Фильтр-пилюли **All · Asia · Middle East · Europe · Americas** с FLIP-перестройкой. Hover — строка белая, остальные `--ink-500`; клубы из тура (Pacha, Watergate, Mio, Rush Hour, Duomo Festival, Escape, First Club, Bel Air) получают метку «oct tour», клик скроллит к дате в табло. Вход строк маской, стаггер 30 мс, ≤ 600 мс на колонку.

### 6 · Gallery & posters (слайд 9)
**Часть А · Галерея (главный визуальный запрос заказчика):** **Tilted Grid Hero** full-bleed: изогнутая бесконечная лента из 12 изображений `public/gallery/placeholder-01..12-*.jpg` (временные заглушки: логотип на черном, рассвете, светлом). Поверх по центру заголовок `live` (Outfit 600 `--t-display`) и строка `--t-lead`: `photos from the latest shows are on the way` (временная, удалить вместе с заглушками). Данные в `src/data/gallery.ts` (`{ src, alt, w, h }`), чтобы клиентские фото заменили заглушки без правки компонента.
**Часть Б · Афиши:** **Arc-fan** из 10 афиш (кропы со слайда 9, пока нет оригиналов: `source/promokit/slide-09.jpg` нарезать в `public/posters/poster-01..10.jpg`). Веер раскрывается при скролле от сложенного до полукруга 180°, как лучи солнца. Клик — лайтбокс (← → Esc, свайп). Афиша «October Tour» в центре веера, клик по ней — скролл к табло тура.

### 7 · October tour (слайд 9)
Заголовок `october tour`, сводка Fact-column: **11** shows · **6** countries · **1** month.
Табло (Split-flap rows): **все 11 дат** из CONTENT.md, `src/data/tour.ts`. При входе символы «перещелкиваются» (стаггер 60 мс, ≤ 1.5 с). Hover: фон строки `--ink-800`, дата красная. Над табло — схематичный маршрут: 11 точек-городов, соединенных **Gradient Tracing** по порядку дат (без карты-подложки, только линия и подписи городов).
Год не выводить и не писать upcoming/past, пока заказчик не уточнит.

### 8 · Contact (слайд 10)
**Фон:** **Velvet Haze** (21st.dev, `components/ui/velvet-haze.tsx`, обертка `components/shared/SunriseHaze.tsx`, preset ember + палитра токенов) на всю секцию; контакты внутри через children, ссылки и кнопки с `pointer-events-auto`. На мобиле maxDpr 1.5, reduced-motion встроен в компонент.
**Контент:** `// contact`; Bookings `+90 543 490 62 47` (WhatsApp → `https://wa.me/905434906247`), `whitebarpattaya@gmail.com` (mailto), `+66 94 438 9777` (tel). Телефоны JetBrains Mono. У e-mail и телефонов кнопка Copy (Phosphor `Copy`, «copied» 1.5 с).
**Главный CTA:** Notch-card «book sunrise» на `--g-dawn` с Sun-CTA в вырезе → WhatsApp. Справа вырезанный портрет (`portrait-cutout.webp`) в теплом свете (REF-4 финальный CTA на фото артиста).
**Закат:** при доскролле солнце опускается за горизонт (обратный hero-сценарий), остается линия горизонта `--dawn-400`.

### 9 · Footer
**Halftone Wordmark Footer:** гигантский SUNRISE из полутоновых точек, обрезанный низом; колонки: якоря секций · контакты · «Download PDF press kit» (`public/PromoKit-SunRise.pdf`, скопировать из `source/promokit/`) · back to top. `© SUNRISE` + текущий год. Никаких версий, погоды, локаций.

### Навигация
Nav-пилюля появляется после hero: мини-солнце (→ `#top`), якоря Residencies · Together · Progress · Venues · Gallery · Tour · Contact, Sun-pill-CTA «Book». Активный якорь белый, остальные `--fog-400`. Прячется при скролле вниз, возвращается при скролле вверх. Mobile: мини-солнце + «Book» + меню (полноэкранное, пункты `--t-display`, вход маской).

---

## 4. Видео (решение по весу)

Все видео уже перекодированы и лежат в `public/video/` (в репозитории). Исходники в рабочей папке не трогаем.

| Код | Файл на сайте | Размер | Где |
|---|---|---|---|
| V1 | `v1-aftermovie-loop.mp4` (1920×960, 14 с, без звука) | 7.4 МБ | Hero desktop |
| V1 | `v1-aftermovie-full.mp4` (1920×960, 55 с, звук) | 24.9 МБ | кнопка «Sound on» в Hero |
| V2 | `v2-aftermovie-9x16-loop.mp4` (720×1280, 14 с) | 4.1 МБ | Hero mobile, Club night |
| V2 | `v2-aftermovie-9x16-full.mp4` (55 с, звук) | 14.3 МБ | плеер mobile |
| V3 | `v3-spaceplus-loop.mp4` / `-full.mp4` | 3.4 / 8.1 МБ | папка Space Plus |
| V4 | `v4-clubnight-loop.mp4` / `-full.mp4` | ~4 МБ / см. ASSETS | Club night |
| V5 | `v5-shortfilm-loop.mp4` / `-full.mp4` | ~2.7 МБ / см. ASSETS | Club night |
| ~~V6~~ | `SUNRISE Movie.mp4` (2.06 ГБ) | — | **исключен**: слишком тяжелый, содержание не проверено. Если заказчик захочет, перекодировать отдельно и добавить в Showreel |

Требования: `<video muted playsinline loop preload="none" poster>` + автоплей только в зоне видимости (IntersectionObserver), пауза вне экрана и при `document.hidden`; full-версии грузятся только по клику (`preload="none"`). Перед деплоем на прод желательно унести видео на CDN (Vercel Blob / Cloudflare R2), для превью Vercel хватит `public/`.

---

## 5. Тур: все 11 дат обязательны
Табло (§3.7) + маршрут + метки в Venues. Данные `src/data/tour.ts`:
```ts
{ date: '02.10', city: 'Munich', country: 'Germany', iso: 'DE' }
```

---

## 6. Стек

| Слой | Выбор |
|---|---|
| Фреймворк | **Next.js 15** (App Router, TypeScript, `output: 'export'` — статический сайт) |
| Стили | **Tailwind CSS v4**, токены DESIGN-SYSTEM в `@theme` (`app/globals.css`) |
| Компоненты | **shadcn/ui** (init), базовые примитивы. Из 21st.dev только **Tilted Grid Hero** и **Velvet Haze** (`docs/21st/`) |
| Анимация | **Motion** (`motion/react`) для компонентов и состояний + **GSAP 3** (ScrollTrigger, SplitText, Flip) для pin/скролл-сцен |
| Скролл | **Lenis**, синхронизирован с ScrollTrigger; выключен при reduced-motion |
| Иконки | `@phosphor-icons/react` |
| Шрифты | `next/font/local`: Outfit, General Sans, JetBrains Mono (WOFF2 в `app/fonts/`) |
| Деплой | Vercel (превью на каждый пуш) |

Структура:
```
app/        layout.tsx, page.tsx, globals.css (токены), fonts/
components/ ui/ (Tilted Grid Hero и Velvet Haze из 21st.dev, shadcn) · sections/ Hero, NameStrip, Residencies, ClubNight, Together, Progress, Venues, Gallery, Tour, Contact, Footer, Nav · shared/ SunMark, SunCTA, SunPill, VideoPlayer, MediaFrame, CountUp, Orbits, ArcFan
data/       residencies.ts, artists.ts, progress.ts, venues.ts, gallery.ts, posters.ts, tour.ts, contacts.ts
lib/        motion.ts (GSAP + Lenis + reduced-motion guard), video.ts (IO-автоплей)
public/     brand/ video/ gallery/ posters/ PromoKit-SunRise.pdf
```
Контент из `docs/CONTENT.md` переносится в `data/*.ts` один раз; компоненты читают только data.

---

## 7. Нефункциональные требования
- LCP ≤ 2.5 с на 4G (LCP = портрет hero, `priority`), CLS ≤ 0.05, INP ≤ 200 мс. Lighthouse Performance ≥ 85 mobile / ≥ 95 desktop.
- Адаптив: 360, 390, 768, 1024, 1440, 1920, 2560.
- Доступность: контрасты DESIGN-SYSTEM, клавиатура везде, focus-visible, alt у изображений, aria-label у иконок-кнопок, sr-only списки за орбитами и marquee, reduced-motion (DESIGN-SYSTEM §8.5).
- Шаринг: `<title>SUNRISE · DJ · Bangkok // Pattaya · Press kit</title>`, description из CONTENT.md, OG 1200×630 (портрет + логотип), favicon-солнце, `theme-color #0A0909`. Превью в WhatsApp/Telegram должно выглядеть дорого.
- Браузеры: последние 2 версии Chrome, Safari (особенно iOS: автоплей muted inline, `100svh`), Firefox, Edge.

---

## 8. Ассеты
Готово (в репозитории): портрет hero + вырез, логотип PNG/SVG, 5 видео × 2 версии + постеры, 12 заглушек галереи, 31 кадр из видео (`source/video-stills/`, запасной вариант галереи), слайды PDF, референсы, доноры design-md.
Нужно от клиента: живые фото (заменят заглушки), оригиналы 10 афиш, фото в шляпе (слайд 10), блобы/граффити/кубок FIFA, векторный логотип.

## 9. Открытые вопросы
1. Год и статус October Tour (прошедший / будущий).
2. Основной номер букинга: +90 WhatsApp — подтвердить.
3. Правки орфографии из CONTENT.md (в т.ч. FIFA World Club → World Cup).
4. Соцсети и музыка (Instagram, SoundCloud…): в PDF нет, без подтверждения не добавлять.
5. Домен.
6. Нужен ли V6 `SUNRISE Movie.mp4`.

## 10. Критерии приемки
- [ ] Весь контент CONTENT.md на месте: 3 резиденции, 51 позиция артистов, 7 вех + 120 cities, 34 площадки, 19 стран, 10 афиш, 11 дат тура, 3 контакта.
- [ ] Видео V1–V5 задействованы, автоплей muted только в зоне видимости, звук по клику.
- [ ] Hero: видео сразу на весь экран, нижняя панель с рангами, звук по кнопке; финальный «Закат» в Contact; reduced-motion версия есть.
- [ ] Tilted Grid Hero (галерея) и Velvet Haze (фон Contact) из 21st.dev перекрашены в токены; остальные компоненты §7.2 реализованы нативно и перекрашены в токены.
- [ ] Галерея на заглушках, замена — правкой `data/gallery.ts`.
- [ ] После каждого блока `/impeccable critique`; перед каждым пушем slop-проверка + `/impeccable polish`; Pre-Flight taste пройден (ноль em-dash).
- [ ] Метрики §7, проверено на iPhone и Android.
- [ ] Каждый блок — отдельный коммит и пуш в `main`.

## 11. Порядок работ (каждый шаг = коммит + пуш)
1. Каркас: Next.js + Tailwind v4 + shadcn + шрифты + токены + data-файлы. `/impeccable init`.
2. Tilted Grid Hero и Velvet Haze (из `docs/21st/`) в `components/ui`, перекрасить; остальные компоненты DESIGN-SYSTEM §7.2 сделать нативно.
3. Блоки по порядку карты (§2): сначала статичная верстка всего контента, потом моушн. После каждого блока `/impeccable critique`.
4. Contact «Закат» и скролл-моушн секций (`/impeccable animate`); Hero без входных анимаций, кроме fade панели.
5. Адаптив (`/impeccable adapt`), скорость (`optimize`), доступность (`audit`).
6. `/impeccable polish` → Pre-Flight taste → деплой на Vercel.
