import { Faculty, Course, GalleryItem, Testimonial } from './types';

export const FACULTY_DATA: Faculty[] = [
  {
    id: 'fac-1',
    name: 'Dr. Vikram Dev, Ph.D.',
    title: 'Dr. Vikram Dev, Ph.D.',
    role: 'Director & Chair of Academic Council',
    bio: 'Dr. Dev is a distinguished scholar in systemic economics and development policy. Over his 25-year career, he has served as a Senior Visiting Fellow at Oxford University and chief policy advisor to several global think-tanks.',
    credential: 'Former Fellow, Oxford University & Alumnus of London School of Economics',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'fac-2',
    name: 'Dr. Evelyn Vance, Ph.D.',
    title: 'Dr. Evelyn Vance, Ph.D.',
    role: 'Dean of Executive Leadership Programs',
    bio: 'An expert in organizational transformation and corporate governance, Dr. Vance spent a decade teaching at Stanford Graduate School of Business. She coordinates Shiva\'s elite leadership tracks.',
    credential: 'Ph.D. in Organizational Behavior, Stanford University',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'fac-3',
    name: 'Prof. Rohan Malhotra, M.S.',
    title: 'Prof. Rohan Malhotra, M.S.',
    role: 'Head of Applied Technology & Cyber-Physical Systems',
    bio: 'Professor Malhotra is a pioneer in robust computing architecture. He bridges academic precision with industry standards, having registered five patents in distributed data ledger structures.',
    credential: 'Alumnus of IIT Bombay & Former Research Lead, Imperial College London',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'fac-4',
    name: 'Hon. Sarah Jenkins, M.P.P.',
    title: 'Hon. Sarah Jenkins, M.P.P.',
    role: 'Senior Fellow in Public Administration',
    bio: 'With over two decades in high-level public service, Sarah Jenkins has navigated international regulatory diplomacy. She leads Shiva\'s prestigious governance and public policy modules.',
    credential: 'M.P.P., Harvard Kennedy School & Former Director of National Policy Studies',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=500'
  }
];

