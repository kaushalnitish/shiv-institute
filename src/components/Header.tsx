import { useState, useEffect } from 'react';
import { Menu, X, Landmark, ArrowRight, Shield } from 'lucide-react';

interface HeaderProps {
  activePage: 'home' | 'about' | 'courses' | 'gallery';
  onPageChange: (page: 'home' | 'about' | 'courses' | 'gallery') => void;
  onRequestProspectus: () => void;
}

export default function Header({
  activePage,
  onPageChange,
  onRequestProspectus
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'courses', label: 'Courses' },
    { id: 'gallery', label: 'Gallery' }
  ] as const;

  const navigateTo = (pageId: 'home' | 'about' | 'courses' | 'gallery') => {
    onPageChange(pageId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-4 border-b border-primary/5' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand/Logo Emblem */}
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center space-x-3 text-left focus:outline-none group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-[12px] bg-primary flex items-center justify-center text-white font-sans text-lg font-bold group-hover:bg-accent transition-colors duration-300 shadow-sm shrink-0">
            S
          </div>
          <div>
            <h1 className="text-sm font-sans font-bold tracking-wider text-primary uppercase leading-tight group-hover:text-accent transition-colors duration-300">
              SHIVA
            </h1>
            <p className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
              SKILL INSTITUTE
            </p>
          </div>
        </button>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`text-xs font-mono uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                activePage === item.id
                  ? 'text-accent font-semibold border-b border-accent pb-1'
                  : 'text-neutral-600 hover:text-primary'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => navigateTo('courses')}
            className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 hover:text-primary transition-colors duration-150 cursor-pointer"
          >
            Admissions Open
          </button>
          <button
            id="header-visit-btn"
            onClick={onRequestProspectus}
            className="px-5 py-2.5 bg-accent hover:bg-accent/90 text-white text-[10px] font-mono uppercase tracking-widest transition-all duration-300 rounded-[16px] shadow-sm hover:shadow flex items-center space-x-1.5 cursor-pointer font-bold"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={onRequestProspectus}
            className="px-3.5 py-1.5 bg-accent hover:bg-accent/90 text-white text-[9px] font-mono uppercase tracking-widest rounded-[16px] transition-colors duration-150 font-bold"
          >
            Apply Now
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-primary focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 top-[73px] bg-white z-30 flex flex-col p-6 animate-fade-in md:hidden border-t border-neutral-100">
          <div className="flex-1 flex flex-col space-y-6 pt-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`text-left text-xl font-sans tracking-wide py-2 border-b border-neutral-100 transition-colors ${
                  activePage === item.id ? 'text-accent pl-2 font-medium border-accent' : 'text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="space-y-4 pt-6 border-t border-neutral-100">
            <div className="flex items-center space-x-2 text-xs text-neutral-500 font-mono">
              <Shield className="w-4 h-4 text-accent" />
              <span>ACCREDITED FELLOWSHIP INSTITUTE</span>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                onRequestProspectus();
              }}
              className="w-full py-3 bg-accent text-white text-xs font-mono uppercase tracking-widest rounded-[16px] transition-all duration-200 flex items-center justify-center space-x-2 font-bold"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
