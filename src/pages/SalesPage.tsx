import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  MessageCircle, 
  Phone, 
  HelpCircle,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, PRODUCT_CATEGORIES } from '../data/products';
import { Product, ProductCategory } from '../types';
import { PHONE_DISPLAY, WHATSAPP_PHONE, getWhatsAppUrl, WHATSAPP_TEMPLATES } from '../utils/whatsapp';

interface SalesPageProps {
  initialCategory?: string;
  onEnquireProduct: (product: Product) => void;
  onOpenGeneralEnquiry: (type?: string, subject?: string) => void;
}

export const SalesPage: React.FC<SalesPageProps> = ({
  initialCategory = 'All',
  onEnquireProduct,
  onOpenGeneralEnquiry,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(
    (PRODUCT_CATEGORIES.includes(initialCategory as ProductCategory) ? initialCategory : 'All') as ProductCategory
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'name-asc' | 'brand'>('featured');

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query) ||
        item.shortDesc.toLowerCase().includes(query) ||
        item.specs.some((s) => s.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'brand') {
        return a.brand.localeCompare(b.brand);
      }
      // 'featured'
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="w-full bg-slate-950 text-slate-100 min-h-screen">
      
      {/* Header Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/40 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
                <ShoppingBag className="w-4 h-4" />
                <span>Computer Sales & Components</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
                Computer Hardware & Accessories
              </h1>
              <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
                Browse quality motherboards, processors, fast SSDs, RAM, monitors, and cables. Request instant competitive quotes for Visakhapatnam.
              </p>
            </div>

            {/* Quick Contact Badge */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-4 self-start md:self-auto">
              <div>
                <p className="text-xs text-slate-400">Direct Sales Desk (Vizag)</p>
                <p className="text-base font-bold text-white">{PHONE_DISPLAY}</p>
              </div>
              <a
                href={getWhatsAppUrl(WHATSAPP_TEMPLATES.productEnquiry)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Search & Sort Controls Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by part name, brand (ASUS, Intel, Samsung)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort & Result Count */}
          <div className="flex items-center justify-between md:justify-end gap-3">
            <span className="text-xs text-slate-400">
              Showing <strong className="text-white">{filteredProducts.length}</strong> items
            </span>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="featured">Featured First</option>
                <option value="name-asc">Product Name (A-Z)</option>
                <option value="brand">Brand Name</option>
              </select>
            </div>
          </div>

        </div>

        {/* Category Horizontal Filter Bar (Interactive tab buttons) */}
        <div className="mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {PRODUCT_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-blue-400/40'
                      : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center max-w-lg mx-auto">
            <HelpCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No products found</h3>
            <p className="text-xs text-slate-400 mb-6">
              We couldn't find any products matching “{searchQuery}” in {selectedCategory}. Need a custom item or specific part?
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl"
              >
                Reset Filters
              </button>
              <button
                onClick={() => onOpenGeneralEnquiry('Sales', `Inquiry for item: ${searchQuery}`)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl"
              >
                Custom Part Request
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEnquirePrice={onEnquireProduct}
              />
            ))}
          </div>
        )}

        {/* Custom PC Build / Bulk Hardware Consultation Banner */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 via-blue-950/60 to-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2 font-heading">
              Need a Custom PC Built or Bulk Office Equipment?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              We build custom configurations for gaming, architectural 3D rendering, programming, and office networks with compatibility guarantees and warranty support in Vizag.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenGeneralEnquiry('Sales', 'Custom Desktop PC Build Inquiry')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md shadow-blue-600/30 cursor-pointer"
            >
              Get Custom Quotation
            </button>
            <a
              href={`tel:${WHATSAPP_PHONE}`}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Call: {PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};
