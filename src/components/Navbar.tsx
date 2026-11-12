import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { AdminTriggerButton } from './AdminTriggerButton';
import { 
  Globe, 
  Menu, 
  X, 
  FileText, 
  PhoneCall, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenAdmin: () => void;
  isAdminOpen: boolean;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  currentPage,
  onNavigate,
  onOpenAdmin,
  isAdminOpen,
  cartCount,
}) => {
  const t = TRANSLATIONS[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'products', label: t.nav.products },
    { id: 'about', label: t.nav.about },
    { id: 'quality', label: t.nav.qualityExport },
    { id: 'azerbaijan', label: t.nav.azerbaijan, highlight: true },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const languagesList: { code: Language; label: string; flag: string; country: string }[] = [
    { code: 'ar', label: 'العربية', flag: '🇪🇬', country: 'مصر والشرق الأوسط' },
    { code: 'en', label: 'English', flag: '🇬🇧', country: 'International' },
    { code: 'az', label: 'Azərbaycan', flag: '🇦🇿', country: 'Bakı və Qafqaz' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      {/* Top corporate bar */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              {language === 'ar' ? 'تصدير دولي موثق' : language === 'az' ? 'Rəsmi İxrac Portalı' : 'Official Global Export Portal'}
            </span>
            <span className="hidden md:inline text-stone-400">|</span>
            <span className="hidden md:inline text-stone-300">
              {t.brand.subtext}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Secret 5-second Admin Button */}
            <AdminTriggerButton 
              language={language}
              onUnlock={onOpenAdmin}
              isAdminOpen={isAdminOpen}
            />

            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {languagesList.find((l) => l.code === language)?.flag}{' '}
                  {languagesList.find((l) => l.code === language)?.label}
                </span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {langDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setLangDropdownOpen(false)} 
                  />
                  <div className="absolute top-full mt-1 rtl:left-0 ltr:right-0 z-50 w-44 bg-white text-stone-800 rounded-lg shadow-xl border border-stone-200 py-1 overflow-hidden animate-in fade-in zoom-in-95">
                    {languagesList.map((item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          onLanguageChange(item.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs text-start hover:bg-emerald-50 transition ${
                          language === item.code ? 'bg-emerald-50/80 font-bold text-emerald-800' : 'text-stone-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{item.flag}</span>
                          <span>{item.label}</span>
                        </span>
                        {language === item.code && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {/* Iconic AGA Emblem */}
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 via-red-700 to-amber-700 p-0.5 shadow-md shadow-red-900/20 flex items-center justify-center text-white">
              <div className="w-full h-full rounded-[10px] bg-stone-900/10 flex flex-col items-center justify-center border border-amber-300/40">
                <span className="text-[15px] font-black tracking-wider text-amber-300 leading-none">AGA</span>
                <span className="text-[9px] font-bold text-white tracking-widest leading-none mt-0.5">أجـا</span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold text-stone-900 tracking-tight leading-snug group-hover:text-emerald-700 transition">
                {language === 'ar' ? 'شركة النيل للتصنيع الزراعي (أجا)' : language === 'az' ? 'Nile Agricultural Ind. Co. (AGA)' : 'Nile Agricultural Ind. Co. (AGA)'}
              </span>
              <span className="text-[11px] sm:text-xs text-stone-500 font-medium">
                {language === 'ar' ? 'تجميد وحفظ وتصدير المنتجات الزراعية والغذائية' : language === 'az' ? 'Kənd Təsərrüfatı və Qida Məhsullarının İxracatı' : 'Agricultural Harvesting, IQF Processing & Global Export'}
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 relative ${
                  currentPage === link.id
                    ? 'text-emerald-800 bg-emerald-50/80 shadow-xs'
                    : link.highlight
                    ? 'text-amber-800 hover:text-amber-900 bg-amber-50/80 hover:bg-amber-100/70 border border-amber-200/60'
                    : 'text-stone-700 hover:text-emerald-800 hover:bg-stone-100/70'
                }`}
              >
                {link.label}
                {currentPage === link.id && (
                  <span className="absolute bottom-0 inset-x-3 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Header Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('order')}
              className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-900/20 hover:shadow-lg transition transform active:scale-95"
            >
              <FileText className="w-4 h-4 text-emerald-200" />
              <span>{t.nav.requestOrder}</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-black bg-amber-400 text-stone-950 rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition ${
                currentPage === link.id
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : link.highlight
                  ? 'bg-amber-50 text-amber-900 border border-amber-200'
                  : 'text-stone-800 hover:bg-stone-100'
              }`}
            >
              <span>{link.label}</span>
              {link.highlight && <Sparkles className="w-4 h-4 text-amber-600" />}
            </button>
          ))}

          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('order')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-700 text-white font-bold shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>{t.nav.requestOrder}</span>
              {cartCount > 0 && (
                <span className="px-2 py-0.5 bg-amber-400 text-stone-900 rounded-full text-xs">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800 text-stone-200 text-xs font-semibold"
            >
              <span>{t.nav.adminPortal}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
