import { ExportOrder, ContactMessage, QuickMessageTemplate } from '../types';

export const QUICK_TEMPLATES: QuickMessageTemplate[] = [
  {
    id: 'tpl-quotation',
    category: 'quote',
    title: {
      ar: 'عرض أسعار تجاري رسمي (Official Commercial Quotation)',
      en: 'Official Commercial Export Quotation & Proforma Offer',
      az: 'Rəsmi Kommersiya İxrac Təklifi və Qiymətlər',
    },
    content: {
      ar: `السيد المحترم: {ClientName}
الشركة: {Company}
تحية طيبة وبعد،،
من: شركة النيل للتصنيع الزراعي (أجا) - جمهورية مصر العربية
بخصوص طلب التصدير رقم: {OrderRef}

يسعدنا تقديم عرض الأسعار الرسمي لتوريد منتجاتنا الزراعية الفاخرة وفق الشروط التالية:
• ميناء الوصول: {Port}
• شروط التسليم: {Incoterm}
• الحاويات: {Containers} (حاويات مبردة 40 قدم ريفر / درجة -18 مئوية)
• المواصفات: خالية تماماً من المواد الحافظة والمواد الكيميائية ومطابقة لمواصفات الآيزو 22000 والحلال.
• شروط الدفع: 30% دفعة مقدمة بنكية T/T و 70% مقابل صور مستندات الشحن الأصلية أو اعتماد مستندي غير قابل للإلغاء معزز L/C at sight.
• مدة سريان العرض: 14 يوماً من تاريخه.

تجدون برفقه الفاتورة المبدئية التفصيلية Proforma Invoice ومواصفات التعبئة.
مع فائق الاحترام والتقدير،
إدارة التصدير الدولي - شركة أجا (AGA)
واتساب: +201004551871 | بريد: export@aga.com.eg`,
      en: `Dear {ClientName},
Company: {Company}
Greetings from Nile Agricultural Ind. Co. (AGA) - Egypt
Regarding Export RFQ Ref: {OrderRef}

We are pleased to submit our formal commercial quotation under the following export parameters:
• Destination Port: {Port}
• Delivery Incoterm: {Incoterm}
• Container Allocation: {Containers} (40' High-Cube Reefer @ -18°C)
• Quality Grade: 100% Natural, zero preservatives, certified Halal & ISO 22000 compliant.
• Commercial Terms: 30% advance T/T deposit and 70% upon presentation of full set of shipping documents (B/L, Health Certificate, Certificate of Origin, Phytosanitary) or 100% Irrevocable Confirmed L/C at sight.
• Offer Validity: 14 calendar days.

Attached please find our technical packing list and proforma breakdown.
Best regards,
International Export Directorate - AGA Egypt
WhatsApp: +201004551871 | Email: export@aga.com.eg`,
      az: `Hörmətli {ClientName},
Şirkət: {Company}
Nil Kənd Təsərrüfatı Sənayesi (AGA, Misir) adından salamlayırıq!
Sifariş Nömrəsi: {OrderRef}

{OrderRef} saylı müraciətinizə əsasən rəsmi ixrac qiymət təklifimizi təqdim etməkdən məmnunuq:
• Təyinat Limanı / Terminal: {Port}
• Təhvil Şərti: {Incoterm}
• Konteynerlər: {Containers} (40 futluq Refrijerator @ -18°C)
• Keyfiyyət: 100% təbii, konservantsız, Halal və ISO 22000 sertifikatlı.
• Ödəniş Qaydası: 30% ilkin bank köçürməsi (T/T), qalan 70% yükləmə sənədlərinin (B/L, Fitoxidmət, Halal sertifikatı) surəti qarşılığında və ya akkreditiv (L/C at sight).
• Təklifin qüvvədə olma müddəti: 14 gün.

Qoşmada ətraflı Proforma Faktura və qablaşdırma detalları təqdim olunur.
Hörmətlə,
Beynəlxalq İxracat İdarəsi - AGA Misir
WhatsApp: +201004551871 | E-poçt: export@aga.com.eg`,
    },
  },
  {
    id: 'tpl-azerbaijan-special',
    category: 'azerbaijan_special',
    title: {
      ar: 'عرض الشراكة الخاص لسوق أذربيجان وباكو (Baku Retail Offer)',
      en: 'Baku & Azerbaijan Retail Partner Proposal',
      az: 'Bakı və Azərbaycan Şəbəkələri Üçün Xüsusi Tərəfdaşlıq Təklifi',
    },
    content: {
      ar: `السادة المحترمون في شركة: {Company}
عناية الأستاذ: {ClientName}
العاصمة باكو - جمهورية أذربيجان 🇦🇿

بناءً على تواصلكم الكريم بخصوص استيراد منتجات شركة أجا (AGA) المصرية، نؤكد لكم جاهزيتنا التامة لتوفير كافة التسهيلات الخاصة بالسوق الأذربيجاني:
1. طباعة البيانات والملصقات الغذائية والباركود باللغة الأذربيجانية اللاتينية وفق اشتراطات وكالة AQTA.
2. توفير شهادات حلال معتمدة دولياً ومطابقة لمعايير المستهلك الأذربيجاني.
3. التوصيل عبر خط الشحن المباشر إلى ميناء بوتي ثم النقل البري إلى محطة شحن باكو (Baku Freight Terminal).
4. عينات مجانية معتمدة لكافة أصناف الخضروات والمربات والعصائر والمخللات.

يسعدنا ترتيب اجتماع افتراضي أو زيارة لمصانعنا في مصر لبدء التعاقد السنوي.
مع أطيب التحيات،
مكتب تمثيل التصدير لأذربيجان ودول القوقاز - شركة أجا`,
      en: `Distinguished Partners at: {Company}
Attn: Mr./Ms. {ClientName}
Baku, Republic of Azerbaijan 🇦🇿

Following your valued interest in importing AGA’s premium agricultural products, we confirm our full readiness to support the Azerbaijani market requirements:
1. Dual-language product labeling in Azerbaijani and English in strict compliance with AQTA regulations.
2. Full Halal certification recognized across the Caucasus and CIS regions.
3. Cold-chain freight via Black Sea (Poti Port) with direct refrigerated transit to Baku logistics distribution hubs.
4. Complementary commercial sample kits sent directly to your corporate office in Baku.

We look forward to formalizing a long-term strategic distribution partnership.
International Export Management - AGA Egypt`,
      az: `Hörmətli {Company} Rəhbərliyi,
Cənab/Xanım: {ClientName}
Bakı şəhəri, Azərbaycan Respublikası 🇦🇿

AGA (Misir) şirkətinin kənd təsərrüfatı və qida məhsullarına göstərdiyiniz marağa görə təşəkkür edirik. Azərbaycan bazarı və supermarket şəbəkələri üçün aşağıdakı xüsusi üstünlükləri təmin edirik:
1. Azərbaycan Qida Təhlükəsizliyi Agentliyinin (AQTA) tələblərinə uyğun Azərbaycan dilində etiketləmə və ştrixkod.
2. Rəsmi beynəlxalq Halal və fitosanitar sertifikatlaşdırma.
3. Domyat/İsgəndəriyyə limanından Poti limanına dəniz yolu və oradan Bakı Yük Terminalına fasiləsiz soyuq zəncirli (-18°C) çatdırılma.
4. Şirkətinizə pulsuz təqdimat nümunələri dəstinin göndərilməsi.

Əməkdaşlığımızın detallarını müzakirə etmək üçün onlayn görüş təşkil etməyə hazırıq.
Dərin hörmətlə,
AGA Qafqaz və Azərbaycan İxracat Nümayəndəliyi`,
    },
  },
  {
    id: 'tpl-sample-dispatch',
    category: 'sample',
    title: {
      ar: 'إشعار إرسال عينات تجارية مبردة (Sample Shipment Notification)',
      en: 'Refrigerated Commercial Sample Dispatch Notification',
      az: 'Soyuduculu Kommersiya Nümunələrinin Göndərilməsi Bildirişi',
    },
    content: {
      ar: `السيد المحترم: {ClientName}
شركة: {Company}
تحية طيبة وبعد،،
يسرنا إبلاغكم بأنه تم تجهيز وإرسال طرد العينات التجارية لمنتجات شركة أجا (خضروات مجمدة، عصائر طبيعية، مربات فاخرة، مخللات وزيتون) عبر الشحن السريع المبرد:
• بوليصة الشحن الجوي: AWB-AGA-98234-EG
• درجة الحرارة المحفوظة: -18 مئوية بواسطة الثلج الجاف
• موعد الوصول المتوقع إلى مقركم: خلال 72 ساعة عمل.
يرجى تأكيد الاستلام فور وصول الطرد، وتزويدنا بملاحظات فريق الجودة لديكم لاعتماد كميات الحاوية الأولى.
إدارة التصدير - شركة أجا`,
      en: `Dear {ClientName},
Company: {Company}
We are pleased to inform you that your customized commercial sample parcel (frozen vegetables, natural juices, jams, and olives) has been packed in insulated dry-ice containers and dispatched:
• Air Waybill / Tracking: AWB-AGA-98234-EG
• Packaging: Thermal cold-pack maintaining integrity
• Estimated Delivery: Within 72 business hours to your office.
Please confirm receipt upon arrival and let us know your sensory laboratory evaluation to proceed with the primary container contract.
Export Department - AGA Egypt`,
      az: `Hörmətli {ClientName},
Şirkət: {Company}
Məlumat vermək istərdik ki, şirkətiniz üçün hazırlanan kommersiya nümunələri dəsti (dondurulmuş tərəvəzlər, meyvə şirələri, cəmlər və zeytunlar) quru buzlu xüsusi termal qutularda sürətli kuryer vasitəsilə yola salınmışdır:
• İzləmə Kodu (AWB): AWB-AGA-98234-EG
• Temperatur Rejimi: Termoizolyasiyalı soyuq qablaşdırma
• Təxmini Çatdırılma: 72 iş saatı ərzində ofisinizə.
Zəhmət olmasa bağlama çatdıqda təsdiqləyin və ilk konteyner sifarişi üçün laboratoriya rəyinizi bizimlə bölüşün.
İxracat Şöbəsi - AGA Misir`,
    },
  },
  {
    id: 'tpl-proforma',
    category: 'proforma',
    title: {
      ar: 'إصدار الفاتورة المبدئية والبيانات البنكية (Proforma Invoice & Bank Details)',
      en: 'Proforma Invoice Issuance & Wire Transfer Instructions',
      az: 'Proforma Fakturanın Təqdim Edilməsi və Bank Rekvizitləri',
    },
    content: {
      ar: `السادة: {Company}
عناية: {ClientName}
مرفق لسيادتكم الفاتورة المبدئية الرسمية Proforma Invoice رقم: PI-AGA-{OrderRef}
• القيمة الإجمالية: حسب بنود العقد المرفق
• المستفيد: شركة النيل للتصنيع الزراعي (أجا) - ش.م.م
• البنك: البنك الأهلي المصري (NBE) - فرع رمسيس - القاهرة
• سويفت كود: NBEGEGCX021
• رقم الحساب الدولي (IBAN): EG120003002100000004551871234
فور تحويل الدفعة المقدمة 30% يرجى تزويدنا بصورة السويفت البنكي لبدء تحميل الحاويات وحجز خط الملاحة فوراً.`,
      en: `Messrs: {Company}
Attn: {ClientName}
Please find officially issued Proforma Invoice ref: PI-AGA-{OrderRef}
• Beneficiary: Nile Agricultural Ind. Co. (AGA) S.A.E
• Bank: National Bank of Egypt (NBE) - Ramses Branch, Cairo
• SWIFT: NBEGEGCX021
• IBAN: EG120003002100000004551871234
Kindly remit the 30% contractual advance deposit and forward the official bank swift copy to secure vessel booking and container staging.`,
      az: `Müştəri: {Company}
Diqqətinə: {ClientName}
Sifarişinizə uyğun rəsmi Proforma Faktura (PI-AGA-{OrderRef}) tərtib olunmuşdur:
• Benefisiar: Nile Agricultural Ind. Co. (AGA) S.A.E
• Bank: National Bank of Egypt (NBE) - Ramses Branch, Cairo
• SWIFT: NBEGEGCX021
• IBAN: EG120003002100000004551871234
30% ilkin ödəniş köçürüldükdən sonra bank təsdiq sənədini (SWIFT) bizə göndərməyiniz xahiş olunur ki, refrijerator konteynerlərinin yüklənməsi dərhal başlasın.`,
    },
  },
];

