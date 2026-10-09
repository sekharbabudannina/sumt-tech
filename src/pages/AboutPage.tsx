import React from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Wrench, 
  Target, 
  MapPin, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight,
  HardDrive
} from 'lucide-react';
import { PHONE_DISPLAY, WHATSAPP_PHONE, getWhatsAppUrl, WHATSAPP_TEMPLATES } from '../utils/whatsapp';

interface AboutPageProps {
  onNavigate: (tab: string) => void;
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <div className="w-full bg-slate-950 text-slate-100 min-h-screen">
      
      {/* Hero Header */}
      <div className="border-b border-slate-800/80 bg-slate-900/40 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Cpu className="w-4 h-4" />
              <span>About SUMT Technologies</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 font-heading">
              Your Trusted Partner for Computer Sales & Services in Vizag
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Based in Visakhapatnam (Vizag), Andhra Pradesh, SUMT Technologies delivers dependable computer hardware, genuine peripherals, laptop repair, and proactive IT maintenance tailored to home users, students, and businesses.
            </p>
          </div>
        </div>
      </div>

      {/* Main Story & Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-2">
                Company Introduction
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                Dedicated Technical Expertise Right in Visakhapatnam
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              At SUMT Technologies, we understand that a malfunctioning desktop or slow laptop can bring your work, studies, or business operations to an immediate halt. Our primary aim is to offer transparent diagnostics, genuine replacement components, and fast turnaround so that your computing environment runs smoothly without disruption.
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Whether you are upgrading an older laptop with a solid-state drive (SSD) for 10x boot speed, setting up a new gaming PC, replacing a cracked screen, or procuring high-speed network cables for an office setup, our team focuses on quality components and dependable service.
            </p>

            {/* Core commitments */}
            <div className="pt-2 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Genuine Hardware & Transparent Pricing</h4>
                  <p className="text-xs text-slate-400">Direct sourcing of quality components with official manufacturer warranties.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Component-Level Diagnostic Approach</h4>
                  <p className="text-xs text-slate-400">We isolate the exact root cause before recommending any replacement or upgrade.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Customer-First Communication</h4>
                  <p className="text-xs text-slate-400">Direct phone and WhatsApp support so you are always updated on your repair status.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1200&q=85"
                alt="SUMT Technologies hardware workshop and computer technician workspace"
                className="w-full h-[420px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-800">
                <p className="text-xs font-bold text-white">Visakhapatnam Technical Workshop</p>
                <p className="text-[11px] text-slate-400">Equipped for chip-level repair, SSD cloning, and custom assemblies.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Mission & Service Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-800/60 flex items-center justify-center text-cyan-400 mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-heading">
              Our Mission
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              To be the most reliable and transparent technology partner in Visakhapatnam by providing honest technical advice, quality hardware parts, and prompt computer repair solutions.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-800/60 flex items-center justify-center text-blue-400 mb-4">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-heading">
              Reliable Technical Support
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We stand by our repairs with careful post-service testing, thermal stress benchmarking, and dedicated after-service guidance for all serviced machines.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-800/60 flex items-center justify-center text-emerald-400 mb-4">
              <HardDrive className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-heading">
              Hardware Solutions
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              From motherboards, processors, and RAM to specialized surveillance HDDs and ultra-fast NVMe SSDs, we keep essential computer parts readily available in Vizag.
            </p>
          </div>

        </div>

        {/* Location & Contact CTA Box */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4" />
              <span>Visakhapatnam, Andhra Pradesh</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-2">
              Ready to Upgrade or Repair Your Computer?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Visit our workshop or contact us online. Our technician will assist with personalized hardware recommendations or prompt repair scheduling.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              Book a Service
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-all cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
