import React, { useState } from 'react';
import { Language, ContactMessage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Printer, 
  Mail, 
  Globe, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';

interface ContactPageProps {
  language: Language;
  onSubmitMessage: (msg: ContactMessage) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  language,
  onSubmitMessage,
}) => {
  const t = TRANSLATIONS[language];

  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState(language === 'az' ? 'Azerbaijan (Bakı)' : '');
  const [inquiryType, setInquiryType] = useState<ContactMessage['inquiryType']>('export_inquiry');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !message) return;

    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      fullName,
      companyName: companyName || 'Commercial Importer',
      email,
      phone: phone || 'N/A',
      country: country || 'International',
      subject: subject || 'General Commercial Export Inquiry',
      message,
      inquiryType,
      status: 'unread',
    };

    onSubmitMessage(newMsg);
    setIsSubmitted(true);
    setFullName('');
    setCompanyName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Global Relations & Export Desk
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
          {t.contactPage.title}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          {t.contactPage.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT COLUMN: OFFICIAL OFFICES & FACTORY FROM BROCHURE (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Cairo HQ */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-stone-900 text-base">
                {t.contactPage.headOffice}
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t.contactPage.headOfficeAddr} (ص.ب 2741)
            </p>
            <div className="pt-2 border-t border-stone-100 text-xs space-y-1 text-stone-700">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span dir="ltr">02/5773398 - 5781496 - 5781658</span>
              </p>
              <p className="flex items-center gap-2">
                <Printer className="w-3.5 h-3.5 text-stone-400" />
                <span dir="ltr">Fax: 02/5773789</span>
              </p>
            </div>
          </div>

          {/* AGA Factory Complex */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-stone-900 text-base">
                {t.contactPage.factoryLocation}
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t.contactPage.factoryAddr} (وسط أخصب أراضي الدلتا الزراعية)
            </p>
            <div className="pt-2 border-t border-stone-100 text-xs space-y-1 text-stone-700">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span dir="ltr">050/6455552 - 6458786</span>
              </p>
              <p className="flex items-center gap-2">
                <Printer className="w-3.5 h-3.5 text-stone-400" />
                <span dir="ltr">Fax: 050/6455187</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                <span dir="ltr">info@aga.com.eg / export@aga.com.eg</span>
              </p>
            </div>
          </div>

          {/* Alexandria Branch */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-stone-900 text-base">
                {t.contactPage.alexBranch}
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t.contactPage.alexBranchAddr}
            </p>
            <div className="pt-2 border-t border-stone-100 text-xs text-stone-700">
              <p className="flex items-center gap-2" dir="ltr">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span>Tel: 03/5827540</span>
              </p>
            </div>
          </div>

          {/* Instant WhatsApp Support Box */}
          <div className="p-6 rounded-2xl bg-emerald-950 text-white space-y-3">
            <h4 className="font-bold text-amber-400 text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>Direct WhatsApp Importers Desk</span>
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              {language === 'ar'
                ? 'فريق التصدير متاح للتواصل السريع والمراسلات الرسمية عبر تطبيق واتساب على مدار الساعة.'
                : 'Commercial managers are available for real-time messaging, photos, and proforma follow-ups.'}
            </p>
            <a
              href="https://wa.me/201004551871"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md"
            >
              <span>+20 100 455 1871 (WhatsApp)</span>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTACT FORM (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200 shadow-xl space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                {t.contactPage.formTitle}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                {language === 'ar'
                  ? 'سيتم تسجيل رسالتكم مباشرة في لوحة إدارة التصدير والرد عليكم عبر البريد والواتساب فوراً.'
                  : 'Your dispatch will be logged directly into the Export Directorate inbox.'}
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-emerald-900 text-lg">
                  {t.contactPage.formSuccess}
                </h3>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold"
                >
                  {language === 'ar' ? 'إرسال رسالة أخرى' : 'Send another inquiry'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      {t.contactPage.formName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Eldar Mammadov"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      {t.contactPage.formCompany}
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Baku Supermarkets Chain"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      {t.contactPage.formEmail} *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contact@company.com"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      {t.contactPage.formPhone}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+994 50 123 4567"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      {t.contactPage.formCountry}
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Azerbaijan, UAE, Germany..."
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      {t.contactPage.formInquiryType}
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value as any)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 font-medium"
                    >
                      <option value="export_inquiry">Commercial Container Import (طلب تصدير حاوية)</option>
                      <option value="distribution_agency">Exclusive Country Distribution Agency (وكالة حصرية)</option>
                      <option value="sample_request">Commercial Samples Courier Request (طلب عينات مبردة)</option>
                      <option value="quality_spec">Lab Testing & Phytosanitary Specs (مواصفات الجودة)</option>
                      <option value="other">Other Inquiry (استفسار عام)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t.contactPage.formSubject} *
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Inquiry for 2x40' Reefer Frozen Okra to Baku Port"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t.contactPage.formMsg} *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about your required products, packaging preferences, target shipping port..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:bg-white focus:border-emerald-600 focus:outline-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.contactPage.formSend}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
