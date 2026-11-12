import React, { useState, useEffect } from 'react';
import { Language, ExportOrder, ContactMessage, Product, OrderItem } from './types';
import { 
  getStoredOrders, 
  saveStoredOrders, 
  getStoredMessages, 
  saveStoredMessages, 
  getStoredLanguage, 
  saveStoredLanguage 
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/AboutPage';
import { ExportQualityPage } from './pages/ExportQualityPage';
import { AzerbaijanPage } from './pages/AzerbaijanPage';
import { OrderPage } from './pages/OrderPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [language, setLanguage] = useState<Language>(getStoredLanguage());
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedCategoryFromHome, setSelectedCategoryFromHome] = useState<string>('all');
  
  // Data stores
  const [orders, setOrders] = useState<ExportOrder[]>(getStoredOrders());
  const [messages, setMessages] = useState<ContactMessage[]>(getStoredMessages());
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  
  // Admin Dashboard Modal State
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Sync language with HTML dir and lang attribute
  useEffect(() => {
    saveStoredLanguage(language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Sync orders with local storage
  const handleUpdateOrders = (newOrders: ExportOrder[]) => {
    setOrders(newOrders);
    saveStoredOrders(newOrders);
  };

  // Sync messages with local storage
  const handleUpdateMessages = (newMessages: ContactMessage[]) => {
    setMessages(newMessages);
    saveStoredMessages(newMessages);
  };

  // Submit order handler
  const handleSubmitOrder = (newOrder: ExportOrder) => {
    const updated = [newOrder, ...orders];
    handleUpdateOrders(updated);
  };

  // Submit message handler
  const handleSubmitMessage = (newMsg: ContactMessage) => {
    const updated = [newMsg, ...messages];
    handleUpdateMessages(updated);
  };

  // Add product to cart helper
  const handleAddToCart = (product: Product) => {
    const existingIndex = cartItems.findIndex((item) => item.productId === product.id);
    if (existingIndex >= 0) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += product.category === 'frozen-vegetables' ? 10 : 500;
      setCartItems(updated);
    } else {
      const newItem: OrderItem = {
        productId: product.id,
        productName: product.name[language] || product.name.en,
        category: product.category,
        quantity: product.category === 'frozen-vegetables' ? 24 : 1400,
        unit: product.category === 'frozen-vegetables' ? 'MT' : 'Cartons',
        packagingPreference: (product.packaging[language] || product.packaging.en)[0],
        targetPriceUsd: product.category === 'frozen-vegetables' ? 1450 : 15,
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const handleSelectCategoryAndNavigate = (catId: string) => {
    setSelectedCategoryFromHome(catId);
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col text-stone-900 selection:bg-emerald-600 selection:text-white">
      {/* Navigation Header with 5-second Admin Trigger */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        currentPage={currentPage}
        onNavigate={(p) => {
          setCurrentPage(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminOpen={isAdminOpen}
        cartCount={cartItems.length}
      />

      {/* Main Pages Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            language={language}
            onNavigate={setCurrentPage}
            onSelectCategory={handleSelectCategoryAndNavigate}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            language={language}
            onNavigate={setCurrentPage}
            onAddToCart={handleAddToCart}
            selectedCategoryFromHome={selectedCategoryFromHome}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            language={language}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === 'quality' && (
          <ExportQualityPage
            language={language}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === 'azerbaijan' && (
          <AzerbaijanPage
            language={language}
            onNavigate={setCurrentPage}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === 'order' && (
          <OrderPage
            language={language}
            onNavigate={setCurrentPage}
            cartItems={cartItems}
            onUpdateCart={setCartItems}
            onSubmitOrder={handleSubmitOrder}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            language={language}
            onSubmitMessage={handleSubmitMessage}
          />
        )}
      </main>

      {/* Corporate Footer with brochure info */}
      <Footer
        language={language}
        onNavigate={(p) => {
          setCurrentPage(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Admin Dashboard Modal */}
      {isAdminOpen && (
        <AdminModal
          language={language}
          orders={orders}
          messages={messages}
          onUpdateOrders={handleUpdateOrders}
          onUpdateMessages={handleUpdateMessages}
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </div>
  );
}
