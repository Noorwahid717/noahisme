// Simple i18n system for Indonesian and English
export type Language = 'id' | 'en';

export const translations = {
  id: {
    // Navigation
    'nav.home': 'Beranda',
    'nav.about': 'Tentang',
    'nav.projects': 'Proyek',
    'nav.contact': 'Kontak',
    'nav.cta': 'Ajak Kolaborasi',
    
    // Hero/Intro Section
    'intro.label': 'Halo!',
    'intro.context': 'Tentang Pekerjaan Saya',
    'intro.heading': 'Saya berkontribusi dalam membangun solusi digital yang efisien, modern, dan dirancang untuk memberikan pengalaman terbaik bagi pengguna.',
    
    // Badges
    'badge.backend': 'Sistem Backend',
    'badge.api': 'Desain API',
    'badge.uiux': 'Desain UI/UX',
    'badge.performance': 'Performa',
    'badge.ai': 'AI & EdTech',
    'badge.strategy': 'Strategi',
    
    // Founder Section
    'founder.subtitle': 'penulis ✦ pengembang ide',
    'founder.label': 'Tentang',
    'founder.title': 'Menumbuhkan Gagasan',
    'founder.year': 'sejak 2024',
    'founder.tagline': '"Aku tidak takut membuat perubahan pada sistem; aku takut pada sistem yang tidak bisa diubah."',
    'founder.description': 'Noah adalah pengembang full-stack dari Kudus, Indonesia — menggabungkan struktur teknis dan sisi kreatif untuk menciptakan pengalaman digital yang alami, berguna, dan terasa dekat dengan pengguna.',
    'founder.signature': '— Mohammad Noor Wahid',
    'founder.role': 'Full-Stack Developer & Educator',
    'founder.cta': 'Mari berkolaborasi',
    
    // Timeline
    'timeline.founder': 'Founder',
    'timeline.developer': 'Developer',
    'timeline.project': 'Project',
    'timeline.education': 'Education',
    
    // Footer
    'footer.cta.title': 'mari bekerjasama',
    'footer.cta.heading': 'Membangun sesuatu yang luar biasa.',
    'footer.cta.description': 'Bersama, kita dapat menciptakan pengalaman digital yang bernilai — efisien, intuitif, dan berorientasi pada pengguna.',
    'footer.cta.interested': 'Tertarik berkolaborasi? Saya terbuka untuk diskusi proyek, konsultasi teknis, atau sekadar ngobrol tentang teknologi dan arsitektur software.',
    'footer.contact': 'Hubungi',
    'footer.about': 'Tentang Saya',
    'footer.experience': '3+ tahun pengalaman',
    'footer.role': 'Full-Stack Developer',
    'footer.contactSection': 'Kontak',
    'footer.social': 'Jejak Digital',
    'footer.links': 'Navigasi',
    'footer.crafted': 'Dibuat dengan',
    'footer.loveCode': '& cinta untuk kode yang rapi.',
    'footer.quicklinks': 'Tautan Cepat',
    'footer.connect': 'Terhubung',
    'footer.rights': '© 2024 Noah Is Me. Semua hak dilindungi.',
    
    // Common
    'common.readMore': 'Baca Selengkapnya',
    'common.viewAll': 'Lihat Semua',
    'common.learnMore': 'Pelajari Lebih Lanjut',
    'common.getStarted': 'Mulai Sekarang',
    'common.loading': 'Memuat...',
    
    // Homepage
    'home.projects.all': 'Lihat semua proyek lengkap',
    'home.projects.eyebrow': 'Featured',
    'home.projects.title': 'Studi kasus terpilih',
    'home.projects.description': '4 proyek yang menonjolkan strategi pengalaman end-to-end: dari riset, desain, hingga implementasi front-end performa tinggi.',
    
    // Projects Page
    'projects.title': 'Proyek terkurasi',
    'projects.meta.name': 'Portofolio proyek Mohammad Noor Wahid',
    'projects.meta.title': 'Proyek Mohammad Noor Wahid',
    'projects.meta.description': 'Rangkuman studi kasus lengkap beserta proses, dampak, dan peran saya dalam tiap proyek.',
    'projects.breadcrumb': 'Proyek',
    'projects.imageAlt': 'Cuplikan proyek',
    
    // About Page
    'about.meta.name': 'Tentang Mohammad Noor Wahid',
    'about.meta.title': 'Tentang Mohammad Noor Wahid',
    'about.breadcrumb': 'Tentang',
    'about.stats.completed': 'Proyek Selesai',
    'about.cta.title': 'Mari Wujudkan Proyek Anda',
    'about.cta.description': 'Punya ide atau proyek yang ingin dikembangkan? Saya siap membantu mewujudkannya dengan',
    
    // Contact Page
    'contact.meta.name': 'Kontak Noah Isme',
    'contact.meta.description': 'Halaman kontak resmi Noah Isme untuk kolaborasi dan konsultasi produk.',
    'contact.meta.title': 'Kontak Noah Isme',
    'contact.breadcrumb': 'Kontak',
    'contact.section': 'Kontak',
    'contact.form.subject': 'Judul proyek',
    'contact.form.message': 'Cerita proyek',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.cta': "Let's Collaborate",
    
    // Hero/Intro Section
    'intro.label': 'Hello!',
    'intro.context': 'About My Work',
    'intro.heading': 'I contribute to building digital solutions that are efficient, modern, and designed to deliver the best experience for users.',
    
    // Badges
    'badge.backend': 'Backend Systems',
    'badge.api': 'API Design',
    'badge.uiux': 'UI/UX Design',
    'badge.performance': 'Performance',
    'badge.ai': 'AI & EdTech',
    'badge.strategy': 'Strategy',
    
    // Founder Section
    'founder.subtitle': 'writer ✦ idea developer',
    'founder.label': 'About',
    'founder.title': 'Nurturing Ideas',
    'founder.year': 'since 2024',
    'founder.tagline': '"I\'m not afraid to make changes to the system; I\'m afraid of systems that can\'t be changed."',
    'founder.description': 'Noah is a full-stack developer from Kudus, Indonesia — combining technical structure and creative side to create digital experiences that are natural, useful, and feel close to users.',
    'founder.signature': '— Mohammad Noor Wahid',
    'founder.role': 'Full-Stack Developer & Educator',
    'founder.cta': "Let's collaborate",
    
    // Timeline
    'timeline.founder': 'Founder',
    'timeline.developer': 'Developer',
    'timeline.project': 'Project',
    'timeline.education': 'Education',
    
    // Footer
    'footer.cta.title': "let's work together",
    'footer.cta.heading': 'Build something extraordinary.',
    'footer.cta.description': 'Together, we can create valuable digital experiences — efficient, intuitive, and user-oriented.',
    'footer.cta.interested': 'Interested in collaborating? I\'m open to project discussions, technical consultations, or just chatting about technology and software architecture.',
    'footer.contact': 'Contact',
    'footer.about': 'About Me',
    'footer.experience': '3+ years experience',
    'footer.role': 'Full-Stack Developer',
    'footer.contactSection': 'Contact',
    'footer.social': 'Digital Footprint',
    'footer.links': 'Navigation',
    'footer.crafted': 'Crafted with',
    'footer.loveCode': '& love for clean code.',
    'footer.quicklinks': 'Quick Links',
    'footer.connect': 'Connect',
    'footer.rights': '© 2024 Noah Is Me. All rights reserved.',
    
    // Common
    'common.readMore': 'Read More',
    'common.viewAll': 'View All',
    'common.learnMore': 'Learn More',
    'common.getStarted': 'Get Started',
    'common.loading': 'Loading...',
    
    // Homepage
    'home.projects.all': 'View all complete projects',
    'home.projects.eyebrow': 'Featured',
    'home.projects.title': 'Selected case studies',
    'home.projects.description': '4 projects showcasing end-to-end experience strategy: from research, design, to high-performance front-end implementation.',
    
    // Projects Page
    'projects.title': 'Curated projects',
    'projects.meta.name': 'Mohammad Noor Wahid project portfolio',
    'projects.meta.title': 'Mohammad Noor Wahid Projects',
    'projects.meta.description': 'Complete case study summaries including process, impact, and my role in each project.',
    'projects.breadcrumb': 'Projects',
    'projects.imageAlt': 'Project preview',
    
    // About Page
    'about.meta.name': 'About Mohammad Noor Wahid',
    'about.meta.title': 'About Mohammad Noor Wahid',
    'about.breadcrumb': 'About',
    'about.stats.completed': 'Completed Projects',
    'about.cta.title': "Let's Realize Your Project",
    'about.cta.description': 'Have an idea or project you want to develop? I\'m ready to help make it happen with',
    
    // Contact Page
    'contact.meta.name': 'Contact Noah Isme',
    'contact.meta.description': 'Official Noah Isme contact page for collaboration and product consultation.',
    'contact.meta.title': 'Contact Noah Isme',
    'contact.breadcrumb': 'Contact',
    'contact.section': 'Contact',
    'contact.form.subject': 'Project title',
    'contact.form.message': 'Project story',
  }
} as const;

export type TranslationKey = keyof typeof translations.id;

// Get translation by key and language
export function t(key: TranslationKey, lang: Language = 'id'): string {
  return translations[lang][key] || translations.id[key] || key;
}

// Get current language from URL or localStorage
export function getCurrentLanguage(): Language {
  if (typeof window === 'undefined') return 'id'; // Default to Indonesian
  
  // Check URL parameter first
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  
  if (urlLang === 'id' || urlLang === 'en') {
    localStorage.setItem('language', urlLang);
    return urlLang;
  }
  
  // Check localStorage
  const storedLang = localStorage.getItem('language');
  
  if (storedLang === 'id' || storedLang === 'en') {
    return storedLang;
  }
  
  // Default to Indonesian
  return 'id';
}

// Set language
export function setLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('language', lang);
  
  // Update URL parameter
  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  window.history.replaceState({}, '', url.toString());
}
