import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Filter, 
  Compass, 
  Camera, 
  Calendar, 
  ArrowRight,
  Eye,
  CheckCircle2,
  Users,
  GraduationCap,
  Building2,
  BookOpen,
  Laptop,
  Check,
  Heart,
  Award,
  ChevronUp
} from 'lucide-react';
import SafeImage from '../components/SafeImage';

const getFallbackType = (category: string): 'lab' | 'person' | 'graduation' | 'campus' | 'workshop' | 'general' => {
  const cat = category.toLowerCase();
  if (cat.includes('lab')) return 'lab';
  if (cat.includes('workshop')) return 'workshop';
  if (cat.includes('graduation')) return 'graduation';
  if (cat.includes('faculty') || cat.includes('student') || cat.includes('people')) return 'person';
  if (cat.includes('classroom') || cat.includes('campus')) return 'campus';
  return 'general';
};

interface GalleryProps {
  onPageChange: (page: 'home' | 'about' | 'courses' | 'gallery' | 'admissions') => void;
  onRequestProspectus: () => void;
  onRequestVisit: () => void;
}

interface GalleryItem {
  id: string;
  title: string;
  category: 'Campus' | 'Computer Labs' | 'Classrooms' | 'Events' | 'Workshops' | 'Students' | 'Graduation' | 'Faculty';
  description: string;
  imageUrl: string;
  date: string;
  aspectRatio: string; // Used to drive natural masonry flow
}

const SHIVA_GALLERY_DATABASE: GalleryItem[] = [
  {
    id: 'gal-labs-1',
    title: 'Modern Interactive Coding Lab',
    category: 'Computer Labs',
    description: 'Our flagship state-of-the-art computer lab where students master programming, database configurations, and full-stack architecture.',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    date: 'Active Labs',
    aspectRatio: 'aspect-[4/3]'
  },
  {
    id: 'gal-campus-1',
    title: 'Academic Quadrangle Courtyard',
    category: 'Campus',
    description: 'The lush green central hub where students gather between practical training sessions for study discussions and mutual peer guidance.',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800',
    date: 'Main Campus',
    aspectRatio: 'aspect-[3/2]'
  },
  {
    id: 'gal-campus-2',
    title: 'Prestigious Red-Brick Campus Exterior',
    category: 'Campus',
    description: 'The monumental entrance of Shiva Skill Institute, symbolizing three decades of absolute dedication to student placement and technical skills.',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800',
    date: 'Campus Quad',
    aspectRatio: 'aspect-[16/10]'
  },
  {
    id: 'gal-classrooms-1',
    title: 'Smart Multimedia Lecture Theatre',
    category: 'Classrooms',
    description: 'Featuring widescreen projection setups and audio-controlled walls to maximize core retention during interactive seminars.',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    date: 'Block A',
    aspectRatio: 'aspect-[4/3]'
  },
  {
    id: 'gal-workshops-1',
    title: 'Hands-on Full-Stack Web Bootcamp',
    category: 'Workshops',
    description: 'Students writing reactive user interfaces and hosting secure backend servers during our weekend code challenge event.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    date: 'Bootcamp series',
    aspectRatio: 'aspect-[3/2]'
  },
  {
    id: 'gal-events-1',
    title: 'Interactive Technology Roundtable',
    category: 'Events',
    description: 'Corporate recruiters and software engineers addressing student cohorts, sharing actual interview processes and coding guidelines.',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
    date: 'Annual Meet',
    aspectRatio: 'aspect-[16/10]'
  },
  {
    id: 'gal-students-1',
    title: 'Collaborative Code Review Group',
    category: 'Students',
    description: 'Active peer discussions and mutual debugging during final project sprints to optimize algorithms and response time.',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
    date: 'Peer Labs',
    aspectRatio: 'aspect-[4/3]'
  },
  {
    id: 'gal-faculty-1',
    title: 'Dedicated Code Clinic Review',
    category: 'Faculty',
    description: 'Highly accessible mentors reviewing database schemas and providing personal guidance in structured error-correction sessions.',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800',
    date: 'Mentoring Hours',
    aspectRatio: 'aspect-[3/2]'
  },
  {
    id: 'gal-graduation-1',
    title: 'Tossing Caps in Achievement',
    category: 'Graduation',
    description: 'The landmark milestone moment where certified student cohorts celebrate completion of their courses and placement transition.',
    imageUrl: 'https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd?auto=format&fit=crop&q=80&w=800',
    date: 'Class of 2025',
    aspectRatio: 'aspect-[4/3]'
  },
  {
    id: 'gal-labs-2',
    title: 'Hardware Diagnostics Lab Unit',
    category: 'Computer Labs',
    description: 'Our second computer lab space configured with specialized server diagnostic units and testing environments.',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    date: 'Lab Wing B',
    aspectRatio: 'aspect-[16/10]'
  },
  {
    id: 'gal-classrooms-2',
    title: 'Peer Project Strategy Room',
    category: 'Classrooms',
    description: 'Interactive classrooms with large whiteboard systems designed to help students map system structures and workflows.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    date: 'Study Room 2',
    aspectRatio: 'aspect-[3/2]'
  },
  {
    id: 'gal-students-2',
    title: 'Vibrant Placement Drive Preparation',
    category: 'Students',
    description: 'Mock coding reviews and group presentations help build communication confidence prior to corporate recruiter interviews.',
    imageUrl: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=800',
    date: 'Placement Prep',
    aspectRatio: 'aspect-[4/3]'
  }
];

