import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BookingModal } from './components/BookingModal';
import { ProductEnquiryModal } from './components/ProductEnquiryModal';
import { GeneralEnquiryModal } from './components/GeneralEnquiryModal';
import { OwnerDashboardModal } from './components/OwnerDashboardModal';
import { HomePage } from './pages/HomePage';
import { SalesPage } from './pages/SalesPage';
import { MaintenancePage } from './pages/MaintenancePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { Product } from './types';

function getTabFromPath(path: string): string {
  const clean = path.replace(/^\/+/, '').split('/')[0].toLowerCase();
  if (clean === 'sales') return 'sales';
  if (clean === 'maintenance' || clean === 'repair') return 'maintenance';
  if (clean === 'about' || clean === 'about-us') return 'about';
  if (clean === 'contact' || clean === 'contact-us') return 'contact';
  return 'home';
}

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return getTabFromPath(window.location.pathname);
    }
    return 'home';
  });

  const [salesInitialCategory, setSalesInitialCategory] = useState<string>('All');

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefillService, setBookingPrefillService] = useState('Desktop and Laptop Repair');

  const [selectedProductForEnquiry, setSelectedProductForEnquiry] = useState<Product | null>(null);
  const [isProductEnquiryOpen, setIsProductEnquiryOpen] = useState(false);

  const [isGeneralEnquiryOpen, setIsGeneralEnquiryOpen] = useState(false);
  const [generalEnquiryType, setGeneralEnquiryType] = useState('General Enquiry');
  const [generalEnquirySubject, setGeneralEnquirySubject] = useState('');

  const [isOwnerDashboardOpen, setIsOwnerDashboardOpen] = useState(false);

  // Sync navigation with browser history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentTab(getTabFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (tab: string, category?: string) => {
    setCurrentTab(tab);
    if (category) {
      setSalesInitialCategory(category);
    } else {
      setSalesInitialCategory('All');
    }

    const newPath = tab === 'home' ? '/' : `/${tab}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, '', newPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (service?: string) => {
    if (service) {
      setBookingPrefillService(service);
    } else {
      setBookingPrefillService('Desktop and Laptop Repair');
    }
    setIsBookingOpen(true);
  };

  const handleEnquireProduct = (product: Product) => {
    setSelectedProductForEnquiry(product);
    setIsProductEnquiryOpen(true);
  };

  const handleOpenGeneralEnquiry = (type = 'General Enquiry', subject = '') => {
    setGeneralEnquiryType(type);
    setGeneralEnquirySubject(subject);
    setIsGeneralEnquiryOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070d1e] text-slate-100 selection:bg-blue-600 selection:text-white">
      
      {/* Sticky Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Page Content */}
      <main className="flex-1 w-full">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            onOpenEnquiry={handleOpenGeneralEnquiry}
            onEnquireProduct={handleEnquireProduct}
          />
        )}

        {currentTab === 'sales' && (
          <SalesPage
            initialCategory={salesInitialCategory}
            onEnquireProduct={handleEnquireProduct}
            onOpenGeneralEnquiry={handleOpenGeneralEnquiry}
          />
        )}

        {currentTab === 'maintenance' && (
          <MaintenancePage
            onOpenBookingModal={handleOpenBooking}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {currentTab === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenOwnerDashboard={() => setIsOwnerDashboardOpen(true)}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={bookingPrefillService}
      />

      <ProductEnquiryModal
        product={selectedProductForEnquiry}
        isOpen={isProductEnquiryOpen}
        onClose={() => {
          setIsProductEnquiryOpen(false);
          setSelectedProductForEnquiry(null);
        }}
      />

      <GeneralEnquiryModal
        isOpen={isGeneralEnquiryOpen}
        onClose={() => setIsGeneralEnquiryOpen(false)}
        initialType={generalEnquiryType}
        initialSubject={generalEnquirySubject}
      />

      <OwnerDashboardModal
        isOpen={isOwnerDashboardOpen}
        onClose={() => setIsOwnerDashboardOpen(false)}
      />

    </div>
  );
}
