import React, { useState } from 'react';
import { Language, Product, ExportOrder, OrderItem } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PRODUCTS } from '../data/products';
import { ProformaModal } from '../components/ProformaModal';
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Ship, 
  FileText, 
  Check, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  Calculator, 
  Printer, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface OrderPageProps {
  language: Language;
  onNavigate: (page: string) => void;
  cartItems: OrderItem[];
  onUpdateCart: (items: OrderItem[]) => void;
  onSubmitOrder: (order: ExportOrder) => void;
}

export const OrderPage: React.FC<OrderPageProps> = ({
  language,
  onNavigate,
  cartItems,
  onUpdateCart,
  onSubmitOrder,
}) => {
  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Importer fields
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [country, setCountry] = useState(language === 'az' ? 'Azerbaijan (Azərbaycan)' : 'Azerbaijan');
  const [city, setCity] = useState(language === 'az' ? 'Baku (Bakı)' : 'Baku');
  const [destinationPort, setDestinationPort] = useState(language === 'az' ? 'Baku Port / Poti Corridor' : 'Baku Port / Poti Corridor');

  // Shipment terms
  const [incoterm, setIncoterm] = useState<'FOB' | 'CIF' | 'CFR' | 'EXW'>('CIF');
  const [containerType, setContainerType] = useState<"40' High-Cube Reefer" | "20' Standard Dry" | "40' Standard Dry" | "Consolidated LCL">("40' High-Cube Reefer");
  const [containerCount, setContainerCount] = useState<number>(1);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'AZN'>('USD');
  const [labelLanguage, setLabelLanguage] = useState<'Azərbaycan + English' | 'Arabic + English' | 'English Only' | 'Custom Private Label'>(
    language === 'az' ? 'Azərbaycan + English' : 'Arabic + English'
  );
  const [brandPreference, setBrandPreference] = useState<'AGA Brand (شركة أجا)' | 'Private Label / OEM (العلامة التجارية للعميل)'>('AGA Brand (شركة أجا)');
  const [notes, setNotes] = useState('');

  // Submitted order for confirmation view
  const [submittedOrder, setSubmittedOrder] = useState<ExportOrder | null>(null);
  const [showProformaPreview, setShowProformaPreview] = useState(false);

  // Quick product add selector
  const [selectedProductId, setSelectedProductId] = useState<string>(PRODUCTS[0].id);

  // Cart operations
  const handleAddProductToCart = () => {
    const prod = PRODUCTS.find((p) => p.id === selectedProductId);
    if (!prod) return;

    const existingIndex = cartItems.findIndex((item) => item.productId === prod.id);
    if (existingIndex >= 0) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += prod.category === 'frozen-vegetables' ? 10 : 500;
      onUpdateCart(updated);
    } else {
      const newItem: OrderItem = {
        productId: prod.id,
        productName: prod.name[language] || prod.name.en,
        category: prod.category,
        quantity: prod.category === 'frozen-vegetables' ? 24 : 1400,
        unit: prod.category === 'frozen-vegetables' ? 'MT' : 'Cartons',
        packagingPreference: (prod.packaging[language] || prod.packaging.en)[0],
        targetPriceUsd: prod.category === 'frozen-vegetables' ? 1450 : 15,
      };
      onUpdateCart([...cartItems, newItem]);
    }
  };

  const handleRemoveItem = (index: number) => {
    const updated = cartItems.filter((_, i) => i !== index);
    onUpdateCart(updated);
  };

  const handleUpdateItemQuantity = (index: number, qty: number) => {
    const updated = [...cartItems];
    updated[index].quantity = Math.max(1, qty);
    onUpdateCart(updated);
  };

  const handleUpdateItemPackaging = (index: number, packaging: string) => {
    const updated = [...cartItems];
    updated[index].packagingPreference = packaging;
    onUpdateCart(updated);
  };

  // Calculations
  const totalTonnage = cartItems.reduce((sum, item) => {
    if (item.unit === 'MT') return sum + item.quantity;
    if (item.unit === 'Cartons') return sum + (item.quantity * 0.01);
    return sum + (item.quantity * 0.5);
  }, 0);

  const totalValueEstimate = cartItems.reduce((sum, item) => {
    const unitPrice = item.targetPriceUsd || (item.unit === 'MT' ? 1450 : 15);
    return sum + item.quantity * unitPrice;
  }, 0);

  // Submit Order
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName.trim() || !contactPerson.trim() || !email.trim() || !phone.trim()) {
      alert(language === 'ar' ? 'يرجى استيفاء كافة البيانات الأساسية للشركة ومسؤول المشتريات.' : 'Please fill all mandatory company and contact fields.');
      return;
    }

    if (cartItems.length === 0) {
      alert(language === 'ar' ? 'يرجى اختيار صنف واحد على الأقل من المنتجات لحجز الحاوية.' : 'Please select at least one product for the container.');
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrderNumber = `AGA-EXP-${new Date().getFullYear()}-${randomSuffix}`;

    const newOrder: ExportOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: newOrderNumber,
      createdAt: new Date().toISOString(),
      companyName,
      contactPerson,
      email,
      phone,
      whatsapp: whatsapp || phone,
      country,
      city,
      destinationPort,
      incoterm,
      containerType,
      containerCount,
      currency,
      status: 'new',
      items: cartItems,
      labelLanguage,
      brandPreference,
      notes,
      totalEstimatedTonnage: Math.round(totalTonnage || 24),
      totalEstimatedValueUsd: Math.round(totalValueEstimate || 35000),
      adminNotes: 'Online RFQ submitted directly from portal. Priority review.',
    };

    onSubmitOrder(newOrder);
    setSubmittedOrder(newOrder);
    onUpdateCart([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Success view
  if (submittedOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-emerald-200 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Check className="w-10 h-10 stroke-[3]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700">
              COMMERCIAL INQUIRY CONFIRMED
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900">
              {t.orderPage.successTitle}
            </h1>
            <p className="text-stone-600 text-sm max-w-xl mx-auto leading-relaxed">
              {t.orderPage.successDesc}
              <strong className="text-emerald-800 font-mono text-base block mt-1">
                {submittedOrder.orderNumber}
              </strong>
            </p>
          </div>

          <p className="text-xs text-stone-500 max-w-lg mx-auto bg-stone-50 p-4 rounded-xl border border-stone-200">
            {t.orderPage.successHint}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setShowProformaPreview(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md transition"
            >
              <Printer className="w-4 h-4" />
              <span>
                {language === 'ar' ? 'معاينة وطباعة الفاتورة المبدئية Proforma' : language === 'az' ? 'Proforma Fakturanı Çap Et' : 'View / Print Proforma Invoice'}
              </span>
            </button>

            <button
              onClick={() => {
                setSubmittedOrder(null);
                setCompanyName('');
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs sm:text-sm transition"
            >
              {t.orderPage.newOrderBtn}
            </button>
          </div>
        </div>

        {showProformaPreview && (
          <ProformaModal
            order={submittedOrder}
            language={language}
            onClose={() => setShowProformaPreview(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          International B2B Procurement Desk
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          {t.orderPage.title}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          {t.orderPage.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT 2 COLUMNS: FORM STEPS */}
          <div className="lg:col-span-2 space-y-8">
            {/* STEP 1: COMPANY DATA */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h2 className="text-lg font-bold text-stone-900">{t.orderPage.step1}</h2>
                  <p className="text-xs text-stone-500">Legal business entity and buyer credentials</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t.orderPage.companyName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Baku Grand Food LLC / Al-Bahar Co."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t.orderPage.contactPerson} *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g. Eldar Mammadov (Procurement Director)"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t.orderPage.email} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="buyer@company.com"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t.orderPage.phone} / {t.orderPage.whatsapp} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+994 50 123 45 67"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t.orderPage.country} *
                  </label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Azerbaijan, UAE, Germany..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t.orderPage.city} / {t.orderPage.destinationPort} *
                  </label>
                  <input
                    type="text"
                    required
                    value={destinationPort}
                    onChange={(e) => setDestinationPort(e.target.value)}
                    placeholder="Baku Port / Poti, Jebel Ali, Hamburg..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* STEP 2: PRODUCTS & TONNAGE */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-stone-900">{t.orderPage.step2}</h2>
                    <p className="text-xs text-stone-500">Select items, volume, and packaging configurations</p>
                  </div>
                </div>
              </div>

              {/* Quick Add Product Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {language === 'ar' ? 'اختر منتجاً لإضافته للحاوية:' : 'Select item to add:'}
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 font-medium"
                  >
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name[language] || p.name.en} ({p.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="self-end pt-1 sm:pt-0">
                  <button
                    type="button"
                    onClick={handleAddProductToCart}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{language === 'ar' ? 'إضافة للحاوية' : 'Add to Container'}</span>
                  </button>
                </div>
              </div>

              {/* Items List */}
              {cartItems.length === 0 ? (
                <div className="text-center py-8 text-stone-400 text-xs border border-dashed border-stone-200 rounded-xl">
                  {language === 'ar' ? 'لم تقم بإضافة منتجات بعد. اختر من القائمة أعلاه أو تصفح صفحة المنتجات.' : 'No items added yet. Pick from the selector above.'}
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
                    >
                      <div className="flex-1">
                        <span className="font-bold text-stone-900 text-sm block">
                          {item.productName}
                        </span>
                        <input
                          type="text"
                          value={item.packagingPreference}
                          onChange={(e) => handleUpdateItemPackaging(index, e.target.value)}
                          placeholder="Packaging spec e.g. 400g pouches"
                          className="mt-1 w-full max-w-sm bg-white border border-stone-200 rounded px-2 py-1 text-stone-700 text-xs"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <label className="text-stone-500 font-medium">Qty:</label>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleUpdateItemQuantity(index, Number(e.target.value))}
                            className="w-20 bg-white border border-stone-200 rounded px-2 py-1 text-center font-mono font-bold text-stone-900"
                          />
                          <span className="text-stone-600 font-semibold">{item.unit}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          className="p-1.5 text-stone-400 hover:text-red-600 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* STEP 3: LOGISTICS & PACKAGING SPEC */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h2 className="text-lg font-bold text-stone-900">{t.orderPage.step3}</h2>
                  <p className="text-xs text-stone-500">Shipping terms, container specs, and labeling requirements</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t.orderPage.incoterms}
                  </label>
                  <select
                    value={incoterm}
                    onChange={(e) => setIncoterm(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 font-medium"
                  >
                    <option value="CIF">CIF (Cost, Insurance & Freight to destination port)</option>
                    <option value="FOB">FOB (Alexandria / Damietta / Port Said sea ports)</option>
                    <option value="CFR">CFR (Cost & Freight)</option>
                    <option value="EXW">EXW Factory (AGA Industrial Complex, Dakahlia)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t.orderPage.containerType}
                  </label>
                  <select
                    value={containerType}
                    onChange={(e) => setContainerType(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 font-medium"
                  >
                    <option value="40' High-Cube Reefer">40' High-Cube Reefer (-18°C Controlled)</option>
                    <option value="20' Standard Dry">20' Standard Dry Container</option>
                    <option value="40' Standard Dry">40' Standard Dry Container</option>
                    <option value="Consolidated LCL">Consolidated Mixed Container (LCL)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t.orderPage.containerCount}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={containerCount}
                    onChange={(e) => setContainerCount(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t.orderPage.currency}
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 font-bold"
                  >
                    <option value="USD">USD ($ United States Dollars)</option>
                    <option value="EUR">EUR (€ Euros)</option>
                    <option value="AZN">AZN (₼ Azerbaijani Manat)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t.orderPage.labelLang}
                  </label>
                  <select
                    value={labelLanguage}
                    onChange={(e) => setLabelLanguage(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 font-medium"
                  >
                    <option value="Azərbaycan + English">Azərbaycan dili + English (AQTA Standard)</option>
                    <option value="Arabic + English">العربية + English (Gulf & Arab League)</option>
                    <option value="English Only">English Only (International Standard)</option>
                    <option value="Custom Private Label">Custom Multilingual OEM Label</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t.orderPage.brandType}
                  </label>
                  <select
                    value={brandPreference}
                    onChange={(e) => setBrandPreference(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 font-medium"
                  >
                    <option value="AGA Brand (شركة أجا)">AGA Brand (شركة النيل للتصنيع الزراعي)</option>
                    <option value="Private Label / OEM (العلامة التجارية للعميل)">Private Label / OEM (Buyer’s Own Brand)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1 text-xs">
                  {t.orderPage.notes}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Target shipping departure date, SGS pre-shipment inspection requirement, Euro palletization..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 text-xs focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: LIVE ESTIMATE & SUBMIT BUTTON */}
          <div className="space-y-6">
            <div className="sticky top-24 bg-stone-900 text-white p-6 sm:p-8 rounded-2xl border border-stone-800 shadow-xl space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-stone-800">
                <Calculator className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">
                  {t.orderPage.calculatingSummary}
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">{t.orderPage.totalTons}</span>
                  <span className="font-mono font-bold text-white text-sm">
                    ~{Math.round(totalTonnage)} {t.orderPage.metricTons}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Allocated Containers:</span>
                  <span className="font-mono font-bold text-cyan-300">
                    {containerCount}x {containerType.split(' ')[0]}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Incoterm & Port:</span>
                  <span className="font-semibold text-stone-200">
                    {incoterm} • {destinationPort || 'Baku Port'}
                  </span>
                </div>

                <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-stone-300 font-bold">{t.orderPage.estimatedValue}</span>
                  <span className="font-mono font-black text-emerald-400 text-lg">
                    {currency} ${Math.round(totalValueEstimate).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-[11px] text-stone-400 bg-stone-950 p-3 rounded-xl border border-stone-800">
                <p className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  Official Proforma Guarantee
                </p>
                <p>
                  Submission logs your order directly in the Nile Agricultural Ind. Co. (AGA) Commercial Directorate for immediate review.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-emerald-950/60 transition active:scale-95"
              >
                {t.orderPage.submitOrder}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
