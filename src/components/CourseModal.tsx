import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, BookOpen, User, Briefcase, Award, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Course } from '../types';
import SafeImage from './SafeImage';

interface CourseModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onInquire: (courseId: string) => void;
}

export default function CourseModal({
  course,
  isOpen,
  onClose,
  onInquire
}: CourseModalProps) {
  if (!course) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="course-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-primary/40 backdrop-blur-md">
          {/* Backdrop Click */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="relative w-full max-w-4xl h-[90vh] md:h-[85vh] bg-white rounded-[20px] shadow-2xl overflow-hidden border border-primary/10 z-10 flex flex-col"
          >
            {/* Header / Banner Area */}
            <div className="relative h-48 md:h-64 bg-primary text-white shrink-0">
              <SafeImage
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover opacity-35"
                referrerPolicy="no-referrer"
                fallbackType="lab"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
              
              {/* Close button */}
              <button
                id="close-course-modal"
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors duration-150 cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title & Metadata Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-2.5 py-0.5 bg-accent text-white text-[10px] font-mono uppercase tracking-widest rounded-[12px] font-bold">
                    {course.level}
                  </span>
                  <span className="px-2.5 py-0.5 bg-white/10 text-neutral-200 text-[10px] font-mono tracking-widest rounded-[12px] font-bold">
                    {course.code}
                  </span>
                </div>
                <h3 className="text-xl md:text-3xl font-sans font-extrabold tracking-tight leading-tight max-w-2xl text-white">
                  {course.title}
                </h3>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-neutral-50/30">
              
              {/* Top Summary Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="bg-white p-4 rounded-[20px] border border-neutral-100 flex items-start space-x-3 shadow-sm">
                  <div className="p-2 bg-primary/5 rounded-[12px] text-accent">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold font-mono">Duration & Pace</h5>
                    <p className="text-sm font-sans font-bold text-primary mt-0.5">{course.duration}</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-[20px] border border-neutral-100 flex items-start space-x-3 shadow-sm">
                  <div className="p-2 bg-primary/5 rounded-[12px] text-accent">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold font-mono">Core Discipline</h5>
                    <p className="text-sm font-sans font-bold text-primary mt-0.5">{course.category}</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-[20px] border border-neutral-100 flex items-start space-x-3 shadow-sm">
                  <div className="p-2 bg-primary/5 rounded-[12px] text-accent">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold font-mono">Academic Chair</h5>
                    <p className="text-sm font-sans font-bold text-primary mt-0.5 truncate">{course.instructor.name}</p>
                  </div>
                </div>
              </div>

              {/* Course Overview & Highlights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Description and Syllabus */}
                <div className="md:col-span-3 space-y-6">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-accent font-mono font-bold mb-2">Program Overview</h4>
                    <p className="text-sm text-neutral-600 leading-relaxed font-sans font-light">
                      {course.description}
                    </p>
                  </div>

                  {/* Syllabus */}
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-widest text-accent font-mono font-bold">Curriculum Syllabus</h4>
                    <div className="border border-neutral-200/60 rounded-[20px] overflow-hidden bg-white shadow-sm">
                      {course.fullSyllabus.map((module, i) => (
                        <div 
                          key={i} 
                          className={`p-4 ${i !== course.fullSyllabus.length - 1 ? 'border-b border-neutral-100' : ''}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-accent uppercase tracking-widest font-bold">
                              {module.week}
                            </span>
                          </div>
                          <h5 className="text-sm font-sans text-primary font-bold mt-1">
                            {module.topic}
                          </h5>
                          <p className="text-xs text-neutral-500 mt-1 leading-relaxed font-light font-sans">
                            {module.details}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Highlights, Career Paths & Instructor Panel */}
                <div className="md:col-span-2 space-y-6">
                  {/* Highlights Card */}
                  <div className="p-5 bg-white rounded-[20px] border border-neutral-150/60 shadow-sm space-y-3">
                    <h4 className="text-xs uppercase tracking-widest text-primary font-mono font-bold">Key Benchmarks</h4>
                    <ul className="space-y-3">
                      {course.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start text-xs text-neutral-600 leading-relaxed">
                          <span className="text-accent mr-2 font-sans font-bold">✦</span>
                          <span className="font-light font-sans">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Career Trajectories */}
                  <div className="p-5 bg-white rounded-[20px] border border-neutral-150/60 shadow-sm space-y-3">
                    <h4 className="text-xs uppercase tracking-widest text-primary font-mono font-bold">Target Placements</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {course.careerPaths.map((path, index) => (
                        <span 
                          key={index} 
                          className="px-2.5 py-1 bg-neutral-50 text-neutral-600 text-[11px] border border-neutral-200/50 rounded-[12px] flex items-center space-x-1"
                        >
                          <Briefcase className="w-3 h-3 text-neutral-400 shrink-0" />
                          <span className="font-light font-sans">{path}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Assigned Fellow */}
                  <div className="p-5 bg-primary text-white rounded-[20px] shadow-sm space-y-3">
                    <h4 className="text-[10px] uppercase tracking-widest text-accent font-mono font-bold">Lead Instructor</h4>
                    <div className="flex items-center space-x-3">
                      <SafeImage
                        src={course.instructor.photo}
                        alt={course.instructor.name}
                        className="w-12 h-12 rounded-full object-cover border border-accent/30"
                        referrerPolicy="no-referrer"
                        fallbackType="person"
                      />
                      <div>
                        <h5 className="text-sm font-sans font-bold text-white">{course.instructor.name}</h5>
                        <p className="text-[10px] text-neutral-300 truncate font-sans font-light">{course.instructor.role}</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-neutral-300 font-sans font-light italic leading-relaxed">
                      "{course.instructor.bio.split('.')[0]}."
                    </p>
                    <div className="text-[10px] text-accent font-mono border-t border-white/10 pt-2 shrink-0 font-bold">
                      Credential: {course.instructor.credential}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="p-4 md:p-6 bg-white border-t border-neutral-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <div className="text-left hidden sm:block">
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-mono font-bold">ADMISSIONS STATUS</span>
                <p className="text-xs text-neutral-700 font-light mt-0.5">Rolling Fellowship Review. Admissions Open for Michaelmas Term.</p>
              </div>
              <div className="flex w-full sm:w-auto space-x-3">
                <button
                  id="inquire-course-btn"
                  onClick={() => {
                    onInquire(course.id);
                  }}
                  className="flex-1 sm:flex-none px-6 py-3 bg-accent hover:bg-accent/90 text-white text-xs uppercase tracking-widest font-mono font-bold transition-all duration-300 rounded-[16px] flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Apply / Request Prospectus</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
