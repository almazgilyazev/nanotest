/**
 * NANO-TEST Landing Page
 * Design: Dark luxury editorial — black background (#050505), gold accent (#C5A059)
 * Layout: Full-width sections, asymmetric hero, composition detail, benefits grid, reviews, usage protocols
 * Typography: Inter, uppercase tracking, light weights
 */

import { useRef, useEffect, useState } from "react";
import { Star, AlertTriangle, Leaf, Shield, Zap, Heart, Quote } from "lucide-react";

const TG_BOT = "https://t.me/nano_test_shop_bot";

// ─── Image URLs ────────────────────────────────────────────────────────────────
const IMG_JAR   = "/manus-storage/nano-jar_d754284f.webp";

// Product detail photos (label close-ups)
const IMG_DETAIL1 = "/manus-storage/detail1_df2f5c02.webp";
const IMG_DETAIL2 = "/manus-storage/detail2_e04b0a6f.webp";

// Gallery / reviews avatars — remaining photos
const IMG_G1    = "/manus-storage/photo_2026-05-13_00-26-20_5a95f3f9.jpg";
const IMG_G2    = "/manus-storage/photo_2026-05-13_00-26-21_8d40c979.jpg";
const IMG_G3    = "/manus-storage/photo_2026-05-13_00-26-24_74ed1ebb.jpg";
const IMG_G4    = "/manus-storage/photo_2026-05-13_00-26-25_7cf24028.jpg";
const IMG_G5    = "/manus-storage/photo_2026-05-13_00-26-25(2)_69f8cf00.jpg";
const IMG_G6    = "/manus-storage/photo_2026-05-13_00-26-26_a6b41f79.jpg";
const IMG_G7    = "/manus-storage/photo_2026-05-13_00-26-29_7db165fc.jpg";
const IMG_G8    = "/manus-storage/photo_2026-05-13_00-26-30_403fc291.jpg";
const IMG_G9    = "/manus-storage/photo_2026-05-13_00-26-37_424c43ec.jpg";
const IMG_G10   = "/manus-storage/photo_2026-05-13_00-26-38_58b7c1bc.jpg";

// ─── Intersection-observer hook ───────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(30px)",
      transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function FadeDir({ children, dir = "left", delay = 0, className = "" }: {
  children: React.ReactNode; dir?: "left" | "right"; delay?: number; className?: string;
}) {
  const { ref, inView } = useInView();
  const tx = dir === "left" ? "translateX(40px)" : "translateX(-40px)";
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateX(0)" : tx,
      transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ─── Benefit item ─────────────────────────────────────────────────────────────
function BenefitItem({ text, dir, delay }: { text: string; dir: "left" | "right"; delay: number }) {
  return (
    <FadeDir dir={dir} delay={delay}>
      <div
        className="flex items-center gap-6 p-5 bg-[#111] border border-[#ffffff05] transition-colors duration-300"
        onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(197,160,89,0.3)")}
        onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.02)")}
      >
        <div className="w-10 h-10 shrink-0 border border-[#C5A059]/20 flex items-center justify-center text-[#C5A059]">
          <Star className="w-4 h-4 fill-current" />
        </div>
        <span className="text-sm text-gray-300 font-light leading-snug">{text}</span>
      </div>
    </FadeDir>
  );
}

// ─── Ingredient group card ────────────────────────────────────────────────────
function IngredientGroup({ icon, title, items }: { icon: React.ReactNode; title: string; items: string }) {
  return (
    <div className="p-6 bg-[#0d0d0d] border border-[rgba(255,255,255,0.06)] hover:border-[#C5A059]/25 transition-colors duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-[#C5A059]">{icon}</div>
        <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A059]">{title}</h4>
      </div>
      <p className="text-sm text-gray-400 font-light leading-relaxed">{items}</p>
    </div>
  );
}

