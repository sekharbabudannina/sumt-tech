import React from 'react';
import { 
  Wrench, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Laptop, 
  Bug, 
  HardDrive, 
  Sliders, 
  Printer, 
  Clock, 
  ArrowRight 
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
  onBookService: (serviceTitle: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBookService }) => {
  const renderIcon = (name: string) => {
    const props = { className: 'w-6 h-6 text-cyan-400' };
    switch (name) {
      case 'Wrench': return <Wrench {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Laptop': return <Laptop {...props} />;
      case 'Bug': return <Bug {...props} />;
      case 'HardDrive': return <HardDrive {...props} />;
      case 'Sliders': return <Sliders {...props} />;
      case 'Printer': return <Printer {...props} />;
      default: return <Wrench {...props} />;
    }
  };

  return (
    <div className="group relative flex flex-col bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/40">
      
      {/* Top Header with Icon and Turnaround */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800/50 flex items-center justify-center group-hover:scale-105 group-hover:border-cyan-500/60 transition-all">
          {renderIcon(service.iconName)}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          <span>{service.turnaroundTime}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-300 leading-relaxed mb-4 flex-grow">
        {service.shortDesc}
      </p>

      {/* Common Issues list */}
      <div className="mb-6 pt-3 border-t border-slate-800/80">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
          Common Problems We Fix:
        </span>
        <ul className="space-y-1.5">
          {service.commonIssues.slice(0, 2).map((issue, idx) => (
            <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
              <span className="text-cyan-400 font-bold mt-0.5">•</span>
              <span>{issue}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action CTA */}
      <button
        onClick={() => onBookService(service.title)}
        className="w-full mt-auto inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-800 hover:bg-blue-600 text-white font-semibold text-sm rounded-xl border border-slate-700 hover:border-blue-500 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 group/btn"
      >
        <span>Book Service</span>
        <ArrowRight className="w-4 h-4 text-cyan-400 group-hover/btn:translate-x-1 group-hover/btn:text-white transition-all" />
      </button>

    </div>
  );
};