export const COURSES_DATA: Course[] = [
  {
    id: 'course-1',
    code: 'SSI-ALP-901',
    title: 'Advanced Leadership, Public Policy & Governance',
    category: 'Leadership & Policy',
    level: 'Executive Fellowship',
    duration: '12 Weeks (Hybrid)',
    eligibility: 'Bachelor\'s degree or equivalent, with minimum 5 years of professional leadership experience.',
    instructor: FACULTY_DATA[3],
    description: 'An elite program designed for future leaders, senior executives, and policy architects. This course covers systemic governance models, modern economic policy formulation, and ethical civic stewardship in an interconnected global landscape.',
    highlights: [
      'Interactive case studies modeled after Oxford and Harvard curricula',
      'Exclusive guest lectures by sitting policy makers and diplomatic fellows',
      'One-on-one mentorship sessions on high-stakes strategic negotiation',
      'Capstone advisory paper reviewed by a distinguished panel of governance experts'
    ],
    careerPaths: [
      'Director of Public Affairs',
      'Strategic Policy Consultant',
      'Non-Profit Executive Director',
      'Corporate Relations Specialist'
    ],
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200',
    fullSyllabus: [
      { week: 'Week 1-3', topic: 'Foundations of Modern Policy', details: 'Analyzing traditional policy paradigms versus complex cyber-physical societal demands. Global governance frameworks.' },
      { week: 'Week 4-6', topic: 'Strategic Negotiation & Advocacy', details: 'Applied games theory, coalition-building techniques, and high-level crisis response simulation.' },
      { week: 'Week 7-9', topic: 'Data-Driven Policy Analytics', details: 'Leveraging macro-demographics, predictive models, and behavioral economics to evaluate community outcomes.' },
      { week: 'Week 10-12', topic: 'The Ethics of Stewardship', details: 'Institutional corruption barriers, transparency standards, and the final capstone policy defense.' }
    ]
  },
  {
    id: 'course-2',
    code: 'SSI-AIS-502',
    title: 'Master Class in Applied Systems Design',
    category: 'Applied Technology',
    level: 'Postgraduate Masterclass',
    duration: '24 Weeks (Full-time)',
    eligibility: 'Degree in Computer Science, Engineering, or equivalent, with professional system development exposure.',
    instructor: FACULTY_DATA[2],
    description: 'A deep, mathematically rigorous immersion into high-performance software engineering, modern systems architecture, and intelligent data integration. Built for senior developers striving for world-class technical dominance.',
    highlights: [
      'Direct architecture reviews by Principal Engineers from top global firms',
      'Hands-on building of highly resilient distributed ledger structures',
      'Full access to the Shiva Advanced Computing and Systems Laboratory',
      'Prestige technical certificate highly respected by engineering boards'
    ],
    careerPaths: [
      'Chief Systems Architect',
      'Principal Software Engineer',
      'Research & Development Director',
      'Infrastructure Engineering Lead'
    ],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
    fullSyllabus: [
      { week: 'Week 1-6', topic: 'Distributed Systems & Microservices', details: 'Design patterns for zero-trust systems, network topology optimization, and real-time event streaming.' },
      { week: 'Week 7-12', topic: 'Applied Intelligence Engineering', details: 'Deploying neural optimization algorithms safely on edge nodes and scalable serverless frameworks.' },
      { week: 'Week 13-18', topic: 'Resilient Security & Cryptography', details: 'Mathematical foundations of cryptography, hardware security integration, and secure memory operations.' },
      { week: 'Week 19-24', topic: 'Master Synthesis & Deployments', details: 'Engineering a highly concurrent, zero-downtime service handling simulated high-velocity data pipelines.' }
    ]
  },
  {
    id: 'course-3',
    code: 'SSI-CGE-804',
    title: 'Strategic Corporate Governance & Ethics',
    category: 'Leadership & Policy',
    level: 'Executive Fellowship',
    duration: '16 Weeks (Part-time)',
    eligibility: 'Active board member, senior corporate executive, founder, or corporate legal advisor.',
    instructor: FACULTY_DATA[1],
    description: 'Equipping senior business directors, corporate board candidates, and founders with the ethical frameworks and operational paradigms necessary to guide enterprise scale securely and sustainably.',
    highlights: [
      'Roundtable cohort discussions restricted to 15 elite executives per term',
      'Comprehensive audit of modern environmental, social, and fiscal governance standards',
      'Interactive moot board room simulation with critical crisis intervention feedback',
      'Personal advisory board alignment coaching from Dr. Evelyn Vance'
    ],
    careerPaths: [
      'Board of Directors Member',
      'Chief Compliance Officer',
      'Corporate General Counsel',
      'Sustainability & ESG Director'
    ],
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200',
    fullSyllabus: [
      { week: 'Week 1-4', topic: 'Fiduciary Duty & Accountability', details: 'Legal obligations of directors, protecting minority shareholder value, and structuring efficient corporate committees.' },
      { week: 'Week 5-8', topic: 'ESG Metrics & Strategic Valuation', details: 'Integrating long-term environmental sustainability and societal values into the corporate ledger.' },
      { week: 'Week 9-12', topic: 'High-Impact Ethics and Whistleblowing', details: 'Building an internal culture of transparency. Preventing operational blindspots and fraud patterns.' },
      { week: 'Week 13-16', topic: 'Global Compliance & Crisis Navigation', details: 'Handling regulatory investigations, class actions, and media stewardship during high-scrutiny periods.' }
    ]
  },
  {
    id: 'course-4',
    code: 'SSI-QEP-703',
    title: 'Quantitative Economics & Development Policy',
    category: 'Applied Sciences & Research',
    level: 'Postgraduate Fellowship',
    duration: '12 Weeks (Hybrid)',
    eligibility: 'Bachelor\'s degree in Economics, Mathematics, Statistics, Physics, or another highly quantitative discipline.',
    instructor: FACULTY_DATA[0],
    description: 'An advanced, empirical approach to systemic economic theory. Fellows leverage robust statistical modeling to address infrastructure financing, urban growth dynamics, and poverty alleviation strategies.',
    highlights: [
      'Advanced training in econometric modeling tools and micro-data interpretation',
      'Direct contribution to Shiva Institute\'s annual Policy Research Working Papers',
      'Individualized feedback from world-recognized economic advisor Dr. Dev',
      'Pathway to prestigious doctoral programs or international fiscal appointments'
    ],
    careerPaths: [
      'Lead Econometrician',
      'Development Bank Analyst',
      'Sovereign Risk Specialist',
      'Senior Economics Advisor'
    ],
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=1200',
    fullSyllabus: [
      { week: 'Week 1-3', topic: 'Advanced Econometrics & Causal Inference', details: 'Instrumental variables, regression discontinuity, and micro-econometric panel data sets.' },
      { week: 'Week 4-6', topic: 'Infrastructure & Fiscal Policy', details: 'Public-private partnerships modeling, capital taxation theory, and international debt frameworks.' },
      { week: 'Week 7-9', topic: 'Spatial Economics & Demographics', details: 'Urban agglomeration, agricultural development dynamics, and labor migration patterns.' },
      { week: 'Week 10-12', topic: 'Policy Evaluation & Capstone', details: 'Designing randomized controlled trials (RCTs) for pilot initiatives and defending an original empirical model.' }
    ]
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'The Sterling Legacy Archway',
    category: 'legacy',
    description: 'Erected during the foundation of the primary campus, symbolizing the gateway to rigor, wisdom, and lifelong leadership.',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200',
    year: 'Est. 1994'
  },
  {
    id: 'gal-2',
    title: 'Dean\'s Grand Library',
    category: 'campus',
    description: 'A vaulted cathedral of knowledge housing over 40,000 physical volumes, rare policy archives, and silent study chambers.',
    imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1200',
    year: 'Academic Sanctuary'
  },
  {
    id: 'gal-3',
    title: 'The Leadership Seminar Room',
    category: 'academics',
    description: 'Where global fellows debate national policies and present thesis defenses in an intimate, round-table layout.',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200',
    year: 'Interactive Pursuit'
  },
  {
    id: 'gal-4',
    title: 'Honorary Convocation Ceremony',
    category: 'ceremony',
    description: 'Our annual celebration of excellence, where graduates receive high honors in the presence of distinguished board members and international guests.',
    imageUrl: 'https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd?auto=format&fit=crop&q=80&w=1200',
    year: 'Class of 2025'
  },
  {
    id: 'gal-5',
    title: 'Cyber-Physical Systems Laboratory',
    category: 'academics',
    description: 'Equipped with state-of-the-art computational boards, real-time testing suites, and dedicated servers for advanced engineering.',
    imageUrl: 'https://images.unsplash.com/photo-1580894732444-8fecef2271ff?auto=format&fit=crop&q=80&w=1200',
    year: 'Precision Research'
  },
  {
    id: 'gal-6',
    title: 'The Great Quadrangle lawn',
    category: 'campus',
    description: 'The green heart of the campus, facilitating dialogue, quiet contemplation, and collaboration between students and faculty.',
    imageUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=1200',
    year: 'Stewardship Green'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Elena Rostova',
    role: 'Senior Advisor, International Development Bank',
    quote: 'The academic rigor and deep integrity modeled by the Shiva faculty transformed my framework for public policy evaluation. It is truly an institution of Oxford standard.',
    year: 'Alumna, Class of 2021'
  },
  {
    id: 'test-2',
    author: 'Karthik Subramanian',
    role: 'Principal Architect, Enterprise Secure Networks',
    quote: 'At Shiva, Systems Design isn\'t taught from textbooks—it is experienced through grueling structural calculations and intense peer-reviews. The technical pedigree is unparalleled.',
    year: 'Alumnus, Class of 2023'
  },
  {
    id: 'test-3',
    author: 'Marcus Vance, Esq.',
    role: 'Managing Partner, Sterling & Vance Advisory',
    quote: 'The focus on structural, board-level ethics and governance parameters makes the Executive Fellowship a crucial crucible for any leader guiding corporate scale.',
    year: 'Board Fellow, Class of 2022'
  }
];
