export type Language = 'ar' | 'en' | 'az';

export type ProductCategory = 'frozen-vegetables' | 'juices' | 'jams' | 'pickles';

export interface Product {
  id: string;
  category: ProductCategory;
  name: {
    ar: string;
    en: string;
    az: string;
  };
  subtitle: {
    ar: string;
    en: string;
    az: string;
  };
  description: {
    ar: string;
    en: string;
    az: string;
  };
  packaging: {
    ar: string[];
    en: string[];
    az: string[];
  };
  shelfLife: string;
  storageTemp: string;
  moq: string; // Minimum order quantity e.g., "1x20' FCL" or "1x40' Reefer"
  containerCapacity: string;
  image: string;
  tags: string[];
  specs: {
    brix?: string;
    ph?: string;
    freezingMethod?: string;
    preservatives: string;
  };
}

export interface OrderItem {
  productId: string;
  productName: string;
  category: ProductCategory;
  quantity: number; // in Metric Tons or Cartons
  unit: 'MT' | 'Cartons' | 'Pallets';
  packagingPreference: string;
  targetPriceUsd?: number;
}

export type OrderStatus = 'new' | 'reviewing' | 'quoted' | 'samples_sent' | 'confirmed' | 'shipped' | 'cancelled';

export interface ExportOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  whatsapp?: string;
  country: string;
  city: string;
  destinationPort: string;
  incoterm: 'FOB' | 'CIF' | 'CFR' | 'EXW';
  containerType: "40' High-Cube Reefer" | "20' Standard Dry" | "40' Standard Dry" | "Consolidated LCL";
  containerCount: number;
  currency: 'USD' | 'EUR' | 'AZN';
  status: OrderStatus;
  items: OrderItem[];
  labelLanguage: 'Azərbaycan + English' | 'Arabic + English' | 'English Only' | 'Custom Private Label';
  brandPreference: 'AGA Brand (شركة أجا)' | 'Private Label / OEM (العلامة التجارية للعميل)';
  notes?: string;
  totalEstimatedTonnage: number;
  totalEstimatedValueUsd: number;
  adminNotes?: string;
}

export interface ContactMessage {
  id: string;
  createdAt: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  subject: string;
  message: string;
  inquiryType: 'export_inquiry' | 'distribution_agency' | 'sample_request' | 'quality_spec' | 'other';
  status: 'unread' | 'read' | 'replied' | 'archived';
  replySent?: string;
}

export interface QuickMessageTemplate {
  id: string;
  title: {
    ar: string;
    en: string;
    az: string;
  };
  category: 'quote' | 'specs' | 'sample' | 'proforma' | 'azerbaijan_special';
  content: {
    ar: string;
    en: string;
    az: string;
  };
}
