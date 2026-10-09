import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Wrench, 
  Calendar, 
  Clock, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  MessageCircle,
  Laptop,
  Sparkles
} from 'lucide-react';
import { getBookingConfirmationWhatsAppUrl } from '../utils/whatsapp';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Desktop and Laptop Repair',
}) => {
  const [formData, setFormData] = useState({
    customerName: '',
    mobileNumber: '',
    whatsappNumber: '',
    email: '',
    deviceType: 'Laptop',
    brandModel: '',
    serviceRequired: initialService,
    problemDescription: '',
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: 'Morning (10:00 AM – 1:00 PM)',
    serviceLocation: 'Visakhapatnam (Doorstep / Workshop)',
    additionalNotes: '',
    honeypot: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successBooking, setSuccessBooking] = useState<{
    id: string;
    customerName: string;
    deviceType: string;
    serviceRequired: string;
    message: string;
  } | null>(null);

  if (!isOpen) return null;

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
      setError('Please fill in required fields: Name, Mobile Number, and Problem Description.');
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

      setSuccessBooking({
        id: data.bookingId,
        customerName: formData.customerName,
        deviceType: formData.deviceType,
        serviceRequired: formData.serviceRequired,
        message: data.message,
      });
    } catch (err: any) {
      setError(err.message || 'Unable to connect to service server. Please contact 9398808876 directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccessBooking(null);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl my-8 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-cyan-400">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
                Book a Computer Repair or Service
              </h3>
              <p className="text-xs text-slate-400">
                SUMT Technologies · Visakhapatnam Workshop & Support
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {successBooking ? (
              <motion.div
                key="booking-success"
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-center py-6 space-y-5"
              >
                {/* Animated checkmark icon with pulse ring */}
                <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [1, 1.3, 1.1], opacity: [0.6, 0.2, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-full bg-emerald-500/30"
                  />
                  <motion.div
                    initial={{ scale: 0, rotate: -25 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22, delay: 0.1 }}
                    className="relative w-16 h-16 bg-emerald-500/20 border-2 border-emerald-400 rounded-full flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20"
                  >
                    <CheckCircle className="w-9 h-9 text-emerald-400" />
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <h4 className="text-2xl font-bold text-white mb-2 font-heading">
                    Service Request Received
                  </h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{successBooking.customerName}</strong>! Your computer service request has been logged.
                  </p>
                </motion.div>

                {/* Booking Reference Box */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 }}
                  className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-w-md mx-auto text-left space-y-2 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs text-slate-400">Reference ID:</span>
                    <span className="font-mono text-sm font-bold text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                      {successBooking.id}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>Device:</span>
                    <span className="font-semibold text-white">{successBooking.deviceType}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>Service:</span>
                    <span className="font-semibold text-white">{successBooking.serviceRequired}</span>
                  </div>
                </motion.div>

                {/* Notice regarding confirmation */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 }}
                  className="p-4 bg-amber-950/40 border border-amber-800/60 rounded-xl text-left max-w-md mx-auto"
                >
                  <p className="text-xs text-amber-300 leading-relaxed">
                    <strong>Important Notice:</strong> This request is not a confirmed appointment until SUMT Technologies contacts you to confirm the time and technician availability.
                  </p>
                </motion.div>

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="pt-3 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <a
                    href={getBookingConfirmationWhatsAppUrl(
                      successBooking.id,
                      successBooking.customerName,
                      successBooking.deviceType,
                      successBooking.serviceRequired
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-700/20 active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Notify via WhatsApp</span>
                  </a>
                  <button
                    onClick={handleReset}
                    className="py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl transition-all active:scale-95 cursor-pointer"
                  >
                    Done
                  </button>
                </motion.div>

              </motion.div>
            ) : (
              <motion.form
                key="booking-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
              
              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              {/* Honeypot for spam bots */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Row 1: Name and Mobile Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Customer Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="e.g. Suresh Varma"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Mobile Number <span className="text-red-400">*</span>
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

              {/* Row 2: WhatsApp Number and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    WhatsApp Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    placeholder="If different from mobile"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. suresh@gmail.com"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Row 3: Device Type & Brand/Model */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Device Type <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="deviceType"
                    value={formData.deviceType}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="Desktop">Desktop PC</option>
                    <option value="Laptop">Laptop</option>
                    <option value="All-in-One">All-in-One PC</option>
                    <option value="Server / Workstation">Server / Workstation</option>
                    <option value="Other">Other Computer Equipment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Brand and Model
                  </label>
                  <input
                    type="text"
                    name="brandModel"
                    value={formData.brandModel}
                    onChange={handleChange}
                    placeholder="e.g. Dell Inspiron 15, HP Pavilion, Custom Gaming PC"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Service Required */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Service Required <span className="text-red-400">*</span>
                </label>
                <select
                  name="serviceRequired"
                  value={formData.serviceRequired}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="Desktop and Laptop Repair">Desktop and Laptop Repair</option>
                  <option value="Computer Maintenance">Computer Maintenance & Deep Clean</option>
                  <option value="Hardware Troubleshooting">Hardware Troubleshooting & Diagnostics</option>
                  <option value="RAM and SSD Upgrades">RAM and SSD Upgrades</option>
                  <option value="Windows Installation and Software Support">Windows Installation & Software Support</option>
                  <option value="Virus and Malware Removal">Virus and Malware Removal</option>
                  <option value="Data Backup and Storage Support">Data Backup and Storage Support</option>
                  <option value="Computer Assembly and Upgrades">Computer Assembly and Custom PC Build</option>
                  <option value="Printer and Peripheral Support">Printer and Peripheral Support</option>
                  <option value="General Inspection">General Inspection / Other</option>
                </select>
              </div>

              {/* Problem Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Problem Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  name="problemDescription"
                  value={formData.problemDescription}
                  onChange={handleChange}
                  placeholder="Describe symptoms: e.g. blue screen error, laptop overheating, won't power on, very slow performance, etc."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Preferred Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    Preferred Service Date
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
                    Preferred Time
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

              {/* Service Location or Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  Service Location or Area in Vizag
                </label>
                <input
                  type="text"
                  name="serviceLocation"
                  value={formData.serviceLocation}
                  onChange={handleChange}
                  placeholder="e.g. Dwaraka Nagar, MVP Colony, Gajuwaka, Madhurawada, or Workshop Drop-off"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Additional Notes (Optional)
                </label>
                <input
                  type="text"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  placeholder="e.g. Please bring extra 8GB RAM, charger is working."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Notice */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                ℹ️ Note: Submitting this form creates a priority ticket. Our technician will verify the issue and call or message you to finalize scheduling.
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 disabled:from-blue-800 disabled:to-blue-900 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Service Request</span>
                    </>
                  )}
                </button>
              </div>

            </motion.form>
          )}
        </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
