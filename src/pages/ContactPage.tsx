import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Mail, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Navigation,
  ExternalLink
} from 'lucide-react';
import { PHONE_DISPLAY, WHATSAPP_PHONE, getWhatsAppUrl, WHATSAPP_TEMPLATES } from '../utils/whatsapp';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    enquiryType: 'General Enquiry',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

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

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setError('Please provide your Full Name, Phone Number, and Message.');
      return;
    }

    if (formData.phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setSubmittedId(data.enquiryId);
    } catch (err: any) {
      setError(err.message || 'Server connection error. Please call 9398808876 directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmittedId(null);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      enquiryType: 'General Enquiry',
      subject: '',
      message: '',
      honeypot: '',
    });
  };

  // Visakhapatnam directions URL
  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=Visakhapatnam+Andhra+Pradesh+India`;

  return (
    <div className="w-full bg-slate-950 text-slate-100 min-h-screen">
      
      {/* Header Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/40 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider block mb-2">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3 font-heading">
              Contact SUMT Technologies
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Have a computer repair question, need a product quote, or looking for hardware upgrades in Visakhapatnam? Call, WhatsApp, or send us a message below.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Business Info, Call/WhatsApp, Map & Hours */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Quick Contact Cards */}
            <div className="space-y-4">
              
              {/* Telephone Click-to-Call */}
              <a
                href={`tel:${WHATSAPP_PHONE}`}
                className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Click to Call Us
                  </span>
                  <span className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors block">
                    {PHONE_DISPLAY}
                  </span>
                  <p className="text-xs text-slate-400 mt-1">
                    Direct voice support for urgent PC repair & inquiries
                  </p>
                </div>
              </a>

              {/* WhatsApp Chat Button */}
              <a
                href={getWhatsAppUrl(WHATSAPP_TEMPLATES.generalEnquiry)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 rounded-2xl bg-emerald-950/30 hover:bg-emerald-950/50 border border-emerald-500/30 hover:border-emerald-500/60 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-900/40 border border-emerald-500/50 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-0.5">
                    WhatsApp Chat Support
                  </span>
                  <span className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors block">
                    +91 {PHONE_DISPLAY}
                  </span>
                  <p className="text-xs text-slate-400 mt-1">
                    Send photos of device errors, request hardware quotes
                  </p>
                </div>
              </a>

              {/* Location Address Card */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Business Location
                    </span>
                    <h3 className="text-base font-bold text-white">
                      SUMT Technologies
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Visakhapatnam (Vizag), Andhra Pradesh, India
                    </p>
                    <a
                      href={googleMapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 mt-3"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Directions on Google Maps</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-950/80 border border-indigo-800/60 flex items-center justify-center text-indigo-400 shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div className="w-full">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Business Hours
                    </span>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-800/60">
                        <span className="text-slate-300">Monday – Saturday</span>
                        <span className="font-semibold text-white">9:30 AM – 8:30 PM</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800/60">
                        <span className="text-slate-300">Sunday</span>
                        <span className="font-semibold text-cyan-400">10:00 AM – 2:00 PM / On-Call</span>
                      </div>
                      <div className="flex justify-between py-1 text-slate-400 text-[11px]">
                        <span>Emergency Assistance</span>
                        <span className="text-emerald-400 font-semibold">WhatsApp Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Vizag Map Representation Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-lg">
              <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-white">Service Area: Visakhapatnam City</span>
                </div>
                <span className="text-[11px] text-slate-400">Andhra Pradesh</span>
              </div>
              <div className="relative h-48 bg-slate-950 flex items-center justify-center overflow-hidden">
                {/* Tech Map Stylized Overlay */}
                <div className="absolute inset-0 bg-tech-grid opacity-30" />
                <div className="relative z-10 text-center p-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600/30 border border-blue-400 flex items-center justify-center mx-auto mb-2 text-cyan-300 animate-pulse">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-bold text-white">Visakhapatnam, AP</p>
                  <p className="text-xs text-slate-400 mt-0.5">Dwaraka Nagar · MVP Colony · Gajuwaka · Madhurawada</p>
                  <a
                    href={googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/40 text-cyan-300 border border-cyan-500/30 text-xs font-semibold rounded-lg transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Online Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
              
              <div className="mb-6 pb-6 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                  Online Enquiry Form
                </span>
                <h2 className="text-2xl font-bold text-white font-heading">
                  Send Us an Inquiry
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Fill in your requirements below. Our technical team in Visakhapatnam will review your message and reply promptly.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {submittedId ? (
                  <motion.div
                    key="contact-success"
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
                      <h3 className="text-2xl font-bold text-white mb-2 font-heading">
                        Enquiry Received!
                      </h3>
                      <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                        Thank you for contacting SUMT Technologies. Your message has been logged under reference number:
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.22 }}
                      className="inline-block bg-slate-950 px-5 py-2.5 rounded-xl border border-slate-800 font-mono text-base font-bold text-cyan-400 shadow-inner"
                    >
                      {submittedId}
                    </motion.div>

                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      We typically respond within 1-2 business hours during working times.
                    </p>

                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.28 }}
                      className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                    >
                      <a
                        href={getWhatsAppUrl(`Hello SUMT Technologies, I just submitted an enquiry [${submittedId}]. Please check and assist me.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-700/20 active:scale-95"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Follow-up on WhatsApp</span>
                      </a>
                      <button
                        onClick={handleReset}
                        className="py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl transition-all active:scale-95 cursor-pointer"
                      >
                        Submit Another
                      </button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                  
                  {/* Spam honeypot */}
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

                  {/* Full Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Anand Sharma"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 9398808876"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Email & Enquiry Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. anand@example.com"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Enquiry Type <span className="text-red-400">*</span>
                      </label>
                      <select
                        name="enquiryType"
                        value={formData.enquiryType}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="General Enquiry">General Enquiry</option>
                        <option value="Sales">Sales & Hardware Quotes</option>
                        <option value="Maintenance">Computer Repair & Maintenance</option>
                      </select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Quotation for 1TB SSD & RAM upgrade / Laptop hinge repair"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please provide details of your inquiry, model number, or questions..."
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 disabled:from-blue-800 disabled:to-blue-900 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Submit Online Enquiry</span>
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
      </div>

    </div>
  );
};