export const INITIAL_ORDERS: ExportOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'AGA-EXP-2026-9041',
    createdAt: '2026-11-10T14:32:00Z',
    companyName: 'Baku Grand Retail Distribution MMC',
    contactPerson: 'Eldar Mammadov (Məmmədov)',
    email: 'e.mammadov@bakugrandretail.az',
    phone: '+994 12 598 44 20',
    whatsapp: '+994 50 214 88 90',
    country: 'Azerbaijan (Azərbaycan)',
    city: 'Baku (Bakı)',
    destinationPort: 'Baku International Sea Trade Port / Poti Corridor',
    incoterm: 'CIF',
    containerType: "40' High-Cube Reefer",
    containerCount: 2,
    currency: 'USD',
    status: 'reviewing',
    labelLanguage: 'Azərbaycan + English',
    brandPreference: 'AGA Brand (شركة أجا)',
    notes: 'Tələb olunan: Dondurulmuş Əla Növ Bamiyə (400q) və Noxud-kök qarışığı (400q) Azərbaycan dilində etiketlərlə. Bravo və Araz marketləri üçün.',
    totalEstimatedTonnage: 48,
    totalEstimatedValueUsd: 68400,
    items: [
      {
        productId: 'okra-super',
        productName: 'Frozen Super Okra (بامية سوبر)',
        category: 'frozen-vegetables',
        quantity: 24,
        unit: 'MT',
        packagingPreference: '400g Retail Pouches (20 pcs/ctn) with Azerbaijani labels',
        targetPriceUsd: 1450,
      },
      {
        productId: 'peas-carrots',
        productName: 'Peas & Diced Carrots Mix (بسلة وجزر)',
        category: 'frozen-vegetables',
        quantity: 24,
        unit: 'MT',
        packagingPreference: '400g Retail Pouches (20 pcs/ctn)',
        targetPriceUsd: 1400,
      },
    ],
    adminNotes: 'Client is top retail distributor in Baku. Ready to sign annual contract for 12 containers. Sent Halal certificate copy.',
  },
  {
    id: 'ord-102',
    orderNumber: 'AGA-EXP-2026-9038',
    createdAt: '2026-11-09T09:15:00Z',
    companyName: 'Al-Madina Food Logistics FZCO',
    contactPerson: 'Tariq Al-Qasimi',
    email: 'import@almadinafoods.ae',
    phone: '+971 4 883 9921',
    whatsapp: '+971 50 771 2234',
    country: 'United Arab Emirates (الإمارات)',
    city: 'Dubai',
    destinationPort: 'Jebel Ali Port (FOB Alexandria)',
    incoterm: 'FOB',
    containerType: "40' Standard Dry",
    containerCount: 1,
    currency: 'USD',
    status: 'quoted',
    labelLanguage: 'Arabic + English',
    brandPreference: 'AGA Brand (شركة أجا)',
    notes: 'مطلوب شحنة عصير مانجو وجوافة كانز 330 مل ومربى تين ومشمش 380 جم لسلاسل الهايبرماركت في دبي وأبوظبي.',
    totalEstimatedTonnage: 26,
    totalEstimatedValueUsd: 39500,
    items: [
      {
        productId: 'juice-mango',
        productName: 'Natural Mango Juice 330ml Cans (عصير مانجو كانز)',
        category: 'juices',
        quantity: 1400,
        unit: 'Cartons',
        packagingPreference: '24 cans x 330ml easy open',
        targetPriceUsd: 12.5,
      },
      {
        productId: 'jam-apricot',
        productName: 'Apricot Jam 380g (مربى مشمش برطمان)',
        category: 'jams',
        quantity: 900,
        unit: 'Cartons',
        packagingPreference: '12 jars x 380g glass',
        targetPriceUsd: 14.0,
      },
    ],
    adminNotes: 'Formal quotation sent via WhatsApp and Email. Awaiting deposit confirmation.',
  },
  {
    id: 'ord-103',
    orderNumber: 'AGA-EXP-2026-9022',
    createdAt: '2026-11-07T11:40:00Z',
    companyName: 'Caspian Gourmet Catering LLC',
    contactPerson: 'Rasim Aliyev',
    email: 'raliyev@caspiangourmet.az',
    phone: '+994 50 339 12 77',
    whatsapp: '+994 50 339 12 77',
    country: 'Azerbaijan',
    city: 'Sumqayit / Baku',
    destinationPort: 'Baku Freight Terminal',
    incoterm: 'CIF',
    containerType: "20' Standard Dry",
    containerCount: 1,
    currency: 'USD',
    status: 'confirmed',
    labelLanguage: 'Azərbaycan + English',
    brandPreference: 'AGA Brand (شركة أجا)',
    notes: 'Pickles and Olives: Stuffed olives with carrot, Kalamata olives, and pickled pearl onions for offshore catering.',
    totalEstimatedTonnage: 19,
    totalEstimatedValueUsd: 28900,
    items: [
      {
        productId: 'pickles-olives-selection',
        productName: 'Stuffed Olives & Kalamata (زيتون محشو جزر وكلاماتا)',
        category: 'pickles',
        quantity: 800,
        unit: 'Cartons',
        packagingPreference: '12 x 660g Glass jars',
        targetPriceUsd: 19.5,
      },
      {
        productId: 'pickles-onions-peppers',
        productName: 'Pickled Pearl Onions (بصل وفلفل مخلل)',
        category: 'pickles',
        quantity: 650,
        unit: 'Cartons',
        packagingPreference: '12 x 660g Glass jars',
        targetPriceUsd: 15.0,
      },
    ],
    adminNotes: 'Advance payment 30% received at NBE Ramses branch. Container staging scheduled for Monday at Alexandria port.',
  },
];

