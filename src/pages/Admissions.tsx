import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  ArrowRight, 
  BookOpen, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  FileText, 
  Compass, 
  User, 
  GraduationCap, 
  Building2, 
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Download,
  Calendar,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { COURSES_DATA } from '../data';
import { Course } from '../types';
import SafeImage from '../components/SafeImage';

interface AdmissionsProps {
  onPageChange: (page: 'home' | 'about' | 'courses' | 'gallery' | 'admissions') => void;
  onRequestProspectus?: () => void;
  defaultCourseId?: string;
}

export default function Admissions({ onPageChange, defaultCourseId = '' }: AdmissionsProps) {
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [qualification, setQualification] = useState('');
  const [course, setCourse] = useState(defaultCourseId);
  const [branch, setBranch] = useState('');
  const [message, setMessage] = useState('');
  const [contactMethod, setContactMethod] = useState<'Email' | 'Phone' | 'WhatsApp'>('Email');

  // Validation states
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Submit status
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Synchronize default course
  useEffect(() => {
    if (defaultCourseId) {
      setCourse(defaultCourseId);
    }
  }, [defaultCourseId]);

  // Inline Validation Logic
  const validateField = (fieldName: string, value: string) => {
    let error = '';
    if (!value.trim()) {
      error = 'This field is required';
    } else {
      if (fieldName === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = 'Please enter a valid email address';
        }
      } else if (fieldName === 'phone') {
        const phoneRegex = /^[0-9+\s-]{8,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
          error = 'Please enter a valid phone number';
        }
      }
    }

    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  const handleBlur = (fieldName: string, value: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    validateField(fieldName, value);
  };

  const handleChange = (fieldName: string, value: string) => {
    if (touched[fieldName]) {
      validateField(fieldName, value);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields touched
    const fieldsToValidate = { name, email, phone, city, qualification, course, branch };
    const newTouched: Record<string, boolean> = {};
    let hasErrors = false;

    Object.entries(fieldsToValidate).forEach(([key, val]) => {
      newTouched[key] = true;
      let error = '';
      if (!val.trim()) {
        error = 'This field is required';
        hasErrors = true;
      } else {
        if (key === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(val)) {
            error = 'Please enter a valid email address';
            hasErrors = true;
          }
        } else if (key === 'phone') {
          const phoneRegex = /^[0-9+\s-]{8,15}$/;
          if (!phoneRegex.test(val.replace(/\s/g, ''))) {
            error = 'Please enter a valid phone number';
            hasErrors = true;
          }
        }
      }
      setErrors(prev => ({ ...prev, [key]: error }));
    });

    setTouched(newTouched);

    if (hasErrors) {
      // Scroll to first error
      const firstErrorEl = document.querySelector('.text-red-500');
      if (firstErrorEl) {
        firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setStatus('submitting');

    // Simulate database write and dispatch
    setTimeout(() => {
      try {
        const inquiries = JSON.parse(localStorage.getItem('ssi_inquiries') || '[]');
        inquiries.push({
          id: `admissions-${Date.now()}`,
          name,
          email,
          phone,
          city,
          qualification,
          course: COURSES_DATA.find(c => c.id === course)?.title || course || 'General Interest',
          branch,
          message,
          contactMethod,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('ssi_inquiries', JSON.stringify(inquiries));
        setStatus('success');

        // Automatically start the prospectus download as requested
        triggerProspectusDownload();
      } catch (err) {
        console.error(err);
      }
    }, 1500);
  };

  const triggerProspectusDownload = () => {
    // Create a mock downloadable PDF document link and click it
    const link = document.createElement('a');
    link.href = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    link.target = '_blank';
    link.download = 'Shiva_Skill_Institute_Prospectus_2026.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCity('');
    setQualification('');
    setCourse('');
    setBranch('');
    setMessage('');
    setContactMethod('Email');
    setTouched({});
    setErrors({});
    setStatus('idle');
  };

  return (
    <div id="admissions-experience-page" className="pt-24 md:pt-28 pb-20 bg-[#FCFCFB] text-[#1E1E1E]">
      <div className="max-w-[1150px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl mx-auto bg-white rounded-[24px] shadow-sm border border-neutral-100 p-8 sm:p-12 text-center my-10"
            >
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500 mb-6 border border-emerald-100">
                <CheckCircle className="w-10 h-10" />
              </div>

              <h2 className="text-3xl font-sans font-bold text-primary tracking-tight">Thank You!</h2>
              <p className="text-sm text-neutral-500 font-sans font-light mt-3 leading-relaxed max-w-lg mx-auto">
                Our admissions team has received your application and will contact you soon.
              </p>
              
              <div className="mt-4 p-4 bg-emerald-50/50 rounded-[18px] border border-emerald-100/60 inline-flex items-center space-x-2 text-xs text-emerald-800 font-sans font-medium">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Your prospectus download has started automatically.</span>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                <button
                  onClick={triggerProspectusDownload}
                  className="px-6 py-3.5 bg-accent hover:bg-accent/90 text-white text-xs uppercase tracking-widest font-bold rounded-[16px] transition-all duration-300 shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Prospectus</span>
                </button>
                <button
                  onClick={() => {
                    handleResetForm();
                    onPageChange('courses');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 bg-[#2563EB] hover:bg-[#2563EB]/90 text-white text-xs uppercase tracking-widest font-bold rounded-[16px] transition-all duration-300 shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explore Courses</span>
                </button>
                <button
                  onClick={() => {
                    handleResetForm();
                    onPageChange('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs uppercase tracking-widest font-bold rounded-[16px] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Back To Home</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form-layout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-10"
            >
              {/* Back button */}
              <div className="flex justify-start">
                <button
                  onClick={() => {
                    onPageChange('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-primary transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </button>
              </div>

              {/* Redesigned Hero Section */}
              <div 
                id="admissions-hero" 
                className="relative w-full h-[320px] bg-neutral-900 rounded-[24px] overflow-hidden shadow-sm flex items-center justify-center text-center px-6"
              >
                {/* Full-width premium generated background image */}
                <div className="absolute inset-0">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200"
                    alt="Friendly Shiva Skill Institute Academic Advisors assisting prospective students"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    fallbackType="campus"
                  />
                  {/* Subtle dark overlay for text readability */}
                  <div className="absolute inset-0 bg-neutral-950/75" />
                </div>

                <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                  <span className="inline-flex items-center space-x-2 border border-white/20 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-white">
                    <Sparkles className="w-3 h-3 text-accent" />
                    <span className="text-[10px] font-mono tracking-widest uppercase font-bold">
                      ADMISSIONS PORTAL • ACADEMIC YEAR 2026
                    </span>
                  </span>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold text-white leading-tight tracking-tight">
                    Start Your Learning Journey
                  </h2>

                  <p className="text-xs sm:text-sm md:text-base text-neutral-200 leading-relaxed font-sans font-light max-w-xl mx-auto">
                    Fill in your details and our admissions team will contact you shortly.
                  </p>
                </div>
              </div>

              {/* Two Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8">
                
                {/* Left Panel: Clean Information Section */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Why Choose Shiva Card */}
                  <div className="p-6 sm:p-8 bg-white rounded-[24px] border border-neutral-100 shadow-sm text-left space-y-5">
                    <h3 className="text-lg font-sans font-bold text-primary tracking-tight border-b border-neutral-50 pb-3 flex items-center space-x-2.5">
                      <Sparkles className="w-5 h-5 text-accent" />
                      <span>Why Choose Shiva Skill Institute</span>
                    </h3>
                    
                    <ul className="space-y-4 text-xs text-neutral-600 font-sans font-light">
                      <li className="flex items-start space-x-3">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-neutral-800 font-medium">30+ Years of Academic Legacy:</strong>
                          <span className="block mt-0.5 text-neutral-500 leading-relaxed">Continuous service and placement excellence since 1994.</span>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-neutral-800 font-medium">Industry-First Curriculum:</strong>
                          <span className="block mt-0.5 text-neutral-500 leading-relaxed">Dynamic courses calibrated quarterly with corporate recruiters.</span>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-neutral-800 font-medium">1-on-1 Mentor Guidance:</strong>
                          <span className="block mt-0.5 text-neutral-500 leading-relaxed">Direct access to Ph.D. faculty and experienced engineering advisors.</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Admission Process Card */}
                  <div className="p-6 sm:p-8 bg-white rounded-[24px] border border-neutral-100 shadow-sm text-left space-y-4">
                    <h3 className="text-sm font-mono uppercase tracking-widest text-accent font-bold">Admission Process</h3>
                    <div className="relative border-l border-neutral-100 pl-5 space-y-6">
                      <div className="relative">
                        <div className="absolute -left-[26px] top-1 w-3 h-3 bg-accent rounded-full border border-white" />
                        <h4 className="text-xs font-sans font-bold text-neutral-800">1. Submit Inquiry</h4>
                        <p className="text-[11px] text-neutral-500 mt-0.5">Fill and send this dedicated online application form.</p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[26px] top-1 w-3 h-3 bg-neutral-300 rounded-full border border-white" />
                        <h4 className="text-xs font-sans font-bold text-neutral-800">2. Academic Assessment</h4>
                        <p className="text-[11px] text-neutral-500 mt-0.5">Counselors call you to verify qualifications and study goals.</p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[26px] top-1 w-3 h-3 bg-neutral-300 rounded-full border border-white" />
                        <h4 className="text-xs font-sans font-bold text-neutral-800">3. Final Enrollment</h4>
                        <p className="text-[11px] text-neutral-500 mt-0.5">Confirm selection, finalize grants, and begin course modules.</p>
                      </div>
                    </div>
                  </div>

                  {/* Documents Required Card */}
                  <div className="p-6 sm:p-8 bg-white rounded-[24px] border border-neutral-100 shadow-sm text-left space-y-4">
                    <h3 className="text-sm font-mono uppercase tracking-widest text-primary font-bold">Documents Required</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-neutral-500 font-sans font-light">
                      <li className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-accent" />
                        <span>Graduation Certificate</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-accent" />
                        <span>Academic Transcripts</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-accent" />
                        <span>Professional Resume</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-accent" />
                        <span>ID Proof (Aadhar/Passport)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Admission Support & Working Hours */}
                  <div className="p-6 sm:p-8 bg-white rounded-[24px] border border-neutral-100 shadow-sm text-left space-y-5">
                    <h3 className="text-sm font-mono uppercase tracking-widest text-primary font-bold">Admission Support</h3>
                    <div className="space-y-4">
                      
                      <div className="flex items-start space-x-3.5 text-xs">
                        <Phone className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="text-neutral-400 font-mono text-[9px] uppercase">Contact Number</p>
                          <p className="font-sans font-bold text-neutral-800 mt-0.5">+91 11-4093-9000</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3.5 text-xs">
                        <Mail className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="text-neutral-400 font-mono text-[9px] uppercase">Email Support</p>
                          <p className="font-sans font-bold text-neutral-800 mt-0.5">registrar@shivainstitute.edu</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3.5 text-xs">
                        <MapPin className="w-4.5 h-4.5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="text-neutral-400 font-mono text-[9px] uppercase">Campus Address</p>
                          <p className="font-sans text-neutral-600 mt-0.5 leading-relaxed">
                            The Great Quadrangle, Sector 82, Institutional Area, Shiva Chambers
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3.5 text-xs pt-3.5 border-t border-neutral-50">
                        <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="text-neutral-400 font-mono text-[9px] uppercase">Working Hours</p>
                          <p className="font-sans font-bold text-neutral-800 mt-0.5">Monday – Friday: 9:00 AM – 6:00 PM</p>
                          <p className="text-[10px] text-neutral-400 mt-0.5 leading-snug font-sans font-light">Inquiries submitted outside hours are queued for next-day review.</p>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Right Panel: Premium Enquiry Form */}
                <div className="lg:col-span-7 bg-white rounded-[24px] border border-neutral-100 shadow-sm p-6 sm:p-10 text-left space-y-6">
                  
                  <div>
                    <h3 className="text-xl font-sans font-bold text-primary tracking-tight">Admissions Enquiry</h3>
                    <p className="text-xs text-neutral-400 mt-1.5 font-sans font-light">Fields marked with * are required for standard application processing.</p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    
                    {/* Full Name */}
                    <div>
                      <label htmlFor="full-name-input" className="block text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-600 mb-1.5">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                        <input
                          id="full-name-input"
                          type="text"
                          required
                          placeholder="e.g. Julian Caine"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            handleChange('name', e.target.value);
                          }}
                          onBlur={(e) => handleBlur('name', e.target.value)}
                          className={`w-full text-sm pl-10 pr-4 py-3.5 border rounded-[18px] focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent bg-neutral-50/20 transition-all duration-150 ${
                            touched.name && errors.name ? 'border-red-500 bg-red-50/10' : 'border-neutral-200'
                          }`}
                        />
                      </div>
                      {touched.name && errors.name && (
                        <p className="text-red-500 text-[11px] mt-1.5 flex items-center space-x-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email & Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      
                      {/* Email Address */}
                      <div>
                        <label htmlFor="email-input" className="block text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-600 mb-1.5">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                          <input
                            id="email-input"
                            type="email"
                            required
                            placeholder="e.g. julian@gmail.com"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              handleChange('email', e.target.value);
                            }}
                            onBlur={(e) => handleBlur('email', e.target.value)}
                            className={`w-full text-sm pl-10 pr-4 py-3.5 border rounded-[18px] focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent bg-neutral-50/20 transition-all duration-150 ${
                              touched.email && errors.email ? 'border-red-500 bg-red-50/10' : 'border-neutral-200'
                            }`}
                          />
                        </div>
                        {touched.email && errors.email && (
                          <p className="text-red-500 text-[11px] mt-1.5 flex items-center space-x-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label htmlFor="phone-input" className="block text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-600 mb-1.5">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                          <input
                            id="phone-input"
                            type="tel"
                            required
                            placeholder="e.g. +91 99999-88888"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              handleChange('phone', e.target.value);
                            }}
                            onBlur={(e) => handleBlur('phone', e.target.value)}
                            className={`w-full text-sm pl-10 pr-4 py-3.5 border rounded-[18px] focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent bg-neutral-50/20 transition-all duration-150 ${
                              touched.phone && errors.phone ? 'border-red-500 bg-red-50/10' : 'border-neutral-200'
                            }`}
                          />
                        </div>
                        {touched.phone && errors.phone && (
                          <p className="text-red-500 text-[11px] mt-1.5 flex items-center space-x-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.phone}</span>
                          </p>
                        )}
                      </div>

                    </div>

                    {/* City & Qualification Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      
                      {/* City */}
                      <div>
                        <label htmlFor="city-input" className="block text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-600 mb-1.5">
                          City *
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                          <input
                            id="city-input"
                            type="text"
                            required
                            placeholder="e.g. New Delhi"
                            value={city}
                            onChange={(e) => {
                              setCity(e.target.value);
                              handleChange('city', e.target.value);
                            }}
                            onBlur={(e) => handleBlur('city', e.target.value)}
                            className={`w-full text-sm pl-10 pr-4 py-3.5 border rounded-[18px] focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent bg-neutral-50/20 transition-all duration-150 ${
                              touched.city && errors.city ? 'border-red-500 bg-red-50/10' : 'border-neutral-200'
                            }`}
                          />
                        </div>
                        {touched.city && errors.city && (
                          <p className="text-red-500 text-[11px] mt-1.5 flex items-center space-x-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.city}</span>
                          </p>
                        )}
                      </div>

                      {/* Highest Qualification */}
                      <div>
                        <label htmlFor="qualification-select" className="block text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-600 mb-1.5">
                          Highest Qualification *
                        </label>
                        <div className="relative">
                          <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                          <select
                            id="qualification-select"
                            required
                            value={qualification}
                            onChange={(e) => {
                              setQualification(e.target.value);
                              handleChange('qualification', e.target.value);
                            }}
                            onBlur={(e) => handleBlur('qualification', e.target.value)}
                            className={`w-full text-sm pl-10 pr-10 py-3.5 border rounded-[18px] focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent bg-white appearance-none cursor-pointer transition-all duration-150 ${
                              touched.qualification && errors.qualification ? 'border-red-500' : 'border-neutral-200'
                            }`}
                          >
                            <option value="">Select Qualification</option>
                            <option value="High School">High School (Class 12)</option>
                            <option value="Diploma">Vocational Diploma</option>
                            <option value="Bachelors Degree">Bachelor's Degree</option>
                            <option value="Masters Degree">Master's Degree</option>
                            <option value="PhD">Doctoral Ph.D.</option>
                          </select>
                          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-400 text-[9px]">
                            ▼
                          </div>
                        </div>
                        {touched.qualification && errors.qualification && (
                          <p className="text-red-500 text-[11px] mt-1.5 flex items-center space-x-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.qualification}</span>
                          </p>
                        )}
                      </div>

                    </div>

                    {/* Course Interested In & Preferred Branch */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      
                      {/* Course */}
                      <div>
                        <label htmlFor="course-select" className="block text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-600 mb-1.5">
                          Course Interested In *
                        </label>
                        <div className="relative">
                          <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                          <select
                            id="course-select"
                            required
                            value={course}
                            onChange={(e) => {
                              setCourse(e.target.value);
                              handleChange('course', e.target.value);
                            }}
                            onBlur={(e) => handleBlur('course', e.target.value)}
                            className={`w-full text-sm pl-10 pr-10 py-3.5 border rounded-[18px] focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent bg-white appearance-none cursor-pointer transition-all duration-150 ${
                              touched.course && errors.course ? 'border-red-500' : 'border-neutral-200'
                            }`}
                          >
                            <option value="">Select Course</option>
                            <option value="general">General Institutional Inquiry</option>
                            {COURSES_DATA.map(c => (
                              <option key={c.id} value={c.id}>
                                [{c.code}] {c.title}
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-400 text-[9px]">
                            ▼
                          </div>
                        </div>
                        {touched.course && errors.course && (
                          <p className="text-red-500 text-[11px] mt-1.5 flex items-center space-x-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.course}</span>
                          </p>
                        )}
                      </div>

                      {/* Preferred Branch */}
                      <div>
                        <label htmlFor="branch-select" className="block text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-600 mb-1.5">
                          Preferred Campus Branch *
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                          <select
                            id="branch-select"
                            required
                            value={branch}
                            onChange={(e) => {
                              setBranch(e.target.value);
                              handleChange('branch', e.target.value);
                            }}
                            onBlur={(e) => handleBlur('branch', e.target.value)}
                            className={`w-full text-sm pl-10 pr-10 py-3.5 border rounded-[18px] focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent bg-white appearance-none cursor-pointer transition-all duration-150 ${
                              touched.branch && errors.branch ? 'border-red-500' : 'border-neutral-200'
                            }`}
                          >
                            <option value="">Select Branch</option>
                            <option value="Main Campus">Main Campus (Great Quadrangle)</option>
                            <option value="Technology Wing">Technology Wing (Sector 82)</option>
                            <option value="Executive Block">Executive Block (Shiva Chambers)</option>
                            <option value="Online Virtual Class">Online Remote Hub</option>
                          </select>
                          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-400 text-[9px]">
                            ▼
                          </div>
                        </div>
                        {touched.branch && errors.branch && (
                          <p className="text-red-500 text-[11px] mt-1.5 flex items-center space-x-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.branch}</span>
                          </p>
                        )}
                      </div>

                    </div>

                    {/* Preferred Contact Method */}
                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-600 mb-2">
                        Preferred Contact Method
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {(['Email', 'Phone', 'WhatsApp'] as const).map((method) => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setContactMethod(method)}
                            className={`py-3 px-4 text-xs font-mono uppercase tracking-wider border rounded-[18px] transition-all duration-200 cursor-pointer text-center ${
                              contactMethod === method
                                ? 'bg-primary text-white border-primary shadow-sm font-semibold'
                                : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                            }`}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message / Remarks */}
                    <div>
                      <label htmlFor="message-textarea" className="block text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-600 mb-1.5">
                        Message / Specific Objectives (Optional)
                      </label>
                      <textarea
                        id="message-textarea"
                        rows={3}
                        placeholder="State any specific field of study or professional goals you'd like our admissions dean to prioritize..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full text-sm px-4 py-3.5 border border-neutral-200 rounded-[18px] focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent bg-neutral-50/20 transition-all duration-150"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      id="submit-admissions-btn"
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full mt-2 py-4 bg-accent hover:bg-accent/90 disabled:bg-neutral-400 text-white text-xs uppercase tracking-widest font-mono font-bold rounded-[18px] transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                    >
                      {status === 'submitting' ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Encrypting & Registering Application...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Admissions Request</span>
                          <ArrowRight className="w-4 h-4 text-white" />
                        </>
                      )}
                    </button>

                  </form>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