export default function Gallery({ onPageChange, onRequestProspectus, onRequestVisit }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Swipe support state for mobile lightbox
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const categories = useMemo(() => [
    'All',
    'Campus',
    'Computer Labs',
    'Classrooms',
    'Events',
    'Workshops',
    'Students',
    'Graduation',
    'Faculty'
  ], []);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return SHIVA_GALLERY_DATABASE;
    return SHIVA_GALLERY_DATABASE.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex === null) return;
    const nextIndex = (lightboxIndex + 1) % filteredItems.length;
    setLightboxIndex(nextIndex);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex === null) return;
    const prevIndex = (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    setLightboxIndex(prevIndex);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        setLightboxIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="gallery-page" className="pt-0 bg-white">
      
      {/* SECTION 01: Hero Banner */}
      <section 
        id="gallery-hero" 
        className="relative w-full h-[480px] md:h-[580px] bg-neutral-900 overflow-hidden flex items-center justify-center text-center px-6"
      >
        {/* Full-width cinematic custom collage image with 25-35% overlay */}
        <div className="absolute inset-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1600"
            alt="Vibrant Indian student campus life collage at Shiva Skill Institute"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            fallbackType="campus"
          />
          {/* Soft dark navy overlay (30% opacity) for high legibility */}
          <div className="absolute inset-0 bg-neutral-950/30 backdrop-brightness-[0.8]" />
        </div>

        <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center justify-center space-y-5 pt-12">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full"
          >
            <Camera className="w-3.5 h-3.5 text-accent" />
            <span className="text-[10px] font-mono tracking-widest text-white uppercase font-bold">
              PHOTO JOURNAL • OUR VIBRANT LIFE
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-extrabold text-white leading-[1.1] tracking-tight"
          >
            Every Picture Tells Our Story
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm md:text-base text-neutral-150 leading-relaxed font-sans font-light max-w-2xl mx-auto"
          >
            Take a look inside our classrooms, workshops, campus events and student experiences that make Shiva Skill Institute a great place to learn.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 pt-3"
          >
            <button
              onClick={() => scrollToSection('featured-moments')}
              className="px-8 py-3.5 bg-accent hover:bg-accent/90 text-white text-xs uppercase tracking-widest font-semibold rounded-[16px] transition-all duration-300 shadow cursor-pointer"
            >
              View Campus
            </button>
            <button
              onClick={() => {
                onPageChange('courses');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/25 text-white text-xs uppercase tracking-widest font-semibold rounded-[16px] border border-white/25 backdrop-blur-sm transition-all duration-300 cursor-pointer"
            >
              Explore Courses
            </button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 02: Featured Moments */}
      <section id="featured-moments" className="py-16 md:py-24 bg-white border-b border-neutral-100 text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="text-left space-y-2 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">THE HIGHLIGHT SERIES</span>
            <h3 className="text-3xl font-sans text-primary font-bold tracking-tight">Featured Moments</h3>
            <p className="text-sm text-neutral-500 font-sans font-light">
              Examine four premium highlights showing our key physical facilities, coding groups, and graduations.
            </p>
          </div>          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Featured Moment 1: Coding Lab */}
            <div className="group space-y-3">
              <div className="aspect-[4/3] rounded-[24px] overflow-hidden border border-neutral-150 shadow-sm relative">
                <SafeImage
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800"
                  alt="Students coding in computer lab with teacher"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  fallbackType="lab"
                />
              </div>
              <div className="text-left px-1">
                <span className="text-[9px] font-mono uppercase tracking-wider text-accent font-semibold block">COMPUTER LABS</span>
                <h4 className="text-sm font-sans font-bold text-primary">Interactive Coding Labs</h4>
                <p className="text-[11px] text-neutral-500 font-light mt-1">Our fully operational, state-of-the-art programming and database environment.</p>
              </div>
            </div>

            {/* Featured Moment 2: Bootcamp Workshop */}
            <div className="group space-y-3">
              <div className="aspect-[4/3] rounded-[24px] overflow-hidden border border-neutral-150 shadow-sm relative">
                <SafeImage
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
                  alt="Technical hands-on bootcamp workshop"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  fallbackType="workshop"
                />
              </div>
              <div className="text-left px-1">
                <span className="text-[9px] font-mono uppercase tracking-wider text-accent font-semibold block">WORKSHOPS</span>
                <h4 className="text-sm font-sans font-bold text-primary">Hands-on Bootcamp Sprints</h4>
                <p className="text-[11px] text-neutral-500 font-light mt-1">Weekend training sessions dedicated to building and deploying live software tools.</p>
              </div>
            </div>

            {/* Featured Moment 3: Guest Lecture Seminars */}
            <div className="group space-y-3">
              <div className="aspect-[4/3] rounded-[24px] overflow-hidden border border-neutral-150 shadow-sm relative">
                <SafeImage
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800"
                  alt="Annual Technology Seminar"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  fallbackType="workshop"
                />
              </div>
              <div className="text-left px-1">
                <span className="text-[9px] font-mono uppercase tracking-wider text-accent font-semibold block">EVENTS</span>
                <h4 className="text-sm font-sans font-bold text-primary">Annual Technology Summits</h4>
                <p className="text-[11px] text-neutral-500 font-light mt-1">Industrial experts delivering professional guidance and hosting guest lectures.</p>
              </div>
            </div>

            {/* Featured Moment 4: Student Achievement */}
            <div className="group space-y-3">
              <div className="aspect-[4/3] rounded-[24px] overflow-hidden border border-neutral-150 shadow-sm relative">
                <SafeImage
                  src="https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd?auto=format&fit=crop&q=80&w=800"
                  alt="Graduation Milestone cap celebration"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  fallbackType="graduation"
                />
              </div>
              <div className="text-left px-1">
                <span className="text-[9px] font-mono uppercase tracking-wider text-accent font-semibold block">GRADUATION</span>
                <h4 className="text-sm font-sans font-bold text-primary">Celebrated Success Stories</h4>
                <p className="text-[11px] text-neutral-500 font-light mt-1">Our alumni launching bright professional careers at major software companies.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 03: Gallery Categories / Filter Sticky */}
      <section id="gallery-filters-sticky" className="py-6 bg-[#F8FAFC] border-b border-neutral-150 sticky top-[72px] z-30 shadow-sm/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 text-[11px] font-mono uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-primary text-white font-semibold shadow'
                    : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50 hover:text-primary animate-none'
                }`}
              >
                {cat === 'All' ? 'All Moments' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 04: Editorial Gallery (Masonry Layout) */}
      <section id="editorial-grid" className="py-16 md:py-24 bg-white border-b border-neutral-100 text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">DIGITAL JOURNAL</span>
              <h3 className="text-2xl md:text-3.5xl font-sans text-primary font-bold tracking-tight">Editorial Campus Gallery</h3>
              <p className="text-xs md:text-sm text-neutral-500 font-sans font-light">
                An elegant magazine-style masonry layout featuring actual educational facilities, classrooms, and students.
              </p>
            </div>
            
            <div className="px-4 py-1.5 bg-[#F8FAFC] border border-neutral-200 rounded-full flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-[10px] font-mono uppercase text-primary font-bold">
                {filteredItems.length} MOMENTS ARCHIVED
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {filteredItems.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="text-center py-20 bg-[#F8FAFC] rounded-[24px] border border-neutral-150 max-w-xl mx-auto space-y-4"
              >
                <Filter className="w-12 h-12 text-neutral-300 mx-auto" />
                <h4 className="text-lg font-sans text-primary font-bold">No Media Found</h4>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed font-sans font-light">
                  We currently do not have registered photos under "{selectedCategory}" in our institutional archives.
                </p>
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-[10px] font-mono uppercase tracking-widest rounded-full cursor-pointer"
                >
                  Reset Series Filter
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layoutId={`editorial-item-${item.id}`}
                    onClick={() => setLightboxIndex(index)}
                    className="break-inside-avoid relative rounded-[24px] overflow-hidden border border-neutral-150 bg-neutral-100 shadow-sm group cursor-pointer transition-all duration-300 hover:shadow-md block mb-6"
                  >
                    {/* Native proportion photo */}
                    <div className={`${item.aspectRatio} w-full overflow-hidden`}>
                      <SafeImage
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        fallbackType={getFallbackType(item.category)}
                      />
                    </div>

                    {/* Subtle hover zoom overlay details */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/45 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5" />

                    <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 text-left">
                      <span className="text-[9px] font-mono text-accent uppercase tracking-widest font-semibold">
                        {item.date} • {item.category.toUpperCase()}
                      </span>
                      <h4 className="text-sm font-sans font-bold text-white mt-0.5 line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-neutral-200 font-sans font-light mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                      
                      <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between">
                        <span className="text-[10px] font-sans font-bold text-white flex items-center space-x-1.5">
                          <Eye className="w-3.5 h-3.5 text-accent animate-pulse" />
                          <span>View Image</span>
                        </span>
                        <Maximize2 className="w-3.5 h-3.5 text-white/70" />
                      </div>
                    </div>

                    {/* Unfocused thumbnail category badge */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-neutral-200/50 shadow-sm group-hover:opacity-0 transition-opacity duration-200">
                      <span className="text-[8px] font-mono tracking-widest uppercase text-primary font-bold">
                        {item.category}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION 05: Campus Tour */}
      <section id="campus-tour" className="py-16 md:py-24 bg-[#F8FAFC] border-b border-neutral-100 text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-10">
          
          <div className="text-left space-y-2 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">PHYSICAL ENVIRONMENT</span>
            <h3 className="text-2xl md:text-3.5xl font-sans text-primary font-bold tracking-tight">Our Premium Campus Tour</h3>
            <p className="text-xs md:text-sm text-neutral-500 font-sans font-light">
              Every facility we maintain is built exclusively to support student focus and hand-on software mastery.
            </p>
          </div>

          <div className="bg-white border border-neutral-200 rounded-[32px] p-6 md:p-8 space-y-6 shadow-sm">
            {/* Massive Wide Horizontal Image */}
            <div className="aspect-[21/9] w-full rounded-[24px] overflow-hidden shadow-sm relative">
              <SafeImage
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1500"
                alt="Panoramic view of modern practical computer laboratory"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
                fallbackType="lab"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
            </div>

            {/* Short Editorial Story & Coordinator trigger */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
              <div className="max-w-2xl space-y-2">
                <h4 className="text-lg font-sans font-bold text-primary">Classrooms Designed for Practical Mastery</h4>
                <p className="text-xs sm:text-sm text-neutral-600 font-sans font-light leading-relaxed">
                  Our classrooms are designed for practical learning with modern computers, comfortable seating and industry-standard infrastructure. We facilitate small cohort sizes to guarantee high teacher access.
                </p>
              </div>
              <button
                onClick={onRequestVisit}
                className="px-6 py-3 bg-accent hover:bg-accent/90 text-white text-[11px] font-mono uppercase tracking-widest font-bold rounded-[14px] transition-all duration-300 cursor-pointer self-start md:self-auto shrink-0 flex items-center space-x-2"
              >
                <span>Visit Campus</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 06: Student Life */}
      <section id="student-life" className="py-16 md:py-24 bg-white border-b border-neutral-100 text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">VIBRANT VIBES</span>
            <h3 className="text-3xl font-sans text-primary font-bold tracking-tight">
              A Campus Built to Feel Alive
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 font-sans font-light leading-relaxed">
              We understand that outstanding career growth happens when technical rigor meets supportive peer dynamics. Our student experiences cover mock developer interviews, project defense meets, and vibrant peer review sessions.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#F8FAFC] border border-neutral-150 rounded-[16px] text-left">
                <span className="text-xl font-extrabold text-accent block">20+</span>
                <span className="text-[10px] font-mono uppercase text-primary font-bold tracking-wider">Group Projects</span>
              </div>
              <div className="p-4 bg-[#F8FAFC] border border-neutral-150 rounded-[16px] text-left">
                <span className="text-xl font-extrabold text-accent block">100%</span>
                <span className="text-[10px] font-mono uppercase text-primary font-bold tracking-wider">Active Seminars</span>
              </div>
            </div>
          </div>

          {/* Right: Grid of natural student moments */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[4/5] rounded-[24px] overflow-hidden shadow-sm border border-neutral-150">
                <SafeImage
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=500"
                  alt="Students laughing and learning together"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  fallbackType="person"
                />
              </div>
              <div className="aspect-square rounded-[24px] overflow-hidden shadow-sm border border-neutral-150">
                <SafeImage
                  src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=500"
                  alt="Student group workspace"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  fallbackType="workshop"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-square rounded-[24px] overflow-hidden shadow-sm border border-neutral-150">
                <SafeImage
                  src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=500"
                  alt="Student project defense"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  fallbackType="person"
                />
              </div>
              <div className="aspect-[4/5] rounded-[24px] overflow-hidden shadow-sm border border-neutral-150">
                <SafeImage
                  src="https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd?auto=format&fit=crop&q=80&w=500"
                  alt="Certificate ceremony"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  fallbackType="graduation"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 07: Workshops & Training */}
      <section id="workshops-training" className="py-16 md:py-24 bg-[#F8FAFC] border-b border-neutral-100 text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="text-left space-y-2 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">PROFESSIONAL WORKSHOPS</span>
            <h3 className="text-2xl md:text-3.5xl font-sans text-primary font-bold tracking-tight">Workshops & Training</h3>
            <p className="text-xs md:text-sm text-neutral-500 font-sans font-light">
              We maintain regular technical bootcamp challenges to test students against industry standard timelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Workshop card 1 */}
            <div className="group relative bg-gradient-to-br from-white via-white to-slate-50/40 border border-neutral-200/60 hover:border-blue-200/80 rounded-[24px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.015)] hover:shadow-[0_25px_50px_rgba(37,99,235,0.05)] hover:-translate-y-1.5 flex flex-col justify-between transition-all duration-300">
              <div>
                <div className="aspect-[16/10] overflow-hidden relative">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600"
                    alt="React coding bootcamp"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    fallbackType="workshop"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-6 text-left space-y-2 relative overflow-hidden">
                  {/* Pattern */}
                  <svg className="absolute right-0 bottom-0 w-16 h-16 opacity-[0.02] text-primary pointer-events-none" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.5">
                    <circle cx="40" cy="40" r="15" />
                    <circle cx="40" cy="40" r="28" />
                  </svg>
                  
                  <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold">DEVELOPER BOOTCAMP</span>
                  <div className="w-6 h-0.5 bg-accent/40 rounded-full mt-1.5 mb-1.5" />
                  <h4 className="text-base font-sans font-bold text-primary group-hover:text-accent transition-colors duration-200">Responsive Full-Stack Architectures</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed font-sans font-light">
                    Practical bootcamp sessions focused on writing clean, semantic reactive layouts and hosting SQL database schemas.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-4 border-t border-neutral-100/60 flex items-center justify-between text-[11px] font-mono text-neutral-400 bg-transparent relative z-10">
                <span className="font-semibold text-[#2563EB]">Oct 24, 2025</span>
                <span>Weekend Special</span>
              </div>
            </div>

            {/* Workshop card 2 */}
            <div className="group relative bg-gradient-to-br from-white via-white to-slate-50/40 border border-neutral-200/60 hover:border-blue-200/80 rounded-[24px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.015)] hover:shadow-[0_25px_50px_rgba(37,99,235,0.05)] hover:-translate-y-1.5 flex flex-col justify-between transition-all duration-300">
              <div>
                <div className="aspect-[16/10] overflow-hidden relative">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600"
                    alt="Cloud network workshop"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    fallbackType="workshop"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-6 text-left space-y-2 relative overflow-hidden">
                  {/* Pattern */}
                  <svg className="absolute right-0 bottom-0 w-16 h-16 opacity-[0.02] text-primary pointer-events-none" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.5">
                    <circle cx="40" cy="40" r="15" />
                    <circle cx="40" cy="40" r="28" />
                  </svg>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold">SYSTEM OPERATIONS</span>
                  <div className="w-6 h-0.5 bg-accent/40 rounded-full mt-1.5 mb-1.5" />
                  <h4 className="text-base font-sans font-bold text-primary group-hover:text-accent transition-colors duration-200">Cloud Infrastructure Diagnostics</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed font-sans font-light">
                    Learning secure system hosting, API monitoring setups, and structural load testing methods.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-4 border-t border-neutral-100/60 flex items-center justify-between text-[11px] font-mono text-neutral-400 bg-transparent relative z-10">
                <span className="font-semibold text-[#2563EB]">Nov 18, 2025</span>
                <span>Systems Core</span>
              </div>
            </div>

            {/* Workshop card 3 */}
            <div className="group relative bg-gradient-to-br from-white via-white to-slate-50/40 border border-neutral-200/60 hover:border-blue-200/80 rounded-[24px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.015)] hover:shadow-[0_25px_50px_rgba(37,99,235,0.05)] hover:-translate-y-1.5 flex flex-col justify-between transition-all duration-300">
              <div>
                <div className="aspect-[16/10] overflow-hidden relative">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600"
                    alt="Database engineering seminar"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    fallbackType="workshop"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-6 text-left space-y-2 relative overflow-hidden">
                  {/* Pattern */}
                  <svg className="absolute right-0 bottom-0 w-16 h-16 opacity-[0.02] text-primary pointer-events-none" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.5">
                    <circle cx="40" cy="40" r="15" />
                    <circle cx="40" cy="40" r="28" />
                  </svg>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold">DATABASE DESIGN</span>
                  <div className="w-6 h-0.5 bg-accent/40 rounded-full mt-1.5 mb-1.5" />
                  <h4 className="text-base font-sans font-bold text-primary group-hover:text-accent transition-colors duration-200">High Performance Relational Schema</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed font-sans font-light">
                    Mapping complex tables, structuring secure query lines, and learning indexing strategies for enterprise platforms.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-4 border-t border-neutral-100/60 flex items-center justify-between text-[11px] font-mono text-neutral-400 bg-transparent relative z-10">
                <span className="font-semibold text-[#2563EB]">Dec 05, 2025</span>
                <span>Data Special</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 08: Success Moments */}
      <section id="success-moments" className="py-16 md:py-24 bg-white border-b border-neutral-100 text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="text-left space-y-2 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">ACADEMIC EXCELLENCE</span>
            <h3 className="text-2xl md:text-3.5xl font-sans text-primary font-bold tracking-tight">Our Success Moments</h3>
            <p className="text-xs md:text-sm text-neutral-500 font-sans font-light">
              Witness actual milestones, certificates, award ceremonies, and interactive student hackathons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* Success Moment 1 */}
            <div className="p-6 bg-[#F8FAFC] border border-neutral-150 rounded-[24px] space-y-4">
              <div className="aspect-[16/10] overflow-hidden rounded-[16px] shadow-sm">
                <SafeImage
                  src="https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd?auto=format&fit=crop&q=80&w=600"
                  alt="Annual convocation day caps in air"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  fallbackType="graduation"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase text-accent font-bold">CONVOCATION CEREMONY</span>
                <h4 className="text-sm font-sans font-bold text-primary">Certificate & Honors Day</h4>
                <p className="text-xs text-neutral-500 font-sans font-light">Celebrating absolute course completion with proud families and board trustees.</p>
              </div>
            </div>

            {/* Success Moment 2 */}
            <div className="p-6 bg-[#F8FAFC] border border-neutral-150 rounded-[24px] space-y-4">
              <div className="aspect-[16/10] overflow-hidden rounded-[16px] shadow-sm">
                <SafeImage
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600"
                  alt="Student receiving award"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  fallbackType="workshop"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase text-accent font-bold">HACKATHON COMPETITION</span>
                <h4 className="text-sm font-sans font-bold text-primary">Annual Code Sprint Laurels</h4>
                <p className="text-xs text-neutral-500 font-sans font-light">Awarding the most outstanding capstone architecture and full-stack solutions.</p>
              </div>
            </div>

            {/* Success Moment 3 */}
            <div className="p-6 bg-[#F8FAFC] border border-neutral-150 rounded-[24px] space-y-4">
              <div className="aspect-[16/10] overflow-hidden rounded-[16px] shadow-sm">
                <SafeImage
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600"
                  alt="Industrial study tour visit"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  fallbackType="workshop"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase text-accent font-bold">INDUSTRIAL ENGAGEMENT</span>
                <h4 className="text-sm font-sans font-bold text-primary">Enterprise Placement Sprints</h4>
                <p className="text-xs text-neutral-500 font-sans font-light">Connecting skilled, certified student cohorts directly with hiring managers.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 09: Final CTA with Graduation Background */}
      <section id="gallery-final-cta" className="py-24 md:py-28 text-white text-center relative overflow-hidden">
        {/* Full-bleed background of students celebrating graduation */}
        <div className="absolute inset-0 z-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd?auto=format&fit=crop&q=80&w=1600"
            alt="Students celebrating graduation cap toss"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            fallbackType="graduation"
          />
          <div className="absolute inset-0 bg-[#0F172A]/90" />
        </div>

        <div className="max-w-4xl mx-auto px-6 space-y-8 relative z-10">
          <div className="w-12 h-12 rounded-[12px] border border-accent flex items-center justify-center mx-auto text-accent text-lg font-sans font-bold">
            S
          </div>
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">CAMPUS ADMISSIONS OPEN</span>
            <h3 className="text-3xl md:text-5xl font-sans text-white font-extrabold tracking-tight">
              Ready To Become Our Next Success Story?
            </h3>
            <p className="text-xs md:text-sm text-neutral-300 font-sans font-light max-w-xl mx-auto leading-relaxed">
              Equip yourself with actual vocational skill certifications that top recruiters prioritize. Secure your seat today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button
              onClick={onRequestProspectus}
              className="px-8 py-3.5 bg-accent hover:bg-accent/90 text-white text-xs uppercase tracking-widest font-semibold rounded-[16px] transition-all duration-300 shadow cursor-pointer flex items-center justify-center space-x-2 mx-auto sm:mx-0"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={onRequestVisit}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/15 text-white text-xs uppercase tracking-widest font-semibold rounded-[16px] border border-white/20 transition-all duration-300 cursor-pointer flex items-center justify-center"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Cinematic Fullscreen Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div
            id="lightbox-overlay"
            className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 md:p-10 text-white select-none"
            onClick={() => setLightboxIndex(null)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Bar Controls */}
            <div className="w-full max-w-7xl mx-auto flex items-center justify-between z-10 shrink-0">
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                SHIVA GALLERY DATABASE • MOMENT {lightboxIndex + 1} OF {filteredItems.length}
              </span>
              <button
                id="close-lightbox"
                onClick={() => setLightboxIndex(null)}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer"
                aria-label="Close viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Central Media Slider Row */}
            <div className="flex-1 flex items-center justify-center relative my-4 w-full">
              
              {/* Left Arrow */}
              <button
                id="lightbox-prev-btn"
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-white/5 hover:bg-white/15 hover:scale-105 text-white transition-all cursor-pointer hidden sm:block"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main image with transition effect */}
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl max-h-[60vh] md:max-h-[70vh] rounded-[24px] overflow-hidden border border-white/10 shadow-2xl relative flex items-center justify-center"
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking the image
              >
                <SafeImage
                  src={filteredItems[lightboxIndex].imageUrl}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-w-full max-h-[60vh] md:max-h-[70vh] object-contain rounded-[24px]"
                  referrerPolicy="no-referrer"
                  fallbackType={getFallbackType(filteredItems[lightboxIndex].category)}
                />
              </motion.div>

              {/* Right Arrow */}
              <button
                id="lightbox-next-btn"
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-white/5 hover:bg-white/15 hover:scale-105 text-white transition-all cursor-pointer hidden sm:block"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

            </div>

            {/* Bottom Caption Overlay */}
            <div className="w-full max-w-2xl mx-auto text-center z-10 shrink-0 pb-2 space-y-2">
              <span className="px-3.5 py-1 bg-accent text-white text-[10px] font-mono uppercase tracking-widest rounded-full font-bold">
                {filteredItems[lightboxIndex].date} • {filteredItems[lightboxIndex].category.toUpperCase()}
              </span>
              <h3 className="text-xl md:text-2xl font-sans text-white font-bold leading-snug">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-xs md:text-sm text-neutral-400 font-sans font-light leading-relaxed max-w-xl mx-auto">
                {filteredItems[lightboxIndex].description}
              </p>
            </div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
