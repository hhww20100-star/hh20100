import React, { useState } from 'react';
import { Language, Product, ProductCategory } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PRODUCTS } from '../data/products';
import { 
  Search, 
  Filter, 
  FileText, 
  Check, 
  Info, 
  Snowflake, 
  CupSoda, 
  Package, 
  Sparkles, 
  X, 
  ShieldCheck, 
  Thermometer, 
  Clock, 
  Layers, 
  Truck
} from 'lucide-react';

interface ProductsPageProps {
  language: Language;
  onNavigate: (page: string) => void;
  onAddToCart: (product: Product) => void;
  selectedCategoryFromHome?: string;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  language,
  onNavigate,
  onAddToCart,
  selectedCategoryFromHome,
}) => {
  const t = TRANSLATIONS[language];
  const [selectedCategory, setSelectedCategory] = useState<string>(selectedCategoryFromHome || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPackaging, setSelectedPackaging] = useState<string>('all');
  const [activeSpecProduct, setActiveSpecProduct] = useState<Product | null>(null);
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const categories: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: t.productsPage.all, icon: <Sparkles className="w-4 h-4" /> },
    { id: 'frozen-vegetables', label: t.categories.frozenVeg, icon: <Snowflake className="w-4 h-4" /> },
    { id: 'juices', label: t.categories.juices, icon: <CupSoda className="w-4 h-4" /> },
    { id: 'jams', label: t.categories.jams, icon: <Package className="w-4 h-4" /> },
    { id: 'pickles', label: t.categories.pickles, icon: <Layers className="w-4 h-4" /> },
  ];

  const filteredProducts = PRODUCTS.filter((prod) => {
    const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;
    const nameMatch =
      prod.name[language]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.subtitle[language]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesPackaging =
      selectedPackaging === 'all' ||
      prod.packaging[language]?.some((p) => p.toLowerCase().includes(selectedPackaging.toLowerCase()));

    return matchesCategory && nameMatch && matchesPackaging;
  });

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          {language === 'ar' ? 'الكتالوج التجاري الدولي' : language === 'az' ? 'Rəsmi Beynəlxalq Kataloq' : 'Official Export Catalog'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          {t.productsPage.title}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          {t.productsPage.subtitle}
        </p>
      </div>

      {/* Filters and Search Bar */}
      <div className="space-y-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-800 text-white shadow-md shadow-emerald-950/20'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Search & Packaging Dropdown */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-stone-100">
          <div className="relative flex-1">
            <Search className="absolute inset-y-0 rtl:right-3 ltr:left-3 my-auto w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.productsPage.searchPlaceholder}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl rtl:pr-9 rtl:pl-4 ltr:pl-9 ltr:pr-4 py-2.5 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Filter className="w-4 h-4 text-stone-500" />
            <select
              value={selectedPackaging}
              onChange={(e) => setSelectedPackaging(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-stone-700 focus:outline-none focus:border-emerald-600 focus:bg-white"
            >
              <option value="all">{t.productsPage.allPackaging}</option>
              <option value="كانز">كانز ألومنيوم 330 مل (Cans 330ml)</option>
              <option value="زجاج">عبوات زجاجية (Glass Jars & Bottles)</option>
              <option value="ديوباك">أكياس ديوباك 200 مل (Doypack 200ml)</option>
              <option value="أكياس">أكياس التجزئة 400 جم (Retail Pouches)</option>
              <option value="بورشن">بورشن 30 جم للفنادق (Portions 30g)</option>
              <option value="صناعية">عبوات كبرى للمطاعم والمصانع (Bulk/Catering)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 space-y-2">
          <Info className="w-8 h-8 text-stone-400 mx-auto" />
          <p className="text-stone-600 font-bold text-sm">
            {language === 'ar' ? 'لم يتم العثور على منتجات مطابقة للبحث' : 'No products matched your search filter'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setSelectedPackaging('all');
            }}
            className="text-xs text-emerald-700 underline font-semibold"
          >
            {language === 'ar' ? 'إعادة ضبط كافة المرشحات' : 'Reset all filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Product Image */}
                <div className="relative h-60 bg-stone-100 overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.name[language] || prod.name.en}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 rtl:left-3 ltr:right-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-stone-900/80 text-amber-300 backdrop-blur-md">
                      {prod.category === 'frozen-vegetables'
                        ? 'IQF FROZEN'
                        : prod.category === 'juices'
                        ? 'ASEPTIC JUICE'
                        : prod.category === 'jams'
                        ? 'EXTRA FRUIT'
                        : 'MEDITERRANEAN'}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {prod.tags.map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 leading-snug group-hover:text-emerald-800 transition">
                    {prod.name[language] || prod.name.en}
                  </h3>

                  <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
                    {prod.subtitle[language] || prod.subtitle.en}
                  </p>

                  {/* Packaging List preview */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-100">
                    <span className="text-[11px] font-bold text-stone-700 block">
                      {language === 'ar' ? 'العبوات المتاحة:' : language === 'az' ? 'Qablaşdırma çeşidləri:' : 'Available Formats:'}
                    </span>
                    <ul className="text-[11px] text-stone-600 space-y-1">
                      {(prod.packaging[language] || prod.packaging.en).slice(0, 2).map((pack, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                          <span className="line-clamp-1">{pack}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quick specs pills */}
                  <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                    <div>
                      <span className="text-stone-400 block">{t.productsPage.shelfLife}:</span>
                      <span className="font-bold text-stone-800">{prod.shelfLife}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block">{t.productsPage.storage}:</span>
                      <span className="font-bold text-stone-800">{prod.storageTemp}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Buttons */}
              <div className="p-6 pt-0 space-y-2">
                <button
                  onClick={() => handleAdd(prod)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95 ${
                    addedIds[prod.id]
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-sm'
                  }`}
                >
                  {addedIds[prod.id] ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{t.productsPage.addedToRfq}</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 text-emerald-200" />
                      <span>{t.productsPage.addToRfq}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setActiveSpecProduct(prod)}
                  className="w-full py-2 rounded-xl text-stone-700 hover:text-stone-900 hover:bg-stone-100 font-semibold text-xs transition flex items-center justify-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5 text-stone-500" />
                  <span>{t.productsPage.specsBtn}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Technical Spec Modal */}
      {activeSpecProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 space-y-6 p-6 sm:p-8 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Technical Specification Datasheet
                </span>
                <h3 className="text-xl font-black text-stone-900 mt-1">
                  {activeSpecProduct.name[language] || activeSpecProduct.name.en}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Nile Agricultural Ind. Co. (AGA) Quality Directorate
                </p>
              </div>
              <button
                onClick={() => setActiveSpecProduct(null)}
                className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-stone-700">
              <p className="text-sm leading-relaxed text-stone-800">
                {activeSpecProduct.description[language] || activeSpecProduct.description.en}
              </p>

              {/* Specs Table */}
              <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-2">
                <h4 className="font-bold text-stone-900 uppercase text-emerald-800">
                  Chemical & Technical Parameters:
                </h4>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-stone-500 block">Preservatives & Additives:</span>
                    <span className="font-bold text-stone-900">{activeSpecProduct.specs.preservatives}</span>
                  </div>
                  {activeSpecProduct.specs.brix && (
                    <div>
                      <span className="text-stone-500 block">Brix Degree / Sugar:</span>
                      <span className="font-bold text-stone-900">{activeSpecProduct.specs.brix}</span>
                    </div>
                  )}
                  {activeSpecProduct.specs.ph && (
                    <div>
                      <span className="text-stone-500 block">pH Level:</span>
                      <span className="font-bold text-stone-900">{activeSpecProduct.specs.ph}</span>
                    </div>
                  )}
                  {activeSpecProduct.specs.freezingMethod && (
                    <div>
                      <span className="text-stone-500 block">Freezing Technology:</span>
                      <span className="font-bold text-stone-900">{activeSpecProduct.specs.freezingMethod}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-stone-500 block">Shelf Life:</span>
                    <span className="font-bold text-stone-900">{activeSpecProduct.shelfLife}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Storage Environment:</span>
                    <span className="font-bold text-stone-900">{activeSpecProduct.storageTemp}</span>
                  </div>
                </div>
              </div>

              {/* Packaging Variations */}
              <div>
                <h4 className="font-bold text-stone-900 uppercase text-emerald-800 mb-2">
                  Standard Commercial Packaging Formats:
                </h4>
                <ul className="space-y-1.5 bg-stone-50 p-4 rounded-xl border border-stone-200">
                  {(activeSpecProduct.packaging[language] || activeSpecProduct.packaging.en).map((pkg, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{pkg}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Logistics & Container loadability */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950">
                <span className="font-bold block mb-1">Container Loadability:</span>
                <p>{activeSpecProduct.containerCapacity}</p>
                <p className="mt-1 font-mono text-[11px] font-bold">MOQ: {activeSpecProduct.moq}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
              <button
                onClick={() => {
                  handleAdd(activeSpecProduct);
                  setActiveSpecProduct(null);
                  onNavigate('order');
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition shadow-md"
              >
                {t.productsPage.addToRfq}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
