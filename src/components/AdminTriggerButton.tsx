import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, Lock, Unlock } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AdminTriggerButtonProps {
  language: Language;
  onUnlock: () => void;
  isAdminOpen: boolean;
}

export const AdminTriggerButton: React.FC<AdminTriggerButtonProps> = ({
  language,
  onUnlock,
  isAdminOpen,
}) => {
  const t = TRANSLATIONS[language];
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [unlockedSuccess, setUnlockedSuccess] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const duration = 5000; // 5 seconds required by user

  const startHolding = () => {
    setHolding(true);
    setProgress(0);
    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentProgress = Math.min(100, (elapsed / duration) * 100);
      setProgress(currentProgress);

      if (elapsed >= duration) {
        if (timerRef.current) clearInterval(timerRef.current);
        setHolding(false);
        setProgress(100);
        setUnlockedSuccess(true);
        setTimeout(() => {
          setUnlockedSuccess(false);
          setProgress(0);
          onUnlock();
        }, 300);
      }
    }, 50);
  };

  const cancelHolding = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setHolding(false);
    setProgress(0);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Quick double click fallback
  const handleDoubleClick = () => {
    onUnlock();
  };

  const remainingSeconds = Math.max(0, Math.ceil((5000 - (progress / 100) * 5000) / 1000));

  return (
    <div className="relative inline-flex items-center">
      <button
        onMouseDown={startHolding}
        onMouseUp={cancelHolding}
        onTouchStart={startHolding}
        onTouchEnd={cancelHolding}
        onDoubleClick={handleDoubleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => {
          cancelHolding();
          setShowTooltip(false);
        }}
        title={t.nav.adminHoldHint}
        className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all select-none ${
          isAdminOpen
            ? 'bg-amber-500 text-stone-950 shadow-md ring-2 ring-amber-400'
            : holding
            ? 'bg-emerald-900 text-emerald-200 ring-2 ring-emerald-400 scale-105'
            : 'bg-stone-800/80 hover:bg-stone-800 text-stone-300 border border-stone-700/60'
        }`}
      >
        {/* SVG Circular Progress Ring */}
        <div className="relative w-5 h-5 flex items-center justify-center">
          <svg className="w-5 h-5 -rotate-90 transform" viewBox="0 0 36 36">
            <path
              className="text-stone-700"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {holding && (
              <path
                className="text-emerald-400 transition-all duration-75"
                strokeDasharray={`${progress}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            )}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            {unlockedSuccess || isAdminOpen ? (
              <Unlock className="w-2.5 h-2.5 text-amber-300" />
            ) : holding ? (
              <ShieldCheck className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
            ) : (
              <Lock className="w-2.5 h-2.5 text-stone-400" />
            )}
          </div>
        </div>

        <span className="hidden sm:inline">
          {holding ? (
            <span className="text-emerald-300 font-mono">
              {language === 'ar' ? `استمر ${remainingSeconds} ث` : language === 'az' ? `${remainingSeconds} saniyə saxlayın` : `Hold ${remainingSeconds}s`}
            </span>
          ) : isAdminOpen ? (
            language === 'ar' ? 'لوحة المسؤول (مفتوحة)' : language === 'az' ? 'Admin Panel (Açıq)' : 'Admin Portal (Active)'
          ) : (
            language === 'ar' ? 'إدارة التصدير' : language === 'az' ? 'İdarəetmə' : 'Export Admin'
          )}
        </span>
      </button>

      {/* Tooltip hint on hover */}
      {showTooltip && !holding && (
        <div className="absolute top-full mt-2 rtl:left-0 ltr:right-0 z-50 w-60 p-2.5 bg-stone-900 text-stone-200 text-xs rounded-lg shadow-xl border border-stone-700 leading-relaxed pointer-events-none animate-in fade-in slide-in-from-top-1">
          <div className="font-bold text-amber-400 flex items-center gap-1.5 mb-1">
            <Lock className="w-3.5 h-3.5" />
            {language === 'ar' ? 'بوابة إدارة التصدير السرية' : language === 'az' ? 'Məxfi İdarəetmə Girişi' : 'Confidential Admin Portal'}
          </div>
          <p className="text-stone-300 text-[11px]">
            {language === 'ar' 
              ? 'اضغط باستمرار على هذا الزر لمدة 5 ثوانٍ لفتح لوحة تحكم التصدير وسجل الرسائل والردود السريعة (أو انقر نقراً مزدوجاً).'
              : language === 'az'
              ? 'Sifarişlər, mesajlar və hazır cavablar panelini açmaq üçün bu düyməni 5 saniyə basıb saxlayın (və ya iki dəfə klikləyin).'
              : 'Press and hold this button for 5 seconds to unlock the Admin Dashboard, Inquiries Log, and Quick Reply tools (or double-click).'}
          </p>
        </div>
      )}
    </div>
  );
};
