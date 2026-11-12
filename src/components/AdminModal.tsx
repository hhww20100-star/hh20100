import React, { useState } from 'react';
import { ExportOrder, ContactMessage, Language, QuickMessageTemplate, OrderStatus } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { QUICK_TEMPLATES, INITIAL_ORDERS, INITIAL_MESSAGES } from '../data/initialData';
import { ProformaModal } from './ProformaModal';
import { 
  X, 
  LayoutDashboard, 
  FileSpreadsheet, 
  Mail, 
  MessageSquare, 
  Send, 
  Copy, 
  Check, 
  ExternalLink, 
  Printer, 
  Download, 
  RefreshCw, 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Ship, 
  PhoneCall, 
  Globe2,
  Building,
  User,
  AlertCircle
} from 'lucide-react';

interface AdminModalProps {
  language: Language;
  orders: ExportOrder[];
  messages: ContactMessage[];
  onUpdateOrders: (orders: ExportOrder[]) => void;
  onUpdateMessages: (messages: ContactMessage[]) => void;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  language,
  orders,
  messages,
  onUpdateOrders,
  onUpdateMessages,
  onClose,
}) => {
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'messages' | 'templates' | 'data'>('orders');

  // Filter & Search states
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [selectedOrderForInspect, setSelectedOrderForInspect] = useState<ExportOrder | null>(null);
  const [selectedOrderForProforma, setSelectedOrderForProforma] = useState<ExportOrder | null>(null);

  // Message states
  const [msgSearch, setMsgSearch] = useState('');
  const [msgFilter, setMsgFilter] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  // Template Quick Reply states
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(QUICK_TEMPLATES[0].id);
  const [templateTargetClient, setTemplateTargetClient] = useState<string>(orders[0]?.id || '');
  const [templateLanguage, setTemplateLanguage] = useState<Language>(language);
  const [customizedMessageText, setCustomizedMessageText] = useState<string>('');
  const [copiedToast, setCopiedToast] = useState(false);

  // Stats calculation
  const totalOrders = orders.length;
  const totalValue = orders.reduce((sum, o) => sum + (o.totalEstimatedValueUsd || 0), 0);
  const totalContainers = orders.reduce((sum, o) => sum + (o.containerCount || 1), 0);
  const unreadMessagesCount = messages.filter((m) => m.status === 'unread').length;

  // Handle template selection & placeholder substitution
  const handleSelectTemplate = (tplId: string, orderId: string, lang: Language) => {
    setSelectedTemplateId(tplId);
    setTemplateTargetClient(orderId);
    setTemplateLanguage(lang);

    const tpl = QUICK_TEMPLATES.find((t) => t.id === tplId) || QUICK_TEMPLATES[0];
    const order = orders.find((o) => o.id === orderId) || orders[0];

    let raw = tpl.content[lang] || tpl.content.en;
    if (order) {
      raw = raw
        .replace(/{ClientName}/g, order.contactPerson)
        .replace(/{Company}/g, order.companyName)
        .replace(/{OrderRef}/g, order.orderNumber)
        .replace(/{Port}/g, order.destinationPort)
        .replace(/{Incoterm}/g, order.incoterm)
        .replace(/{Containers}/g, `${order.containerCount}x ${order.containerType}`);
    }
    setCustomizedMessageText(raw);
  };

  // Initialize or update template text when opened
  React.useEffect(() => {
    if (orders.length > 0 && !customizedMessageText) {
      handleSelectTemplate(selectedTemplateId, orders[0].id, templateLanguage);
    }
  }, [orders]);

  const handleCopyText = () => {
    navigator.clipboard.writeText(customizedMessageText);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    const order = orders.find((o) => o.id === templateTargetClient) || orders[0];
    const phone = order?.whatsapp || order?.phone || '201004551871';
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customizedMessageText)}`;
    window.open(url, '_blank');
  };

  const handleOpenEmail = () => {
    const order = orders.find((o) => o.id === templateTargetClient) || orders[0];
    const email = order?.email || 'buyer@example.com';
    const subject = encodeURIComponent(`AGA Egypt Export: PI-${order?.orderNumber || 'QUOTATION'}`);
    const body = encodeURIComponent(customizedMessageText);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  // Status updates
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    onUpdateOrders(updated);
  };

  const handleUpdateMessageStatus = (msgId: string, newStatus: 'unread' | 'read' | 'replied' | 'archived') => {
    const updated = messages.map((m) => (m.id === msgId ? { ...m, status: newStatus } : m));
    onUpdateMessages(updated);
  };

  const handleDeleteMessage = (msgId: string) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذه الرسالة؟' : 'Are you sure you want to delete this message?')) {
      const updated = messages.filter((m) => m.id !== msgId);
      onUpdateMessages(updated);
      if (selectedMessage?.id === msgId) {
        setSelectedMessage(null);
      }
    }
  };

  // Export CSV
  const handleExportOrdersCsv = () => {
    const headers = ['Order Number', 'Date', 'Company', 'Contact', 'Email', 'Phone', 'Country', 'Port', 'Incoterm', 'Containers', 'Gross Tons', 'Total USD', 'Status'];
    const rows = orders.map((o) => [
      o.orderNumber,
      new Date(o.createdAt).toLocaleDateString(),
      `"${o.companyName}"`,
      `"${o.contactPerson}"`,
      o.email,
      `"${o.phone}"`,
      `"${o.country}"`,
      `"${o.destinationPort}"`,
      o.incoterm,
      o.containerCount,
      o.totalEstimatedTonnage,
      o.totalEstimatedValueUsd,
      o.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AGA_Export_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetDemoData = () => {
    if (confirm(language === 'ar' ? 'هل تريد استعادة البيانات التجريبية الافتراضية؟' : 'Reset to verified default B2B records?')) {
      onUpdateOrders(INITIAL_ORDERS);
      onUpdateMessages(INITIAL_MESSAGES);
    }
  };

  // Filtered lists
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.companyName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.country.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.contactPerson.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      m.fullName.toLowerCase().includes(msgSearch.toLowerCase()) ||
      m.companyName.toLowerCase().includes(msgSearch.toLowerCase()) ||
      m.subject.toLowerCase().includes(msgSearch.toLowerCase()) ||
      m.message.toLowerCase().includes(msgSearch.toLowerCase());
    const matchesStatus = msgFilter === 'all' || m.status === msgFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6">
      <div className="relative w-full max-w-7xl bg-stone-900 text-stone-100 rounded-2xl shadow-2xl border border-stone-800 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-950 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-black">
              AGA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  {t.admin.title}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-900 text-emerald-300 border border-emerald-700">
                  {language === 'ar' ? 'نظام حي متصل' : 'Live System'}
                </span>
              </div>
              <p className="text-xs text-stone-400">
                {t.admin.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition"
              title={t.admin.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 bg-stone-950/70 border-b border-stone-800 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-amber-400 text-amber-300 font-bold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{t.admin.tabOverview}</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition whitespace-nowrap relative ${
              activeTab === 'orders'
                ? 'border-amber-400 text-amber-300 font-bold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>{t.admin.tabOrders}</span>
            <span className="ml-1 px-1.5 py-0.2 bg-stone-800 text-amber-400 rounded-full text-[10px]">
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition whitespace-nowrap relative ${
              activeTab === 'messages'
                ? 'border-amber-400 text-amber-300 font-bold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>{t.admin.tabMessages}</span>
            {unreadMessagesCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-red-600 text-white rounded-full text-[10px] font-bold">
                {unreadMessagesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition whitespace-nowrap ${
              activeTab === 'templates'
                ? 'border-amber-400 text-amber-300 font-bold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t.admin.tabTemplates}</span>
            <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-800">
              WhatsApp & Email
            </span>
          </button>

          <button
            onClick={() => setActiveTab('data')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition whitespace-nowrap ${
              activeTab === 'data'
                ? 'border-amber-400 text-amber-300 font-bold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>{t.admin.tabData}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-stone-900/90">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl bg-stone-800/80 border border-stone-700/60">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400 font-medium">{t.admin.totalOrders}</span>
                    <FileSpreadsheet className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-white mt-2">{totalOrders}</div>
                  <p className="text-[11px] text-stone-400 mt-1">
                    {language === 'ar' ? 'طلبات تجارية معتمدة' : 'Active Commercial RFQs'}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-stone-800/80 border border-stone-700/60">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400 font-medium">{t.admin.totalValue}</span>
                    <Ship className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-emerald-400 mt-2 font-mono">
                    ${totalValue.toLocaleString()}
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1">
                    {language === 'ar' ? 'إجمالي قيمة الحاويات المطلوبة' : 'Gross Value Under Negotiation'}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-stone-800/80 border border-stone-700/60">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400 font-medium">{t.admin.containersInPipeline}</span>
                    <Ship className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-black text-white mt-2">
                    {totalContainers} {language === 'ar' ? 'حاوية' : 'Containers'}
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1">
                    40' Reefer & 20' Dry FCL
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-stone-800/80 border border-stone-700/60">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400 font-medium">{t.admin.totalMessages}</span>
                    <Mail className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="text-2xl font-black text-white mt-2">{messages.length}</div>
                  <p className="text-[11px] text-red-400 mt-1 font-semibold">
                    {unreadMessagesCount} {language === 'ar' ? 'رسائل جديدة غير مقروءة' : 'Unread Inquiries'}
                  </p>
                </div>
              </div>

              {/* Destination Highlights & Azerbaijan Corridor Status */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-stone-800/60 border border-stone-700/60 space-y-3">
                  <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                    <Globe2 className="w-4 h-4" />
                    <span>
                      {language === 'ar' ? 'أبرز وجهات التصدير والحاويات المتعاقد عليها' : 'Top Export Destination Ports'}
                    </span>
                  </h3>
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-900/80">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🇦🇿</span>
                        <span className="font-bold text-white">Baku Port / Poti Corridor (Azerbaijan)</span>
                      </div>
                      <span className="text-emerald-400 font-mono font-bold">3 Containers • $97,300</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-900/80">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🇦🇪</span>
                        <span className="font-bold text-white">Jebel Ali Port (United Arab Emirates)</span>
                      </div>
                      <span className="text-emerald-400 font-mono font-bold">1 Container • $39,500</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-900/80">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🇩🇪</span>
                        <span className="font-bold text-white">Hamburg / Rotterdam (European Union)</span>
                      </div>
                      <span className="text-stone-400 font-mono">Sample stage • RFQ pending</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-950/60 to-stone-900 border border-emerald-800/40 space-y-3">
                  <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {language === 'ar' ? 'جاهزية خطوط الإنتاج والشهادات المعتمدة' : 'Production Lines & Quality Assurance'}
                    </span>
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {language === 'ar'
                      ? 'مجمع مصانع أجا بالدقهلية يعمل بكامل طاقته التشغيلية. تم فحص وتجديد شهادات الحلال والآيزو 22000 وتجهيز أنفاق التجميد السريع IQF للموسم التصديري الجديد بملصقات مخصصة باللغة الأذربيجانية والعربية والإنجليزية.'
                      : 'AGA Industrial Complex in Dakahlia is operating at full export capacity. ISO 22000 & Halal audits verified. IQF blast freezing tunnels fully calibrated with custom multilingual packaging lines.'}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2.5 py-1 rounded-md bg-stone-800 text-stone-300">
                      ✓ IQF Fluidized Tunnel (-40°C)
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-stone-800 text-stone-300">
                      ✓ Aseptic Bottling & Canning (330ml)
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-stone-800 text-stone-300">
                      ✓ Glass & Portion Cups (30g)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS LIST & MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute inset-y-0 rtl:right-3 ltr:left-3 my-auto w-4 h-4 text-stone-500" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder={language === 'ar' ? 'بحث باسم الشركة، الميناء، رقم الطلب...' : 'Search company, port, ref #...'}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg rtl:pr-9 rtl:pl-3 ltr:pl-9 ltr:pr-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-stone-400" />
                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
                  >
                    <option value="all">{language === 'ar' ? 'كل الحالات' : 'All Statuses'}</option>
                    <option value="new">New (جديد)</option>
                    <option value="reviewing">Reviewing (قيد المراجعة)</option>
                    <option value="quoted">Quoted (تم إرسال العرض)</option>
                    <option value="confirmed">Confirmed (معتمد ومؤكد)</option>
                    <option value="shipped">Shipped (تم الشحن)</option>
                  </select>

                  <button
                    onClick={handleExportOrdersCsv}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold"
                    title={t.admin.exportCsv}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Excel / CSV</span>
                  </button>
                </div>
              </div>

              {/* Table of Orders */}
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12 text-stone-500 text-xs">
                  {t.admin.noOrders}
                </div>
              ) : (
                <div className="overflow-x-auto border border-stone-800 rounded-xl">
                  <table className="w-full text-start text-xs border-collapse">
                    <thead>
                      <tr className="bg-stone-950 text-stone-400 text-start border-b border-stone-800">
                        <th className="p-3 text-start">{t.admin.orderNumber}</th>
                        <th className="p-3 text-start">{t.admin.importer}</th>
                        <th className="p-3 text-start">{t.admin.destination}</th>
                        <th className="p-3 text-start">{t.admin.containers}</th>
                        <th className="p-3 text-end">{language === 'ar' ? 'القيمة التقديرية' : 'Est. Value'}</th>
                        <th className="p-3 text-center">{t.admin.status}</th>
                        <th className="p-3 text-center">{t.admin.actions}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800/60 bg-stone-900/60">
                      {filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-stone-800/40 transition">
                          <td className="p-3 font-mono font-bold text-amber-400">
                            {ord.orderNumber}
                            <div className="text-[10px] text-stone-500 font-sans">
                              {new Date(ord.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-white">{ord.companyName}</div>
                            <div className="text-[11px] text-stone-400 flex items-center gap-1.5 mt-0.5">
                              <User className="w-3 h-3 text-stone-500" />
                              <span>{ord.contactPerson}</span>
                              <span className="text-stone-600">({ord.phone})</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="text-stone-200 font-medium">{ord.destinationPort}</div>
                            <div className="text-[11px] text-stone-400">{ord.country} • {ord.incoterm}</div>
                          </td>
                          <td className="p-3">
                            <span className="font-bold text-cyan-300">
                              {ord.containerCount}x
                            </span>{' '}
                            <span className="text-stone-400">{ord.containerType}</span>
                            <div className="text-[10px] text-stone-500">
                              ~{ord.totalEstimatedTonnage} MT
                            </div>
                          </td>
                          <td className="p-3 text-end font-mono font-bold text-emerald-400">
                            ${ord.totalEstimatedValueUsd.toLocaleString()}
                          </td>
                          <td className="p-3 text-center">
                            <select
                              value={ord.status}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as OrderStatus)}
                              className={`text-[11px] font-bold px-2 py-1 rounded-md border focus:outline-none cursor-pointer ${
                                ord.status === 'new'
                                  ? 'bg-blue-950/80 text-blue-300 border-blue-700'
                                  : ord.status === 'reviewing'
                                  ? 'bg-amber-950/80 text-amber-300 border-amber-700'
                                  : ord.status === 'quoted'
                                  ? 'bg-purple-950/80 text-purple-300 border-purple-700'
                                  : ord.status === 'confirmed'
                                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                                  : ord.status === 'shipped'
                                  ? 'bg-teal-950/80 text-teal-300 border-teal-700'
                                  : 'bg-stone-800 text-stone-400 border-stone-700'
                              }`}
                            >
                              <option value="new">New</option>
                              <option value="reviewing">Reviewing</option>
                              <option value="quoted">Quoted</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="shipped">Shipped</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              {/* Inspect details */}
                              <button
                                onClick={() => setSelectedOrderForInspect(ord)}
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white"
                                title={t.admin.viewDetails}
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              {/* Print Proforma */}
                              <button
                                onClick={() => setSelectedOrderForProforma(ord)}
                                className="p-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800"
                                title={t.admin.printProforma}
                              >
                                <Printer className="w-3.5 h-3.5" />
                              </button>

                              {/* Quick Reply Jump */}
                              <button
                                onClick={() => {
                                  setActiveTab('templates');
                                  handleSelectTemplate(selectedTemplateId, ord.id, templateLanguage);
                                }}
                                className="p-1.5 rounded-lg bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-800"
                                title={t.admin.sendQuickReply}
                              >
                                <Send className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CONTACT INQUIRIES LOG */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute inset-y-0 rtl:right-3 ltr:left-3 my-auto w-4 h-4 text-stone-500" />
                  <input
                    type="text"
                    value={msgSearch}
                    onChange={(e) => setMsgSearch(e.target.value)}
                    placeholder={language === 'ar' ? 'بحث في الرسائل الواردة...' : 'Search incoming messages...'}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg rtl:pr-9 rtl:pl-3 ltr:pl-9 ltr:pr-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={msgFilter}
                    onChange={(e) => setMsgFilter(e.target.value)}
                    className="bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-200"
                  >
                    <option value="all">{language === 'ar' ? 'كل الرسائل' : 'All Messages'}</option>
                    <option value="unread">{language === 'ar' ? 'غير مقروءة' : 'Unread'}</option>
                    <option value="read">{language === 'ar' ? 'تمت القراءة' : 'Read'}</option>
                    <option value="replied">{language === 'ar' ? 'تم الرد' : 'Replied'}</option>
                  </select>
                </div>
              </div>

              {filteredMessages.length === 0 ? (
                <div className="text-center py-12 text-stone-500 text-xs">
                  {t.admin.noMessages}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-xl border transition flex flex-col justify-between ${
                        msg.status === 'unread'
                          ? 'bg-stone-800/90 border-amber-500/60 shadow-md ring-1 ring-amber-500/30'
                          : 'bg-stone-900/60 border-stone-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-bold text-white text-sm">{msg.fullName}</span>
                            <div className="text-xs text-amber-400 font-medium">{msg.companyName} ({msg.country})</div>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              msg.status === 'unread'
                                ? 'bg-red-950 text-red-300 border border-red-700'
                                : msg.status === 'replied'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                                : 'bg-stone-800 text-stone-400'
                            }`}
                          >
                            {msg.status}
                          </span>
                        </div>

                        <div className="text-xs font-semibold text-stone-300 mt-2">
                          {msg.subject}
                        </div>
                        <p className="text-xs text-stone-400 mt-1 line-clamp-3 leading-relaxed">
                          {msg.message}
                        </p>

                        <div className="mt-3 text-[11px] text-stone-500 flex flex-wrap gap-x-4 gap-y-1">
                          <span>📧 {msg.email}</span>
                          <span>📞 {msg.phone}</span>
                          <span>🕒 {new Date(msg.createdAt).toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="pt-4 mt-3 border-t border-stone-800/80 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          {msg.status === 'unread' && (
                            <button
                              onClick={() => handleUpdateMessageStatus(msg.id, 'read')}
                              className="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-[11px] text-stone-300"
                            >
                              {language === 'ar' ? 'تحديد كمقروء' : 'Mark Read'}
                            </button>
                          )}
                          <button
                            onClick={() => {
                              // Jump to Quick Reply
                              setActiveTab('templates');
                              setCustomizedMessageText(
                                `السيد/ة المحترم/ة: ${msg.fullName}\nشركة: ${msg.companyName}\nتحية طيبة وبعد،،\nرداً على استفساركم بخصوص: "${msg.subject}"...\n\nمع تحيات إدارة التصدير - شركة أجا (AGA)`
                              );
                            }}
                            className="px-2.5 py-1 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 text-[11px] font-semibold flex items-center gap-1"
                          >
                            <Send className="w-3 h-3" />
                            <span>{language === 'ar' ? 'رد سريع' : 'Reply'}</span>
                          </button>
                        </div>

                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-1 text-stone-500 hover:text-red-400"
                          title="Delete message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: QUICK REPLY TEMPLATES GENERATOR */}
          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200">
                <p className="font-bold flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <span>
                    {language === 'ar'
                      ? 'مُوَلِّد الرسائل الرسمية الجاهزة للإرسال عبر واتساب والإيميل'
                      : 'Commercial Quick Reply & Communication Generator'}
                  </span>
                </p>
                <p className="text-stone-300 mt-1">
                  {language === 'ar'
                    ? 'اختر القالب التصديري المناسب، وحدد العميل لدمج بيانات الحاوية والميناء تلقائياً، ثم انسخ الرسالة أو أرسلها بضغطة زر واحدة إلى الواتساب أو الإيميل.'
                    : 'Select a template and choose an active buyer to auto-populate port, incoterm, and container parameters, ready for one-click WhatsApp dispatch or email.'}
                </p>
              </div>

              {/* Controls Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. Template picker */}
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    {language === 'ar' ? '1. اختر القالب التصديري:' : '1. Select Template:'}
                  </label>
                  <select
                    value={selectedTemplateId}
                    onChange={(e) => handleSelectTemplate(e.target.value, templateTargetClient, templateLanguage)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-xs text-stone-200 focus:border-amber-400"
                  >
                    {QUICK_TEMPLATES.map((tpl) => (
                      <option key={tpl.id} value={tpl.id}>
                        {tpl.title[language] || tpl.title.en}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Target client picker */}
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    {language === 'ar' ? '2. تحديد بيانات العميل المستورد:' : '2. Target Buyer Order:'}
                  </label>
                  <select
                    value={templateTargetClient}
                    onChange={(e) => handleSelectTemplate(selectedTemplateId, e.target.value, templateLanguage)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-xs text-stone-200 focus:border-amber-400"
                  >
                    {orders.map((ord) => (
                      <option key={ord.id} value={ord.id}>
                        {ord.companyName} ({ord.country} - {ord.orderNumber})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Output Language */}
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    {language === 'ar' ? '3. لغة الرسالة:' : '3. Message Language:'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['ar', 'en', 'az'] as Language[]).map((l) => (
                      <button
                        key={l}
                        onClick={() => handleSelectTemplate(selectedTemplateId, templateTargetClient, l)}
                        className={`py-2 px-2 rounded-lg text-xs font-bold transition border ${
                          templateLanguage === l
                            ? 'bg-amber-500 text-stone-950 border-amber-400'
                            : 'bg-stone-950 text-stone-300 border-stone-700 hover:bg-stone-800'
                        }`}
                      >
                        {l === 'ar' ? '🇪🇬 العربية' : l === 'az' ? '🇦🇿 Azərbaycanca' : '🇬🇧 English'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Message Editor Box */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-stone-300">
                    {language === 'ar' ? 'نص الرسالة النهائي (قابل للتعديل المباشر قبل الإرسال):' : 'Final Message Content (Fully Editable):'}
                  </label>
                  {copiedToast && (
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 animate-pulse">
                      <Check className="w-3.5 h-3.5" />
                      {t.admin.copiedToClipboard}
                    </span>
                  )}
                </div>

                <textarea
                  rows={12}
                  value={customizedMessageText}
                  onChange={(e) => setCustomizedMessageText(e.target.value)}
                  dir={templateLanguage === 'ar' ? 'rtl' : 'ltr'}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl p-4 text-xs font-mono text-stone-200 focus:outline-none focus:border-amber-400 leading-relaxed"
                />
              </div>

              {/* Action dispatch buttons */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <button
                  onClick={handleCopyText}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition"
                >
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span>{language === 'ar' ? 'نسخ النص للحافظة' : 'Copy Text'}</span>
                </button>

                <button
                  onClick={handleOpenWhatsApp}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/40 transition active:scale-95"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{language === 'ar' ? 'فتح وإرسال عبر WhatsApp' : 'Dispatch via WhatsApp'}</span>
                </button>

                <button
                  onClick={handleOpenEmail}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-950/40 transition active:scale-95"
                >
                  <Mail className="w-4 h-4" />
                  <span>{language === 'ar' ? 'إرسال بريد رسمي Mailto' : 'Open in Email Client'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: DATA MANAGEMENT & BACKUP */}
          {activeTab === 'data' && (
            <div className="space-y-6 max-w-2xl">
              <div className="p-5 rounded-xl bg-stone-800/80 border border-stone-700 space-y-4">
                <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>{t.admin.exportCsv}</span>
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {language === 'ar'
                    ? 'يمكنك تصدير كافة طلبات التصدير المسجلة وسجل الرسائل كملف Excel / CSV لمشاركتها مع فريق المبيعات والجمارك أو فتحها في برامج جداول البيانات.'
                    : 'Download complete export orders log and contact inquiries in CSV format for offline reporting, customs documentation, and commercial CRM integration.'}
                </p>
                <button
                  onClick={handleExportOrdersCsv}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition"
                >
                  <Download className="w-4 h-4" />
                  <span>{language === 'ar' ? 'تحميل سجل الطلبات (Orders.csv)' : 'Export Orders to CSV'}</span>
                </button>
              </div>

              <div className="p-5 rounded-xl bg-stone-800/80 border border-stone-700 space-y-4">
                <h3 className="text-sm font-bold text-stone-300 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-stone-400" />
                  <span>{t.admin.seedDemoData}</span>
                </h3>
                <p className="text-xs text-stone-400">
                  {language === 'ar'
                    ? 'إذا رغبت في إعادة تعيين البيانات التجريبية وعروض التصدير إلى حالتها الأولية (شحنات أذربيجان والإمارات والمشترين الدوليين).'
                    : 'Reset the orders and messages store to default verified records from Azerbaijan, UAE, and international buyers.'}
                </p>
                <button
                  onClick={handleResetDemoData}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-700 hover:bg-stone-600 text-stone-200 text-xs font-semibold"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t.admin.seedDemoData}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Inspect Single Order Modal */}
      {selectedOrderForInspect && (
        <div className="fixed inset-0 z-60 overflow-y-auto bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-stone-900 border border-stone-700 rounded-2xl p-6 text-stone-100 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <h3 className="font-bold text-amber-400 text-base">{selectedOrderForInspect.orderNumber}</h3>
                <p className="text-xs text-stone-400">{selectedOrderForInspect.companyName}</p>
              </div>
              <button
                onClick={() => setSelectedOrderForInspect(null)}
                className="p-1 rounded bg-stone-800 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-stone-950 p-4 rounded-xl border border-stone-800">
              <div>
                <span className="text-stone-500 block">Contact Person:</span>
                <span className="font-bold text-white">{selectedOrderForInspect.contactPerson}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Phone / WhatsApp:</span>
                <span className="font-mono text-emerald-400">{selectedOrderForInspect.phone}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Destination Port:</span>
                <span className="text-white">{selectedOrderForInspect.destinationPort} ({selectedOrderForInspect.country})</span>
              </div>
              <div>
                <span className="text-stone-500 block">Incoterm & Containers:</span>
                <span className="font-bold text-cyan-300">
                  {selectedOrderForInspect.incoterm} • {selectedOrderForInspect.containerCount}x {selectedOrderForInspect.containerType}
                </span>
              </div>
              <div>
                <span className="text-stone-500 block">Packaging Label:</span>
                <span className="text-stone-300">{selectedOrderForInspect.labelLanguage}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Brand:</span>
                <span className="text-stone-300">{selectedOrderForInspect.brandPreference}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-stone-300 mb-2">Requested Products:</h4>
              <div className="border border-stone-800 rounded-xl overflow-hidden text-xs">
                {selectedOrderForInspect.items.map((item, i) => (
                  <div key={i} className="p-3 bg-stone-950/60 border-b border-stone-800 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">{item.productName}</p>
                      <p className="text-[11px] text-stone-400">{item.packagingPreference}</p>
                    </div>
                    <span className="font-mono font-bold text-amber-400">
                      {item.quantity} {item.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {selectedOrderForInspect.notes && (
              <div className="p-3 rounded-lg bg-stone-950 text-xs border border-stone-800">
                <span className="font-bold text-amber-400 block mb-1">Buyer Notes:</span>
                <p className="text-stone-300">{selectedOrderForInspect.notes}</p>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
              <button
                onClick={() => {
                  setSelectedOrderForProforma(selectedOrderForInspect);
                  setSelectedOrderForInspect(null);
                }}
                className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{t.admin.printProforma}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Proforma Modal Trigger */}
      {selectedOrderForProforma && (
        <ProformaModal
          order={selectedOrderForProforma}
          language={language}
          onClose={() => setSelectedOrderForProforma(null)}
        />
      )}
    </div>
  );
};
