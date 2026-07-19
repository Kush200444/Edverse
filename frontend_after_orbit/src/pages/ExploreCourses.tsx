import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Clock, Loader2, SlidersHorizontal, ArrowLeft, X, ArrowRight } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  level: string;
  thumbnail: string;
  category: string;
  educatorId: string;
  published: boolean;
}

// Comprehensive fallback course catalog
const FALLBACK_COURSES: Course[] = [
  {
    id: "1",
    title: "Full-Stack Web Development Mastery",
    description: "Ship production React and Node apps with real deploys.",
    price: 199,
    duration: 12,
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
    category: "Web Development",
    educatorId: "sarah-chen",
    published: true,
  },
  {
    id: "2",
    title: "UI/UX Design: From Figma to Reality",
    description: "Design and prototype interfaces used by millions.",
    price: 149,
    duration: 8,
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
    category: "Design",
    educatorId: "alex-rodriguez",
    published: true,
  },
  {
    id: "3",
    title: "Data Science & Machine Learning",
    description: "Train and ship models on real-world datasets.",
    price: 299,
    duration: 16,
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    category: "Data Science",
    educatorId: "emily-watson",
    published: true,
  },
  {
    id: "4",
    title: "Introduction to Blockchain Technology",
    description: "Understand distributed ledgers and core cryptography.",
    price: 49.99,
    duration: 21,
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
    category: "Blockchain",
    educatorId: "edu-1",
    published: true,
  },
  {
    id: "5",
    title: "Advanced Smart Contract Development",
    description: "Master Solidity for production-ready Web3 apps.",
    price: 99.99,
    duration: 35,
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=400&h=250&fit=crop",
    category: "Development",
    educatorId: "edu-2",
    published: true,
  },
  {
    id: "6",
    title: "Web3 User Interface Design",
    description: "Bridge traditional UX craft with decentralized apps.",
    price: 79.99,
    duration: 28,
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=250&fit=crop",
    category: "Design",
    educatorId: "edu-1",
    published: true,
  },
  {
    id: "7",
    title: "DeFi Fundamentals",
    description: "Navigate lending protocols, AMMs, and yield strategies.",
    price: 59.99,
    duration: 14,
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=250&fit=crop",
    category: "Finance",
    educatorId: "edu-3",
    published: true,
  },
  {
    id: "8",
    title: "NFT Creation and Marketing",
    description: "Create, mint, and market collections that sell.",
    price: 89.99,
    duration: 21,
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1646463535889-3b2a4c35e329?w=400&h=250&fit=crop",
    category: "Digital Art",
    educatorId: "edu-4",
    published: true,
  },
  {
    id: "9",
    title: "Python for Beginners",
    description: "Write real programs from your very first line of code.",
    price: 79,
    duration: 10,
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
    category: "Programming",
    educatorId: "edu-5",
    published: true,
  },
];

// Level styling — text tags, not colored dots
const getLevelStyle = (level: string) => {
  switch (level.toLowerCase()) {
    case "beginner":
      return { bg: "#ecfdf5", text: "#059669" };
    case "intermediate":
      return { bg: "#fff9d6", text: "#a16207" };
    case "advanced":
      return { bg: "#f3f0ff", text: "#7c3aed" };
    default:
      return { bg: "#f5f5f5", text: "#666" };
  }
};

