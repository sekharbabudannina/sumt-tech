import React from 'react';
import { MessageCircle, FileText, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';
import { getProductWhatsAppUrl } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onEnquirePrice: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEnquirePrice }) => {
  const whatsappUrl = getProductWhatsAppUrl(product.name, product.category);

  return (
    <div className="group flex flex-col bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/30">
      
      {/* Product Image Area */}
      <div className="relative w-full h-52 bg-slate-950 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
        
        {/* Category Tag (No pills: clean typography) */}
        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-2.5 py-1 rounded-md text-[11px] font-semibold text-cyan-300">
          {product.category}
        </div>

        {/* Brand label */}
        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-2 py-1 rounded-md text-[10px] font-mono text-slate-300">
          {product.brand}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* Product Title */}
        <h4 className="text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
          {product.name}
        </h4>

        {/* Short description */}
        <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
          {product.shortDesc}
        </p>

        {/* Specs highlights */}
        <div className="mb-5 space-y-1.5 flex-grow">
          {product.specs.slice(0, 3).map((spec, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{spec}</span>
            </div>
          ))}
        </div>

        {/* Pricing notice */}
        <div className="pt-3 pb-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400">Vizag Availability</span>
          <span className="text-cyan-400 font-semibold">In Stock · Best Quote</span>
        </div>

        {/* Dual Actions: Enquire for Price & WhatsApp Enquiry */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          {/* Enquire for Price button */}
          <button
            onClick={() => onEnquirePrice(product)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-blue-600/30 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Enquire Price</span>
          </button>

          {/* WhatsApp Enquiry button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Inquire directly on WhatsApp"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 text-xs font-semibold rounded-xl transition-all cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </a>
        </div>

      </div>

    </div>
  );
};
