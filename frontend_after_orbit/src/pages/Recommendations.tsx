import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Loader2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

interface RAGResponse {
  courses: Course[];
  warning?: string;
}

const Recommendations = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Default recommendations query
  const defaultQuery = "I want to learn web development and programming";

  // Fetch recommendations from RAG backend
  const fetchRecommendations = async (query: string, level?: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8001/courserecommendations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: query || defaultQuery,
            level: level || undefined,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: RAGResponse = await response.json();
      setCourses(data.courses);

      if (data.warning) {
        toast({
          title: "Note",
          description: data.warning,
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);

      // Fallback to default courses if API fails — no error toast for fallback
      setCourses([
        {
          id: "1",
          title: "Full-Stack Web Development Mastery",
          description: "Build 5 real projects with personalized mentorship",
          price: 199,
          duration: 12,
          level: "Intermediate",
          thumbnail:
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
          category: "Web Development",
          educatorId: "sarah-chen",
          published: true,
        },
        {
          id: "2",
          title: "UI/UX Design: From Figma to Reality",
          description: "Design apps used by 10M+ users with industry secrets",
          price: 149,
          duration: 8,
          level: "Beginner",
          thumbnail:
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
          category: "Design",
          educatorId: "alex-rodriguez",
          published: true,
        },
        {
          id: "3",
          title: "Data Science & Machine Learning",
          description: "Work on real datasets from Fortune 500 companies",
          price: 299,
          duration: 16,
          level: "Advanced",
          thumbnail:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
          category: "Data Science",
          educatorId: "emily-watson",
          published: true,
        },
      ]);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  // Load initial recommendations
  useEffect(() => {
    fetchRecommendations(defaultQuery);
  }, []);

  const handleEnrollNow = (courseId: string, price: number) => {
    localStorage.setItem("selected_course_id", courseId);
    localStorage.setItem("course_price", price.toString());
    navigate("/payment");
  };

  const formatDuration = (weeks: number) => {
    return `${weeks} week${weeks > 1 ? "s" : ""}`;
  };

  const getLevelDot = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner": return "#10b981";
      case "intermediate": return "#FFD60A";
      case "advanced": return "#8b5cf6";
      default: return "#999";
    }
  };

  if (initialLoad && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-hanken" style={{ background: '#f9f9f9' }}>
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl border border-[rgba(0,0,0,0.06)] bg-white flex items-center justify-center mx-auto mb-4 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
            <span className="text-[13px] font-bold text-[#1a1c1c]">EV</span>
          </div>
          <p style={{ color: '#999', fontSize: '14px', fontWeight: 500 }}>
            Building your learning graph...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-hanken relative" style={{ background: '#f9f9f9' }}>
      {/* Background grid, matches landing/chat pages */}
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
        {/* Ambient texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-[-120px] right-[-80px] w-[420px] h-[420px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,214,10,0.12), transparent 70%)' }} />
        <div className="absolute bottom-[-140px] left-[-60px] w-[360px] h-[360px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.14), transparent 70%)' }} />

        <div className="max-w-[1000px] mx-auto px-6 pt-12 pb-12 relative z-10">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
              <span className="text-[12px] font-bold text-[#FFD60A]">EV</span>
            </div>
            <div>
              <p className="text-[13px] font-bold text-white leading-tight">EdVerse Intelligence</p>
              <p className="text-[12px] text-white/40 leading-tight">Recommendation report</p>
            </div>
          </div>

          <h1
            className="font-extrabold tracking-[-0.04em] mb-3 leading-[1.08]"
            style={{ fontSize: '44px', color: '#fff' }}
          >
            Your learning graph,<br />mapped to your goals.
          </h1>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', fontWeight: 500, maxWidth: '480px', lineHeight: 1.7 }}>
            From your conversation, EdVerse Intelligence identified where to focus next — and picked the courses that get you there fastest.
          </p>

          {/* Profile tags from chat session */}
          <div className="flex flex-wrap items-center gap-2 mt-7">
            <span className="px-3.5 py-2 bg-white/[0.06] rounded-lg border border-white/10 text-[12px] font-bold text-white">
              Web Development
            </span>
            <span className="px-3.5 py-2 bg-white/[0.06] rounded-lg border border-white/10 text-[12px] font-bold text-white">
              Intermediate
            </span>
            <span className="px-3.5 py-2 bg-white/[0.06] rounded-lg border border-white/10 text-[12px] font-bold text-white">
              Internship Goal
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-[1000px] mx-auto px-6 pt-8 relative z-10">
        <p style={{ fontSize: '13px', color: '#999', fontWeight: 500 }} className="mb-5">
          {courses.length} match{courses.length !== 1 ? "es" : ""} for you
        </p>
      </div>

      {/* Courses List */}
      <div className="max-w-[1000px] mx-auto px-6 pb-12 relative z-10">
        {loading && !initialLoad ? (
          <div className="text-center py-16">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-3 text-[#1a1c1c]" />
            <p style={{ color: '#666', fontSize: '14px', fontWeight: 500 }}>
              Updating your recommendations...
            </p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
            <p style={{ color: '#1a1c1c', fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>
              No matches found
            </p>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px', maxWidth: '380px', margin: '0 auto 20px' }}>
              Head back to EdVerse Intelligence and tell it more about what you're looking for.
            </p>
            <button
              onClick={() => fetchRecommendations(defaultQuery)}
              className="px-5 py-2.5 rounded-full bg-[#1a1c1c] text-white text-[13px] font-bold shadow-[0_4px_14px_rgba(0,0,0,0.15)]"
            >
              Reset
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="group flex items-center gap-4 p-3 rounded-2xl bg-white transition-all duration-300 hover:-translate-y-0.5"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.09)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)'; }}
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0" style={{ background: '#f0f0f0' }}>
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop`;
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold text-[#999] uppercase tracking-wide">
                      {course.category}
                    </span>
                    <span className="text-[#ddd]">·</span>

                  </div>
                  <h3
                    className="font-bold mb-1 truncate"
                    style={{ fontSize: '16px', color: '#1a1c1c', letterSpacing: '-0.01em' }}
                  >
                    {course.title}
                  </h3>
                  <p
                    className="line-clamp-1 sm:line-clamp-1 mb-2"
                    style={{ fontSize: '13px', color: '#666', lineHeight: 1.5 }}
                  >
                    {course.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#999]">
                    <Clock className="h-3.5 w-3.5" />
                    {formatDuration(course.duration)}
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleEnrollNow(course.id, course.price)}
                  className="flex-shrink-0 flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-[#FFD60A] text-[#1a1c1c] text-[13px] font-bold transition-transform active:scale-95"
                  style={{ boxShadow: '0 4px 14px rgba(255,214,10,0.3)' }}
                >
                  <span className="hidden sm:inline">Enroll</span>
                  <ArrowRight className="h-4 w-4" style={{ strokeWidth: 3 }} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-10 p-6 rounded-2xl bg-white" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <div>
            <p style={{ fontSize: '14px', color: '#1a1c1c', fontWeight: 700, marginBottom: '2px' }}>
              Looking for something else?
            </p>
            <p style={{ fontSize: '13px', color: '#999', fontWeight: 500 }}>
              Browse the full catalog, or go back and tell EdVerse Intelligence more.
            </p>
          </div>
          <button
            onClick={() => navigate("/explore-courses")}
            className="flex-shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#1a1c1c] text-white text-[13px] font-bold transition-transform active:scale-95"
          >
            Browse catalog
            <ArrowRight className="h-3.5 w-3.5" style={{ strokeWidth: 3 }} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default Recommendations;