// Compact dark "visual identity" per category — code/terminal motifs instead of stock photos
const CourseVisual = ({ category }: { category: string }) => {
  const key = category.toLowerCase();

  if (key.includes("web") || key.includes("program")) {
    return (
      <svg viewBox="0 0 96 96" className="w-full h-full">
        <rect width="96" height="96" fill="#1a1c1c" />
        <circle cx="10" cy="10" r="2.5" fill="#ff5f57" />
        <circle cx="19" cy="10" r="2.5" fill="#febc2e" />
        <circle cx="28" cy="10" r="2.5" fill="#28c840" />
        <text x="10" y="32" fontFamily="monospace" fontSize="9" fill="#FFD60A">const app =</text>
        <text x="10" y="46" fontFamily="monospace" fontSize="9" fill="#8b5cf6">  build()</text>
        <text x="10" y="60" fontFamily="monospace" fontSize="9" fill="#666">  .render();</text>
        <rect x="10" y="70" width="34" height="3" fill="#333" />
        <rect x="10" y="78" width="20" height="3" fill="#333" />
      </svg>
    );
  }

  if (key.includes("design")) {
    return (
      <svg viewBox="0 0 96 96" className="w-full h-full">
        <rect width="96" height="96" fill="#1a1c1c" />
        <rect x="14" y="14" width="30" height="30" rx="4" fill="none" stroke="#FFD60A" strokeWidth="1.5" />
        <circle cx="64" cy="24" r="12" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
        <rect x="14" y="56" width="68" height="3" fill="#333" />
        <rect x="14" y="64" width="44" height="3" fill="#333" />
        <rect x="52" y="48" width="30" height="30" rx="4" fill="none" stroke="#666" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
    );
  }

  if (key.includes("data") || key.includes("machine") || key.includes("science")) {
    return (
      <svg viewBox="0 0 96 96" className="w-full h-full">
        <rect width="96" height="96" fill="#1a1c1c" />
        <line x1="14" y1="14" x2="14" y2="78" stroke="#333" strokeWidth="1" />
        <line x1="14" y1="78" x2="82" y2="78" stroke="#333" strokeWidth="1" />
        <polyline points="18,64 34,50 50,58 66,30 80,38" fill="none" stroke="#FFD60A" strokeWidth="2" />
        <circle cx="34" cy="50" r="2.5" fill="#8b5cf6" />
        <circle cx="66" cy="30" r="2.5" fill="#8b5cf6" />
        <circle cx="80" cy="38" r="2.5" fill="#FFD60A" />
      </svg>
    );
  }

  if (key.includes("blockchain") || key.includes("defi") || key.includes("finance")) {
    return (
      <svg viewBox="0 0 96 96" className="w-full h-full">
        <rect width="96" height="96" fill="#1a1c1c" />
        <rect x="12" y="20" width="22" height="22" rx="3" fill="none" stroke="#FFD60A" strokeWidth="1.5" />
        <rect x="40" y="38" width="22" height="22" rx="3" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
        <rect x="68" y="20" width="16" height="22" rx="3" fill="none" stroke="#666" strokeWidth="1.5" />
        <line x1="34" y1="31" x2="40" y2="49" stroke="#444" strokeWidth="1" />
        <line x1="62" y1="49" x2="68" y2="31" stroke="#444" strokeWidth="1" />
        <rect x="12" y="68" width="72" height="3" fill="#333" />
      </svg>
    );
  }

  if (key.includes("development")) {
    return (
      <svg viewBox="0 0 96 96" className="w-full h-full">
        <rect width="96" height="96" fill="#1a1c1c" />
        <text x="10" y="30" fontFamily="monospace" fontSize="9" fill="#8b5cf6">contract {`{`}</text>
        <text x="10" y="44" fontFamily="monospace" fontSize="9" fill="#FFD60A">  function</text>
        <text x="10" y="58" fontFamily="monospace" fontSize="9" fill="#666">  mint();</text>
        <text x="10" y="72" fontFamily="monospace" fontSize="9" fill="#8b5cf6">{`}`}</text>
      </svg>
    );
  }

  if (key.includes("digital art") || key.includes("nft")) {
    return (
      <svg viewBox="0 0 96 96" className="w-full h-full">
        <rect width="96" height="96" fill="#1a1c1c" />
        <rect x="16" y="16" width="64" height="64" rx="4" fill="none" stroke="#333" strokeWidth="1" />
        <circle cx="38" cy="38" r="8" fill="none" stroke="#FFD60A" strokeWidth="1.5" />
        <rect x="52" y="50" width="20" height="20" fill="none" stroke="#8b5cf6" strokeWidth="1.5" transform="rotate(20 62 60)" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 96 96" className="w-full h-full">
      <rect width="96" height="96" fill="#1a1c1c" />
      <circle cx="48" cy="48" r="20" fill="none" stroke="#FFD60A" strokeWidth="1.5" />
      <circle cx="48" cy="48" r="32" fill="none" stroke="#333" strokeWidth="1" strokeDasharray="2 4" />
    </svg>
  );
};

const ExploreCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8001/courses");
        if (response.ok) {
          const data = await response.json();
          setCourses(data.courses || []);
        } else {
          setCourses(FALLBACK_COURSES);
        }
      } catch {
        setCourses(FALLBACK_COURSES);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Filter courses
  useEffect(() => {
    let result = courses.filter((c) => c.published !== false);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }
    if (selectedLevel) {
      result = result.filter(
        (c) => c.level.toLowerCase() === selectedLevel.toLowerCase()
      );
    }
    if (selectedCategory) {
      result = result.filter(
        (c) => c.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    setFilteredCourses(result);
  }, [courses, searchQuery, selectedLevel, selectedCategory]);

  const categories = [...new Set(courses.filter(c => c.published !== false).map((c) => c.category))];

  const handleEnroll = (courseId: string, price: number) => {
    localStorage.setItem("selected_course_id", courseId);
    localStorage.setItem("course_price", price.toString());
    navigate("/payment");
  };

  const formatDuration = (val: number) => `${val} ${val > 7 ? "days" : "weeks"}`;

  const activeFilterCount = (selectedLevel ? 1 : 0) + (selectedCategory ? 1 : 0);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedLevel("");
    setSelectedCategory("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-hanken" style={{ background: '#f9f9f9' }}>
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl border border-[rgba(0,0,0,0.06)] bg-white flex items-center justify-center mx-auto mb-4 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
            <span className="text-[13px] font-bold text-[#1a1c1c]">EV</span>
          </div>
          <p style={{ color: '#999', fontSize: '14px', fontWeight: 500 }}>Loading course catalog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-hanken relative" style={{ background: '#f9f9f9' }}>
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Header */}
      <header className="w-full relative z-10 overflow-hidden" style={{ background: '#1a1c1c' }}>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-[-120px] left-[-80px] w-[420px] h-[420px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,214,10,0.12), transparent 70%)' }} />
        <div className="absolute bottom-[-140px] right-[-60px] w-[360px] h-[360px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.14), transparent 70%)' }} />

        <div className="max-w-[1000px] mx-auto px-6 pt-10 pb-12 relative z-10">
          <div className="flex items-center justify-between mb-7">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-[13px] font-bold text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" style={{ strokeWidth: 3 }} />
              Back
            </button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                <span className="text-[12px] font-bold text-[#FFD60A]">EV</span>
              </div>
              <div>
                <p className="text-[13px] font-bold text-white leading-tight">EdVerse</p>
                <p className="text-[12px] text-white/40 leading-tight">Course catalog</p>
              </div>
            </div>
          </div>

          <h1
            className="font-extrabold tracking-[-0.04em] mb-3 leading-[1.08]"
            style={{ fontSize: '44px', color: '#fff' }}
          >
            Every path, in one place.
          </h1>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', fontWeight: 500, maxWidth: '480px', lineHeight: 1.7 }}>
            Browse the complete catalog or search for something specific — every course EdVerse has to offer, unfiltered.
          </p>
        </div>
      </header>

      {/* Search Bar with integrated filter trigger */}
      <div className="max-w-[1000px] mx-auto px-6 pt-8 relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <div
            className="flex-1 flex items-center bg-white rounded-2xl transition-all duration-200"
            style={{ height: '56px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
          >
            <div className="pl-5 pr-3">
              <Search className="h-4.5 w-4.5 text-[#999]" />
            </div>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses by title, topic, or category"
              className="flex-1 h-full bg-transparent outline-none text-[14px] font-medium text-[#1a1c1c] placeholder:text-[#999]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mr-2 w-7 h-7 rounded-full flex items-center justify-center text-[#999] hover:bg-[#f5f5f5] transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            <div className="w-px h-6 bg-[rgba(0,0,0,0.06)] mr-1" />
            <button
              onClick={() => setFiltersOpen(true)}
              className="relative flex items-center gap-1.5 mr-1.5 px-4 h-[40px] rounded-xl text-[13px] font-bold text-[#1a1c1c] hover:bg-[#f5f5f5] transition-colors"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="flex items-center justify-center w-4.5 h-4.5 rounded-full bg-[#FFD60A] text-[#1a1c1c] text-[10px] font-extrabold">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Active filter chips */}
        {(selectedLevel || selectedCategory) && (
          <div className="flex items-center gap-2 flex-wrap mb-6">
            {selectedLevel && (
              <button
                onClick={() => setSelectedLevel("")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[12px] font-bold text-[#1a1c1c]"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                {selectedLevel}
                <X className="h-3 w-3 text-[#999]" />
              </button>
            )}
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory("")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[12px] font-bold text-[#1a1c1c]"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                {selectedCategory}
                <X className="h-3 w-3 text-[#999]" />
              </button>
            )}
            <button
              onClick={clearAllFilters}
              className="text-[12px] font-bold text-[#999] hover:text-[#1a1c1c] transition-colors px-2"
            >
              Clear all
            </button>
          </div>
        )}

        <p style={{ fontSize: '13px', color: '#999', fontWeight: 500 }} className="mb-5">
          {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Course List */}
      <div className="max-w-[1000px] mx-auto px-6 pb-12 relative z-10">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl" style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.05)' }}>
            <p style={{ color: '#1a1c1c', fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>
              No courses found
            </p>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
              Try a different search term or clear your filters.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2.5 rounded-full bg-[#1a1c1c] text-white text-[13px] font-bold"
              style={{ boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredCourses.map((course) => {
              const levelStyle = getLevelStyle(course.level);
              return (
                <div
                  key={course.id}
                  className="group flex items-center gap-4 p-3 rounded-2xl bg-white transition-all duration-300 hover:-translate-y-0.5"
                  style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.09)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)'; }}
                >
                  {/* Visual identity, not stock photo */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <CourseVisual category={course.category} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-[11px] font-bold text-[#999] uppercase tracking-wide">
                        {course.category}
                      </span>
                      <span className="text-[#ddd]">·</span>
                      <span
                        className="text-[11px] font-bold px-2 py-0.5 rounded-md"
                        style={{ background: levelStyle.bg, color: levelStyle.text }}
                      >
                        {course.level}
                      </span>
                    </div>
                    <h3
                      className="font-bold mb-1 truncate"
                      style={{ fontSize: '16px', color: '#1a1c1c', letterSpacing: '-0.01em' }}
                    >
                      {course.title}
                    </h3>
                    <p
                      className="truncate mb-2"
                      style={{ fontSize: '13px', color: '#666', lineHeight: 1.5 }}
                    >
                      {course.description}
                    </p>
                    <div className="flex items-center gap-3 flex-wrap text-[12px] font-semibold text-[#999]">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDuration(course.duration)}
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => handleEnroll(course.id, course.price)}
                    className="flex-shrink-0 flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-[#FFD60A] text-[#1a1c1c] text-[13px] font-bold transition-transform active:scale-95"
                    style={{ boxShadow: '0 4px 14px rgba(255,214,10,0.3)' }}
                  >
                    <span className="hidden sm:inline">Enroll</span>
                    <ArrowRight className="h-4 w-4" style={{ strokeWidth: 3 }} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Filter Sidebar */}
      {filtersOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40 transition-opacity"
            onClick={() => setFiltersOpen(false)}
          />
          <div
            className="fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white z-50 overflow-y-auto flex flex-col"
            style={{ boxShadow: '-8px 0 40px rgba(0,0,0,0.12)', animation: 'slideInRight 0.25s ease-out' }}
          >
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <div>
                <p className="text-[16px] font-extrabold text-[#1a1c1c] tracking-[-0.02em]">Filters</p>
                <p className="text-[12px] text-[#999] font-medium">Refine the catalog</p>
              </div>
              <button
                onClick={() => setFiltersOpen(false)}
                className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
              >
                <X className="h-4 w-4 text-[#1a1c1c]" />
              </button>
            </div>

            <div className="px-6 py-6 flex-1">
              {/* Level */}
              <div className="mb-7">
                <p className="text-[12px] font-bold text-[#999] uppercase tracking-wide mb-3">Level</p>
                <div className="flex flex-wrap gap-2">
                  {["Beginner", "Intermediate", "Advanced"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(selectedLevel === level ? "" : level)}
                      className={`px-4 py-2.5 rounded-xl text-[13px] font-bold transition-colors ${selectedLevel === level
                          ? 'bg-[#1a1c1c] text-white'
                          : 'bg-[#f9f9f9] text-[#1a1c1c] hover:bg-[#f0f0f0]'
                        }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              {categories.length > 0 && (
                <div className="mb-7">
                  <p className="text-[12px] font-bold text-[#999] uppercase tracking-wide mb-3">Category</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
                        className={`px-4 py-2.5 rounded-xl text-[13px] font-bold transition-colors ${selectedCategory === cat
                            ? 'bg-[#1a1c1c] text-white'
                            : 'bg-[#f9f9f9] text-[#1a1c1c] hover:bg-[#f0f0f0]'
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky footer actions */}
            <div className="px-6 py-5 flex items-center gap-3" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <button
                onClick={clearAllFilters}
                className="flex-1 px-4 py-3 rounded-xl text-[13px] font-bold text-[#666] bg-[#f9f9f9] hover:bg-[#f0f0f0] transition-colors"
              >
                Clear all
              </button>
              <button
                onClick={() => setFiltersOpen(false)}
                className="flex-1 px-4 py-3 rounded-xl text-[13px] font-bold text-[#1a1c1c] bg-[#FFD60A] transition-transform active:scale-95"
                style={{ boxShadow: '0 4px 14px rgba(255,214,10,0.3)' }}
              >
                Show {filteredCourses.length} results
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default ExploreCourses;