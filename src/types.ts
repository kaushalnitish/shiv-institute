export interface Course {
  id: string;
  code: string;
  title: string;
  category: string;
  level: string; // "Postgraduate", "Professional", "Undergraduate", "Fellowship"
  duration: string;
  eligibility: string;
  instructor: Faculty;
  description: string;
  fullSyllabus: {
    week: string;
    topic: string;
    details: string;
  }[];
  highlights: string[];
  careerPaths: string[];
  image: string;
}

export interface Faculty {
  id: string;
  name: string;
  title: string; // e.g., "Dr. Clara Sterling, Ph.D."
  role: string; // e.g., "Professor of Applied Sciences"
  bio: string;
  credential: string; // e.g., "Former Chair, Imperial College London"
  photo: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'campus' | 'academics' | 'legacy' | 'ceremony';
  description: string;
  imageUrl: string;
  year: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string; // e.g., "Research Fellow at Oxford"
  quote: string;
  year: string;
}