// ─── Result item ──────────────────────────────────────────────────────────────
function ResultItem({ text, delay }: { text: string; delay: number }) {
  return (
    <FadeUp delay={delay}>
      <div className="flex items-start gap-4 py-3 border-b border-[rgba(255,255,255,0.05)]">
        <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2 shrink-0" />
        <span className="text-sm text-gray-300 font-light leading-snug">{text}</span>
      </div>
    </FadeUp>
  );
}

// ─── Star rating ──────────────────────────────────────────────────────────────
function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i < count ? "fill-[#C5A059] text-[#C5A059]" : "text-gray-700"}`}
        />
      ))}
    </div>
  );
}

// ─── Review card ─────────────────────────────────────────────────────────────
function ReviewCard({ avatar, name, date, rating, text, delay }: {
  avatar: string; name: string; date: string; rating: number; text: string; delay: number;
}) {
  return (
    <FadeUp delay={delay}>
      <div className="flex flex-col h-full bg-[#0d0d0d] border border-[rgba(255,255,255,0.06)] hover:border-[#C5A059]/25 transition-colors duration-300 overflow-hidden">
        {/* Top accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent" />

        {/* Card body */}
        <div className="flex flex-col flex-1 p-6">
          {/* Header: avatar + name + stars */}
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 shrink-0 overflow-hidden rounded-full border-2 border-[#C5A059]/30">
              <img src={avatar} alt={name} className="w-full h-full object-cover object-top" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-white truncate mb-1">{name}</div>
              <StarRating count={rating} />
            </div>
            <div className="text-[9px] text-gray-600 uppercase tracking-widest shrink-0">{date}</div>
          </div>

          {/* Divider */}
          <div className="border-t border-[rgba(255,255,255,0.05)] mb-5" />

          {/* Quote */}
          <Quote className="w-4 h-4 text-[#C5A059]/30 mb-3 shrink-0" />
          <p className="text-sm text-gray-400 font-light leading-relaxed italic flex-1">
            {text}
          </p>
        </div>
      </div>
    </FadeUp>
  );
}

// ─── Order Modal ──────────────────────────────────────────────────────────────
// OrderModal removed — buttons now link directly to Telegram bot

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {

  const benefitsLeft = [
    "Очищает и укрепляет стенки сосудов",
    "Улучшает состав крови и обмен веществ",
    "Увеличивает половую активность и потенцию",
  ];
  const benefitsRight = [
    "Нормализует гормональный фон",
    "Усиливает интенсивность оргазма",
    "Усиливает иммунитет",
  ];
  const extraBenefits = [
    "Способствует выработке естественного тестостерона",
    "Значительно увеличивает половую активность у представителей обоих полов",
    "Усиливает интенсивность ощущений во время полового акта и мощь оргазма",
    "Избавляет женщин от фригидности, а мужчин от проблем с потенцией",
    "Улучшает качество сперматозоидов, даёт больше шансов на зачатие",
    "Обогащает мужской и женский организм множеством необходимых витаминов и микроэлементов",
    "Заметно улучшает кровообращение органов половой системы",
    "Усиливает эрекцию и либидо",
    "Увеличивает количество сперматозоидов",
    "Избавляет от преждевременной эякуляции",
    "Улучшает спортивные показатели",
  ];
  const results = [
    "Бодрость: Снимает синдром хронической усталости и стресс",
    "Мозг: Улучшает память, концентрацию и ясность мышления",
    "Организм: Налаживает сон, ускоряет циркуляцию крови и купирует воспалительные процессы",
    "Защита: Оказывает антибактериальный, противовирусный и антиоксидантный эффекты",
  ];

  const reviews = [
    {
      avatar: IMG_G1,
      name: "Алексей М.",
      date: "Апрель 2026",
      rating: 5,
      text: "Принимаю уже второй месяц. Заметил прилив сил с первой недели — утром встаю бодрым, тренировки стали продуктивнее. Состав полностью натуральный, никакой химии. Рекомендую всем, кто хочет поддержать организм без лишних добавок.",
    },
    {
      avatar: IMG_G2,
      name: "Дмитрий К.",
      date: "Март 2026",
      rating: 5,
      text: "Скептически относился к подобным продуктам, но результат удивил. Уже через две недели почувствовал разницу в либидо и общем тонусе. Жена тоже заметила изменения. Буду заказывать снова.",
    },
    {
      avatar: IMG_G3,
      name: "Марина С.",
      date: "Апрель 2026",
      rating: 5,
      text: "Начала принимать по протоколу «Баланс» — 0,5 ч.л. утром. Через три недели ушла хроническая усталость, улучшился сон. Состав впечатляет: три вида женьшеня, маточное молочко, гинкго. Всё натурально и без привыкания.",
    },
    {
      avatar: IMG_G4,
      name: "Руслан Т.",
      date: "Февраль 2026",
      rating: 5,
      text: "Использую перед тренировками. Выносливость выросла ощутимо, восстановление после нагрузок стало быстрее. Плюс общее настроение на высоте. Отличный натуральный продукт без синтетики.",
    },
    {
      avatar: IMG_G5,
      name: "Ольга Р.",
      date: "Март 2026",
      rating: 5,
      text: "Подруга посоветовала. Принимаю уже полтора месяца — заметно улучшился гормональный фон, ушла раздражительность. Вкус мёда с травами приятный. Качество и состав на высшем уровне.",
    },
    {
      avatar: IMG_G6,
      name: "Сергей В.",
      date: "Январь 2026",
      rating: 5,
      text: "Заказал после долгих раздумий. Уже на второй неделе почувствовал прилив энергии и улучшение концентрации. Память стала острее, стресс отступил. Натуральный состав — это главное для меня.",
    },
    {
      avatar: IMG_G7,
      name: "Наталья Б.",
      date: "Апрель 2026",
      rating: 5,
      text: "Принимаю вместе с мужем. Оба довольны результатом. Иммунитет укрепился, зимой не болели ни разу. Продукт действительно работает — это не просто красивая упаковка.",
    },
    {
      avatar: IMG_G8,
      name: "Артём Г.",
      date: "Март 2026",
      rating: 5,
      text: "Спортсмен, слежу за составом всего, что принимаю. NANO-TEST — чистейший продукт: никаких гормонов, ГМО, консервантов. Эффект на тренировках заметен уже через неделю. Буду рекомендовать команде.",
    },
    {
      avatar: IMG_G9,
      name: "Ирина Д.",
      date: "Февраль 2026",
      rating: 5,
      text: "Давно искала натуральный адаптоген без химии. NANO-TEST превзошёл ожидания: улучшился сон, ушла тревожность, появилась лёгкость. Состав на основе мёда и трав — всё как надо.",
    },
    {
      avatar: IMG_G10,
      name: "Максим П.",
      date: "Апрель 2026",
      rating: 5,
      text: "Третий заказ подряд. Продукт стал частью моего утреннего ритуала. Энергия стабильная на протяжении всего дня, либидо в норме, настроение ровное. Лучшее, что я пробовал из натуральных стимуляторов.",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#050505", color: "white" }}>

      {/* ── Header ── */}
      <header className="fixed top-0 z-50 w-full h-16 flex items-center px-6 md:px-12 justify-between border-b"
        style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(5,5,5,0.8)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
        <div className="text-xl font-bold tracking-[0.25em] text-[#C5A059]">NANO-TEST</div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.2em] text-gray-400">
            <a href="#about" className="hover:text-white transition-colors">О продукте</a>
            <a href="#benefits" className="hover:text-white transition-colors">Эффекты</a>
            <a href="#reviews" className="hover:text-white transition-colors">Отзывы</a>
            <a href="#usage" className="hover:text-white transition-colors">Применение</a>
          </nav>
          <a href={TG_BOT} target="_blank" rel="noopener noreferrer"
            className="px-5 py-2 border border-[#C5A059] text-[#C5A059] text-[10px] uppercase tracking-widest transition-all duration-500 hover:bg-[#C5A059] hover:text-black">
            Заказать
          </a>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-6 md:px-12">

        {/* ── Hero ── */}
        <section className="min-h-screen flex flex-col lg:flex-row items-center gap-12 lg:gap-20 pt-32 pb-12">
          <FadeUp className="flex-1 text-center lg:text-left z-10">
            <div className="inline-block px-3 py-1 border text-[10px] uppercase tracking-[0.3em] mb-8 text-[#C5A059]"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              Batch 001 / Natural Aphrodisiac
            </div>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6 leading-tight uppercase">
              Энергия <br /><span className="text-[#C5A059]">Природы</span>
            </h1>
            <p className="text-gray-400 font-light text-base md:text-lg mb-10 max-w-xl leading-relaxed">
              <span className="text-white font-medium italic">NANO-TEST</span> — это натуральный афродизиак, изготовленный из смеси лекарственных трав, настоянных на меду. Чистая мощь органики.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href={TG_BOT} target="_blank" rel="noopener noreferrer"
                className="bg-[#C5A059] text-black px-10 py-5 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-500 hover:shadow-[0_0_30px_rgba(197,160,89,0.4)]">
                Оформить заказ
              </a>
              <div className="flex items-center justify-center gap-4 px-8 py-4 border text-sm tracking-widest uppercase"
                style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                5 000 ₽
              </div>
            </div>
          </FadeUp>

          <FadeDir dir="left" delay={200} className="flex-1 relative w-full">
            <div className="absolute inset-0 bg-[#C5A059] opacity-10 blur-[100px] rounded-full" />
            <div className="relative z-10 border bg-[#111] overflow-hidden shadow-2xl"
              style={{ borderColor: "rgba(255,255,255,0.04)" }}>
              <img src={IMG_JAR} alt="NANO-TEST банка" className="w-full h-full object-cover" />
            </div>
          </FadeDir>
        </section>

        {/* ── About / Full Description ── */}
        <section id="about" className="py-24 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <FadeUp>
            {/* Intro */}
            <div className="max-w-3xl mb-16">
              <h2 className="text-xs uppercase tracking-[0.4em] text-[#C5A059] mb-4">The Essence</h2>
              <h3 className="text-3xl font-medium uppercase mb-8">О продукте</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                <span className="text-white font-medium italic">NANO-TEST</span> — это 100% натуральный комплексный афродизиак и биостимулятор на основе цветочного меда и редких лекарственных трав. Мы создали продукт для тех, кто ценит чистоту состава и реальную эффективность без компромиссов.
              </p>
              <div className="inline-flex items-center gap-3 px-5 py-3 border border-[#C5A059]/30 text-sm text-[#C5A059] font-light tracking-wider">
                <Leaf className="w-4 h-4 shrink-0" />
                0% химии — Без гормонов, ГМО, консервантов, искусственных красителей и ароматизаторов. Не вызывает привыкания.
              </div>
            </div>

            {/* Product detail photos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
              <div className="overflow-hidden border border-[rgba(255,255,255,0.06)] hover:border-[#C5A059]/20 transition-colors duration-300">
                <img src={IMG_DETAIL1} alt="NANO-TEST состав" className="w-full h-full object-cover" />
              </div>
              <div className="overflow-hidden border border-[rgba(255,255,255,0.06)] hover:border-[#C5A059]/20 transition-colors duration-300">
                <img src={IMG_DETAIL2} alt="NANO-TEST эффекты" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Ingredient groups */}
            <div className="mb-16">
              <h3 className="text-2xl font-medium uppercase mb-2">Многогранный состав</h3>
              <p className="text-gray-500 text-sm uppercase tracking-[0.3em] mb-8">Мощь дикорастущих трав</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <IngredientGroup icon={<Zap className="w-4 h-4" />} title="Энергия и тонус"
                  items="Три вида женьшеня (красный, сибирский, американский), Мака перуанская, Корень калгана" />
                <IngredientGroup icon={<Shield className="w-4 h-4" />} title="Интеллект и сосуды"
                  items="Гинкго билоба, Центелла азиатская, Цератоний стручковый" />
                <IngredientGroup icon={<Heart className="w-4 h-4" />} title="Мужское и женское здоровье"
                  items="Пальмовая пыльца, Горянка (Epimedium), Семена тыквы, Крапива, Колючая лоза" />
                <IngredientGroup icon={<Leaf className="w-4 h-4" />} title="Активация обмена веществ"
                  items="Овес, Красный перец, Имбирь, Корица" />
              </div>
            </div>

            {/* Bee trinity */}
            <div className="mb-16 p-8 bg-[#0a0800] border border-[#C5A059]/15">
              <h3 className="text-lg font-bold uppercase tracking-widest text-[#C5A059] mb-2">
                Пчелиная «Троица» — Основа Здоровья
              </h3>
              <p className="text-gray-400 text-sm mb-6 font-light">
                В основе продукта лежит мощный союз продуктов пчеловодства, который укрепляет иммунитет и нормализует метаболизм:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Цветочный мёд", desc: "Природная база и антисептик" },
                  { label: "Пчелиная пыльца", desc: "Концентрат аминокислот" },
                  { label: "Маточное молочко", desc: "Эликсир долголетия и витаминный заряд" },
                ].map(item => (
                  <div key={item.label} className="text-center p-4 border border-[#C5A059]/10">
                    <div className="text-[#C5A059] text-xs font-bold uppercase tracking-widest mb-1">{item.label}</div>
                    <div className="text-gray-500 text-xs font-light">{item.desc}</div>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-xs mt-6 font-light">
                Витаминный профиль: A, B1, B2, B3, B6, B12, C, D, PP, H, а также глюкоза, фруктоза и ценные микроэлементы.
              </p>
            </div>

            {/* Eastern shield */}
            <div className="p-8 bg-[#080808] border border-[rgba(255,255,255,0.06)]">
              <h3 className="text-lg font-bold uppercase tracking-widest text-white mb-2">
                Природный щит и детокс
              </h3>
              <p className="text-gray-400 text-sm mb-4 font-light">
                В состав включены «золотые» компоненты восточной медицины:
              </p>
              <div className="space-y-2 text-sm text-gray-400 font-light">
                <p><span className="text-[#C5A059]">Куркумин и Кыст аль-хинди:</span> мощнейшие природные антибиотики.</p>
                <p><span className="text-[#C5A059]">Семена чёрного тмина:</span> универсальное средство для укрепления защитных сил организма.</p>
                <p><span className="text-[#C5A059]">Тутовая патока:</span> источник железа и энергии.</p>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* ── Benefits ── */}
        <section id="benefits" className="py-24 -mx-6 md:-mx-12 px-6 md:px-12 border-y"
          style={{ backgroundColor: "#080808", borderColor: "rgba(255,255,255,0.1)" }}>
          <FadeUp className="max-w-4xl mx-auto text-center mb-4">
            <h2 className="text-3xl md:text-5xl font-medium uppercase tracking-tighter mb-6 italic">
              Золотой стандарт оздоровления
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-4">
              {benefitsLeft.map((text, i) => (
                <BenefitItem key={text} text={text} dir="right" delay={i * 50} />
              ))}
            </div>
            <div className="space-y-4">
              {benefitsRight.map((text, i) => (
                <BenefitItem key={text} text={text} dir="left" delay={i * 50} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {extraBenefits.map((text, i) => (
              <BenefitItem key={text} text={text} dir={i % 2 === 0 ? "right" : "left"} delay={i * 40} />
            ))}
          </div>
        </section>

        {/* ── Results ── */}
        <section className="py-24 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <FadeUp>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xs uppercase tracking-[0.4em] text-[#C5A059] mb-4">Результат</h2>
              <h3 className="text-3xl font-medium uppercase mb-8">Регулярный приём NANO-TEST действует комплексно</h3>
              <div className="mb-8">
                {results.map((text, i) => (
                  <ResultItem key={text} text={text} delay={i * 80} />
                ))}
              </div>
              <p className="text-[#C5A059] text-sm font-medium italic tracking-wide">
                NANO-TEST — честный состав для вашей безупречной формы.
              </p>
            </div>
          </FadeUp>
        </section>

        {/* ── Reviews ── */}
        <section id="reviews" className="py-24 -mx-6 md:-mx-12 px-6 md:px-12 border-y"
          style={{ backgroundColor: "#080808", borderColor: "rgba(255,255,255,0.1)" }}>
          <FadeUp className="max-w-2xl mb-16">
            <h2 className="text-xs uppercase tracking-[0.4em] text-[#C5A059] mb-4">Отзывы</h2>
            <h3 className="text-3xl md:text-4xl font-medium uppercase tracking-tight">
              Говорят покупатели
            </h3>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((r, i) => (
              <ReviewCard key={r.name} {...r} delay={i * 60} />
            ))}
          </div>
        </section>

        {/* ── Usage Protocols ── */}
        <section id="usage" className="py-24 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-medium uppercase tracking-widest">Протоколы применения</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { title: "Баланс", body: "0,5 ч.л. утром 1 раз в день.", note: null },
                { title: "Спорт", body: "0,5 ч.л. за 1 час до тренировок.", note: null },
                { title: "Либидо", body: "0,5 ч.л. за час до полового акта.", note: "После акта не употреблять." },
              ].map(card => (
                <div key={card.title} className="p-8 bg-[#111] border text-center transition-all hover:border-[#C5A059]"
                  style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                  <h4 className="text-[#C5A059] text-[10px] font-bold uppercase mb-4 tracking-[0.3em]">{card.title}</h4>
                  <p className="text-sm text-gray-300 font-light mb-3">{card.body}</p>
                  {card.note && <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider">{card.note}</p>}
                </div>
              ))}
            </div>
            <div className="max-w-2xl mx-auto text-center px-6">
              <p className="text-gray-400 text-sm italic font-light">
                Организм каждого индивидуален, рекомендуется начать приём с порции чуть меньше половины чайной ложки.
              </p>
            </div>
          </FadeUp>
        </section>

        {/* ── Contraindications ── */}
        <section className="py-24 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <FadeUp>
            <div className="max-w-3xl mx-auto">
              <div className="bg-[#100] border border-red-900/30 p-10">
                <div className="flex items-center gap-4 mb-8">
                  <AlertTriangle className="text-red-500 w-5 h-5" />
                  <h3 className="text-xl font-bold uppercase tracking-widest text-red-500">Противопоказания</h3>
                </div>
                <div className="space-y-4 text-sm text-gray-300 font-light">
                  <p>— С осторожностью при проблемах с сердцем, сосудами и диабете.</p>
                  <p>— Беременным и кормящим.</p>
                  <p className="pt-4 text-red-500 font-bold uppercase text-xs">Обязательно ознакомьтесь с полным описанием.</p>
                </div>
              </div>
              <p className="text-center mt-8 text-[10px] text-gray-500 uppercase tracking-widest">
                БАД не является лекарственным средством
              </p>
            </div>
          </FadeUp>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="py-12 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-sm font-bold tracking-[0.2em] text-[#C5A059] uppercase">NANO-TEST 18+</div>
          <div className="text-[9px] text-gray-600 uppercase tracking-[0.4em]">NATURAL PERFORMANCE • 2026</div>
          <a href={TG_BOT} target="_blank" rel="noopener noreferrer"
            className="px-8 py-3 bg-[#C5A059] text-black text-[10px] font-bold uppercase tracking-widest transition-all hover:brightness-110">
            Заказать
          </a>
        </div>
      </footer>


    </div>
  );
}
