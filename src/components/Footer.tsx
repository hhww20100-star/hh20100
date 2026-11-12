import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Printer, 
  Mail, 
  Globe, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight,
  MessageSquare
} from 'lucide-react';

interface FooterProps {
  language: Language;
  onNavigate: (page: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onNavigate,
  onOpenAdmin,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top trust badges grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">ISO 22000:2018</h4>
              <p className="text-xs text-stone-400">
                {language === 'ar' ? 'نظام إدارة سلامة الغذاء' : language === 'az' ? 'Qida Təhlükəsizliyi İdarəetməsi' : 'Food Safety Management'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-800/60 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Halal Certified</h4>
              <p className="text-xs text-stone-400">
                {language === 'ar' ? 'معتمد رسمياً للأسواق الإسلامية' : language === 'az' ? 'Rəsmi Qafqaz Halal Standartı' : 'Recognized Halal Integrity'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-950/80 border border-teal-800/60 flex items-center justify-center text-teal-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">HACCP & FDA Compliant</h4>
              <p className="text-xs text-stone-400">
                {language === 'ar' ? 'التحليل البيولوجي والرقابة المخبرية' : language === 'az' ? 'Ciddi Laboratoriya Nəzarəti' : 'Hazard Analysis & Lab Purity'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {language === 'ar' ? 'أكثر من 20 عاماً' : language === 'az' ? '20+ İl Təcrübə' : '20+ Years Legacy'}
              </h4>
              <p className="text-xs text-stone-400">
                {language === 'ar' ? 'تصدير زراعي إلى 45+ دولة' : language === 'az' ? '45+ Ölkəyə İxracat' : 'Exported to 45+ Countries'}
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12 border-b border-stone-800">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-amber-700 flex items-center justify-center text-white font-black text-sm">
                AGA
              </div>
              <span className="font-extrabold text-white text-base">
                {language === 'ar' ? 'شركة النيل للتصنيع الزراعي (أجا)' : 'Nile Agricultural Ind. Co. (AGA)'}
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              {language === 'ar'
                ? 'تعمل الشركة في مجال تصنيع وتجميد وتعبئة وتعليب وحفظ كافة المنتجات الزراعية من خضروات وفاكهة (مربات وعصائر ومخللات) منذ أكثر من عشرين عاماً، بأحدث تكنولوجيا لخطوط الإنتاج لتغطية السوق المحلي والدول العربية والأوروبية وأذربيجان والولايات المتحدة.'
                : language === 'az'
                ? 'Nile Agricultural Ind. Co. (AGA) S.A.E - Misirin qabaqcıl aqrar sənaye şirkəti olaraq 20 ildən artıqdır ki, dondurulmuş tərəvəzlər, təbii meyvə şirələri, cəmlər və ləziz turşuların dünya bazarlarına və Azərbaycana ixracını həyata keçirir.'
                : 'Premier Egyptian agricultural processing enterprise with over two decades of excellence in processing, IQF freezing, bottling, and canning premium vegetables, juices, jams, and gourmet pickles.'}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/201004551871"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold transition"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Export Desk</span>
              </a>
            </div>
          </div>

          {/* Column 2: Cairo Head Office & Branches (Exact from brochure) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{language === 'ar' ? 'المقر الرئيسي (القاهرة)' : 'Head Office (Cairo)'}</span>
            </h4>
            <div className="text-xs text-stone-300 space-y-2 leading-relaxed">
              <p>
                <strong className="text-white">
                  {language === 'ar' ? 'العنوان:' : 'Address:'}
                </strong>{' '}
                35 ش رمسيس، مبنى بنك النيل، الدور العاشر، القاهرة، ص.ب 2741
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span dir="ltr">02/5773398 - 5781496 - 5781658</span>
              </p>
              <p className="flex items-center gap-2">
                <Printer className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span dir="ltr">Fax: 02/5773789</span>
              </p>

              <div className="pt-2 border-t border-stone-800/80">
                <p className="font-semibold text-white">
                  {language === 'ar' ? 'فرع الإسكندرية:' : 'Alexandria Branch:'}
                </p>
                <p className="text-stone-400">1 ش الفتح، محطة الوزارة، بولكلي</p>
                <p className="flex items-center gap-1.5 mt-1" dir="ltr">
                  <Phone className="w-3 h-3 text-stone-500" />
                  <span>Tel: 03/5827540</span>
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Factories & Processing Plant (Exact from brochure) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              <span>{language === 'ar' ? 'المصانع والمجمع الصناعي' : 'Industrial Plants (AGA)'}</span>
            </h4>
            <div className="text-xs text-stone-300 space-y-2 leading-relaxed">
              <p>
                <strong className="text-white">
                  {language === 'ar' ? 'الموقع:' : 'Location:'}
                </strong>{' '}
                مدينة أجا، محافظة الدقهلية (وسط أخصب حقول الدلتا)
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span dir="ltr">050/6455552 - 6458786</span>
              </p>
              <p className="flex items-center gap-2">
                <Printer className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span dir="ltr">Fax: 050/6455187</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span dir="ltr">info@aga.com.eg / export@aga.com.eg</span>
              </p>
              <p className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span dir="ltr">www.aga.com.eg</span>
              </p>
            </div>
          </div>

          {/* Column 4: Quick Portals & RFQ Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
              {language === 'ar' ? 'روابط التصدير المباشر' : language === 'az' ? 'Sürətli Keçidlər' : 'Export Quick Access'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-emerald-400 transition flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-500" />
                  <span>{t.nav.products}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('azerbaijan')}
                  className="hover:text-amber-400 transition flex items-center gap-1.5 text-amber-300 font-medium"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t.nav.azerbaijan}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quality')}
                  className="hover:text-emerald-400 transition flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-500" />
                  <span>{t.nav.qualityExport}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('order')}
                  className="hover:text-emerald-400 transition flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-500" />
                  <span>{t.nav.requestOrder}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-emerald-400 transition flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-500" />
                  <span>{t.nav.contact}</span>
                </button>
              </li>
              <li className="pt-2 border-t border-stone-800">
                <button
                  onClick={onOpenAdmin}
                  className="text-stone-400 hover:text-amber-300 transition text-[11px] flex items-center gap-1.5"
                >
                  <span>{t.nav.adminPortal}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()}{' '}
            {language === 'ar'
              ? 'شركة النيل للتصنيع الزراعي (أجا) ش.م.م - جميع الحقوق محفوظة.'
              : language === 'az'
              ? 'Nil Kənd Təsərrüfatı Sənayesi (AGA) S.A.E - Bütün hüquqlar qorunur.'
              : 'Nile Agricultural Ind. Co. (AGA) S.A.E. All Rights Reserved.'}
          </p>
          <p className="flex items-center gap-2">
            <span>Egypt • Cairo • Alexandria • AGA Industrial Complex</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
