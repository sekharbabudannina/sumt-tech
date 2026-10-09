import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES, PHONE_DISPLAY } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Interactive Tooltip Card */}
      {showTooltip && (
        <div className="mb-3 w-72 bg-slate-900 border border-slate-700/80 rounded-2xl p-4 shadow-2xl animate-in slide-in-from-bottom-2 duration-200 text-left">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                SUMT WhatsApp Helpdesk
              </span>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Have a question about PC repair, hardware pricing, or laptop issues in Vizag? Chat directly with our technical team!
          </p>
          <div className="space-y-1.5">
            <a
              href={getWhatsAppUrl(WHATSAPP_TEMPLATES.serviceBooking)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-1.5 px-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] text-cyan-300 rounded-lg font-medium transition-colors"
            >
              • Book Computer Service
            </a>
            <a
              href={getWhatsAppUrl(WHATSAPP_TEMPLATES.productEnquiry)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-1.5 px-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] text-emerald-300 rounded-lg font-medium transition-colors"
            >
              • Inquire About Hardware Prices
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Button */}
      <div className="relative group">
        <a
          href={getWhatsAppUrl(WHATSAPP_TEMPLATES.generalEnquiry)}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          aria-label="Chat on WhatsApp with SUMT Technologies"
          className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white pl-4 pr-5 py-3.5 rounded-full shadow-xl shadow-emerald-950/60 transition-all duration-300 hover:scale-105 border border-emerald-400/40 cursor-pointer"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 fill-white/20" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-100 leading-none">
              Chat on WhatsApp
            </span>
            <span className="text-xs font-extrabold tracking-wide text-white leading-tight">
              {PHONE_DISPLAY}
            </span>
          </div>
        </a>
      </div>

    </div>
  );
};
