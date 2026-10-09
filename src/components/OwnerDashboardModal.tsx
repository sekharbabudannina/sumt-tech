import React, { useState, useEffect } from 'react';
import { X, RefreshCw, MessageSquare, Wrench, Phone, MessageCircle, Calendar, MapPin, Search } from 'lucide-react';

interface OwnerDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerDashboardModal: React.FC<OwnerDashboardModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'enquiries'>('bookings');
  const [bookings, setBookings] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bkRes, enqRes] = await Promise.all([
        fetch('/api/bookings'),
        fetch('/api/enquiries'),
      ]);
      const bkData = await bkRes.json();
      const enqData = await enqRes.json();
      setBookings(bkData.bookings || []);
      setEnquiries(enqData.enquiries || []);
    } catch (err) {
      console.error('Failed to load records:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredBookings = bookings.filter((b) =>
    b.customerName?.toLowerCase().includes(search.toLowerCase()) ||
    b.mobileNumber?.includes(search) ||
    b.serviceRequired?.toLowerCase().includes(search.toLowerCase()) ||
    b.id?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredEnquiries = enquiries.filter((e) =>
    e.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    e.phone?.includes(search) ||
    e.subject?.toLowerCase().includes(search.toLowerCase()) ||
    e.id?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                SUMT Technologies — Inquiries & Booking Records
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live backend server storage (/api/bookings & /api/enquiries)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              disabled={loading}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Refresh Records"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter bar & Tabs */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Service Bookings ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab('enquiries')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'enquiries'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Customer Enquiries ({enquiries.length})
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, phone, ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Record List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {activeTab === 'bookings' ? (
            filteredBookings.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No service bookings recorded yet. Submit a test booking through the website form!
              </div>
            ) : (
              filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-cyan-400">{b.id}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800/40 font-semibold">
                          {b.deviceType}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1">{b.customerName}</h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/91${b.mobileNumber.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${b.customerName}, this is SUMT Technologies regarding your service booking ${b.id}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 rounded-md text-xs font-semibold flex items-center gap-1"
                      >
                        <MessageCircle className="w-3 h-3" />
                        WhatsApp Customer
                      </a>
                      <a
                        href={`tel:${b.mobileNumber}`}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md text-xs font-semibold flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3 text-cyan-400" />
                        {b.mobileNumber}
                      </a>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-slate-300">
                    Service: <span className="text-white">{b.serviceRequired}</span> {b.brandModel ? `(${b.brandModel})` : ''}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    Problem: {b.problemDescription}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-blue-400" />
                      Date: {b.preferredDate} ({b.preferredTime})
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      Location: {b.serviceLocation}
                    </span>
                    <span>Received: {new Date(b.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              ))
            )
          ) : (
            filteredEnquiries.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No customer enquiries recorded yet.
              </div>
            ) : (
              filteredEnquiries.map((e) => (
                <div
                  key={e.id}
                  className="bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="font-mono text-xs font-bold text-cyan-400">{e.id}</span>
                      <h4 className="text-sm font-bold text-white mt-1">{e.fullName}</h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/91${e.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${e.fullName}, thank you for contacting SUMT Technologies.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 rounded-md text-xs font-semibold flex items-center gap-1"
                      >
                        <MessageCircle className="w-3 h-3" />
                        Reply on WhatsApp
                      </a>
                      <a
                        href={`tel:${e.phone}`}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md text-xs font-semibold flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3 text-cyan-400" />
                        {e.phone}
                      </a>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-slate-300">
                    Subject: <span className="text-white">{e.subject}</span>
                  </p>
                  {e.productName && (
                    <p className="text-xs text-cyan-400 mt-0.5">
                      Target Product: {e.productName} ({e.productCategory})
                    </p>
                  )}
                  <p className="text-xs text-slate-400 mt-1 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    {e.message}
                  </p>
                  <div className="mt-2 text-[11px] text-slate-500">
                    Received: {new Date(e.createdAt).toLocaleString()}
                  </div>
                </div>
              ))
            )
          )}
        </div>

      </div>
    </div>
  );
};
