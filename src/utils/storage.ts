import { ExportOrder, ContactMessage, Language } from '../types';
import { INITIAL_ORDERS, INITIAL_MESSAGES } from '../data/initialData';

const ORDERS_KEY = 'aga_export_orders_v1';
const MESSAGES_KEY = 'aga_contact_messages_v1';
const LANG_KEY = 'aga_selected_language_v1';

export function getStoredOrders(): ExportOrder[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading orders from localStorage', e);
    return INITIAL_ORDERS;
  }
}

export function saveStoredOrders(orders: ExportOrder[]): void {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Error saving orders to localStorage', e);
  }
}

export function getStoredMessages(): ContactMessage[] {
  try {
    const raw = localStorage.getItem(MESSAGES_KEY);
    if (!raw) {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(INITIAL_MESSAGES));
      return INITIAL_MESSAGES;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading messages from localStorage', e);
    return INITIAL_MESSAGES;
  }
}

export function saveStoredMessages(messages: ContactMessage[]): void {
  try {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  } catch (e) {
    console.error('Error saving messages to localStorage', e);
  }
}

export function getStoredLanguage(): Language {
  try {
    const saved = localStorage.getItem(LANG_KEY) as Language;
    if (saved === 'ar' || saved === 'en' || saved === 'az') {
      return saved;
    }
  } catch (e) {
    // fallback
  }
  return 'ar';
}

export function saveStoredLanguage(lang: Language): void {
  try {
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  } catch (e) {
    console.error('Error saving language', e);
  }
}
