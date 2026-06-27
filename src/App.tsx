/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Gallery from './pages/Gallery';
import Admissions from './pages/Admissions';
import CourseModal from './components/CourseModal';
import { Course } from './types';

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'about' | 'courses' | 'gallery' | 'admissions'>('home');
  
  // Search and Category states to pass between Home and Courses
  const [courseSearchQuery, setCourseSearchQuery] = useState('');
  const [courseSelectedCategory, setCourseSelectedCategory] = useState('All');

  const [prospectusCourseId, setProspectusCourseId] = useState('');
  
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  // Handlers
  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsCourseModalOpen(true);
  };

  const handleInquireCourse = (courseId: string) => {
    setProspectusCourseId(courseId);
    setActivePage('admissions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGeneralInquiry = () => {
    setProspectusCourseId('');
    setActivePage('admissions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVisitInquiry = () => {
    setProspectusCourseId('');
    setActivePage('admissions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCourseModalInquire = (courseId: string) => {
    setIsCourseModalOpen(false);
    // Slight delay to allow course modal to close gracefully
    setTimeout(() => {
      setProspectusCourseId(courseId);
      setActivePage('admissions');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  };

  return (
    <div id="shiva-app-container" className="min-h-screen bg-[#FCFCFB] text-[#1E1E1E] flex flex-col justify-between selection:bg-accent/25 selection:text-primary">
      {/* Global Header */}
      <Header
        activePage={activePage}
        onPageChange={setActivePage}
        onRequestProspectus={handleGeneralInquiry}
      />

      {/* Main Page Router */}
      <main className="flex-grow">
        {activePage === 'home' && (
          <Home
            onPageChange={setActivePage}
            onSelectCourse={handleSelectCourse}
            onRequestProspectus={handleGeneralInquiry}
            setSearchQuery={setCourseSearchQuery}
            setSelectedCategory={setCourseSelectedCategory}
          />
        )}
        {activePage === 'about' && (
          <About
            onPageChange={setActivePage}
            onRequestProspectus={handleGeneralInquiry}
          />
        )}
        {activePage === 'courses' && (
          <Courses
            onSelectCourse={handleSelectCourse}
            onInquireCourse={handleInquireCourse}
            searchQuery={courseSearchQuery}
            setSearchQuery={setCourseSearchQuery}
            selectedCategory={courseSelectedCategory}
            setSelectedCategory={setCourseSelectedCategory}
          />
        )}
        {activePage === 'gallery' && (
          <Gallery 
            onPageChange={setActivePage}
            onRequestProspectus={handleGeneralInquiry}
            onRequestVisit={handleVisitInquiry}
          />
        )}
        {activePage === 'admissions' && (
          <Admissions
            onPageChange={setActivePage}
            defaultCourseId={prospectusCourseId}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onPageChange={setActivePage}
        onRequestProspectus={handleGeneralInquiry}
      />

      {/* Curriculum Detail Dialog */}
      <CourseModal
        course={selectedCourse}
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        onInquire={handleCourseModalInquire}
      />
    </div>
  );
}

