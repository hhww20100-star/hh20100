import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Factory, 
  Microscope, 
  Clock, 
  Users, 
  HeartHandshake,
  Globe
} from 'lucide-react';

interface AboutPageProps {
  language: Language;
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  language,
  onNavigate,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Title & Breadcrumb */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          {t.aboutPage.badge}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
          {t.aboutPage.title}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          {t.brand.tagline}
        </p>
      </div>

      {/* Main Heritage Story with Brochure Images */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-stone-700 text-sm sm:text-base leading-relaxed">
          <div className="border-r-4 rtl:border-r-emerald-700 ltr:border-l-4 ltr:border-l-emerald-700 rtl:pr-4 ltr:pl-4">
            <h2 className="text-2xl font-bold text-stone-950">
              {language === 'ar' ? 'أكثر من عقدين من الريادة والتميز الصناعي' : language === 'az' ? '20 İldən Artıq İstehsalat Təcrübəsi' : 'Over 20 Years of Agro-Industrial Leadership'}
            </h2>
          </div>

          <p>
            {t.aboutPage.heroStory}
          </p>

          <p>
            {t.aboutPage.techDesc}
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-200">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-2xl font-black text-emerald-800">100%</span>
              <p className="text-xs text-stone-600 font-semibold mt-1">
                {language === 'ar' ? 'طبيعي بدون أي مواد حافظة' : language === 'az' ? 'Təbii və qatqısız' : 'Natural without preservatives'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-2xl font-black text-amber-700">45+</span>
              <p className="text-xs text-stone-600 font-semibold mt-1">
                {language === 'ar' ? 'دولة تصديرية حول العالم' : language === 'az' ? 'Qlobal ixrac bazarı' : 'Global export markets'}
              </p>
            </div>
          </div>
        </div>

        {/* Real Brochure Visual Collage */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-md">
              <img
                src="/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_10.41.07_AM__3__49930c8e.jpeg"
                alt="AGA Factory production line and technicians"
                className="w-full h-56 object-cover object-top hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-md">
              <img
                src="/public/assets/aistudio/6_402f6737.jpeg"
                alt="AGA Stainless steel modern plant"
                className="w-full h-44 object-cover object-center hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-md">
              <img
                src="/public/assets/aistudio/1_66d7c247.jpeg"
                alt="AGA Quality control in processing lab"
                className="w-full h-44 object-cover object-center hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-md">
              <img
                src="/public/assets/aistudio/3_6eecf350.jpeg"
                alt="AGA Juices and canning lines"
                className="w-full h-56 object-cover object-top hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Production & Technological Strengths */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            {t.aboutPage.techHeading}
          </h3>
          <p className="text-xs sm:text-sm text-stone-400">
            {t.aboutPage.haccpHeading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-300">
          <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700/60 space-y-3">
            <Factory className="w-8 h-8 text-amber-400" />
            <h4 className="text-base font-bold text-white">
              {language === 'ar' ? 'أنفاق التجميد السريع (IQF)' : 'IQF Blast Freezing Tunnels'}
            </h4>
            <p className="leading-relaxed text-stone-400">
              {language === 'ar'
                ? 'تعتمد مصانع أجا على أنفاق التجميد الهوائي المستمر عند -40 درجة مئوية، مما يمنع تكون بلورات الثلج الكبيرة ويحافظ على قوام الخضروات والفواكه الطازجة ولونها الأخضر الزاهي وقيمتها الغذائية.'
                : 'Individual Quick Freezing (IQF) operating at -40°C prevents cellular rupture, preserving exact crisp texture, vibrant chlorophyll, and natural vitamin complex without chemical additives.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700/60 space-y-3">
            <Microscope className="w-8 h-8 text-emerald-400" />
            <h4 className="text-base font-bold text-white">
              {language === 'ar' ? 'مختبرات الفحص الميكروبي والرقابة' : 'Microbiological Testing Labs'}
            </h4>
            <p className="leading-relaxed text-stone-400">
              {language === 'ar'
                ? 'مختبرات فحص كيميائي وبكتريولوجي متطورة تقوم بفحص كل دفعة إنتاجية للتأكد من خلوها التام من متبقيات المبيدات، المعادن الثقيلة، وأي ملوثات، وفق أدق معايير الكودكس الغذائي العالمي.'
                : 'In-house physical, chemical, and microbiological laboratories verify zero pesticide residue, heavy metal absence, and bacteriological purity before container dispatch.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700/60 space-y-3">
            <Award className="w-8 h-8 text-cyan-400" />
            <h4 className="text-base font-bold text-white">
              {language === 'ar' ? 'خطوط تعبئة معقمة وتغليف هيرميتك' : 'Aseptic Canning & Hermetic Sealing'}
            </h4>
            <p className="leading-relaxed text-stone-400">
              {language === 'ar'
                ? 'خطوط تعبئة الكانز سهلة الفتح والزجاج والأكياس مفرغة الهواء والديوباك بنظم الإغلاق المحكم، مما يوفر فترات صلاحية تصديرية طويلة تتراوح بين 18 إلى 36 شهراً.'
                : 'Aseptic packaging in easy-open aluminum cans, vacuum-sealed pouches, glass jars, and doypacks guarantees extended shelf lives of 18 to 36 months at ambient or sub-zero conditions.'}
            </p>
          </div>
        </div>
      </div>

      {/* Facilities & Address from Brochure */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black text-stone-900">
            {t.aboutPage.facilities}
          </h3>
          <p className="text-stone-600 text-xs sm:text-sm">
            {language === 'ar' ? 'شبكة متكاملة من المكاتب الإدارية والمجمعات الصناعية' : 'Integrated Corporate & Industrial Locations'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-stone-900 text-base">
              {language === 'ar' ? 'المقر الرئيسي (القاهرة)' : 'Head Office (Cairo)'}
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              35 ش رمسيس، مبنى بنك النيل، الدور العاشر، القاهرة، جمهورية مصر العربية (ص.ب 2741).
            </p>
            <p className="text-xs text-stone-700 pt-2 border-t border-stone-100 font-mono">
              Tel: 02/5773398 - 5781496<br />
              Fax: 02/5773789
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-stone-900 text-base">
              {language === 'ar' ? 'فرع وميناء الإسكندرية' : 'Alexandria Branch'}
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              1 شارع الفتح، محطة الوزارة، بولكلي، الإسكندرية (قريب من ميناء الإسكندرية وميناء الدخيلة البحري).
            </p>
            <p className="text-xs text-stone-700 pt-2 border-t border-stone-100 font-mono">
              Tel: 03/5827540
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
              <Factory className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-stone-900 text-base">
              {language === 'ar' ? 'مجمع مصانع أجا (الدقهلية)' : 'AGA Industrial Complex'}
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              مدينة أجا، محافظة الدقهلية (في قلب الأراضي الزراعية الأكثر خصوبة لضمان استلام المحاصيل الطازجة وتجميدها خلال ساعات من الحصاد).
            </p>
            <p className="text-xs text-stone-700 pt-2 border-t border-stone-100 font-mono">
              Tel: 050/6455552 - 6458786<br />
              Fax: 050/6455187
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
