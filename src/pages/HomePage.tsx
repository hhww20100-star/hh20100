import React from 'react';
import { Language, Product } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PRODUCTS } from '../data/products';
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Award, 
  Ship, 
  Snowflake, 
  Sparkles, 
  ThermometerSnowflake, 
  ShieldCheck, 
  FileText, 
  Layers, 
  PackageCheck,
  ChevronRight,
  TrendingUp,
  MapPin
} from 'lucide-react';

interface HomePageProps {
  language: Language;
  onNavigate: (page: string) => void;
  onSelectCategory?: (category: string) => void;
  onAddToCart: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  language,
  onNavigate,
  onSelectCategory,
  onAddToCart,
}) => {
  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const categories = [
    {
      id: 'frozen-vegetables',
      title: t.categories.frozenVeg,
      desc: t.categories.frozenVegDesc,
      image: '/public/assets/aistudio/6_402f6737.jpeg',
      badge: language === 'ar' ? 'تجميد سريع IQF (-40°C)' : language === 'az' ? 'IQF Ani Dondurma' : 'IQF Blast Frozen',
      features: language === 'ar' 
        ? ['بامية سوبر وخضار نقي 100%', 'خرشوف، بسلة، ملوخية، سبانخ', 'خالية تماماً من الكيماويات والمواد الحافظة']
        : language === 'az'
        ? ['Seçilmiş körpə bamiyə və tərəvəzlər', 'Ənginar, noxud, yaşıl lobya, yarpaq', 'Konservantsız və 100% təbii']
        : ['Super Okra, Peas, Artichokes, Molokhia', 'Zero preservatives or chemicals', 'Sub-zero IQF technology'],
    },
    {
      id: 'juices',
      title: t.categories.juices,
      desc: t.categories.juicesDesc,
      image: '/public/assets/aistudio/2_442862fe.jpeg',
      badge: language === 'ar' ? 'كانز 330 مل وزجاج وديوباك' : language === 'az' ? 'Alüminium banka və şüşə' : 'Aseptic Cans & Glass',
      features: language === 'ar'
        ? ['مانجو، جوافة، كوكتيل، عنب، تفاح', 'كانز سهلة الفتح 330 مل لأول مرة', 'تعبئة معقمة Aseptic عالية الجودة']
        : language === 'az'
        ? ['Manqo, qvava, tropik kokteyl, üzüm, alma', '330ml asan açılan bankalar və şüşələr', 'Təbii meyvə tərkibli zəngin dad']
        : ['100% Natural fruit nectar & pulp', '330ml easy-open cans & 250ml glass', 'Aseptically pasteurized'],
    },
    {
      id: 'jams',
      title: t.categories.jams,
      desc: t.categories.jamsDesc,
      image: '/public/assets/aistudio/4_969799cf.jpeg',
      badge: language === 'ar' ? 'فاكهة طبيعية قطع كاملة' : language === 'az' ? 'Təbii Meyvə Parçalı' : 'Extra Fruit Content',
      features: language === 'ar'
        ? ['مشمش، تين، فراولة، برتقال، مشكل', 'برطمان زجاج 380 جم وعبوات 3 كجم', 'بورشن 30 جم للفنادق وشركات الطيران']
        : language === 'az'
        ? ['Ərik, əncir, çiyələk, portağal mürəbbəsi', '380q şüşə banka və 3kq vedrələr', 'Otellər üçün 30q tək porsiya']
        : ['Apricot, fig, strawberry, orange, cocktail', '380g jars, 30g hospitality cups, 3kg pails', 'Rich fruit aroma and natural pectin'],
    },
    {
      id: 'pickles',
      title: t.categories.pickles,
      desc: t.categories.picklesDesc,
      image: '/public/assets/aistudio/1_66d7c247.jpeg',
      badge: language === 'ar' ? 'زيتون محشو ومخللات تراثية' : language === 'az' ? 'Zeytun və Tərəvəz Turşusu' : 'Gourmet Mediterranean',
      features: language === 'ar'
        ? ['زيتون مخلي وشرائح ومحشو جزر وكلاماتا', 'بصل فضي مقرمش وفلفل حار وليمون', 'برطمانات زجاج وبراميل تصدير 150 كجم']
        : language === 'az'
        ? ['Yerkökülü, dilimlənmiş və kalamata zeytunu', 'Xırtıldayan ağ soğan və istiot turşusu', 'Şüşə bankalar və 150kq çəlləklər']
        : ['Pitted, sliced & carrot-stuffed olives', 'Crisp pearl onions and spiced peppers', 'Hermetic glass jars & export drums'],
    },
  ];

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center bg-stone-950 text-white overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/public/assets/aistudio/6_402f6737.jpeg"
            alt="AGA Processing Facility and Farm Production"
            className="w-full h-full object-cover object-center opacity-30 scale-105 transform motion-safe:animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/90 to-stone-950/60" />
          <div className="absolute inset-0 bg-radial from-emerald-900/20 via-transparent to-stone-950/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-3xl space-y-6">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
              {language === 'ar' ? (
                <>
                  أجا: رحلة الجودة <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">عبر العصور</span>
                </>
              ) : language === 'az' ? (
                <>
                  AGA: Əsrləri Aşan <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">Keyfiyyət Mirası</span>
                </>
              ) : (
                <>
                  AGA: A Legacy of Quality <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">Across Eras</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-stone-300 leading-relaxed font-normal">
              {t.hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onNavigate('order')}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-emerald-950/50 hover:shadow-emerald-900/60 transition active:scale-95"
              >
                <FileText className="w-5 h-5 text-emerald-200" />
                <span>{t.hero.ctaQuote}</span>
                <ArrowIcon className="w-5 h-5" />
              </button>

              <button
                onClick={() => onNavigate('products')}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-200 hover:text-white font-semibold text-sm sm:text-base border border-stone-700 backdrop-blur-md transition"
              >
                <span>{t.hero.ctaCatalog}</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-stone-800/80">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400">{t.hero.statsYears}</div>
                <div className="text-xs text-stone-400 mt-0.5">{t.hero.statsYearsSub}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">{t.hero.statsCountries}</div>
                <div className="text-xs text-stone-400 mt-0.5">{t.hero.statsCountriesSub}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">{t.hero.statsCapacity}</div>
                <div className="text-xs text-stone-400 mt-0.5">{t.hero.statsCapacitySub}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-cyan-400">{t.hero.statsCert}</div>
                <div className="text-xs text-stone-400 mt-0.5">{t.hero.statsCertSub}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AZERBAIJAN STRATEGIC CORRIDOR HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-gradient-to-r from-sky-950 via-stone-900 to-emerald-950 border border-sky-800/40 p-8 sm:p-10 shadow-xl overflow-hidden">
          <div className="absolute top-0 rtl:left-0 ltr:right-0 p-8 opacity-10 pointer-events-none">
            <span className="text-9xl">🇦🇿</span>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-900/70 text-sky-300 text-xs font-bold border border-sky-700/60">
                <span>🇦🇿 BAKI & AZƏRBAYCAN TƏRƏFDAŞLIĞI</span>
                <span>•</span>
                <span>BAKU EXPORT CORRIDOR</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {t.azerbaijanBanner.title}
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                {t.azerbaijanBanner.desc}
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => onNavigate('azerbaijan')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-amber-950/40 transition active:scale-95"
              >
                <span>{t.azerbaijanBanner.btn}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CORE 4 CATEGORIES GRID WITH AUTHENTIC BROCHURE ASSETS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            {language === 'ar' ? 'خطوط الإنتاج والتصدير الرئيسية' : language === 'az' ? 'Əsas İxracat Xətləri' : 'Core Export Divisions'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            {t.categories.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {t.categories.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group bg-white rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image Showcase */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-stone-100">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 rtl:right-4 ltr:left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-stone-900/80 text-amber-300 border border-amber-400/30 backdrop-blur-md">
                      {cat.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 space-y-4">
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900 group-hover:text-emerald-800 transition">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {cat.desc}
                  </p>

                  {/* Bullet features */}
                  <ul className="space-y-2 pt-2 text-xs text-stone-700">
                    {cat.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-stone-100 mt-4">
                <button
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory(cat.id);
                    onNavigate('products');
                  }}
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition"
                >
                  <span>{t.categories.exploreCategory}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const firstProd = PRODUCTS.find((p) => p.category === cat.id);
                    if (firstProd) onAddToCart(firstProd);
                    onNavigate('order');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 text-xs font-semibold transition"
                >
                  {language === 'ar' ? 'طلب حاوية' : language === 'az' ? 'Sifariş Et' : 'Quote Container'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE AGA INDUSTRIAL ENTERPRISE */}
      <section className="bg-stone-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {language === 'ar' ? 'المعايير الهندسية والصناعية' : language === 'az' ? 'Sənaye Üstünlükləri' : 'Industrial Excellence'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {t.whyUs.title}
            </h2>
            <p className="text-sm sm:text-base text-stone-400">
              {t.whyUs.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700/60 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-700/60 flex items-center justify-center">
                <Snowflake className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">
                {t.whyUs.point1Title}
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                {t.whyUs.point1Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700/60 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-700/60 flex items-center justify-center">
                <ThermometerSnowflake className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">
                {t.whyUs.point2Title}
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                {t.whyUs.point2Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700/60 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-950 text-amber-400 border border-amber-700/60 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">
                {t.whyUs.point3Title}
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                {t.whyUs.point3Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700/60 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-950 text-purple-400 border border-purple-700/60 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">
                {t.whyUs.point4Title}
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                {t.whyUs.point4Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL SHIPPING & LOGISTICS PORTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-50 border border-stone-200 rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-stone-200">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                {language === 'ar' ? 'الشبكة اللوجستية البحرية والبرية' : language === 'az' ? 'Qlobal Logistika Xətləri' : 'Global Maritime & Cold Chain Network'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
                {language === 'ar' ? 'مسارات الشحن المبرد إلى موانئ العالم وأذربيجان' : language === 'az' ? 'Bakı və Dünya Limanlarına Çatdırılma Marşrutları' : 'Refrigerated Shipping Corridors to Baku & Global Ports'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                FOB • CIF • CFR • EXW
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-sky-800 font-bold text-sm">
                <Ship className="w-5 h-5 text-sky-600" />
                <span>Baku & Caucasus Corridor 🇦🇿</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Damietta / Alexandria Ports ➔ Poti / Batumi Black Sea Ports ➔ Direct Reefer Rail / Truck to Baku Freight Logistics Terminal (-18°C constant).
              </p>
              <div className="text-[11px] font-mono text-emerald-700 font-bold">
                Transit Time: 12 - 16 Days
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                <Ship className="w-5 h-5 text-amber-600" />
                <span>Arabian Gulf & Red Sea 🇦🇪 🇸🇦</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Port Said / Sokhna ➔ Jebel Ali (Dubai), Jeddah Islamic Port, Dammam, Shuwaikh (Kuwait), Hamad Port (Qatar).
              </p>
              <div className="text-[11px] font-mono text-emerald-700 font-bold">
                Transit Time: 5 - 9 Days
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
                <Ship className="w-5 h-5 text-teal-600" />
                <span>European Union & US 🇪🇺 🇺🇸</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Alexandria ➔ Piraeus, Koper, Genoa, Marseille, Hamburg, Rotterdam, and US East Coast (New York / New Jersey).
              </p>
              <div className="text-[11px] font-mono text-emerald-700 font-bold">
                Transit Time: 4 - 18 Days
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-10 sm:p-14 text-center space-y-6 shadow-2xl overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {language === 'ar'
                ? 'جاهزون لاستقبال طلبات الحاويات والتعاقدات السنوية'
                : language === 'az'
                ? 'Konteyner Sifarişləri və İllik Müqavilələr Üçün Hazırıq'
                : 'Ready to Procure Commercial Export Containers?'}
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              {language === 'ar'
                ? 'تواصل مباشرة مع مدير إدارة التصدير الدولي لشركة أجا واحصل على فاتورة مبدئية تفصيلية ومواصفات التعبئة خلال دقائق.'
                : language === 'az'
                ? 'AGA beynəlxalq ixracat rəhbərliyi ilə əlaqə saxlayın və dəqiqələr ərzində rəsmi proforma faktura əldə edin.'
                : 'Connect with AGA International Export Board to reserve your refrigerated container allocations and technical datasheets.'}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('order')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-sm shadow-xl transition active:scale-95"
              >
                {t.hero.ctaQuote}
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-950 text-white font-bold text-sm border border-emerald-400/40 transition"
              >
                {t.nav.contact}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
