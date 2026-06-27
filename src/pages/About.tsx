import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Trophy, 
  BookOpen, 
  Quote, 
  Sparkles, 
  Target, 
  Eye, 
  Award, 
  Compass,
  Check,
  Heart,
  Users,
  Lightbulb,
  Building,
  GraduationCap,
  ArrowRight
} from 'lucide-react';
import SafeImage from '../components/SafeImage';

interface AboutProps {
  onPageChange: (page: 'home' | 'about' | 'courses' | 'gallery' | 'admissions') => void;
  onRequestProspectus: () => void;
}

export default function About({ onPageChange, onRequestProspectus }: AboutProps) {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div id="about-page" className="pt-0 bg-white">
      
      {/* SECTION 01: Hero Banner */}
      <section 
        id="about-hero" 
        className="relative w-full h-[320px] md:h-[380px] bg-neutral-900 rounded-b-[24px] overflow-hidden flex items-center justify-center text-center px-6"
      >
        {/* Full-width premium background image */}
        <div className="absolute inset-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600"
            alt="Modern Indian Institute Campus and Active Student Collaboration"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            fallbackType="campus"
          />
          {/* Subtle dark overlay to ensure readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/65" />
        </div>

        <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center justify-center space-y-4 pt-10">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 border border-white/20 bg-white/10 backdrop-blur-md px-3 py-1 rounded-[20px]"
          >
            <Sparkles className="w-3 h-3 text-accent" />
            <span className="text-[10px] font-mono tracking-widest text-white uppercase font-bold">
              ESTABLISHED IN 1994
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold text-white leading-[1.15] tracking-tight"
          >
            Building Skills That Shape Tomorrow
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm md:text-base text-neutral-200 leading-relaxed font-sans font-light max-w-2xl mx-auto"
          >
            A premier Indian institute dedicated to providing high-quality technical mastery, practical vocational learning, and student-focused career programs that empower youth.
          </motion.p>
        </div>
      </section>

      {/* SECTION 02: Institute Story */}
      <section id="institute-story" className="py-16 md:py-24 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left: Story Image */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-[24px] overflow-hidden shadow-lg border border-neutral-100">
              <SafeImage
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200"
                alt="Shiva Skill Institute Academic Campus Lawn"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                fallbackType="campus"
              />
            </div>
            {/* Subtle floating caption */}
            <div className="absolute -bottom-6 -right-4 bg-white border border-neutral-100 p-4 rounded-[16px] shadow-md hidden sm:block">
              <p className="text-[11px] font-mono text-accent font-bold uppercase tracking-wider">SSI CAMPUS</p>
              <p className="text-xs font-sans text-primary font-bold">Bridging Industry & Academia</p>
            </div>
          </div>

          {/* Right: Story Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">OUR STORY</span>
            <h3 className="text-2xl md:text-3.5xl font-sans text-primary font-bold tracking-tight">
              Empowering Students with Career-First Learning
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-sans font-light">
              Founded over three decades ago, Shiva Skill Institute was born out of a simple but powerful vision: to bridge the gap between traditional theoretical education and the dynamic practical requirements of modern industries. We recognized that students need more than just degrees—they need hands-on competence.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed font-sans font-light">
              From our humble beginnings with a single computer lab, we have grown into a premier hub of vocational training and technical excellence, trusted by thousands of families and top employers across India. Today, we continue to innovate, expanding our labs and modernizing our curriculum to ensure our students are always ready for the future.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 03: Mission & Vision */}
      <section id="mission-vision" className="py-16 md:py-24 bg-[#F8FAFC] border-b border-neutral-100 text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Mission Card */}
          <div className="group relative p-8 md:p-10 bg-gradient-to-br from-blue-50/25 via-white to-blue-50/35 border border-neutral-200/60 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.015)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(37,99,235,0.06)] hover:border-blue-100 hover:-translate-y-1 overflow-hidden">
            {/* Background Decorative Graphic: Circular outlines */}
            <svg className="absolute right-0 top-0 w-48 h-48 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-300 pointer-events-none text-[#2563EB]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
              <circle cx="100" cy="0" r="30" />
              <circle cx="100" cy="0" r="55" />
              <circle cx="100" cy="0" r="80" />
              <circle cx="100" cy="0" r="105" />
            </svg>
            
            {/* Floating Soft 3D Icon Container */}
            <div className="relative z-10 w-12 h-12 rounded-[16px] bg-white flex items-center justify-center text-[#2563EB] shadow-[0_4px_16px_rgba(37,99,235,0.15),_inset_0_1px_2px_rgba(255,255,255,1)] border border-blue-100/40 transition-transform duration-300 group-hover:-translate-y-0.5">
              <Target className="w-6 h-6" />
            </div>
            
            <div className="relative z-10 space-y-2 mt-6">
              <h4 className="text-2xl font-sans text-primary font-bold tracking-tight">Our Mission</h4>
              {/* Accent Line */}
              <div className="w-10 h-0.5 bg-[#2563EB] rounded-full" />
              <p className="text-sm text-neutral-600 leading-relaxed font-sans font-light pt-2 max-w-xl">
                To provide high-quality, practical vocational and technical education that equips students with real-world skills. We are committed to supportive mentorship, active career placement support, and building accessible programs that help every student unlock their professional potential.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="group relative p-8 md:p-10 bg-gradient-to-br from-orange-50/20 via-white to-amber-50/25 border border-neutral-200/60 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.015)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(234,88,12,0.06)] hover:border-orange-100 hover:-translate-y-1 overflow-hidden">
            {/* Background Decorative Graphic: Dot grid */}
            <svg className="absolute right-6 top-6 w-24 h-24 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-300 pointer-events-none text-[#EA580C]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="dot-grid-vision" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.2" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dot-grid-vision)" />
            </svg>
            
            {/* Floating Soft 3D Icon Container */}
            <div className="relative z-10 w-12 h-12 rounded-[16px] bg-white flex items-center justify-center text-[#EA580C] shadow-[0_4px_16px_rgba(234,88,12,0.15),_inset_0_1px_2px_rgba(255,255,255,1)] border border-orange-100/40 transition-transform duration-300 group-hover:-translate-y-0.5">
              <Eye className="w-6 h-6" />
            </div>
            
            <div className="relative z-10 space-y-2 mt-6">
              <h4 className="text-2xl font-sans text-primary font-bold tracking-tight">Our Vision</h4>
              {/* Accent Line */}
              <div className="w-10 h-0.5 bg-[#EA580C] rounded-full" />
              <p className="text-sm text-neutral-600 leading-relaxed font-sans font-light pt-2 max-w-xl">
                To become India's most trusted partner in vocational training, recognized for shaping skilled professionals who drive innovation and industrial growth. We envision an empowered nation where every student has the skills to build a stable, prosperous career.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 04: Director's Message */}
      <section id="director-message" className="py-16 md:py-24 bg-white border-b border-neutral-100 text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] max-w-sm mx-auto rounded-[24px] overflow-hidden shadow-lg border border-neutral-200 relative">
              <SafeImage
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                alt="Dr. Vikram Dev, Ph.D. Director of Shiva Skill Institute"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                fallbackType="person"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs text-accent font-mono tracking-widest uppercase font-bold">DIRECTOR'S OFFICE</p>
                <h4 className="text-lg font-sans font-bold mt-1">Dr. Vikram Dev, Ph.D.</h4>
              </div>
            </div>
          </div>

          {/* Right: Message text */}
          <div className="lg:col-span-7 space-y-6">
            <Quote className="w-12 h-12 text-[#2563EB]/20 shrink-0" />
            <h3 className="text-2xl md:text-3xl font-sans text-primary font-bold tracking-tight">
              Preparing You for Real-World Success
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-sans font-light">
              “Education is not just about memorizing facts and scoring marks; it is about building practical competence that changes lives. Our absolute focus at Shiva Skill Institute is to make our students employable from day one.”
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed font-sans font-light">
              We design our training modules in deep collaboration with industry veterans, ensuring you learn precisely what companies are looking for. Our classrooms are spacious, our faculty is highly accessible, and our labs are loaded with real tools. We invite parents and students to join us in building secure, professional, and bright career paths.
            </p>
            <div className="pt-4 border-t border-neutral-100">
              <h5 className="text-base font-sans font-bold text-primary">Dr. Vikram Dev, Ph.D.</h5>
              <p className="text-[10px] text-accent font-mono uppercase tracking-widest mt-0.5">Director, Shiva Skill Institute</p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 05: Core Values */}
      <section id="core-values" className="py-16 md:py-24 bg-[#F8FAFC] border-b border-neutral-100 text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">WHAT WE STAND FOR</span>
            <h3 className="text-3xl font-sans text-primary font-bold tracking-tight">Our Core Values</h3>
            <p className="text-sm text-neutral-500 font-sans font-light">
              These six core tenets guide our staff, teachers, and students every single day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* Value 1: Student First */}
            <div className="group relative p-8 bg-gradient-to-br from-blue-50/20 via-white to-blue-50/30 border border-neutral-200/50 hover:border-blue-200 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.04)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              {/* Pattern: Thin waves */}
              <svg className="absolute left-0 bottom-0 w-full h-12 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300 pointer-events-none text-blue-600" viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="0.5">
                <path d="M0,5 C30,15 70,0 100,5 M0,10 C30,20 70,5 100,10" />
              </svg>
              
              <div className="relative z-10 w-11 h-11 rounded-[14px] bg-white flex items-center justify-center text-blue-600 shadow-[0_4px_12px_rgba(37,99,235,0.08),_inset_0_1px_2px_rgba(255,255,255,1)] border border-blue-100/40 transition-transform duration-300 group-hover:-translate-y-0.5">
                <Users className="w-5 h-5" />
              </div>
              <div className="relative z-10 mt-5 space-y-2">
                <h4 className="text-lg font-sans font-bold text-primary">Student First</h4>
                <div className="w-8 h-0.5 bg-blue-600 rounded-full" />
                <p className="text-xs text-neutral-500 leading-relaxed font-sans font-light pt-1">
                  Every academic decision we make is centered around student welfare, personal mentoring, and long-term career growth.
                </p>
              </div>
            </div>

            {/* Value 2: Integrity */}
            <div className="group relative p-8 bg-gradient-to-br from-indigo-50/15 via-white to-indigo-50/25 border border-neutral-200/50 hover:border-indigo-200 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_35px_rgba(79,70,229,0.04)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              {/* Pattern: Thin double circle */}
              <svg className="absolute right-0 top-0 w-24 h-24 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-300 pointer-events-none text-indigo-600" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="0.5">
                <circle cx="50" cy="0" r="15" />
                <circle cx="50" cy="0" r="28" />
              </svg>
              
              <div className="relative z-10 w-11 h-11 rounded-[14px] bg-white flex items-center justify-center text-indigo-600 shadow-[0_4px_12px_rgba(79,70,229,0.08),_inset_0_1px_2px_rgba(255,255,255,1)] border border-indigo-100/40 transition-transform duration-300 group-hover:-translate-y-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="relative z-10 mt-5 space-y-2">
                <h4 className="text-lg font-sans font-bold text-primary">Integrity</h4>
                <div className="w-8 h-0.5 bg-indigo-600 rounded-full" />
                <p className="text-xs text-neutral-500 leading-relaxed font-sans font-light pt-1">
                  We practice transparent operations, honest admission policies, and high ethical standards across our campus.
                </p>
              </div>
            </div>

            {/* Value 3: Innovation */}
            <div className="group relative p-8 bg-gradient-to-br from-amber-50/15 via-white to-orange-50/20 border border-neutral-200/50 hover:border-orange-200 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_35px_rgba(234,88,12,0.04)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              {/* Pattern: Dot grid */}
              <svg className="absolute right-4 bottom-4 w-16 h-16 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300 pointer-events-none text-orange-600" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dot-grid-val3" width="8" height="8" patternUnits="userSpaceOnUse">
                    <circle cx="1.5" cy="1.5" r="1" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dot-grid-val3)" />
              </svg>
              
              <div className="relative z-10 w-11 h-11 rounded-[14px] bg-white flex items-center justify-center text-orange-600 shadow-[0_4px_12px_rgba(234,88,12,0.08),_inset_0_1px_2px_rgba(255,255,255,1)] border border-orange-100/40 transition-transform duration-300 group-hover:-translate-y-0.5">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div className="relative z-10 mt-5 space-y-2">
                <h4 className="text-lg font-sans font-bold text-primary">Innovation</h4>
                <div className="w-8 h-0.5 bg-orange-600 rounded-full" />
                <p className="text-xs text-neutral-500 leading-relaxed font-sans font-light pt-1">
                  We continuously update our course materials and labs to stay aligned with tech-driven global industry updates.
                </p>
              </div>
            </div>

            {/* Value 4: Practical Learning */}
            <div className="group relative p-8 bg-gradient-to-br from-emerald-50/15 via-white to-emerald-50/25 border border-neutral-200/50 hover:border-emerald-200 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_35px_rgba(5,150,105,0.04)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              {/* Pattern: Diagonal stripes */}
              <svg className="absolute right-0 bottom-0 w-24 h-24 opacity-[0.025] group-hover:opacity-[0.05] transition-opacity duration-300 pointer-events-none text-emerald-600" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="diagonal-val4" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#diagonal-val4)" />
              </svg>
              
              <div className="relative z-10 w-11 h-11 rounded-[14px] bg-white flex items-center justify-center text-emerald-600 shadow-[0_4px_12px_rgba(5,150,105,0.08),_inset_0_1px_2px_rgba(255,255,255,1)] border border-emerald-100/40 transition-transform duration-300 group-hover:-translate-y-0.5">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="relative z-10 mt-5 space-y-2">
                <h4 className="text-lg font-sans font-bold text-primary">Practical Learning</h4>
                <div className="w-8 h-0.5 bg-emerald-600 rounded-full" />
                <p className="text-xs text-neutral-500 leading-relaxed font-sans font-light pt-1">
                  We mandate hands-on training, regular labs, and real project implementations to drive durable understanding.
                </p>
              </div>
            </div>

            {/* Value 5: Excellence */}
            <div className="group relative p-8 bg-gradient-to-br from-purple-50/15 via-white to-purple-50/25 border border-neutral-200/50 hover:border-purple-200 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_35px_rgba(147,51,234,0.04)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              {/* Pattern: Concentric circles */}
              <svg className="absolute left-0 top-0 w-20 h-20 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300 pointer-events-none text-purple-600" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.5">
                <circle cx="0" cy="0" r="10" />
                <circle cx="0" cy="0" r="20" />
                <circle cx="0" cy="0" r="30" />
              </svg>
              
              <div className="relative z-10 w-11 h-11 rounded-[14px] bg-white flex items-center justify-center text-purple-600 shadow-[0_4px_12px_rgba(147,51,234,0.08),_inset_0_1px_2px_rgba(255,255,255,1)] border border-purple-100/40 transition-transform duration-300 group-hover:-translate-y-0.5">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="relative z-10 mt-5 space-y-2">
                <h4 className="text-lg font-sans font-bold text-primary">Excellence</h4>
                <div className="w-8 h-0.5 bg-purple-600 rounded-full" />
                <p className="text-xs text-neutral-500 leading-relaxed font-sans font-light pt-1">
                  We push our limits to achieve professional outcomes, recognized national credentials, and benchmark skill levels.
                </p>
              </div>
            </div>

            {/* Value 6: Community */}
            <div className="group relative p-8 bg-gradient-to-br from-rose-50/15 via-white to-rose-50/25 border border-neutral-200/50 hover:border-rose-200 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_35px_rgba(225,29,72,0.04)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              {/* Pattern: Square Grid pattern */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.015] group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none text-rose-600" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid-val6" width="16" height="16" patternUnits="userSpaceOnUse">
                    <path d="M 16 0 L 0 0 0 16" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-val6)" />
              </svg>
              
              <div className="relative z-10 w-11 h-11 rounded-[14px] bg-white flex items-center justify-center text-rose-600 shadow-[0_4px_12px_rgba(225,29,72,0.08),_inset_0_1px_2px_rgba(255,255,255,1)] border border-rose-100/40 transition-transform duration-300 group-hover:-translate-y-0.5">
                <Heart className="w-5 h-5" />
              </div>
              <div className="relative z-10 mt-5 space-y-2">
                <h4 className="text-lg font-sans font-bold text-primary">Community</h4>
                <div className="w-8 h-0.5 bg-rose-600 rounded-full" />
                <p className="text-xs text-neutral-500 leading-relaxed font-sans font-light pt-1">
                  We nurture an inclusive, safe, and collaborative campus environment built on mutual respect and shared growth.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 06: Infrastructure */}
      <section id="infrastructure" className="py-16 md:py-24 bg-white border-b border-neutral-100 text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Infrastructure Text */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">OUR FACILITIES</span>
            <h3 className="text-3xl font-sans text-primary font-bold tracking-tight">
              State-of-the-Art Practical Infrastructure
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-sans font-light">
              We believe real learning happens when you interact with real equipment. That is why we invest heavily in maintaining world-class, functional physical infrastructure for all our programs.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed font-sans font-light">
              Our facilities feature spacious smart classrooms, high-speed computer labs equipped with modern development tools, specialized hardware training units, and an extensive library with industry references and quiet study spaces.
            </p>
          </div>

          {/* Right: Large Image with Overlapping detail */}
          <div className="lg:col-span-7 relative">
            <div className="aspect-[16/10] rounded-[24px] overflow-hidden shadow-lg border border-neutral-100">
              <SafeImage
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200"
                alt="Modern computer lab training space inside Shiva Skill Institute"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                fallbackType="lab"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 bg-white border border-neutral-100 px-5 py-3.5 rounded-[16px] shadow-md hidden sm:flex items-center space-x-3">
              <Building className="w-5 h-5 text-accent" />
              <div>
                <p className="text-[10px] font-mono text-neutral-400 font-bold uppercase">TRAINING SPACES</p>
                <p className="text-xs font-sans text-primary font-bold">Smart Classrooms & Labs</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 07: Learning Environment */}
      <section id="learning-environment" className="py-16 bg-neutral-900 text-white text-left relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-10 relative z-10">
          
          <div className="max-w-xl space-y-3">
            <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">STUDENT EXPERIENCE</span>
            <h3 className="text-3xl font-sans text-white font-bold tracking-tight">Active Learning Environment</h3>
            <p className="text-sm text-neutral-300 font-sans font-light">
              Step inside our vibrant campus and see where practical skills meet career aspirations. Our students learn through collaboration and real engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="relative group rounded-[24px] overflow-hidden aspect-[4/3] border border-white/10 shadow-md">
              <SafeImage
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800"
                alt="Interactive lecture hall and active learning"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
                fallbackType="campus"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <h5 className="text-sm font-sans font-bold text-white">Interactive Classrooms</h5>
                <p className="text-[11px] text-neutral-300 font-light mt-1">Lively mentoring sessions with active student discussions</p>
              </div>
            </div>

            <div className="relative group rounded-[24px] overflow-hidden aspect-[4/3] border border-white/10 shadow-md">
              <SafeImage
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
                alt="Hands-on training lab and student group research"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
                fallbackType="workshop"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <h5 className="text-sm font-sans font-bold text-white">Hands-On Practice</h5>
                <p className="text-[11px] text-neutral-300 font-light mt-1">Applying technical knowledge directly to live case studies</p>
              </div>
            </div>

            <div className="relative group rounded-[24px] overflow-hidden aspect-[4/3] border border-white/10 shadow-md">
              <SafeImage
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800"
                alt="Experienced faculty mentoring a student"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
                fallbackType="person"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <h5 className="text-sm font-sans font-bold text-white">Faculty Mentoring</h5>
                <p className="text-[11px] text-neutral-300 font-light mt-1">Personalized path guidance and continuous skill review</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 08: Achievements */}
      <section id="achievements" className="py-16 md:py-20 bg-white border-b border-neutral-100 text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="text-left max-w-xl space-y-3">
            <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">RECOGNIZED EXCELLENCE</span>
            <h3 className="text-3xl font-sans text-primary font-bold tracking-tight">Our Achievements</h3>
            <p className="text-sm text-neutral-500 font-sans font-light">
              Over the decades, we have set high benchmarks in professional skill coaching and student success.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            
            <div className="group relative p-6 bg-gradient-to-br from-blue-50/10 via-white to-slate-50/20 border border-neutral-200/50 hover:border-blue-200 rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.03)] hover:-translate-y-0.5 transition-all duration-300 text-center overflow-hidden flex flex-col justify-center items-center">
              <div className="absolute -top-2 -right-2 w-12 h-12 opacity-[0.02] group-hover:opacity-[0.05] text-[#2563EB] transition-all pointer-events-none">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" /></svg>
              </div>
              <span className="block text-3xl font-sans font-extrabold text-[#2563EB] relative z-10">30+</span>
              <span className="block text-[10px] font-sans font-bold text-primary uppercase tracking-wider relative z-10 mt-2">Years of Excellence</span>
              <span className="block text-[9px] text-neutral-400 font-light leading-snug relative z-10 mt-1">Continuous teaching since 1994</span>
            </div>

            <div className="group relative p-6 bg-gradient-to-br from-indigo-50/10 via-white to-slate-50/20 border border-neutral-200/50 hover:border-indigo-200 rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(79,70,229,0.03)] hover:-translate-y-0.5 transition-all duration-300 text-center overflow-hidden flex flex-col justify-center items-center">
              <div className="absolute -top-2 -right-2 w-12 h-12 opacity-[0.02] group-hover:opacity-[0.05] text-indigo-600 transition-all pointer-events-none">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" /></svg>
              </div>
              <span className="block text-3xl font-sans font-extrabold text-[#2563EB] relative z-10">10K+</span>
              <span className="block text-[10px] font-sans font-bold text-primary uppercase tracking-wider relative z-10 mt-2">Successful Students</span>
              <span className="block text-[9px] text-neutral-400 font-light leading-snug relative z-10 mt-1">Empowered campus alumni</span>
            </div>

            <div className="group relative p-6 bg-gradient-to-br from-amber-50/10 via-white to-slate-50/20 border border-neutral-200/50 hover:border-orange-200 rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(234,88,12,0.03)] hover:-translate-y-0.5 transition-all duration-300 text-center overflow-hidden flex flex-col justify-center items-center">
              <div className="absolute -top-2 -right-2 w-12 h-12 opacity-[0.02] group-hover:opacity-[0.05] text-orange-600 transition-all pointer-events-none">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" /></svg>
              </div>
              <span className="block text-3xl font-sans font-extrabold text-[#2563EB] relative z-10">150+</span>
              <span className="block text-[10px] font-sans font-bold text-primary uppercase tracking-wider relative z-10 mt-2">Industry Partners</span>
              <span className="block text-[9px] text-neutral-400 font-light leading-snug relative z-10 mt-1">Hiring and training tie-ups</span>
            </div>

            <div className="group relative p-6 bg-gradient-to-br from-emerald-50/10 via-white to-slate-50/20 border border-neutral-200/50 hover:border-emerald-200 rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(5,150,105,0.03)] hover:-translate-y-0.5 transition-all duration-300 text-center overflow-hidden flex flex-col justify-center items-center">
              <div className="absolute -top-2 -right-2 w-12 h-12 opacity-[0.02] group-hover:opacity-[0.05] text-emerald-600 transition-all pointer-events-none">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" /></svg>
              </div>
              <span className="block text-3xl font-sans font-extrabold text-[#2563EB] relative z-10">98%</span>
              <span className="block text-[10px] font-sans font-bold text-primary uppercase tracking-wider relative z-10 mt-2">Placement Help</span>
              <span className="block text-[9px] text-neutral-400 font-light leading-snug relative z-10 mt-1">Direct interview pipeline</span>
            </div>

            <div className="group relative p-6 bg-gradient-to-br from-purple-50/10 via-white to-slate-50/20 border border-neutral-200/50 hover:border-purple-200 rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(147,51,234,0.03)] hover:-translate-y-0.5 transition-all duration-300 text-center overflow-hidden flex flex-col justify-center items-center">
              <div className="absolute -top-2 -right-2 w-12 h-12 opacity-[0.02] group-hover:opacity-[0.05] text-purple-600 transition-all pointer-events-none">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" /></svg>
              </div>
              <span className="block text-3xl font-sans font-extrabold text-[#2563EB] relative z-10">100%</span>
              <span className="block text-[10px] font-sans font-bold text-primary uppercase tracking-wider relative z-10 mt-2">Certified Programs</span>
              <span className="block text-[9px] text-neutral-400 font-light leading-snug relative z-10 mt-1">Accredited by state boards</span>
            </div>

            <div className="group relative p-6 bg-gradient-to-br from-rose-50/10 via-white to-slate-50/20 border border-neutral-200/50 hover:border-rose-200 rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(225,29,72,0.03)] hover:-translate-y-0.5 transition-all duration-300 text-center overflow-hidden flex flex-col justify-center items-center">
              <div className="absolute -top-2 -right-2 w-12 h-12 opacity-[0.02] group-hover:opacity-[0.05] text-rose-600 transition-all pointer-events-none">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" /></svg>
              </div>
              <span className="block text-3xl font-sans font-extrabold text-[#2563EB] relative z-10">45+</span>
              <span className="block text-[10px] font-sans font-bold text-primary uppercase tracking-wider relative z-10 mt-2">Expert Faculty</span>
              <span className="block text-[9px] text-neutral-400 font-light leading-snug relative z-10 mt-1">Highly qualified mentors</span>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 09: Campus Life */}
      <section id="campus-life" className="py-16 md:py-24 bg-white border-b border-neutral-100 text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-10">
          
          <div className="text-left space-y-3 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">CAMPUS MOMENTS</span>
            <h3 className="text-3xl font-sans text-primary font-bold tracking-tight">Campus Life & Engagement</h3>
            <p className="text-sm text-neutral-500 font-sans font-light">
              We host regular events, professional guest lectures, coding hackathons, celebrations, and interactive seminars to support wholesome growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="group overflow-hidden rounded-[24px] border border-neutral-200/60 shadow-[0_4px_16px_rgba(0,0,0,0.015)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.035)] hover:-translate-y-1 bg-gradient-to-b from-white to-neutral-50/50 transition-all duration-300 relative">
              <div className="aspect-[4/3] overflow-hidden relative">
                <SafeImage
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600"
                  alt="Annual Technology Seminar"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  fallbackType="workshop"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-6 text-left relative overflow-hidden">
                {/* Subtle background waves */}
                <svg className="absolute right-0 bottom-0 w-16 h-16 opacity-[0.02] text-primary pointer-events-none" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.5"><path d="M0,20 Q10,15 20,20 T40,20" /></svg>
                <h5 className="text-sm font-sans font-bold text-primary group-hover:text-accent transition-colors duration-200">Annual Tech Seminars</h5>
                <div className="w-6 h-0.5 bg-accent/40 rounded-full mt-2 mb-2" />
                <p className="text-xs text-neutral-500 font-light leading-relaxed">Interacting with real software founders and technical pioneers</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-[24px] border border-neutral-200/60 shadow-[0_4px_16px_rgba(0,0,0,0.015)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.035)] hover:-translate-y-1 bg-gradient-to-b from-white to-neutral-50/50 transition-all duration-300 relative">
              <div className="aspect-[4/3] overflow-hidden relative">
                <SafeImage
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600"
                  alt="Practical Workshops"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  fallbackType="workshop"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-6 text-left relative overflow-hidden">
                {/* Subtle background circles */}
                <svg className="absolute right-0 bottom-0 w-16 h-16 opacity-[0.02] text-primary pointer-events-none" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.5"><circle cx="40" cy="40" r="15" /><circle cx="40" cy="40" r="28" /></svg>
                <h5 className="text-sm font-sans font-bold text-primary group-hover:text-accent transition-colors duration-200">Hands-on Workshops</h5>
                <div className="w-6 h-0.5 bg-accent/40 rounded-full mt-2 mb-2" />
                <p className="text-xs text-neutral-500 font-light leading-relaxed">Immersive weekends focused on building full-stack applications</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-[24px] border border-neutral-200/60 shadow-[0_4px_16px_rgba(0,0,0,0.015)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.035)] hover:-translate-y-1 bg-gradient-to-b from-white to-neutral-50/50 transition-all duration-300 relative">
              <div className="aspect-[4/3] overflow-hidden relative">
                <SafeImage
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600"
                  alt="Hackathons and Competitions"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  fallbackType="workshop"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-6 text-left relative overflow-hidden">
                {/* Subtle background dot grid */}
                <svg className="absolute right-4 bottom-4 w-12 h-12 opacity-[0.02] text-primary pointer-events-none" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="dot-campus-1" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1" fill="currentColor" /></pattern></defs><rect width="100%" height="100%" fill="url(#dot-campus-1)" /></svg>
                <h5 className="text-sm font-sans font-bold text-primary group-hover:text-accent transition-colors duration-200">Skill Competitions</h5>
                <div className="w-6 h-0.5 bg-accent/40 rounded-full mt-2 mb-2" />
                <p className="text-xs text-neutral-500 font-light leading-relaxed">Internal coding and database challenges to test skill limits</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-[24px] border border-neutral-200/60 shadow-[0_4px_16px_rgba(0,0,0,0.015)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.035)] hover:-translate-y-1 bg-gradient-to-b from-white to-neutral-50/50 transition-all duration-300 relative">
              <div className="aspect-[4/3] overflow-hidden relative">
                <SafeImage
                  src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=600"
                  alt="Student Graduation and Celebrations"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  fallbackType="graduation"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-6 text-left relative overflow-hidden">
                {/* Subtle background diagonal stripes */}
                <svg className="absolute right-0 bottom-0 w-16 h-16 opacity-[0.015] text-primary pointer-events-none" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="diag-campus-1" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" strokeWidth="1" /></pattern></defs><rect width="100%" height="100%" fill="url(#diag-campus-1)" /></svg>
                <h5 className="text-sm font-sans font-bold text-primary group-hover:text-accent transition-colors duration-200">Student Graduations</h5>
                <div className="w-6 h-0.5 bg-accent/40 rounded-full mt-2 mb-2" />
                <p className="text-xs text-neutral-500 font-light leading-relaxed">Honoring student milestones and successful career placements</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 10: Why Students Choose Shiva Skill Institute */}
      <section id="why-choose-us" className="py-16 md:py-24 bg-[#F8FAFC] border-b border-neutral-100 text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">THE SHIVA ADVANTAGE</span>
            <h3 className="text-3xl font-sans text-primary font-bold tracking-tight">
              Why Students Choose Us
            </h3>
            <p className="text-sm text-neutral-500 font-sans font-light">
              We stand apart through our deep student focus, robust placement guidance, and comfortable educational infrastructure designed for real student success.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="group flex items-start space-x-4 p-5 bg-gradient-to-br from-emerald-50/10 via-white to-emerald-50/20 border border-neutral-200/50 hover:border-emerald-200 rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(16,185,129,0.03)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden">
                <div className="absolute -right-2 -bottom-2 w-8 h-8 opacity-[0.02] group-hover:opacity-[0.05] text-emerald-600 transition-opacity pointer-events-none">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" /></svg>
                </div>
                <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-emerald-600 shrink-0 mt-0.5 shadow-[0_2px_8px_rgba(16,185,129,0.08),_inset_0_1px_2px_rgba(255,255,255,1)] border border-emerald-100/40 group-hover:scale-105 transition-transform duration-200">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-sm font-sans font-bold text-primary group-hover:text-emerald-700 transition-colors duration-200">Industry-Oriented Courses</h5>
                  <p className="text-xs text-neutral-500 font-sans font-light mt-1 leading-relaxed">Syllabus updated in real-time to match current market needs.</p>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-5 bg-gradient-to-br from-emerald-50/10 via-white to-emerald-50/20 border border-neutral-200/50 hover:border-emerald-200 rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(16,185,129,0.03)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden">
                <div className="absolute -right-2 -bottom-2 w-8 h-8 opacity-[0.02] group-hover:opacity-[0.05] text-emerald-600 transition-opacity pointer-events-none">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" /></svg>
                </div>
                <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-emerald-600 shrink-0 mt-0.5 shadow-[0_2px_8px_rgba(16,185,129,0.08),_inset_0_1px_2px_rgba(255,255,255,1)] border border-emerald-100/40 group-hover:scale-105 transition-transform duration-200">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-sm font-sans font-bold text-primary group-hover:text-emerald-700 transition-colors duration-200">Experienced Faculty</h5>
                  <p className="text-xs text-neutral-500 font-sans font-light mt-1 leading-relaxed">Learn from veterans who possess actual development background.</p>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-5 bg-gradient-to-br from-emerald-50/10 via-white to-emerald-50/20 border border-neutral-200/50 hover:border-emerald-200 rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(16,185,129,0.03)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden">
                <div className="absolute -right-2 -bottom-2 w-8 h-8 opacity-[0.02] group-hover:opacity-[0.05] text-emerald-600 transition-opacity pointer-events-none">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" /></svg>
                </div>
                <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-emerald-600 shrink-0 mt-0.5 shadow-[0_2px_8px_rgba(16,185,129,0.08),_inset_0_1px_2px_rgba(255,255,255,1)] border border-emerald-100/40 group-hover:scale-105 transition-transform duration-200">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-sm font-sans font-bold text-primary group-hover:text-emerald-700 transition-colors duration-200">Affordable Education</h5>
                  <p className="text-xs text-neutral-500 font-sans font-light mt-1 leading-relaxed">High quality skills made highly accessible through flexible terms.</p>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-5 bg-gradient-to-br from-emerald-50/10 via-white to-emerald-50/20 border border-neutral-200/50 hover:border-emerald-200 rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(16,185,129,0.03)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden">
                <div className="absolute -right-2 -bottom-2 w-8 h-8 opacity-[0.02] group-hover:opacity-[0.05] text-emerald-600 transition-opacity pointer-events-none">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" /></svg>
                </div>
                <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-emerald-600 shrink-0 mt-0.5 shadow-[0_2px_8px_rgba(16,185,129,0.08),_inset_0_1px_2px_rgba(255,255,255,1)] border border-emerald-100/40 group-hover:scale-105 transition-transform duration-200">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-sm font-sans font-bold text-primary group-hover:text-emerald-700 transition-colors duration-200">Modern Facilities</h5>
                  <p className="text-xs text-neutral-500 font-sans font-light mt-1 leading-relaxed">Fully operational high speed computer labs & smart spaces.</p>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-5 bg-gradient-to-br from-emerald-50/10 via-white to-emerald-50/20 border border-neutral-200/50 hover:border-emerald-200 rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(16,185,129,0.03)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden">
                <div className="absolute -right-2 -bottom-2 w-8 h-8 opacity-[0.02] group-hover:opacity-[0.05] text-emerald-600 transition-opacity pointer-events-none">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" /></svg>
                </div>
                <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-emerald-600 shrink-0 mt-0.5 shadow-[0_2px_8px_rgba(16,185,129,0.08),_inset_0_1px_2px_rgba(255,255,255,1)] border border-emerald-100/40 group-hover:scale-105 transition-transform duration-200">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-sm font-sans font-bold text-primary group-hover:text-emerald-700 transition-colors duration-200">Career Guidance</h5>
                  <p className="text-xs text-neutral-500 font-sans font-light mt-1 leading-relaxed">Comprehensive placement support, interview training & resumes.</p>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-5 bg-gradient-to-br from-emerald-50/10 via-white to-emerald-50/20 border border-neutral-200/50 hover:border-emerald-200 rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(16,185,129,0.03)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden">
                <div className="absolute -right-2 -bottom-2 w-8 h-8 opacity-[0.02] group-hover:opacity-[0.05] text-emerald-600 transition-opacity pointer-events-none">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" /></svg>
                </div>
                <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-emerald-600 shrink-0 mt-0.5 shadow-[0_2px_8px_rgba(16,185,129,0.08),_inset_0_1px_2px_rgba(255,255,255,1)] border border-emerald-100/40 group-hover:scale-105 transition-transform duration-200">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-sm font-sans font-bold text-primary group-hover:text-emerald-700 transition-colors duration-200">Supportive Environment</h5>
                  <p className="text-xs text-neutral-500 font-sans font-light mt-1 leading-relaxed">Safe, friendly, and structured spaces optimized for active learning.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 11: Final CTA */}
      <section id="about-cta" className="py-20 md:py-24 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-accent/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 space-y-8 relative z-10">
          <div className="w-12 h-12 rounded-[12px] border border-accent flex items-center justify-center mx-auto text-accent text-lg font-sans font-bold">
            S
          </div>
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">START TODAY</span>
            <h3 className="text-3xl md:text-5xl font-sans text-white font-extrabold tracking-tight">
              Start Your Learning Journey Today
            </h3>
            <p className="text-xs md:text-sm text-neutral-300 font-sans font-light max-w-xl mx-auto leading-relaxed">
              Equip yourself with practical, career-ready skills that employers actively hire for. Our admissions are open. Let us build your secure career path together.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button
              onClick={() => {
                onPageChange('courses');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-accent hover:bg-accent/90 text-white text-xs uppercase tracking-widest font-semibold rounded-[16px] transition-all duration-300 shadow cursor-pointer flex items-center justify-center space-x-2 mx-auto sm:mx-0"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={onRequestProspectus}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/15 text-white text-xs uppercase tracking-widest font-semibold rounded-[16px] border border-white/10 transition-all duration-300 cursor-pointer flex items-center justify-center"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
