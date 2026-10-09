import React from 'react';
import { 
  Cpu, 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  MessageCircle, 
  ArrowRight,
  ShieldCheck,
  Database
} from 'lucide-react';
import { PHONE_DISPLAY, WHATSAPP_PHONE, getWhatsAppUrl, WHATSAPP_TEMPLATES } from '../utils/whatsapp';

interface FooterProps {
  onNavigate: (tab: string, category?: string) => void;
  onOpenOwnerDashboard: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenOwnerDashboard }) => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400">
      
      {/* Top Banner / Quality Promise */}
      <div className="border-b border-slate-900 bg-slate-900/40 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-white">SUMT Technologies Assurance:</span>
            <span>Genuine Computer Hardware · Transparent Diagnostics · Vizag-Wide Support</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Quick Tech Support:</span>
            <a
              href={`tel:${WHATSAPP_PHONE}`}
              className="font-bold text-white hover:text-cyan-400 transition-colors"
            >
              +91 {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-white font-heading">
                  SUMT Technologies
                </span>
                <span className="text-xs text-cyan-400 font-semibold tracking-wider uppercase">
                  Sales · Service · Hardware
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              “Your Trusted Partner for Computer Sales & Services” — Providing Visakhapatnam with quality computer hardware, fast laptop repair, SSD/RAM upgrades, and professional IT maintenance solutions.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Visakhapatnam (Vizag), Andhra Pradesh, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Mon – Sat: 9:30 AM – 8:30 PM | Sun: 10:00 AM – 2:00 PM</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${WHATSAPP_PHONE}`} className="hover:text-white transition-colors font-semibold">
                  +91 {PHONE_DISPLAY} (Direct Call)
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sales')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  Computer Sales
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('maintenance')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  Repair & Maintenance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  About SUMT Technologies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Sales Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Sales Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('sales', 'Motherboards')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Motherboards & CPUs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sales', 'Solid State Drives (SSD)')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  SSDs & High Speed Storage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sales', 'RAM')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Desktop & Laptop RAM
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sales', 'LED Monitors')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  LED Monitors & Displays
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sales', 'Keyboards & Mice')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Keyboards, Mice & Accessories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sales', 'Computer Cables')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  HDMI & Network Cables
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Maintenance Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Maintenance Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('maintenance')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Desktop & Laptop Repair
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('maintenance')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  RAM & SSD Speed Upgrade
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('maintenance')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Hardware Diagnostics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('maintenance')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Virus & Malware Removal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('maintenance')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Windows Installation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('maintenance')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Office Computer Maintenance
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-400">
            © 2026 <strong className="text-slate-200">SUMT Technologies</strong>. All rights reserved. Visakhapatnam, Andhra Pradesh.
          </p>

          <div className="flex items-center gap-4">
            <a
              href={getWhatsAppUrl(WHATSAPP_TEMPLATES.generalEnquiry)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp: +91 {PHONE_DISPLAY}
            </a>
            <span className="text-slate-700">|</span>
            {/* Owner / Staff records inspector button */}
            <button
              onClick={onOpenOwnerDashboard}
              className="text-slate-400 hover:text-cyan-400 flex items-center gap-1 text-[11px] font-mono transition-colors"
              title="View customer bookings & inquiries backend records"
            >
              <Database className="w-3 h-3 text-cyan-400" />
              <span>Owner Records Panel</span>
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
};
