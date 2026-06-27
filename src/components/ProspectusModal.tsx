import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Mail, Phone, Calendar, User, BookOpen, Clock, ShieldCheck } from 'lucide-react';
import { COURSES_DATA } from '../data';

interface ProspectusModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseId?: string;
  defaultType?: 'prospectus' | 'visit' | 'consultation';
}

export default function ProspectusModal({
  isOpen,
  onClose,
  defaultCourseId = '',
  defaultType = 'prospectus'
}: ProspectusModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState(defaultCourseId);
  const [type, setType] = useState<'prospectus' | 'visit' | 'consultation'>(defaultType);
  const [notes, setNotes] = useState('');
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Sync state if default course changes
  React.useEffect(() => {
    if (defaultCourseId) setCourse(defaultCourseId);
  }, [defaultCourseId]);

  React.useEffect(() => {
    if (defaultType) setType(defaultType);
  }, [defaultType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setErrorMsg('Please complete all required fields.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    // Simulate elite processing
    setTimeout(() => {
      // Save locally to simulate recording
      try {
        const inquiries = JSON.parse(localStorage.getItem('ssi_inquiries') || '[]');
        inquiries.push({
          id: `inq-${Date.now()}`,
          name,
          email,
          phone,
          course: COURSES_DATA.find(c => c.id === course)?.title || 'General Institutional Interest',
          type,
          notes,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('ssi_inquiries', JSON.stringify(inquiries));
        setStatus('success');
      } catch (err) {
        setErrorMsg('Academic server transmission delayed. Please try again.');
        setStatus('error');
      }
    }, 1500);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCourse('');
    setType('prospectus');
    setNotes('');
    setStatus('idle');
    setErrorMsg('');
  };

  const handleClose = () => {
    onClose();
    if (status === 'success') {
      setTimeout(resetForm, 300);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="prospectus-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-primary/40 backdrop-blur-md">
          {/* Backdrop Click */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="relative w-full max-w-2xl bg-white rounded-[20px] shadow-2xl overflow-hidden border border-primary/10 z-10 flex flex-col md:flex-row"
          >
            {/* Sidebar Branding / Info */}
            <div className="w-full md:w-5/12 bg-primary p-6 md:p-8 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-radial-gradient from-accent/10 via-transparent to-transparent opacity-50" />
              <div className="relative z-10 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">Shiva Skill Institute</span>
                  <h3 className="text-2xl font-sans text-white font-bold tracking-tight mt-1">Registrar’s Office</h3>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed font-sans font-light">
                  Align with academic rigor. Request our printed curriculum prospectus or coordinate a private consultation with our admissions council.
                </p>
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-3 text-xs text-neutral-300">
                    <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                    <span>Double-blind admissions review</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-neutral-300">
                    <Clock className="w-4 h-4 text-accent shrink-0" />
                    <span>Inquiry processed within 24 hours</span>
                  </div>
                </div>
              </div>

              {/* Classic seal element */}
              <div className="relative z-10 pt-8 mt-8 border-t border-white/15 hidden md:block">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full border border-accent flex items-center justify-center text-[10px] font-sans text-accent tracking-widest font-bold">S</div>
                  <span className="text-[10px] tracking-widest font-mono text-neutral-400 font-bold">ESTABLISHED MCMXCIV</span>
                </div>
              </div>
            </div>

            {/* Main Form Area */}
            <div className="w-full md:w-7/12 p-6 md:p-8 bg-white relative">
              {/* Close Button */}
              <button
                id="close-prospectus-modal"
                onClick={handleClose}
                className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-primary hover:bg-neutral-100 transition-colors duration-150 cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="h-full flex flex-col justify-center items-center text-center py-10"
                  >
                    <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-4 text-accent">
                      <Check className="w-7 h-7" />
                    </div>
                    <h4 className="text-2xl font-sans text-primary font-bold tracking-tight">Inquiry Submitted</h4>
                    <p className="text-sm text-neutral-500 mt-2 max-w-sm leading-relaxed font-sans font-light">
                      Thank you, <span className="font-semibold text-neutral-800">{name}</span>. The Registrar’s Office has queued your credentials. A secure digital prospectus has been dispatched to <span className="italic text-neutral-800">{email}</span>.
                    </p>
                    <button
                      id="close-success-btn"
                      onClick={handleClose}
                      className="mt-8 px-6 py-3 bg-primary text-white hover:bg-primary-light text-xs uppercase tracking-widest font-mono font-bold transition-all duration-300 rounded-[16px] cursor-pointer"
                    >
                      Return to Website
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h4 className="text-lg font-sans text-primary font-bold tracking-tight mb-1">
                      {type === 'prospectus' ? 'Request Curriculum Prospectus' : type === 'visit' ? 'Arrange Academic Tour' : 'Schedule Private Consultation'}
                    </h4>
                    <p className="text-xs text-neutral-500 mb-6 font-light font-sans">Fields marked with * are strictly required to verify applicant status.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1.5 font-bold font-mono">Full Name *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                          <input
                            id="inquiry-name"
                            type="text"
                            required
                            placeholder="e.g. Honorable Dr. Julian Caine"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={status === 'submitting'}
                            className="w-full text-sm pl-9 pr-4 py-3 border border-neutral-200 rounded-[16px] focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent bg-neutral-50/50 transition-all duration-150"
                          />
                        </div>
                      </div>

                      {/* Email and Phone Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1.5 font-bold font-mono">Academic Email *</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                            <input
                              id="inquiry-email"
                              type="email"
                              required
                              placeholder="e.g. julian@oxford.edu"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              disabled={status === 'submitting'}
                              className="w-full text-sm pl-9 pr-4 py-3 border border-neutral-200 rounded-[16px] focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent bg-neutral-50/50 transition-all duration-150"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1.5 font-bold font-mono">Contact Number *</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                            <input
                              id="inquiry-phone"
                              type="tel"
                              required
                              placeholder="+1 (555) 0192"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              disabled={status === 'submitting'}
                              className="w-full text-sm pl-9 pr-4 py-3 border border-neutral-200 rounded-[16px] focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent bg-neutral-50/50 transition-all duration-150"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Course Selection */}
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1.5 font-bold font-mono">Program of Core Interest</label>
                        <div className="relative">
                          <BookOpen className="absolute left-3 top-3.5 h-4 w-4 text-neutral-400 pointer-events-none" />
                          <select
                            id="inquiry-course"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            disabled={status === 'submitting'}
                            className="w-full text-sm pl-9 pr-10 py-3 border border-neutral-200 rounded-[16px] focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent bg-neutral-50/50 appearance-none transition-all duration-150 cursor-pointer"
                          >
                            <option value="">General Institutional Inquiry</option>
                            {COURSES_DATA.map((c) => (
                              <option key={c.id} value={c.id}>
                                [{c.code}] {c.title}
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-400 text-[10px]">
                            ▼
                          </div>
                        </div>
                      </div>

                      {/* Inquiry Type Toggles */}
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1.5 font-bold font-mono">Inquiry Category</label>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            id="type-btn-prospectus"
                            type="button"
                            onClick={() => setType('prospectus')}
                            className={`py-2 px-3 text-[10px] font-mono uppercase tracking-widest border rounded-[16px] transition-all duration-200 cursor-pointer ${
                              type === 'prospectus'
                                ? 'bg-primary text-white border-primary shadow-sm'
                                : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                            }`}
                          >
                            Prospectus
                          </button>
                          <button
                            id="type-btn-visit"
                            type="button"
                            onClick={() => setType('visit')}
                            className={`py-2 px-3 text-[10px] font-mono uppercase tracking-widest border rounded-[16px] transition-all duration-200 cursor-pointer ${
                              type === 'visit'
                                ? 'bg-primary text-white border-primary shadow-sm'
                                : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                            }`}
                          >
                            Campus Visit
                          </button>
                          <button
                            id="type-btn-consultation"
                            type="button"
                            onClick={() => setType('consultation')}
                            className={`py-2 px-3 text-[10px] font-mono uppercase tracking-widest border rounded-[16px] transition-all duration-200 cursor-pointer ${
                              type === 'consultation'
                                ? 'bg-primary text-white border-primary shadow-sm'
                                : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                            }`}
                          >
                            Consultation
                          </button>
                        </div>
                      </div>

                      {/* Notes */}
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1.5 font-bold font-mono">Additional Academic Background / Remarks</label>
                        <textarea
                          id="inquiry-notes"
                          rows={3}
                          placeholder="Please note down any specific topics or research agendas you wish to outline."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          disabled={status === 'submitting'}
                          className="w-full text-sm px-4 py-3 border border-neutral-200 rounded-[16px] focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent bg-neutral-50/50 transition-all duration-150"
                        />
                      </div>

                      {/* Errors */}
                      {status === 'error' && (
                        <div className="text-red-600 text-xs font-semibold border border-red-250/50 bg-red-50 p-2.5 rounded-[12px] font-sans">
                          {errorMsg}
                        </div>
                      )}

                      {/* Submit */}
                      <button
                        id="submit-inquiry-btn"
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full py-3.5 bg-accent hover:bg-accent/90 text-white text-xs uppercase tracking-widest font-mono font-bold transition-all duration-300 rounded-[16px] flex items-center justify-center space-x-2 shadow-sm disabled:bg-neutral-400 cursor-pointer"
                      >
                        {status === 'submitting' ? (
                          <>
                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>Encrypting Credentials...</span>
                          </>
                        ) : (
                          <span>Submit Registries</span>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
