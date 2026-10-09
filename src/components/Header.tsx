import React, { useState } from 'react';
import { 
  Cpu, 
  Phone, 
  Menu, 
  X, 
  Wrench, 
  MessageCircle,
  Clock,
  MapPin
} from 'lucide-react';
import { WHATSAPP_PHONE, PHONE_DISPLAY, getWhatsAppUrl, WHATSAPP_TEMPLATES } from '../utils/whatsapp';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenBooking: (prefillService?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onNavigate, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'sales', label: 'Sales' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (tabId: string) => {
    onNavigate(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20">
      {/* Top Utility Bar for quick location & service notice */}
      <div className="hidden lg:block bg-slate-900/90 border-b border-slate-800/60 text-xs text-slate-400 py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              Visakhapatnam (Vizag), Andhra Pradesh
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              Mon - Sat: 9:30 AM – 8:30 PM | Sun: 10:00 AM – 2:00 PM
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Computer Sales · Laptop Repair · Hardware Accessories</span>
            <a
              href={`tel:${WHATSAPP_PHONE}`}
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              Call Vizag Support: {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Side: Brand Logo + Phone next to WhatsApp */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all border border-blue-400/30">
                <Cpu className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-heading">
                    SUMT
                  </span>
                  <span className="text-xs sm:text-sm font-semibold tracking-wider text-cyan-400 uppercase">
                    Technologies
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 tracking-tight hidden sm:inline-block">
                  Sales · Service · Hardware · Vizag
                </span>
              </div>
            </button>

            {/* Prompt requirement: "Also show the phone number in bold text on the left side of the header, next to a recognizable WhatsApp logo, as requested." */}
            <div className="hidden xl:flex items-center pl-4 border-l border-slate-800">
              <a
                href={getWhatsAppUrl(WHATSAPP_TEMPLATES.generalEnquiry)}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat with SUMT Technologies on WhatsApp"
                className="flex items-center gap-2 group hover:bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-emerald-500/30 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  {/* WhatsApp recognizable symbol */}
                  <MessageCircle className="w-4 h-4 fill-emerald-500/30" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">WhatsApp & Call</span>
                  <span className="text-sm font-extrabold text-white tracking-wide group-hover:text-emerald-300">
                    {PHONE_DISPLAY}
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Side: Contact & Book Service CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Direct Call / WhatsApp */}
            <a
              href={getWhatsAppUrl(WHATSAPP_TEMPLATES.generalEnquiry)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span className="font-bold">{PHONE_DISPLAY}</span>
            </a>

            {/* Highlighted Book a Service Button */}
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 rounded-lg shadow-md shadow-blue-600/30 hover:shadow-blue-600/50 transition-all border border-blue-400/30 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <Wrench className="w-4 h-4" />
              <span>Book a Service</span>
            </button>
          </div>

          {/* Mobile Actions: WhatsApp quick icon + Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={getWhatsAppUrl(WHATSAPP_TEMPLATES.generalEnquiry)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Us"
              className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 flex items-center justify-center hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          {/* Quick Contact Header in Mobile Menu */}
          <div className="bg-slate-900/90 rounded-xl p-3 mb-4 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-xs text-slate-400">Direct WhatsApp & Call</p>
                <p className="text-sm font-bold text-white">{PHONE_DISPLAY}</p>
              </div>
            </div>
            <a
              href={`tel:${WHATSAPP_PHONE}`}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              Call Now
            </a>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 font-bold border border-blue-500/20'
                      : 'text-slate-200 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                </button>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-lg flex items-center justify-center gap-2 shadow-md shadow-blue-600/30"
            >
              <Wrench className="w-4 h-4" />
              <span>Book a Service Online</span>
            </button>
            <a
              href={getWhatsAppUrl(WHATSAPP_TEMPLATES.generalEnquiry)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 font-semibold rounded-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
