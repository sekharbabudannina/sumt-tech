import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, 
  ShieldCheck, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  MessageCircle, 
  Phone, 
  Laptop, 
  HardDrive, 
  Cpu, 
  Calendar, 
  MapPin, 
  Send 
} from 'lucide-react';
import { SERVICES } from '../data/services';
import { PHONE_DISPLAY, WHATSAPP_PHONE, getWhatsAppUrl, getBookingConfirmationWhatsAppUrl } from '../utils/whatsapp';

interface MaintenancePageProps {
  onOpenBookingModal: (service?: string) => void;
}

export const MaintenancePage: React.FC<MaintenancePageProps> = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    mobileNumber: '',
    whatsappNumber: '',
    email: '',
    deviceType: 'Laptop',
    brandModel: '',
    serviceRequired: 'Desktop and Laptop Repair',
    problemDescription: '',
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: 'Morning (10:00 AM – 1:00 PM)',
    serviceLocation: 'Visakhapatnam (Doorstep / Workshop)',
    additionalNotes: '',
    honeypot: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedBooking, setSubmittedBooking] = useState<{
    id: string;
    customerName: string;
    deviceType: string;
    serviceRequired: string;
    message: string;
  } | null>(null);

  const maintenanceCategories = [
    { title: 'Desktop Repair', desc: 'Power failure, SMPS faults, CPU overheating, motherboard chip-level repair.' },
    { title: 'Laptop Repair', desc: 'Broken screens, hinge fabrication, keyboard keys replacement, charging port fixing.' },
    { title: 'Hardware Replacement', desc: 'Genuine replacement of cooling fans, motherboard capacitors, ICs, and ports.' },
    { title: 'SSD and RAM Upgrades', desc: 'Supercharge slow PCs with high speed NVMe/SATA SSDs and dual-channel memory.' },
    { title: 'Operating System Installation', desc: 'Genuine Windows 11 / 10 clean install with all drivers and security updates.' },
    { title: 'Software Troubleshooting', desc: 'Resolving blue screens (BSOD), driver conflicts, and application errors.' },
    { title: 'Virus Removal', desc: 'Deep malware, spyware, browser adware, and ransomware threat eradication.' },
    { title: 'Preventive Maintenance', desc: 'Deep dust clearance, arctic MX-4 thermal paste renewal, fan lubrication.' },
    { title: 'Office Computer Maintenance', desc: 'Comprehensive multi-PC maintenance for offices, clinics, and commercial spaces.' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.honeypot) return; // bot detection

    if (!formData.customerName.trim() || !formData.mobileNumber.trim() || !formData.problemDescription.trim()) {
      setError('Please provide Customer Name, Mobile Number, and Problem Description.');
      return;
    }

    if (formData.mobileNumber.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit service booking');
      }

      setSubmittedBooking({
        id: data.bookingId,
        customerName: formData.customerName,
        deviceType: formData.deviceType,
        serviceRequired: formData.serviceRequired,
        message: data.message,
      });

      // Scroll smoothly to confirmation
      window.scrollTo({ top: 300, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || 'Unable to connect to service server. Please call 9398808876 directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setSubmittedBooking(null);
    setFormData({
      customerName: '',
      mobileNumber: '',
      whatsappNumber: '',
      email: '',
      deviceType: 'Laptop',
      brandModel: '',
      serviceRequired: 'Desktop and Laptop Repair',
      problemDescription: '',
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: 'Morning (10:00 AM – 1:00 PM)',
      serviceLocation: 'Visakhapatnam (Doorstep / Workshop)',
      additionalNotes: '',
      honeypot: '',
    });
  };

  return (
    <div className="w-full bg-slate-950 text-slate-100 min-h-screen">
      
      {/* Repair Workshop Hero Section */}
      <div className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=85"
            alt="Computer repair workshop technician at work"
            className="w-full h-full object-cover object-center filter brightness-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Wrench className="w-4 h-4" />
              <span>Visakhapatnam Certified Technical Center</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 font-heading">
              Computer Repair & Maintenance Services
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-6 leading-relaxed">
              Fast, reliable troubleshooting and component repair for all desktop brands, gaming rigs, and laptops in Visakhapatnam. Genuine spare parts with guaranteed satisfaction.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Same-Day Diagnostic Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Chip-Level Motherboard Repair</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-blue-400 font-bold">✓</span>
                <span>Zero Data Loss Policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Service Categories List */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider block mb-1">
                Our Core Services
              </span>
              <h2 className="text-2xl font-extrabold text-white font-heading">
                Comprehensive PC Repair Solutions
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                We handle common and complex problems across all computer models. Select any service to pre-fill the booking form.
              </p>
            </div>

            <div className="space-y-3">
              {maintenanceCategories.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setFormData((p) => ({ ...p, serviceRequired: item.title }))}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    formData.serviceRequired === item.title
                      ? 'bg-blue-950/60 border-blue-500/80 shadow-md shadow-blue-950/40'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {item.title}
                    </h3>
                    {formData.serviceRequired === item.title && (
                      <span className="text-[10px] uppercase font-bold text-cyan-300">Selected</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-3.5">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Need Direct Help Banner */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Prefer to Speak Directly?</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Call our Vizag workshop directly to describe your issue and get an immediate turnaround estimate.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href={`tel:${WHATSAPP_PHONE}`}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Call {PHONE_DISPLAY}
                </a>
                <a
                  href={getWhatsAppUrl(`Hello SUMT Technologies, I need urgent computer repair support in Vizag.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  WhatsApp Now
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Online Service Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
              
              <div className="mb-6 pb-6 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                  Online Service Booking
                </span>
                <h3 className="text-2xl font-bold text-white font-heading">
                  Schedule Your Computer Repair
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Fill in your device details below. Our technicians in Visakhapatnam will review your request and contact you to confirm timing.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {submittedBooking ? (
                  /* Success View */
                  <motion.div
                    key="maint-success"
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center py-8 space-y-6"
                  >
                    <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: [1, 1.35, 1.1], opacity: [0.6, 0.2, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-full bg-emerald-500/30"
                      />
                      <motion.div
                        initial={{ scale: 0, rotate: -25 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 22, delay: 0.1 }}
                        className="relative w-16 h-16 bg-emerald-500/20 border-2 border-emerald-400 rounded-full flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/25"
                      >
                        <CheckCircle className="w-9 h-9" />
                      </motion.div>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <h4 className="text-2xl font-bold text-white mb-2 font-heading">
                        Service Request Submitted!
                      </h4>
                      <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                        Thank you, <strong className="text-white">{submittedBooking.customerName}</strong>. Your computer service request has been logged in our system.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.22 }}
                      className="bg-slate-950 p-5 rounded-xl border border-slate-800 max-w-md mx-auto text-left space-y-2.5 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                        <span className="text-xs text-slate-400">Booking Reference:</span>
                        <span className="font-mono text-sm font-bold text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                          {submittedBooking.id}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span>Device:</span>
                        <span className="font-semibold text-white">{submittedBooking.deviceType}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span>Requested Service:</span>
                        <span className="font-semibold text-white">{submittedBooking.serviceRequired}</span>
                      </div>
                    </motion.div>

                    {/* Clarification prompt requirement */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.28 }}
                      className="p-4 bg-amber-950/40 border border-amber-800/60 rounded-xl text-left max-w-md mx-auto"
                    >
                      <div className="flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-300 leading-relaxed">
                          <strong>Please Note:</strong> This submission is a service request and is <strong>not a confirmed appointment</strong> until a SUMT Technologies representative contacts you to confirm the time and technician availability.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                    >
                      <a
                        href={getBookingConfirmationWhatsAppUrl(
                          submittedBooking.id,
                          submittedBooking.customerName,
                          submittedBooking.deviceType,
                          submittedBooking.serviceRequired
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-700/20 active:scale-95"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Send to SUMT WhatsApp</span>
                      </a>
                      <button
                        onClick={handleResetForm}
                        className="py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl transition-all active:scale-95 cursor-pointer"
                      >
                        Book Another Device
                      </button>
                    </motion.div>
                  </motion.div>
                ) : (
                  /* The Full 11-Field Form */
                  <motion.form
                    key="maint-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                  
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {error && (
                    <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* 1 & 2. Customer Name & Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        1. Customer Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        placeholder="e.g. K. Venkat Rao"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        2. Mobile Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        placeholder="e.g. 9398808876"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* 3 & 4. WhatsApp Number & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        3. WhatsApp Number (Optional)
                      </label>
                      <input
                        type="tel"
                        name="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={handleChange}
                        placeholder="For service status updates"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        4. Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. venkat@example.com"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* 5 & 6. Device Type & Brand and Model */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        5. Device Type <span className="text-red-400">*</span>
                      </label>
                      <select
                        name="deviceType"
                        value={formData.deviceType}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="Laptop">Laptop</option>
                        <option value="Desktop">Desktop PC</option>
                        <option value="All-in-One">All-in-One PC</option>
                        <option value="Other">Other Computer Equipment</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        6. Brand and Model
                      </label>
                      <input
                        type="text"
                        name="brandModel"
                        value={formData.brandModel}
                        onChange={handleChange}
                        placeholder="e.g. HP Pavilion 15 / Dell Vostro / Lenovo ThinkPad"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* 7. Service Required */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      7. Service Required <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                    >
                      {maintenanceCategories.map((m, i) => (
                        <option key={i} value={m.title}>{m.title}</option>
                      ))}
                    </select>
                  </div>

                  {/* 8. Problem Description */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      8. Problem Description <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      name="problemDescription"
                      value={formData.problemDescription}
                      onChange={handleChange}
                      placeholder="Please specify what happened (e.g. laptop suddenly shut down, screen flickering, hard drive clicking, needs thermal paste renewal, Windows crashing)..."
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* 9 & 10. Preferred Service Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        9. Preferred Service Date
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        10. Preferred Time
                      </label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="Morning (10:00 AM – 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
                        <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1:00 PM – 4:00 PM)</option>
                        <option value="Evening (4:00 PM – 8:00 PM)">Evening (4:00 PM – 8:00 PM)</option>
                        <option value="Anytime during working hours">Anytime during working hours</option>
                      </select>
                    </div>
                  </div>

                  {/* 11. Service Location or Address */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      11. Service Location or Address in Vizag
                    </label>
                    <input
                      type="text"
                      name="serviceLocation"
                      value={formData.serviceLocation}
                      onChange={handleChange}
                      placeholder="e.g. Door No, Street, MVP Colony, Visakhapatnam / Or Workshop Drop-in"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* 12. Additional Notes */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      12. Additional Notes (Optional)
                    </label>
                    <input
                      type="text"
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleChange}
                      placeholder="e.g. Please bring extra 512GB SSD clone kit, charger included"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Submitting Service Request...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Submit Service Request</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-slate-500 text-center mt-2.5">
                      By submitting, your request is logged with SUMT Technologies Visakhapatnam. We never share customer phone numbers or details.
                    </p>
                  </div>

                </motion.form>
              )}
            </AnimatePresence>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
