import React from 'react';
import { ExportOrder, Language } from '../types';
import { Printer, X, Download, ShieldCheck, CheckCircle } from 'lucide-react';

interface ProformaModalProps {
  order: ExportOrder;
  language: Language;
  onClose: () => void;
}

export const ProformaModal: React.FC<ProformaModalProps> = ({
  order,
  language,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-xs flex items-center justify-center p-4 print:p-0 print:bg-white">
      <div className="relative w-full max-w-4xl bg-white text-stone-900 rounded-2xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none">
        {/* Action bar (hidden in print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-100 border-b border-stone-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-800 text-sm">
              {language === 'ar' ? 'معاينة الفاتورة المبدئية الرسمية' : language === 'az' ? 'Rəsmi Proforma Faktura' : 'Official Proforma Invoice Preview'}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
              {order.orderNumber}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition"
            >
              <Printer className="w-4 h-4" />
              <span>{language === 'ar' ? 'طباعة / حفظ PDF' : language === 'az' ? 'Çap Et / PDF Yadda Saxla' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Proforma Invoice Body */}
        <div className="p-8 sm:p-12 space-y-8 bg-white print:p-6" id="printable-proforma">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6 pb-6 border-b-2 border-stone-800">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-amber-700 flex items-center justify-center text-white font-black text-lg">
                  AGA
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-stone-950 uppercase tracking-tight">
                    Nile Agricultural Ind. Co. (AGA) S.A.E
                  </h1>
                  <p className="text-xs text-stone-600 font-semibold">
                    شركة النيل للتصنيع الزراعي (أجا) - شركة مساهمة مصرية
                  </p>
                </div>
              </div>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                Head Office: 35 Ramses St., Nile Bank Building, 10th Floor, Cairo, Egypt<br />
                Factory Complex: AGA City, Dakahlia Governorate | Tel: +20 2 5773398 / +20 50 6455552<br />
                Commercial Reg: 104822 | Tax ID: 200-145-981 | Web: www.aga.com.eg
              </p>
            </div>

            <div className="text-start sm:text-end shrink-0">
              <div className="inline-block bg-emerald-800 text-white text-sm font-black px-4 py-1.5 rounded uppercase tracking-wider mb-2">
                PROFORMA INVOICE
              </div>
              <p className="text-xs font-mono text-stone-700">
                <strong>PI No:</strong> PI-{order.orderNumber}
              </p>
              <p className="text-xs font-mono text-stone-700">
                <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-xs font-mono text-stone-700">
                <strong>Incoterm:</strong> {order.incoterm} {order.destinationPort}
              </p>
            </div>
          </div>

          {/* Parties Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs">
            <div>
              <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wide text-emerald-800 mb-2">
                Buyer / Consignee:
              </h3>
              <p className="font-bold text-stone-900 text-sm">{order.companyName}</p>
              <p className="text-stone-600">Attn: {order.contactPerson}</p>
              <p className="text-stone-600">City / Country: {order.city}, {order.country}</p>
              <p className="text-stone-600">Port of Discharge: {order.destinationPort}</p>
              <p className="text-stone-600">Email: {order.email}</p>
              <p className="text-stone-600">WhatsApp / Phone: {order.phone}</p>
            </div>

            <div>
              <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wide text-emerald-800 mb-2">
                Logistics & Shipment Terms:
              </h3>
              <p className="text-stone-700"><strong>Port of Loading:</strong> Alexandria / Damietta Sea Port, Egypt</p>
              <p className="text-stone-700"><strong>Container Spec:</strong> {order.containerCount}x {order.containerType}</p>
              <p className="text-stone-700"><strong>Cold-Chain Temp:</strong> -18°C Controlled Reefer</p>
              <p className="text-stone-700"><strong>Branding & Label:</strong> {order.brandPreference} ({order.labelLanguage})</p>
              <p className="text-stone-700"><strong>Certifications:</strong> Halal, ISO 22000, Phytosanitary, Health</p>
            </div>
          </div>

          {/* Table of items */}
          <div className="border border-stone-300 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="bg-stone-900 text-white text-start">
                  <th className="p-3 text-start">#</th>
                  <th className="p-3 text-start">Product Description & Specification</th>
                  <th className="p-3 text-start">Packaging Format</th>
                  <th className="p-3 text-end">Quantity</th>
                  <th className="p-3 text-end">Unit</th>
                  <th className="p-3 text-end">Est. Unit Price ({order.currency})</th>
                  <th className="p-3 text-end">Subtotal ({order.currency})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {order.items.map((item, idx) => {
                  const estPrice = item.targetPriceUsd || (item.unit === 'MT' ? 1450 : 15);
                  const subtotal = estPrice * item.quantity;
                  return (
                    <tr key={idx} className="hover:bg-stone-50">
                      <td className="p-3 font-mono text-stone-500">{idx + 1}</td>
                      <td className="p-3 font-semibold text-stone-900">{item.productName}</td>
                      <td className="p-3 text-stone-600">{item.packagingPreference}</td>
                      <td className="p-3 text-end font-mono font-bold">{item.quantity.toLocaleString()}</td>
                      <td className="p-3 text-end text-stone-600">{item.unit}</td>
                      <td className="p-3 text-end font-mono">{estPrice.toFixed(2)}</td>
                      <td className="p-3 text-end font-mono font-bold text-stone-900">{subtotal.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-stone-100 font-bold border-t-2 border-stone-300">
                  <td colSpan={3} className="p-3 text-start text-stone-800">
                    TOTAL ESTIMATED GROSS WEIGHT: ~{order.totalEstimatedTonnage} Metric Tons
                  </td>
                  <td colSpan={3} className="p-3 text-end uppercase text-stone-900">
                    Grand Total ({order.incoterm}):
                  </td>
                  <td className="p-3 text-end font-mono text-sm text-emerald-800 font-black">
                    {order.currency} ${order.totalEstimatedValueUsd.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Banking & Legal Payment Instructions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-xs text-stone-700 border-t border-stone-200">
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-1">
              <h4 className="font-bold text-stone-900 uppercase text-emerald-900">Official Banking Information (Wire Transfer):</h4>
              <p><strong>Beneficiary Name:</strong> Nile Agricultural Ind. Co. (AGA) S.A.E</p>
              <p><strong>Bank:</strong> National Bank of Egypt (NBE) - Ramses Branch, Cairo</p>
              <p><strong>SWIFT Code:</strong> NBEGEGCX021</p>
              <p><strong>Account Number (IBAN):</strong> EG120003002100000004551871234</p>
            </div>

            <div className="space-y-1 text-stone-600">
              <h4 className="font-bold text-stone-900 uppercase">Commercial Export Conditions:</h4>
              <p>• <strong>Payment Terms:</strong> 30% advance deposit via T/T; 70% against original Bill of Lading & Health Certificates or Confirmed L/C.</p>
              <p>• <strong>Delivery Lead Time:</strong> Staged and loaded within 10-14 days of contractual advance confirmation.</p>
              <p>• <strong>Official Inspection:</strong> Pre-shipment inspection certified by SGS or Bureau Veritas upon importer request.</p>
            </div>
          </div>

          {/* Signatures */}
          <div className="pt-8 flex items-end justify-between border-t border-stone-300 text-xs">
            <div className="text-center w-48">
              <p className="text-stone-500 mb-8">Authorized Buyer Acceptance:</p>
              <div className="border-b border-stone-400 w-full mb-1" />
              <p className="font-bold text-stone-800">{order.companyName}</p>
            </div>

            <div className="text-center w-56">
              <div className="w-16 h-16 mx-auto rounded-full border-2 border-emerald-800 text-emerald-800 flex flex-col items-center justify-center font-bold text-[9px] mb-2 rotate-[-12deg] opacity-80">
                <span>AGA EXPORT</span>
                <span>APPROVED</span>
                <span>★ ★ ★</span>
              </div>
              <div className="border-b border-stone-400 w-full mb-1" />
              <p className="font-bold text-stone-900">Nile Agricultural Ind. Co. (AGA)</p>
              <p className="text-[10px] text-stone-500">General Export Directorate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
