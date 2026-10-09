import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  MessageCircle, 
  Wrench, 
  Sparkles,
  ShoppingBag,
  Cpu,
  HardDrive,
  Monitor
} from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES } from '../utils/whatsapp';

interface SlideItem {
  id: number;
  tag: string;
  tagIcon: React.ReactNode;
  heading: string;
  description: string;
  image: string;
  primaryBtn: {
    label: string;
    action: () => void;
    icon?: React.ReactNode;
  };
  secondaryBtn?: {
    label: string;
    action: () => void;
    icon?: React.ReactNode;
    isWhatsApp?: boolean;
    href?: string;
  };
}

interface HeroSlideshowProps {
  onNavigate: (tab: string, category?: string) => void;
  onOpenBooking: () => void;
  onOpenEnquiry: (type?: string, subject?: string) => void;
}

export const HeroSlideshow: React.FC<HeroSlideshowProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenEnquiry,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides: SlideItem[] = [
    // Slide 1 — Computer Sales
    {
      id: 1,
      tag: 'Computer Sales & Systems',
      tagIcon: <ShoppingBag className="w-4 h-4 text-cyan-400" />,
      heading: 'Power Your World with the Right Technology',
      description: 'Explore quality computers, laptops, hardware components, and accessories at competitive prices in Visakhapatnam.',
      image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1920&q=85',
      primaryBtn: {
        label: 'Explore Products',
        action: () => onNavigate('sales'),
        icon: <ArrowRight className="w-4 h-4" />,
      },
      secondaryBtn: {
        label: 'Enquire Now',
        action: () => onOpenEnquiry('Sales', 'Inquiry for Computer Sales & Systems'),
      },
    },

    // Slide 2 — Computer Hardware Components
    {
      id: 2,
      tag: 'Genuine Hardware Components',
      tagIcon: <Cpu className="w-4 h-4 text-cyan-400" />,
      heading: 'Quality Computer Hardware You Can Trust',
      description: 'Find the right components for upgrades, replacements, gaming PCs, and professional workstations from top brands.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=85',
      primaryBtn: {
        label: 'Explore Hardware',
        action: () => onNavigate('sales', 'Motherboards'),
        icon: <ArrowRight className="w-4 h-4" />,
      },
      secondaryBtn: {
        label: 'Talk to Expert',
        action: () => onOpenEnquiry('Sales', 'Hardware Component Recommendations'),
      },
    },

    // Slide 3 — Storage Solutions
    {
      id: 3,
      tag: 'Fast SSDs & Reliable Storage',
      tagIcon: <HardDrive className="w-4 h-4 text-cyan-400" />,
      heading: 'Upgrade Your Speed. Expand Your Storage.',
      description: 'Discover ultra-fast SSDs, reliable hard drives, high-capacity pen drives, and essential storage accessories for home & business.',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1920&q=85',
      primaryBtn: {
        label: 'Get a Quote',
        action: () => onOpenEnquiry('Product Price Quote', 'SSD & Storage Quote Request'),
        icon: <ArrowRight className="w-4 h-4" />,
      },
      secondaryBtn: {
        label: 'View SSD Catalogue',
        action: () => onNavigate('sales', 'Solid State Drives (SSD)'),
      },
    },

    // Slide 4 — Monitors and Accessories
    {
      id: 4,
      tag: 'Displays & Peripherals',
      tagIcon: <Monitor className="w-4 h-4 text-cyan-400" />,
      heading: 'Everything Your Computer Needs',
      description: 'Find reliable accessories, gaming monitors, mechanical keyboards, precision mice, and high-speed connectivity solutions.',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1920&q=85',
      primaryBtn: {
        label: 'Enquire About Products',
        action: () => onOpenEnquiry('Sales', 'Monitors & Computer Accessories'),
        icon: <ArrowRight className="w-4 h-4" />,
      },
      secondaryBtn: {
        label: 'Browse Accessories',
        action: () => onNavigate('sales', 'Keyboards & Mice'),
      },
    },

    // Slide 5 — Computer Repair and Maintenance
    {
      id: 5,
      tag: 'Vizag Service Workshop',
      tagIcon: <Wrench className="w-4 h-4 text-cyan-400" />,
      heading: 'Computer Problems? We’re Here to Help.',
      description: 'Get professional computer troubleshooting, hardware upgrades, motherboard diagnostics, software support, and preventive maintenance.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=85',
      primaryBtn: {
        label: 'Book a Repair',
        action: () => onOpenBooking(),
        icon: <Wrench className="w-4 h-4" />,
      },
      secondaryBtn: {
        label: 'Chat on WhatsApp',
        action: () => {
          window.open(getWhatsAppUrl(WHATSAPP_TEMPLATES.serviceBooking), '_blank');
        },
        icon: <MessageCircle className="w-4 h-4 text-emerald-400" />,
        isWhatsApp: true,
      },
    },
  ];

  // Autoplay functionality: changes every 4.5 seconds unless user hovers or interacts
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, slides.length]);

  const handlePrev = () => {
    setIsPaused(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsPaused(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleDotClick = (index: number) => {
    setIsPaused(true);
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];

  return (
    <div
      className="relative w-full h-[580px] sm:h-[620px] lg:h-[680px] overflow-hidden bg-slate-950 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
    >
      {/* Background Slides with smooth fade/zoom */}
      {slides.map((s, idx) => {
        const isActive = idx === currentSlide;
        return (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with slight scale effect */}
            <img
              src={s.image}
              alt={s.heading}
              className={`w-full h-full object-cover object-center transform transition-transform duration-7000 ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />
            {/* Dark gradient overlay engineered for high text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
          </div>
        );
      })}

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl lg:max-w-3xl">
          
          {/* Slide Tag / Category kicker (No-pill discipline) */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-cyan-400">{slide.tagIcon}</span>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-400">
              {slide.tag}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-300 font-medium">
              SUMT Technologies · Vizag
            </span>
          </div>

          {/* Bold Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-5 font-heading">
            {slide.heading}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
            {slide.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={slide.primaryBtn.action}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all border border-blue-400/30 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <span>{slide.primaryBtn.label}</span>
              {slide.primaryBtn.icon}
            </button>

            {slide.secondaryBtn && (
              <button
                onClick={slide.secondaryBtn.action}
                className={`inline-flex items-center gap-2 px-6 py-3.5 font-semibold text-base rounded-xl backdrop-blur-md transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
                  slide.secondaryBtn.isWhatsApp
                    ? 'bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-900/20'
                    : 'bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 text-slate-100 hover:text-white'
                }`}
              >
                {slide.secondaryBtn.icon}
                <span>{slide.secondaryBtn.label}</span>
              </button>
            )}
          </div>

          {/* Micro trust indicators */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Vizag Store & Workshop Open</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-blue-400 font-bold">✓</span>
              <span>Genuine Hardware Parts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-cyan-400 font-bold">✓</span>
              <span>Fast Diagnostic & Repair</span>
            </div>
          </div>

        </div>
      </div>

      {/* Manual Navigation Arrows */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/70 hover:bg-slate-800/90 text-white border border-slate-700/80 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-105 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/70 hover:bg-slate-800/90 text-white border border-slate-700/80 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-105 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators (Dots + Slide numbers) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-slate-950/80 px-4 py-2 rounded-full border border-slate-800 backdrop-blur-md">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
              idx === currentSlide
                ? 'w-8 h-2.5 bg-blue-500'
                : 'w-2.5 h-2.5 bg-slate-600 hover:bg-slate-400'
            }`}
          />
        ))}
        <span className="text-[11px] font-mono text-slate-400 ml-1">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>

    </div>
  );
};
