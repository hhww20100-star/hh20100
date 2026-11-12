import React from 'react';
import { Language, Product } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PRODUCTS } from '../data/products';
import { 
  Building2, 
  CheckCircle2, 
  Ship, 
  FileText, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Coffee,
  ShoppingBag
} from 'lucide-react';

interface AzerbaijanPageProps {
  language: Language;
  onNavigate: (page: string) => void;
  onAddToCart: (product: Product) => void;
}

export const AzerbaijanPage: React.FC<AzerbaijanPageProps> = ({
  language,
  onNavigate,
  onAddToCart,
}) => {
  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Selected top products for Azerbaijan market
  const azerbaijanTopProducts = PRODUCTS.filter((p) =>
    ['okra-super', 'vine-leaves', 'peas-carrots', 'jam-fig', 'pickles-onions-peppers', 'juice-mango'].includes(p.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header with Azerbaijan Flag motif */}
      <div className="relative rounded-3xl bg-gradient-to-r from-sky-900 via-stone-900 to-emerald-950 text-white p-8 sm:p-14 border border-sky-700/50 shadow-2xl overflow-hidden">
        <div className="absolute top-0 rtl:left-0 ltr:right-0 p-8 opacity-15 pointer-events-none select-none">
          <span className="text-9xl">🇦🇿</span>
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-950/80 border border-sky-500/40 text-sky-300 text-xs font-bold">
            <span className="text-base">🇦🇿 🤝 🇪🇬</span>
            <span>Azərbaycan & Qafqaz Tərəfdaşlıq Dəhlizi</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            {t.azerbaijanPage.title}
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            {t.azerbaijanPage.subtitle}
          </p>

          <div className="pt-4 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('order')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs sm:text-sm shadow-xl transition active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>
                {language === 'ar' ? 'طلب عرض أسعار خاص لميناء باكو' : language === 'az' ? 'Bakı Üçün Xüsusi Sifariş (RFQ)' : 'Request Baku CIF Quotation'}
              </span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Why Egyptian AGA Products Match Azerbaijan Culinary Traditions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-stone-700 text-sm sm:text-base leading-relaxed">
          <div className="border-r-4 rtl:border-r-emerald-700 ltr:border-l-4 ltr:border-l-emerald-700 rtl:pr-4 ltr:pl-4">
            <h2 className="text-2xl font-bold text-stone-950">
              {t.azerbaijanPage.whyAzerbaijanTitle}
            </h2>
          </div>

          <p>
            {t.azerbaijanPage.whyAzerbaijanText}
          </p>

          <div className="space-y-3 pt-2 text-xs sm:text-sm text-stone-800">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-950">
                  {language === 'ar' ? 'أوراق عنب ناعمة للدولمة الأذربيجانية الأصيلة' : language === 'az' ? 'Yarpaq Dolması Üçün İdeal Üzüm Yarpaqları' : 'Tender Grape Leaves for Traditional Azerbaijani Dolma'}
                </strong>
                <span className="text-stone-600 text-xs">
                  {language === 'ar' ? 'أوراق رقيقة سهلة اللف ذات طعم طبيعي أصيل.' : 'Nazik damarlı, asan bükülən və təbii turşməzə tam verən xüsusi Misir yarpaqları.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-950">
                  {language === 'ar' ? 'مربى التين والمشمش لثقافة الشاي الأذربيجاني' : language === 'az' ? 'Azərbaycan Çay Süfrəsi Üçün Təbii Mürəbbələr' : 'Fig & Apricot Jams for Azerbaijan Tea Culture'}
                </strong>
                <span className="text-stone-600 text-xs">
                  {language === 'ar' ? 'قطع الفاكهة الطبيعية الكاملة المثالية لمجالس الشاي والضيافة.' : 'Əncir və ərik parçaları ilə zəngin təbii mürəbbələr ənənəvi çay məclislərinin vazkeçilməzidir.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-950">
                  {language === 'ar' ? 'بسلة وجزر مجمد فاخر لسلطة باكو (Paytaxt Salatı)' : language === 'az' ? 'Paytaxt Salatı Üçün Təzə Dondurulmuş Noxud-Kök' : 'Peas & Carrots for Traditional Baku Capital Salad'}
                </strong>
                <span className="text-stone-600 text-xs">
                  {language === 'ar' ? 'حبات ناعمة مقرمشة متناسقة الحجم لا تفقد قوامها أثناء الطهي.' : 'Bərabər ölçüdə doğranmış təbii kub kök və şirin yaşıl noxud.'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual poster / Image */}
        <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-xl bg-stone-100">
          <img
            src="/public/assets/aistudio/4_969799cf.jpeg"
            alt="AGA Jams for Azerbaijan Markets"
            className="w-full h-[460px] object-cover object-center"
          />
        </div>
      </div>

      {/* 3 Core Azerbaijan Standards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center font-bold">
            AQTA
          </div>
          <h3 className="text-base font-bold text-stone-900">
            {t.azerbaijanPage.feature1Title}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            {t.azerbaijanPage.feature1Desc}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
            HALAL
          </div>
          <h3 className="text-base font-bold text-stone-900">
            {t.azerbaijanPage.feature2Title}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            {t.azerbaijanPage.feature2Desc}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-900">
            {t.azerbaijanPage.feature3Title}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            {t.azerbaijanPage.feature3Desc}
          </p>
        </div>
      </div>

      {/* Recommended Products for Azerbaijan Procurement */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-stone-900">
              {language === 'ar' ? 'المنتجات الأكثر طلباً في سوق أذربيجان' : language === 'az' ? 'Azərbaycan Bazarı Üçün Ən Çox Tələb Olunan Məhsullar' : 'Top Procurement Items for Azerbaijan Retail'}
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              {language === 'ar' ? 'جاهزة للشحن المباشر بحاويات مبردة 40 قدم ريفر' : 'Bakı Limanına 40 futluq ref-konteynerlərlə dərhal çatdırılma imkanı'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('products')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
          >
            <span>{t.productsPage.all}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {azerbaijanTopProducts.map((p) => (
            <div
              key={p.id}
              className="p-5 bg-white rounded-2xl border border-stone-200 space-y-3 hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <div className="h-44 rounded-xl overflow-hidden mb-3 bg-stone-100">
                  <img
                    src={p.image}
                    alt={p.name[language] || p.name.en}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <h3 className="font-bold text-stone-900 text-sm">{p.name[language] || p.name.en}</h3>
                <p className="text-xs text-stone-500 mt-1 line-clamp-2">{p.subtitle[language] || p.subtitle.en}</p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-stone-600 font-bold">{p.moq}</span>
                <button
                  onClick={() => {
                    onAddToCart(p);
                    onNavigate('order');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold"
                >
                  {language === 'ar' ? 'إضافة للطلب' : language === 'az' ? 'Sifarişə Əlavə Et' : 'Add to RFQ'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Azerbaijan Wholesale Contact Desk Box */}
      <div className="p-8 sm:p-10 rounded-3xl bg-stone-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <h3 className="text-xl sm:text-2xl font-black text-amber-400">
            {t.azerbaijanPage.directDeskTitle}
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {t.azerbaijanPage.directDeskDesc}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <a
            href="https://wa.me/201004551871?text=Salam.%20Biz%20Bak%C4%B1dan%20AGA%20ixracat%20il%C9%99%20ba%C4%9Fl%C4%B1%20m%C3%BCraci%C9%99t%20edirik."
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg transition"
          >
            WhatsApp Baku Desk 🇦🇿
          </a>
        </div>
      </div>
    </div>
  );
};
