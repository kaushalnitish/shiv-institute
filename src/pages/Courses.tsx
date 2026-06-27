import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  BookOpen, 
  Sparkles, 
  FilterX, 
  Clock, 
  GraduationCap, 
  ArrowUpRight, 
  Plus, 
  Minus,
  HelpCircle,
  FileText
} from 'lucide-react';
import { Course } from '../types';
import { COURSES_DATA } from '../data';
import SafeImage from '../components/SafeImage';

interface CoursesProps {
  onSelectCourse: (course: Course) => void;
  onInquireCourse: (courseId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function Courses({
  onSelectCourse,
  onInquireCourse,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory
}: CoursesProps) {
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Categories list
  const categories = useMemo(() => {
    return ['All', 'Leadership & Policy', 'Applied Technology', 'Applied Sciences & Research'];
  }, []);

  // Levels list
  const levels = useMemo(() => {
    return ['All', 'Executive Fellowship', 'Postgraduate Masterclass', 'Postgraduate Fellowship'];
  }, []);

  // Filter logic
  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      const matchesSearch = 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchQuery, selectedCategory, selectedLevel]);

  // Real academic FAQ data to represent the Courses Structure "FAQ" requirement
  const faqData = [
    {
      question: "What are the eligibility requirements for the Executive Fellowships?",
      answer: "Applicants must possess a recognized undergraduate degree or equivalent, accompanied by a minimum of 5 years of verified professional leadership experience. Highly quantitative backgrounds are preferred for our systems design and applied technology tracks."
    },
    {
      question: "Can I pursue these programs while maintaining active corporate or public services?",
      answer: "Yes. Our courses are explicitly structured with the schedules of senior executives in mind. We provide hybrid pathways, part-time formats, and condensed bi-weekly modules to ensure academic rigor does not conflict with active stewardship."
    },
    {
      question: "How are final fellowship credentials evaluated?",
      answer: "Shiva Skill Institute enforces strict academic integrity. Fellow candidates must complete a comprehensive capstone advisory thesis or technical blueprint, followed by a live, rigorous panel defense before our double-blind academic council."
    },
    {
      question: "Is there corporate sponsorship or municipal billing support?",
      answer: "We support corporate sponsorship streams. Many of our cohort members are fully backed by their enterprises, municipal organizations, or national agencies. The Registrar’s Office can provide structured invoices and course outlines for organizational reimbursement."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div id="courses-page" className="pt-24 md:pt-28">
      
      {/* SECTION 01: Hero Banner */}
      <section id="courses-hero" className="bg-[#F8FAFC] py-16 md:py-20 border-b border-primary/5 text-left relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">FELLOWSHIP CURRICULUMS</span>
            <h2 className="text-4xl font-sans text-primary leading-tight font-extrabold tracking-tight">
              Academic Curriculums
            </h2>
            <p className="text-sm text-neutral-500 font-sans font-light max-w-lg leading-relaxed">
              Examine our highly structured, doctoral-supervised master curriculums. Scroll and filter our active tracks to identify your path of study.
            </p>
          </div>

          {/* Quick Counter plaque */}
          <div className="px-4 py-2 bg-white rounded-[16px] border border-primary/10 shadow-sm self-start flex items-center space-x-2.5">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-xs font-mono text-primary font-semibold uppercase tracking-wider">
              {filteredCourses.length} Curriculums Listed
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 02 & 03: Course Categories & Course Grid */}
      <section id="courses-directory" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          {/* Controls Bar: Search & Select Filter Layout */}
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
            
            {/* Search Input Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-400" />
              <input
                id="course-search-input"
                type="text"
                placeholder="Search course code, title, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm pl-10 pr-4 py-3 border border-neutral-200 rounded-[16px] focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent bg-neutral-50/30 transition-all duration-150"
              />
            </div>

            {/* Category Filter Pills (Desktop) */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-neutral-400 font-mono uppercase tracking-wider mr-1 hidden sm:inline">DISCIPLINE:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 text-[11px] font-mono uppercase tracking-widest rounded-[16px] transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-primary text-white font-semibold border-primary shadow-sm'
                      : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  {cat === 'All' ? 'All Disciplines' : cat}
                </button>
              ))}
            </div>

            {/* Level Selector Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-neutral-400 font-mono uppercase tracking-wider hidden sm:inline">LEVEL:</span>
              <select
                id="level-filter-select"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="text-xs font-mono uppercase tracking-widest bg-neutral-50 text-neutral-600 border border-neutral-200 rounded-[16px] p-3 outline-none focus:border-accent cursor-pointer"
              >
                <option value="All">All Fellowship Levels</option>
                {levels.filter(l => l !== 'All').map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Directory Grid */}
          <AnimatePresence mode="wait">
            {filteredCourses.length === 0 ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-20 bg-neutral-50 rounded-[24px] border border-dashed border-neutral-200 max-w-xl mx-auto space-y-4"
              >
                <FilterX className="w-12 h-12 text-neutral-300 mx-auto" />
                <h4 className="text-lg font-sans text-primary font-bold">No Curriculums Match Selection</h4>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto font-light leading-relaxed">
                  We could not find programs matching "{searchQuery}" or the selected academic filters. Try adjusting your parameters or search keywords.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedLevel('All');
                  }}
                  className="px-4 py-2.5 bg-primary text-white text-[10px] font-mono uppercase tracking-widest rounded-[16px] hover:bg-primary-light transition-all duration-150 cursor-pointer"
                >
                  Reset Directory Filter
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="grid-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
              >
                {filteredCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    layoutId={`course-card-${course.id}`}
                    className="group relative bg-gradient-to-br from-white via-white to-slate-50/40 rounded-[24px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.015)] hover:shadow-[0_25px_50px_rgba(37,99,235,0.05)] hover:-translate-y-1.5 border border-neutral-200/60 hover:border-blue-200/80 flex flex-col justify-between text-left transition-all duration-300"
                  >
                    <div>
                      {/* Image header with high-contrast labels */}
                      <div className="relative h-56 md:h-64 overflow-hidden">
                        <SafeImage
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                          referrerPolicy="no-referrer"
                          fallbackType="lab"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent pointer-events-none" />
                        
                        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                          <span className="px-2.5 py-0.5 bg-accent text-white text-[9px] font-mono uppercase tracking-widest rounded-[12px] font-bold shadow-sm">
                            {course.level}
                          </span>
                          <span className="px-2.5 py-0.5 bg-primary text-white text-[9px] font-mono uppercase tracking-widest rounded-[12px] font-bold shadow-sm">
                            {course.code}
                          </span>
                        </div>
                      </div>

                      {/* Info Panel */}
                      <div className="p-6 md:p-8 space-y-4 relative overflow-hidden">
                        {/* Pattern: tiny micro arcs */}
                        <svg className="absolute right-0 bottom-0 w-24 h-24 opacity-[0.015] text-primary pointer-events-none" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="0.5">
                          <circle cx="50" cy="50" r="15" />
                          <circle cx="50" cy="50" r="28" />
                        </svg>

                        <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold flex items-center space-x-1.5">
                          <BookOpen className="w-3.5 h-3.5 shrink-0" />
                          <span>{course.category}</span>
                        </span>
                        
                        <h3 className="text-xl md:text-2xl font-sans text-primary font-bold leading-snug group-hover:text-accent transition-colors duration-200">
                          {course.title}
                        </h3>

                        {/* Duration Block */}
                        <div className="flex items-center space-x-2 text-xs text-neutral-600 bg-neutral-50 border border-neutral-150 py-1.5 px-3 rounded-[12px] w-fit shadow-sm">
                          <Clock className="w-4 h-4 text-accent shrink-0" />
                          <span className="font-semibold font-mono text-[10px] uppercase tracking-wider text-neutral-500">Duration: {course.duration}</span>
                        </div>
                        
                        {/* Short Description */}
                        <p className="text-xs text-neutral-500 leading-relaxed font-sans font-light">
                          {course.description}
                        </p>

                        {/* Eligibility Block */}
                        <div className="pt-2 border-t border-neutral-100">
                          <div className="flex items-start space-x-2 text-xs text-neutral-600">
                            <GraduationCap className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                            <div>
                              <span className="font-semibold text-primary block">Eligibility Standards</span>
                              <span className="text-[11px] text-neutral-500 font-light block leading-normal mt-0.5">{course.eligibility}</span>
                            </div>
                          </div>
                        </div>

                        {/* Career opportunities */}
                        <div className="pt-2 border-t border-neutral-100">
                          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wide block mb-1">TARGET PLACEMENTS:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {course.careerPaths.map((path, i) => (
                              <span key={i} className="px-2.5 py-0.5 bg-neutral-100/60 border border-neutral-200 rounded-[12px] text-[10px] text-neutral-600 font-light font-sans">
                                {path}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer buttons */}
                    <div className="p-6 md:p-8 pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-neutral-100/60 relative z-10 bg-transparent">
                      
                      {/* Instructor details */}
                      <div className="flex items-center space-x-2.5">
                        <SafeImage
                          src={course.instructor.photo}
                          alt={course.instructor.name}
                          className="w-8 h-8 rounded-full object-cover border border-accent/20"
                          referrerPolicy="no-referrer"
                          fallbackType="person"
                        />
                        <div className="text-left">
                          <h5 className="text-xs font-sans font-bold text-neutral-800 leading-tight">
                            {course.instructor.name}
                          </h5>
                          <p className="text-[9px] text-neutral-400 font-sans font-light">
                            {course.instructor.role.split(' of ')[0]}
                          </p>
                        </div>
                      </div>

                      {/* Direct details & inquiry buttons */}
                      <div className="flex space-x-2 justify-end">
                        <button
                          onClick={() => onSelectCourse(course)}
                          className="px-4 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 text-[10px] font-mono uppercase tracking-widest border border-neutral-200 rounded-[16px] transition-all cursor-pointer font-semibold shadow-sm"
                        >
                          Syllabus Details
                        </button>
                        <button
                          onClick={() => onInquireCourse(course.id)}
                          className="px-4 py-2 bg-primary hover:bg-primary-light text-white text-[10px] font-mono uppercase tracking-widest rounded-[16px] flex items-center space-x-1 transition-all shadow-md cursor-pointer font-extrabold"
                        >
                          <span>Apply</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* SECTION 04: Admission CTA */}
      <section id="admission-cta" className="py-24 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-accent/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 space-y-8 relative z-10">
          <div className="w-12 h-12 rounded-[12px] border border-accent flex items-center justify-center mx-auto text-accent text-lg font-sans font-bold">
            S
          </div>
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">REGISTRAR ENROLLMENT OFFICE</span>
            <h3 className="text-3xl md:text-5xl font-sans text-white font-extrabold tracking-tight">
              Review and Coordinate Admissions
            </h3>
            <p className="text-xs md:text-sm text-neutral-300 font-sans font-light max-w-xl mx-auto leading-relaxed">
              We review applications on a rolling basis. Reach out directly to secure a seat, verify credits transfer, or schedule an academic consultation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button
              onClick={() => onInquireCourse('')}
              className="px-8 py-3.5 bg-accent hover:bg-accent/90 text-white text-xs uppercase tracking-widest font-semibold rounded-[16px] transition-all duration-300 shadow cursor-pointer flex items-center justify-center space-x-2 mx-auto sm:mx-0"
            >
              <span>Submit General Application</span>
              <FileText className="w-4 h-4" />
            </button>
            <button
              onClick={() => onInquireCourse('')}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/15 text-white text-xs uppercase tracking-widest font-semibold rounded-[16px] border border-white/10 transition-all duration-300 cursor-pointer"
            >
              Request Prospectus
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 05: FAQ */}
      <section id="faq-section" className="py-24 bg-white text-left">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold">COMMON QUESTIONS</span>
            <h3 className="text-3xl font-sans text-primary font-extrabold tracking-tight">Frequently Asked Questions</h3>
            <p className="text-xs md:text-sm text-neutral-500 font-sans font-light">
              Review critical administrative, financial, and pedagogical procedures for candidates.
            </p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqData.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className="border border-neutral-100 rounded-[20px] bg-[#F8FAFC] overflow-hidden transition-all duration-300 shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full py-5 px-6 flex items-center justify-between text-left font-sans font-bold text-primary text-sm md:text-base cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center space-x-3 pr-4">
                      <HelpCircle className="w-5 h-5 text-accent shrink-0" />
                      <span>{faq.question}</span>
                    </div>
                    {isOpen ? <Minus className="w-4 h-4 text-accent shrink-0" /> : <Plus className="w-4 h-4 text-neutral-400 shrink-0" />}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-neutral-500 leading-relaxed font-sans font-light border-t border-neutral-200/40">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
