import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { 
  Award, 
  ShieldCheck, 
  Ship, 
  ThermometerSnowflake, 
  FileCheck, 
  CheckCircle2, 
  Box, 
  Layers, 
  Truck,
  Sparkles
} from 'lucide-react';

interface ExportQualityPageProps {
  language: Language;
  onNavigate: (page: string) => void;
}

export const ExportQualityPage: React.FC<ExportQualityPageProps> = ({
  language,
  onNavigate,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Quality Assurance & Cold-Chain Logistics
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
          {t.exportQualityPage.title}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          {t.exportQualityPage.subtitle}
        </p>
      </div>

      {/* Certifications Grid */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
          <Award className="w-6 h-6 text-emerald-700" />
          <span>{t.exportQualityPage.certTitle}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              ISO
            </div>
            <h3 className="font-bold text-stone-900 text-base">ISO 22000:2018</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {language === 'ar'
                ? 'شهادة نظام إدارة وسلامة الغذاء الشاملة لجميع مراحل المعالجة، الفرز، التجميد، والتعبئة المعقمة.'
                : 'Comprehensive international food safety management system governing raw material intake, IQF freezing, and packaging.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
              HALAL
            </div>
            <h3 className="font-bold text-stone-900 text-base">Halal Authority Certified</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {language === 'ar'
                ? 'شهادة حلال رسمية معتمدة مطابقة لاشتراطات الدول الإسلامية وأذربيجان ودول القوقاز بدون أي شبهة أو ملونات محظورة.'
                : 'Formally accredited Halal certification recognized in Azerbaijan, Caucasus, and Islamic markets worldwide.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
              HACCP
            </div>
            <h3 className="font-bold text-stone-900 text-base">HACCP Codex Alimentarius</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {language === 'ar'
                ? 'نظام تحليل المخاطر ونقاط التحكم الحرجة لمنع أي تلوث كيميائي أو فيزيائي أو بيولوجي طوال دورة التصنيع.'
                : 'Hazard Analysis Critical Control Point protocols monitoring hygiene, pasteurization temps, and packaging integrity.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
              NFSA
            </div>
            <h3 className="font-bold text-stone-900 text-base">NFSA White List (سلامة الغذاء)</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {language === 'ar'
                ? 'إدراج الشركة بالقائمة البيضاء للهيئة القومية لسلامة الغذاء بمصر المصرح لها بالتصدير لكافة الأسواق العالمية وأمريكا.'
                : 'Full accreditation on the Egyptian National Food Safety Authority White List for global exports including US FDA.'}
            </p>
          </div>
        </div>
      </div>

      {/* Incoterms 2020 & Container Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Incoterms */}
        <div className="p-8 rounded-2xl bg-stone-900 text-white space-y-6">
          <div className="flex items-center gap-2">
            <Ship className="w-6 h-6 text-amber-400" />
            <h3 className="text-xl font-black text-white">
              {t.exportQualityPage.shippingTermsTitle}
            </h3>
          </div>
          <p className="text-xs text-stone-300 leading-relaxed">
            {t.exportQualityPage.shippingTermsDesc}
          </p>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700">
              <strong className="text-amber-400 block font-mono text-sm">FOB (Free On Board)</strong>
              <p className="text-stone-300 mt-0.5">
                Alexandria Port, Damietta Port, or Port Said. We handle factory staging, custom clearance, and loading onto buyer’s nominated vessel.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700">
              <strong className="text-emerald-400 block font-mono text-sm">CIF (Cost, Insurance & Freight)</strong>
              <p className="text-stone-300 mt-0.5">
                Delivered with marine insurance to Baku Port / Poti Port (Caucasus), Jebel Ali (Dubai), Jeddah, Mersin, or Hamburg.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700">
              <strong className="text-cyan-400 block font-mono text-sm">CFR / EXW Factory</strong>
              <p className="text-stone-300 mt-0.5">
                Direct collection from our AGA City Industrial Complex in Dakahlia or delivery to destination port without insurance.
              </p>
            </div>
          </div>
        </div>

        {/* Container Loading Guide */}
        <div className="p-8 rounded-2xl bg-white border border-stone-200 space-y-6 shadow-xs">
          <div className="flex items-center gap-2">
            <Box className="w-6 h-6 text-emerald-800" />
            <h3 className="text-xl font-black text-stone-900">
              {t.exportQualityPage.containerMatrixTitle}
            </h3>
          </div>

          <div className="space-y-4 text-xs text-stone-700">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <h4 className="font-bold text-stone-900 text-sm text-emerald-800">
                40' High-Cube Reefer Container (IQF Frozen Vegetables):
              </h4>
              <ul className="space-y-1 text-stone-600">
                <li>• <strong>Net Payload:</strong> 24.0 to 26.5 Metric Tons</li>
                <li>• <strong>Carton Capacity:</strong> Approx. 2,200 to 2,500 cartons (20x400g packs)</li>
                <li>• <strong>Operating Temperature:</strong> Continuous -18°C set point</li>
                <li>• <strong>Palletization:</strong> 20 to 22 industrial euro/standard pallets or floor loaded for maximum tonnage</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <h4 className="font-bold text-stone-900 text-sm text-amber-800">
                20' Standard Dry / Ventilated Container (Juices, Jams, Pickles):
              </h4>
              <ul className="space-y-1 text-stone-600">
                <li>• <strong>Cans 330ml:</strong> Approx. 2,600 to 2,800 trays (24 cans/tray)</li>
                <li>• <strong>Glass Jars 380g:</strong> Approx. 1,800 to 1,900 cartons (12 jars/box)</li>
                <li>• <strong>Portion Cups 30g:</strong> Approx. 2,200 cartons (100 units/box)</li>
                <li>• <strong>Gross Weight:</strong> Staged precisely within legal road & maritime limits (~19 - 22 MT)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Temperature & Cold Chain Guarantee */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-950 to-stone-900 text-white space-y-4 shadow-xl border border-emerald-800/60">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
            <ThermometerSnowflake className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {t.exportQualityPage.tempControlTitle}
            </h3>
            <p className="text-xs text-emerald-300">
              Unbroken Sub-Zero Reefer Assurance from Nile Delta to Baku Warehouses
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-4xl">
          {t.exportQualityPage.tempControlDesc}
        </p>

        <div className="pt-4 flex flex-wrap gap-4 text-xs font-semibold text-emerald-200">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Electronic USB/Cellular Temperature Data Logger in each container
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Pre-cooling stage at factory dock prior to stuffing
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Official Phytosanitary inspection seal
          </span>
        </div>
      </div>
    </div>
  );
};
