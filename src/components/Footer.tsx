import React, { useState } from 'react';
import { Mail, Phone, MapPin, Landmark, Check, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

interface FooterProps {
  onPageChange: (page: 'home' | 'about' | 'courses' | 'gallery') => void;
  onRequestProspectus: () => void;
}

export default function Footer({ onPageChange, onRequestProspectus }: FooterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'subscribed'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('subscribed');
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  const navigateTo = (pageId: 'home' | 'about' | 'courses' | 'gallery') => {
    onPageChange(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary text-white pt-20 pb-12 border-t border-accent/20 relative overflow-hidden">
      {/* Editorial Watermark background */}
      <div className="absolute right-0 bottom-0 opacity-[0.02] text-[200px] font-sans font-black select-none pointer-events-none translate-x-12 translate-y-12">
        SHIVA
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          
          {/* Column One: Institute Logo & Short Description */}
          <div className="space-y-6">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center space-x-3 text-left focus:outline-none group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-[12px] bg-accent flex items-center justify-center text-white font-sans text-lg font-bold group-hover:bg-accent/80 transition-colors duration-300 shadow-sm shrink-0">
                S
              </div>
              <div>
                <h3 className="text-sm font-sans font-bold tracking-wider text-white uppercase leading-tight">
                  SHIVA
                </h3>
                <p className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  SKILL INSTITUTE
                </p>
              </div>
            </button>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
              Shiva Skill Institute is a premier educational institution delivering elite, double-blind peer reviewed executive fellowships and masterclass cohorts. Established on strict values of academic integrity and strategic command since MCMXCIV.
            </p>
          </div>

          {/* Column Two: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-accent font-bold">Quick Links</h4>
            <ul className="space-y-3.5">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'courses', label: 'Courses' },
                { id: 'gallery', label: 'Gallery' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => navigateTo(item.id as 'home' | 'about' | 'courses' | 'gallery')}
                    className="text-xs text-neutral-300 hover:text-accent transition-colors duration-150 flex items-center space-x-1 font-light cursor-pointer"
                  >
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column Three: Courses */}
          <div className="space-y-6">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-accent font-bold">Courses</h4>
            <ul className="space-y-3.5">
              {[
                'Leadership & Systemic Policy Fellowship',
                'Advanced Cyber-Physical Data Systems',
                'Empirical Physical Mathematics & Analytics',
                'Macro-Economic & Institutional Governance'
              ].map((courseName, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigateTo('courses')}
                    className="text-xs text-neutral-300 hover:text-accent text-left transition-colors duration-150 font-light cursor-pointer line-clamp-2"
                  >
                    {courseName}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column Four: Contact */}
          <div className="space-y-6">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-accent font-bold">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-xs text-neutral-300 font-light">
                <MapPin className="w-4.5 h-4.5 text-accent shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  The Great Quadrangle, Sector 82,<br />
                  Institutional Area, Shiva Chambers
                </span>
              </li>
              <li className="flex items-center space-x-3 text-xs text-neutral-300 font-light">
                <Phone className="w-4.5 h-4.5 text-accent shrink-0" />
                <span>+91 11-4093-9000</span>
              </li>
              <li className="flex items-center space-x-3 text-xs text-neutral-300 font-light">
                <Mail className="w-4.5 h-4.5 text-accent shrink-0" />
                <span>registrar@shivainstitute.edu</span>
              </li>
            </ul>

            {/* Social Icons inside Column Four */}
            <div className="pt-4 border-t border-white/5 flex items-center space-x-4">
              <a href="#facebook" className="text-neutral-400 hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#twitter" className="text-neutral-400 hover:text-accent transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#linkedin" className="text-neutral-400 hover:text-accent transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#instagram" className="text-neutral-400 hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Fine Print Footer with Copyright and Privacy Policy */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-neutral-400 text-[10px] font-mono tracking-wider gap-4">
          <div>
            © 2026 SHIVA SKILL INSTITUTE. ALL RIGHTS RESERVED.
          </div>
          <div className="flex space-x-6">
            <button onClick={onRequestProspectus} className="hover:text-white transition-colors cursor-pointer">PRIVACY POLICY</button>
            <button onClick={onRequestProspectus} className="hover:text-white transition-colors cursor-pointer">TERMS OF USE</button>
            <button onClick={onRequestProspectus} className="hover:text-white transition-colors cursor-pointer">ACCREDITATION</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
