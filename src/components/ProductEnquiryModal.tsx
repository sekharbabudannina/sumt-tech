import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle, AlertCircle, Loader2, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { getProductWhatsAppUrl } from '../utils/whatsapp';

interface ProductEnquiryModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductEnquiryModal: React.FC<ProductEnquiryModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ id: string; message: string } | null>(null);

  if (!isOpen || !product) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (honeypot) return; // bot

    if (!fullName.trim() || !phone.trim()) {
      setError('Please provide your name and phone number.');
      return;
    }

    if (phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          enquiryType: 'Product Price Quote',
          subject: `Price & Availability: ${product.name}`,
          productName: product.name,
          productCategory: product.category,
          message: message.trim() || `Inquiring for current best price, warranty, and availability in Vizag for ${product.name}.`,
          honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setSuccessData({
        id: data.enquiryId || 'SUMT-ENQ-2026',
        message: data.message || 'Your product enquiry has been received.',
      });
    } catch (err: any) {
      setError(err.message || 'Could not connect to server. Please call 9398808876 directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccessData(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div>
            <h3 className="text-lg font-bold text-white font-heading">
              Enquire for Price & Availability
            </h3>
            <p className="text-xs text-slate-400">
              SUMT Technologies · Visakhapatnam
            </p>
          </div>
          <button
            onClick={handleReset}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {successData ? (
              <motion.div
                key="prod-success"
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-center py-4 space-y-4"
              >
                <div className="relative mx-auto w-18 h-18 flex items-center justify-center">
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
                    className="relative w-14 h-14 bg-emerald-500/20 border-2 border-emerald-400 rounded-full flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/25"
                  >
                    <CheckCircle className="w-8 h-8" />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <h4 className="text-xl font-bold text-white font-heading">Enquiry Received!</h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed mt-1">
                    Thank you! Your price enquiry for <strong className="text-cyan-300">{product.name}</strong> has been logged with reference number:
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.22 }}
                  className="inline-block bg-slate-950 px-4 py-2 rounded-lg border border-slate-800 font-mono text-sm text-blue-400 font-semibold"
                >
                  {successData.id}
                </motion.div>

                <p className="text-xs text-slate-400">
                  Our sales team in Vizag will contact you shortly with the best competitive price.
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 }}
                  className="pt-4 flex flex-col sm:flex-row gap-3"
                >
                  <a
                    href={getProductWhatsAppUrl(product.name, product.category)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-emerald-700/20 active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Also Send on WhatsApp</span>
                  </a>
                  <button
                    onClick={handleReset}
                    className="py-2.5 px-5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl transition-all active:scale-95 cursor-pointer"
                  >
                    Close
                  </button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.form
                key="prod-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
              
              {/* Product preview banner */}
              <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-lg border border-slate-800"
                />
                <div className="overflow-hidden">
                  <p className="text-xs text-cyan-400 font-semibold uppercase">{product.category}</p>
                  <p className="text-sm font-bold text-white truncate">{product.name}</p>
                </div>
              </div>

              {/* Honeypot field (hidden from users) */}
              <input
                type="text"
                name="bot_field"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Error message */}
              {error && (
                <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Your Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Mobile Number (WhatsApp preferred) <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9398808876"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Email (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. ramesh@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Note / Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Quantity or Specific Requirement
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Need 1 unit for home PC upgrade, need urgent delivery in MVP Colony."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Submit Buttons */}
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Request Best Quote</span>
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
