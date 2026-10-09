import React from 'react';
import { 
  ArrowRight, 
  Phone, 
  MessageCircle, 
  Wrench, 
  CheckCircle2, 
  Cpu, 
  Shield, 
  Clock, 
  Sparkles,
  Layers,
  ChevronRight,
  Headphones,
  Laptop
} from 'lucide-react';
import { HeroSlideshow } from '../components/HeroSlideshow';
import { ServiceCard } from '../components/ServiceCard';
import { ProductCard } from '../components/ProductCard';
import { SERVICES } from '../data/services';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { PHONE_DISPLAY, WHATSAPP_PHONE, getWhatsAppUrl, WHATSAPP_TEMPLATES } from '../utils/whatsapp';

interface HomePageProps {
  onNavigate: (tab: string, category?: string) => void;
  onOpenBooking: (prefillService?: string) => void;
  onOpenEnquiry: (type?: string, subject?: string) => void;
  onEnquireProduct: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenEnquiry,
  onEnquireProduct,
}) => {
  // Select 6 featured products for Home Page showcase
  const featuredProducts = PRODUCTS.slice(0, 6);

  // Why choose SUMT Technologies points
  const whyChoosePoints = [
    {
      title: 'Professional Technical Support',
      desc: 'Experienced technicians diagnosing hardware and software faults with component-level accuracy.',
      icon: <Wrench className="w-6 h-6 text-cyan-400" />,
    },
    {
      title: 'Quality Computer Products',
      desc: '100% genuine processors, motherboards, SSDs, RAM, and branded accessories with manufacturer warranty.',
      icon: <Cpu className="w-6 h-6 text-blue-400" />,
    },
    {
      title: 'Reliable Maintenance Services',
      desc: 'Preventive servicing, deep internal cleaning, and thermal optimization for residential and corporate PCs.',
      icon: <Shield className="w-6 h-6 text-emerald-400" />,
    },
    {
      title: 'Personalized Recommendations',
      desc: 'Tailored advice to match your specific gaming, programming, or office workstation needs within your budget.',
      icon: <Sparkles className="w-6 h-6 text-indigo-400" />,
    },
    {
      title: 'Convenient Online Enquiries',
      desc: 'Fast, responsive WhatsApp and web inquiry handling with prompt pricing quotes across Visakhapatnam.',
      icon: <MessageCircle className="w-6 h-6 text-cyan-400" />,
    },
    {
      title: 'Easy Service Booking',
      desc: 'Streamlined online service requests with clear tracking, transparent updates, and phone confirmations.',
      icon: <Clock className="w-6 h-6 text-blue-400" />,
    },
  ];

  // How Our Service Works steps
  const serviceSteps = [
    {
      step: '01',
      title: 'Select Your Service',
      desc: 'Choose from our computer repair, hardware upgrades, maintenance, or OS support solutions.',
    },
    {
      step: '02',
      title: 'Submit Enquiry or Booking',
      desc: 'Fill out our quick online service booking form or send us a message directly on WhatsApp.',
    },
    {
      step: '03',
      title: 'Our Team Contacts You',
      desc: 'Our Vizag technical representative calls to verify problem symptoms and confirm timing.',
    },
    {
      step: '04',
      title: 'Confirm Service Details',
      desc: 'Drop off at our workshop or schedule doorstep assistance. Receive transparent service and prompt handover.',
    },
  ];

  return (
    <div className="w-full flex flex-col bg-slate-950 text-slate-100">
      
      {/* 1. Hero Slideshow Section */}
      <HeroSlideshow
        onNavigate={onNavigate}
        onOpenBooking={() => onOpenBooking()}
        onOpenEnquiry={onOpenEnquiry}
      />

      {/* 2. Section A: Our Services */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Wrench className="w-4 h-4" />
              <span>Expert Technical Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              Our Services
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
              Professional computer troubleshooting, chip-level diagnostics, hardware upgrades, and preventive maintenance in Visakhapatnam.
            </p>
          </div>
          <button
            onClick={() => onNavigate('maintenance')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 self-start md:self-end group cursor-pointer"
          >
            <span>View All Maintenance Solutions</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Services Grid (9 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBookService={(title) => onOpenBooking(title)}
            />
          ))}
        </div>
      </section>

      {/* 3. Section B: Featured Computer Products */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/40 border-y border-slate-900 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Cpu className="w-4 h-4" />
                <span>Genuine Hardware & Peripherals</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
                Featured Computer Products
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
                Explore our top-selling processors, motherboards, SSDs, RAM, monitors, and essential cables. Inquire for the current best price in Vizag.
              </p>
            </div>
            <button
              onClick={() => onNavigate('sales')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-all self-start md:self-end cursor-pointer"
            >
              <span>Explore Complete Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Featured Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEnquirePrice={onEnquireProduct}
              />
            ))}
          </div>

          {/* Quick Category Jump Bar */}
          <div className="mt-12 p-6 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-white">Looking for something specific?</p>
              <p className="text-xs text-slate-400">Motherboards, SSDs, RAM, Monitors, Keyboards, Power Supplies & Cables</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onNavigate('sales', 'Solid State Drives (SSD)')}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded-lg transition-colors"
              >
                SSDs
              </button>
              <button
                onClick={() => onNavigate('sales', 'RAM')}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded-lg transition-colors"
              >
                RAM Modules
              </button>
              <button
                onClick={() => onNavigate('sales', 'Processors')}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded-lg transition-colors"
              >
                Processors
              </button>
              <button
                onClick={() => onNavigate('sales', 'LED Monitors')}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded-lg transition-colors"
              >
                LED Monitors
              </button>
              <button
                onClick={() => onNavigate('sales')}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                All 10 Categories →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section C: Why Choose SUMT Technologies? */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Shield className="w-4 h-4" />
            <span>Reliable IT Excellence In Vizag</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            Why Choose SUMT Technologies?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            We are committed to delivering genuine computer hardware and dependable repair solutions with honesty, technical expertise, and dedicated customer care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChoosePoints.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 transition-all hover:border-slate-700 hover:bg-slate-900/90"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Section D: How Our Service Works */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30 border-t border-slate-900 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider block mb-2">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              How Our Service Works
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2">
              From inquiry to repair completion, we keep the process simple, transparent, and prompt.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceSteps.map((stepItem, idx) => (
              <div
                key={idx}
                className="relative bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-extrabold font-mono text-blue-500/80 mb-3 block">
                    {stepItem.step}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2 font-heading">
                    {stepItem.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {stepItem.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-900 text-[11px] text-cyan-400 font-semibold flex items-center gap-1">
                  <span>Step {idx + 1} of 4</span>
                  {idx < 3 && <ChevronRight className="w-3.5 h-3.5 ml-auto text-slate-600" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Section E: Call-to-Action Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 p-8 sm:p-12 shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider block mb-2">
              Fast & Reliable Support in Visakhapatnam
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 font-heading">
              Need Computer Support Today?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-8 leading-relaxed">
              Contact SUMT Technologies for computer sales, hardware upgrades, and maintenance services. Our technician is ready to assist you.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              {/* Call Now */}
              <a
                href={`tel:${WHATSAPP_PHONE}`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm sm:text-base rounded-xl transition-all shadow-lg hover:shadow-white/20"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Call Now: {PHONE_DISPLAY}</span>
              </a>

              {/* WhatsApp Us */}
              <a
                href={getWhatsAppUrl(WHATSAPP_TEMPLATES.generalEnquiry)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-lg shadow-emerald-700/30"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>

              {/* Book a Service */}
              <button
                onClick={() => onOpenBooking()}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base rounded-xl border border-slate-700 backdrop-blur-md transition-all cursor-pointer"
              >
                <Wrench className="w-4 h-4 text-cyan-400" />
                <span>Book a Service</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
