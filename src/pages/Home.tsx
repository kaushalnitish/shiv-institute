import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Check, 
  ArrowRight, 
  CornerDownRight, 
  Landmark, 
  GraduationCap, 
  BookOpen, 
  Briefcase,
  ChevronRight,
  Sparkles,
  Search
} from 'lucide-react';
import { Course } from '../types';
import { COURSES_DATA, TESTIMONIALS_DATA } from '../data';
import SafeImage from '../components/SafeImage';

interface HomeProps {
  onPageChange: (page: 'home' | 'about' | 'courses' | 'gallery' | 'admissions') => void;
  onSelectCourse: (course: Course) => void;
  onRequestProspectus: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
}

export default function Home({
  onPageChange,
  onSelectCourse,
  onRequestProspectus,
  setSearchQuery,
  setSelectedCategory
}: HomeProps) {
  
  const [localSearch, setLocalSearch] = useState('');
  const [localCategory, setLocalCategory] = useState('All');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setSelectedCategory(localCategory);
    onPageChange('courses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Display all courses up to maximum of six
  const featuredCourses = COURSES_DATA.slice(0, 6);

  // Authenticated high-quality student photos for testimonials
  const testimonialPhotos = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300', // Elena
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300', // Karthik
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'  // Marcus
  ];

  // Campus Experience editorial images mapping
  const campusGridItems = [
    {
      title: 'Advanced Research Labs',
      type: 'Labs',
      imageUrl: 'https://images.unsplash.com/photo-1580894732444-8fecef2271ff?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Engineering Workshops',
      type: 'Workshops',
      imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Dean Seminar Classrooms',
      type: 'Classrooms',
      imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'The Vaulted Library',
      type: 'Library',
      imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Annual Academic Events',
      type: 'Events',
      imageUrl: 'https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Dynamic Student Peer Circles',
      type: 'Students',
      imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div id="home-page" className="pt-0">
      
      {/* SECTION 02: Full-Width Banner Hero Section */}
      <section 
        id="home-hero" 
        className="relative w-full h-[450px] sm:h-[520px] lg:h-[580px] bg-neutral-900 overflow-hidden flex items-center justify-center text-center px-6"
      >
        {/* Full-width cinematic background image of beautiful Indian campus */}
        <div className="absolute inset-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&q=80&w=1600"
            alt="Shiva Skill Institute Premium Indian Campus and Modern Practical Computer Lab"
            className="w-full h-full object-cover object-[center_35%]"
            referrerPolicy="no-referrer"
            fallbackType="lab"
          />
          {/* Gradients and Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/60" />
        </div>

        <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center justify-center space-y-4 md:space-y-5 lg:space-y-6 pt-2 md:pt-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 border border-white/20 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-[20px]"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-[10px] font-mono tracking-widest text-white uppercase font-bold animate-pulse">
              Admissions Open • Academic Year 2026
            </span>
          </motion.div>

          <div className="space-y-2 md:space-y-3">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold text-white leading-[1.15] tracking-tight text-balance"
            >
              Build Your Career With Practical Skills
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm md:text-base lg:text-lg text-neutral-200 leading-relaxed font-sans font-light max-w-2xl mx-auto"
            >
              Learn industry-ready skills from experienced trainers through practical classes, live projects and career-focused programs.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <button
              id="hero-apply-now"
              onClick={onRequestProspectus}
              className="px-8 py-3.5 bg-accent hover:bg-accent/90 text-white text-xs uppercase tracking-widest font-bold rounded-[16px] transition-all duration-300 shadow-md flex items-center justify-center space-x-2 cursor-pointer w-full sm:w-auto"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="hero-explore-courses"
              onClick={() => {
                onPageChange('courses');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-widest font-bold rounded-[16px] border border-white/20 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer w-full sm:w-auto backdrop-blur-sm"
            >
              <span>Explore Courses</span>
              <CornerDownRight className="w-4 h-4 text-white" />
            </button>
          </motion.div>

          {/* Integrated Premium Search Bar near bottom */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="w-full pt-1.5 md:pt-2 lg:pt-3"
          >
            <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-center w-full bg-white border border-neutral-100 rounded-[22px] p-2 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.25)] gap-2 md:h-[72px]">
              {/* Search input with icon */}
              <div className="flex items-center flex-1 w-full pl-3.5 pr-2 py-2 md:py-0">
                <Search className="w-5 h-5 text-neutral-400 shrink-0 mr-3" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full text-sm text-neutral-800 placeholder-neutral-400 bg-transparent outline-none border-none py-1.5 focus:ring-0"
                />
              </div>

              {/* Divider on desktop */}
              <div className="hidden md:block w-px h-8 bg-neutral-200" />

              {/* Dropdown with categories */}
              <div className="relative w-full md:w-auto min-w-[200px] px-3.5 md:px-0 py-2 md:py-0 flex items-center">
                <select
                  value={localCategory}
                  onChange={(e) => setLocalCategory(e.target.value)}
                  className="w-full text-xs font-mono uppercase tracking-widest text-neutral-600 bg-transparent outline-none border-none py-2 pr-8 cursor-pointer focus:ring-0 appearance-none font-bold"
                >
                  <option value="All">All Categories</option>
                  <option value="Leadership & Policy">Leadership & Policy</option>
                  <option value="Applied Technology">Applied Technology</option>
                  <option value="Applied Sciences & Research">Applied Sciences & Research</option>
                </select>
                <div className="absolute right-4 md:right-2 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </div>
              </div>

              {/* Search button */}
              <button
                type="submit"
                className="w-full md:w-auto px-8 h-12 md:h-full bg-[#2563EB] hover:bg-[#2563EB]/90 text-white text-[11px] font-mono uppercase tracking-widest font-extrabold rounded-[16px] transition-all duration-300 shadow-sm flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
              >
                <span>SEARCH</span>
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* SECTION 03: Institute Highlights */}
      <section id="institute-highlights" className="py-24 bg-[#F8FAFC] border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Highlight 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="group relative p-8 bg-gradient-to-br from-blue-50/20 via-white to-blue-50/30 border border-neutral-200/50 hover:border-blue-200 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.04)] hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden"
            >
              {/* Pattern: Thin waves */}
              <svg className="absolute left-0 bottom-0 w-full h-12 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300 pointer-events-none text-blue-600" viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="0.5">
                <path d="M0,5 C30,15 70,0 100,5 M0,10 C30,20 70,5 100,10" />
              </svg>
              
              <div className="relative z-10 w-11 h-11 rounded-[14px] bg-white flex items-center justify-center text-blue-600 shadow-[0_4px_12px_rgba(37,99,235,0.08),_inset_0_1px_2px_rgba(255,255,255,1)] border border-blue-100/40 transition-transform duration-300 group-hover:-translate-y-0.5 mb-6">
                <Landmark className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-sans font-bold text-primary mb-2 relative z-10">Years of Excellence</h4>
              <div className="w-8 h-0.5 bg-blue-600 rounded-full mb-3" />
              <p className="text-xs text-neutral-500 leading-relaxed font-sans font-light relative z-10">
                Over 30 years of elite academic heritage since 1994, shaping industry champions and sovereign administrative fellows.
              </p>
            </motion.div>

            {/* Highlight 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="group relative p-8 bg-gradient-to-br from-indigo-50/15 via-white to-indigo-50/25 border border-neutral-200/50 hover:border-indigo-200 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_35px_rgba(79,70,229,0.04)] hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden"
            >
              {/* Pattern: Thin double circle */}
              <svg className="absolute right-0 top-0 w-24 h-24 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-300 pointer-events-none text-indigo-600" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="0.5">
                <circle cx="50" cy="0" r="15" />
                <circle cx="50" cy="0" r="28" />
              </svg>
              
              <div className="relative z-10 w-11 h-11 rounded-[14px] bg-white flex items-center justify-center text-indigo-600 shadow-[0_4px_12px_rgba(79,70,229,0.08),_inset_0_1px_2px_rgba(255,255,255,1)] border border-indigo-100/40 transition-transform duration-300 group-hover:-translate-y-0.5 mb-6">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-sans font-bold text-primary mb-2 relative z-10">Expert Faculty</h4>
              <div className="w-8 h-0.5 bg-indigo-600 rounded-full mb-3" />
              <p className="text-xs text-neutral-500 leading-relaxed font-sans font-light relative z-10">
                Study under decorated PhD professors, visiting global scholars, and active researchers with elite global credentials.
              </p>
            </motion.div>

            {/* Highlight 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="group relative p-8 bg-gradient-to-br from-amber-50/15 via-white to-orange-50/20 border border-neutral-200/50 hover:border-orange-200 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_35px_rgba(234,88,12,0.04)] hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden"
            >
              {/* Pattern: Dot grid */}
              <svg className="absolute right-4 bottom-4 w-16 h-16 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300 pointer-events-none text-orange-600" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dot-grid-hl3" width="8" height="8" patternUnits="userSpaceOnUse">
                    <circle cx="1.5" cy="1.5" r="1" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dot-grid-hl3)" />
              </svg>
              
              <div className="relative z-10 w-11 h-11 rounded-[14px] bg-white flex items-center justify-center text-orange-600 shadow-[0_4px_12px_rgba(234,88,12,0.08),_inset_0_1px_2px_rgba(255,255,255,1)] border border-orange-100/40 transition-transform duration-300 group-hover:-translate-y-0.5 mb-6">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-sans font-bold text-primary mb-2 relative z-10">Industry Focus</h4>
              <div className="w-8 h-0.5 bg-orange-600 rounded-full mb-3" />
              <p className="text-xs text-neutral-500 leading-relaxed font-sans font-light relative z-10">
                Dynamic engineering and policy curricula calibrated quarterly with enterprise boards and direct executive criteria.
              </p>
            </motion.div>

            {/* Highlight 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="group relative p-8 bg-gradient-to-br from-emerald-50/15 via-white to-emerald-50/25 border border-neutral-200/50 hover:border-emerald-200 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_35px_rgba(5,150,105,0.04)] hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden"
            >
              {/* Pattern: Diagonal stripes */}
              <svg className="absolute right-0 bottom-0 w-24 h-24 opacity-[0.025] group-hover:opacity-[0.05] transition-opacity duration-300 pointer-events-none text-emerald-600" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="diagonal-hl4" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#diagonal-hl4)" />
              </svg>
              
              <div className="relative z-10 w-11 h-11 rounded-[14px] bg-white flex items-center justify-center text-emerald-600 shadow-[0_4px_12px_rgba(5,150,105,0.08),_inset_0_1px_2px_rgba(255,255,255,1)] border border-emerald-100/40 transition-transform duration-300 group-hover:-translate-y-0.5 mb-6">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-sans font-bold text-primary mb-2 relative z-10">Placement Support</h4>
              <div className="w-8 h-0.5 bg-emerald-600 rounded-full mb-3" />
              <p className="text-xs text-neutral-500 leading-relaxed font-sans font-light relative z-10">
                Lifelong career networks with a historic 98% placement success rate within 180 days of graduation.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 04: Featured Courses */}
      <section id="featured-courses" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="text-left space-y-3">
              <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">PRESTIGIOUS PROGRAMS</span>
              <h2 className="text-3xl md:text-4xl font-sans text-primary font-extrabold tracking-tight">Featured Courses</h2>
              <p className="text-xs md:text-sm text-neutral-500 font-sans font-light max-w-xl">
                Explore our leading cohorts and fellowships, each engineered to cultivate deep structural mastery and sector authority.
              </p>
            </div>
            <button
              onClick={() => {
                onPageChange('courses');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-mono uppercase tracking-widest text-accent hover:text-accent/80 transition-colors duration-150 flex items-center space-x-1 border-b border-accent/20 pb-1 cursor-pointer font-bold shrink-0"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div 
                key={course.id}
                className="group relative bg-gradient-to-br from-white via-white to-slate-50/40 rounded-[24px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.015)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.04)] hover:-translate-y-1.5 border border-neutral-200/60 hover:border-blue-200/80 flex flex-col justify-between transition-all duration-300 text-left"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <SafeImage
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      referrerPolicy="no-referrer"
                      fallbackType="lab"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-accent text-white text-[9px] font-mono uppercase tracking-widest rounded-[12px] font-bold shadow-sm">
                        {course.level}
                      </span>
                    </div>
                  </div>
 
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                      <span className="bg-neutral-100/80 text-neutral-600 px-2.5 py-0.5 rounded-[8px] font-bold">{course.category}</span>
                      <span>•</span>
                      <span>{course.duration}</span>
                    </div>
                    <h4 className="text-lg font-sans text-primary font-bold leading-snug group-hover:text-accent transition-colors duration-200">
                      {course.title}
                    </h4>
                    <p className="text-xs text-neutral-500 leading-relaxed font-sans font-light line-clamp-3">
                      {course.description}
                    </p>
                  </div>
                </div>
 
                <div className="p-6 pt-4 flex items-center justify-between border-t border-neutral-100 relative z-10 bg-transparent">
                  <div className="flex items-center space-x-2">
                    <SafeImage
                      src={course.instructor.photo}
                      alt={course.instructor.name}
                      className="w-8 h-8 rounded-full object-cover border border-accent/25"
                      referrerPolicy="no-referrer"
                      fallbackType="person"
                    />
                    <span className="text-[10px] text-neutral-600 font-sans font-medium">
                      {course.instructor.name}
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectCourse(course)}
                    className="text-[10px] font-mono uppercase tracking-widest text-primary hover:text-accent font-bold transition-colors duration-150 flex items-center space-x-1 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 05: Why Choose Shiva Skill Institute */}
      <section id="why-choose-us" className="py-24 bg-[#F8FAFC] border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Large Campus Image on Left */}
            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/3] rounded-[24px] overflow-hidden shadow-xl border border-neutral-200/50">
                <SafeImage
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200"
                  alt="Shiva Institute Historical Campus"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  fallbackType="campus"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Content beside Image on Right */}
            <div className="lg:col-span-6 text-left space-y-8">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">WHY CHOOSE US</span>
                <h2 className="text-3xl md:text-4xl font-sans text-primary font-extrabold tracking-tight">
                  Academic Integrity & Real-world Mastery
                </h2>
                <p className="text-xs md:text-sm text-neutral-500 leading-relaxed font-sans font-light">
                  We stand as a prestigious alternative to standard mass curriculum centers. We craft complete educational journeys where theoretical depth meets uncompromising practical application.
                </p>
              </div>

              {/* Feature List (Check icons only, no excessive graphics) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                {[
                  {
                    title: 'Experienced Faculty',
                    desc: 'Study directly under decorated PhD researchers and global visiting fellows.'
                  },
                  {
                    title: 'Hands-on Learning',
                    desc: 'Acquire real competency through live development and panel reviews.'
                  },
                  {
                    title: 'Modern Infrastructure',
                    desc: 'Access advanced computational suites, libraries, and seminar halls.'
                  },
                  {
                    title: 'Career Support',
                    desc: 'Benefit from portfolio polishing and direct placement corporate lines.'
                  },
                  {
                    title: 'Affordable Education',
                    desc: 'Aspirational programs supported by endowment waivers and grants.'
                  },
                  {
                    title: 'Industry Exposure',
                    desc: 'Periodic project evaluations and masterclasses run by active executives.'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 text-left">
                    <div className="mt-1 flex items-center justify-center w-5 h-5 rounded-full bg-accent/10 text-accent shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="text-sm font-sans font-bold text-primary leading-tight">{item.title}</h4>
                      <p className="text-[11px] text-neutral-500 font-light mt-1 leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 06: Institute Story Preview */}
      <section id="institute-story-preview" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Story Text Content on Left */}
            <div className="lg:col-span-6 text-left space-y-6">
              <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">OUR STORY</span>
              <h2 className="text-3xl md:text-4xl font-sans text-primary font-extrabold tracking-tight">
                A Legacy Built on Academic Stewardship
              </h2>
              <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-sans font-light">
                Shiva Skill Institute was founded in MCMXCIV under a charter of professional excellence. Our mission has always been to stand at the forefront of technical policy and advanced systems engineering. 
              </p>
              <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-sans font-light">
                We believe that premium education should inspire deep confidence, curious minds, and robust, independent capability. We cultivate a warm physical academic sanctuary where students discover real leadership limits.
              </p>
              
              <div className="pt-2">
                <button
                  onClick={() => {
                    onPageChange('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-7 py-3 bg-accent hover:bg-accent/90 text-white text-xs uppercase tracking-widest font-bold rounded-[16px] transition-all duration-300 shadow flex items-center space-x-2 cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Large Campus Photograph on Right */}
            <div className="lg:col-span-6">
              <div className="aspect-[16/10] sm:aspect-[16/11] rounded-[24px] overflow-hidden shadow-xl border border-neutral-100">
                <SafeImage
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1200"
                  alt="Shiva Institute Grand Library Story Preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  fallbackType="campus"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 07: Campus Experience */}
      <section id="campus-experience" className="py-24 bg-[#F8FAFC] border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">CAMPUS CULTURE</span>
            <h2 className="text-3xl md:text-4xl font-sans text-primary font-extrabold tracking-tight">Campus Experience</h2>
            <p className="text-xs md:text-sm text-neutral-500 font-sans font-light">
              Step inside a real environment. Explore our vibrant, natural-light physical spaces designed for collaboration and technical breakthroughs.
            </p>
          </div>

          {/* Editorial Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {campusGridItems.map((item, index) => (
              <div 
                key={index} 
                className="group relative bg-gradient-to-br from-white via-white to-slate-50/40 rounded-[24px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.015)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.035)] hover:-translate-y-1.5 border border-neutral-200/60 hover:border-blue-200/80 transition-all duration-300 text-left"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <SafeImage
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    fallbackType="campus"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-6 relative overflow-hidden">
                  {/* Pattern: tiny concentric arcs */}
                  <svg className="absolute right-0 bottom-0 w-16 h-16 opacity-[0.02] text-primary pointer-events-none" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.5">
                    <circle cx="40" cy="40" r="15" />
                    <circle cx="40" cy="40" r="28" />
                  </svg>
                  
                  <span className="text-[9px] font-mono tracking-widest text-accent font-bold uppercase">{item.type}</span>
                  <div className="w-6 h-0.5 bg-accent/40 rounded-full mt-1.5 mb-1.5" />
                  <h4 className="text-sm font-sans font-bold text-primary group-hover:text-accent transition-colors duration-200 mt-1">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 08: Student Testimonials */}
      <section id="student-testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          {/* Header */}
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">ALUMNI VOICES</span>
            <h2 className="text-3xl md:text-4xl font-sans text-primary font-extrabold tracking-tight">Student Testimonials</h2>
            <p className="text-xs md:text-sm text-neutral-500 font-sans font-light">
              Discover how our values of rigor and ethics shaped our graduates’ industry authority and corporate standpoints.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS_DATA.map((t, index) => (
              <div 
                key={t.id}
                className="group relative p-8 bg-gradient-to-br from-blue-50/10 via-white to-slate-50/20 border border-neutral-200/60 hover:border-blue-200 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.035)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden text-left"
              >
                {/* Large Background Quote Mark with low opacity */}
                <span className="absolute -top-4 -right-2 text-7xl font-sans font-extrabold text-blue-600/5 select-none pointer-events-none group-hover:scale-110 group-hover:text-blue-600/10 transition-transform duration-300">
                  “
                </span>
                
                <div className="relative z-10">
                  <p className="text-xs md:text-sm text-neutral-600 font-sans font-light italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-6 border-t border-neutral-100 mt-6 flex items-center space-x-3.5 relative z-10">
                  <SafeImage
                    src={testimonialPhotos[index]}
                    alt={t.author}
                    className="w-12 h-12 rounded-full object-cover border border-accent/20 shrink-0 group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    fallbackType="person"
                  />
                  <div>
                    <h5 className="text-xs font-sans font-bold text-primary group-hover:text-accent transition-colors duration-200">{t.author}</h5>
                    <p className="text-[10px] text-neutral-500 font-sans font-light truncate max-w-[180px]">{t.role}</p>
                    <span className="text-[9px] font-mono text-accent uppercase tracking-wider font-semibold">{t.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 09: Gallery Preview */}
      <section id="gallery-preview" className="py-24 bg-[#F8FAFC] border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="text-left space-y-3">
              <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">LEGACY COHORTS</span>
              <h2 className="text-3xl md:text-4xl font-sans text-primary font-extrabold tracking-tight">Gallery Preview</h2>
              <p className="text-xs md:text-sm text-neutral-500 font-sans font-light max-w-xl">
                A visual journey through the graduation events, interactive study sessions, and heritage campus quad.
              </p>
            </div>
            <button
              onClick={() => {
                onPageChange('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-mono uppercase tracking-widest text-accent hover:text-accent/80 transition-colors duration-150 flex items-center space-x-1 border-b border-accent/20 pb-1 cursor-pointer font-bold shrink-0"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Editorial Spacing Gallery Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'The Sterling Legacy Archway',
                desc: 'Est. 1994',
                imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800'
              },
              {
                title: 'Dean’s Grand Library',
                desc: 'Academic Sanctuary',
                imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800'
              },
              {
                title: 'Honorary Convocation Ceremony',
                desc: 'Class of 2025',
                imageUrl: 'https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd?auto=format&fit=crop&q=80&w=800'
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="overflow-hidden rounded-[24px] border border-neutral-200/60 shadow-[0_4px_16px_rgba(0,0,0,0.015)] hover:shadow-[0_25px_50px_rgba(37,99,235,0.055)] hover:-translate-y-1.5 hover:border-blue-200/80 relative group aspect-[4/3] cursor-pointer transition-all duration-300"
                onClick={() => {
                  onPageChange('gallery');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <SafeImage
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-[24px] transition-transform duration-700 group-hover:scale-[1.04]"
                  referrerPolicy="no-referrer"
                  fallbackType="campus"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-left z-10 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-[9px] font-mono tracking-widest text-accent uppercase font-bold block">{item.desc}</span>
                  <div className="w-6 h-0.5 bg-accent/60 rounded-full mt-1 mb-2" />
                  <h4 className="text-sm font-sans font-bold mt-0.5 leading-snug">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 10: Final Call To Action */}
      <section id="final-cta" className="py-24 bg-primary text-white relative overflow-hidden">
        {/* Editorial Watermark background */}
        <div className="absolute right-0 bottom-0 opacity-[0.02] text-[200px] font-sans font-black select-none pointer-events-none translate-x-12 translate-y-12">
          SHIVA
        </div>
        <div className="absolute inset-0 bg-radial-gradient from-accent/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <div className="w-12 h-12 rounded-[16px] bg-accent flex items-center justify-center mx-auto text-white text-lg font-sans font-extrabold shadow-md">
            S
          </div>
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">BEGIN YOUR JOURNEY</span>
            <h2 className="text-3xl md:text-5xl font-sans text-white font-extrabold tracking-tight">
              Ready To Build Your Career?
            </h2>
            <p className="text-xs md:text-sm text-neutral-300 font-sans font-light max-w-xl mx-auto leading-relaxed">
              Coordinate your credentials with our academic board today. Secure your seat in the upcoming Michaelmas term cohort review and work with world-class faculty.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button
              id="final-cta-apply"
              onClick={onRequestProspectus}
              className="px-8 py-3.5 bg-accent hover:bg-accent/90 text-white text-xs uppercase tracking-widest font-bold rounded-[16px] transition-all duration-300 shadow cursor-pointer w-full sm:w-auto"
            >
              Apply Now
            </button>
            <button
              id="final-cta-contact"
              onClick={onRequestProspectus}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/15 text-white text-xs uppercase tracking-widest font-bold rounded-[16px] border border-white/20 transition-all duration-300 cursor-pointer w-full sm:w-auto"
            >
              Contact Institute
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