export const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-201',
    createdAt: '2026-11-11T19:20:00Z',
    fullName: 'Nigar Guliyeva',
    companyName: 'Araz Supermarket Network Procurement',
    email: 'n.guliyeva@arazmarket.az',
    phone: '+994 12 404 88 00',
    country: 'Azerbaijan (Bakı)',
    subject: 'İllik dondurulmuş tərəvəz və meyvə cəmləri tədarükü üzrə tender',
    message: 'Salam. Araz Supermarketlər şəbəkəsi adından müraciət edirik. Misir istehsalı olan dondurulmuş tərəvəzlər (xüsusən bamiyə, noxud, yaşıl lobya) və 380q şüşə bankalarda meyvə mürəbbələrinin Bakıya birbaşa çatdırılma qiymətlərini və Azərbaycan dilində qablaşdırma şərtlərini öyrənmək istərdik.',
    inquiryType: 'export_inquiry',
    status: 'unread',
  },
  {
    id: 'msg-202',
    createdAt: '2026-11-10T11:05:00Z',
    fullName: 'د. خالد عبد العزيز المنصوري',
    companyName: 'مؤسسة التموين والفنادق الملكية',
    email: 'k.almansoori@royalhotels.com.sa',
    phone: '+966 54 889 0012',
    country: 'المملكة العربية السعودية',
    subject: 'طلب توريد عبوات بورشن مربى 30 جم وعصائر كانز 330 مل',
    message: 'نود الاستفسار عن إمكانية توريد 3 حاويات 40 قدم شهرياً من عبوات بورشن المربى 30 جم (مشمش، فراولة، تين) المخصصة لخدمة بوفيهات الفنادق والمدارس، بالإضافة إلى العصائر الطبيعية في كانز ألومنيوم سهلة الفتح.',
    inquiryType: 'export_inquiry',
    status: 'read',
  },
  {
    id: 'msg-203',
    createdAt: '2026-11-09T16:45:00Z',
    fullName: 'Markus Weber',
    companyName: 'Bavaria Mediterranean Import GmbH',
    email: 'weber@bavaria-mediterranean.de',
    phone: '+49 89 452 8810',
    country: 'Germany (Munich)',
    subject: 'Inquiry for IQF Artichoke Bottoms 5-7cm & Frozen Vine Leaves',
    message: 'Hello Export Directorate at AGA. We are looking for regular seasonal supply of frozen artichoke bottoms (calibrated 5-7cm and 7-9cm) and preserved vine leaves in vacuum bags for the German food processing industry. Please send your technical specifications and pesticide residue certificates.',
    inquiryType: 'quality_spec',
    status: 'replied',
    replySent: 'Sent pesticide residue testing sheet and ISO 22000 certificate via email on Nov 10.',
  },
];
