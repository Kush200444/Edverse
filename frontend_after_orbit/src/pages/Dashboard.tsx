import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Users,
  TrendingUp,
  Calendar,
  Play,
  Plus,
  DollarSign,
  Star,
  User,
  ArrowRight
} from "lucide-react";

interface UserData {
  id: number;
  name: string;
  email: string;
  user_type: "student" | "educator";
}

const Dashboard = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("accessToken");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Mock user for testing if no token (usually would redirect to login)
      setUser({
        id: 1,
        name: "Alex",
        email: "alex@example.com",
        user_type: "student"
      });
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center font-hanken bg-[#f9f9f9]">
        <div className="animate-spin w-8 h-8 border-4 border-[#8b5cf6] border-t-transparent rounded-full" />
      </div>
    );
  }

  // Mock data
  const mockStudentCourses = [
    {
      id: "1",
      title: "Full-Stack Web Development",
      educator: "Sarah Chen",
      progress: 65,
      nextLesson: "Building REST APIs",
      totalLessons: 48,
      completedLessons: 31
    },
    {
      id: "2",
      title: "UI/UX Design Fundamentals",
      educator: "Alex Rodriguez",
      progress: 45,
      nextLesson: "Prototyping in Figma",
      totalLessons: 32,
      completedLessons: 14
    }
  ];

  const mockEducatorCourses = [
    {
      id: "1",
      title: "React Advanced Patterns",
      enrollments: 245,
      revenue: 12250,
      rating: 4.8,
      students: 245
    },
    {
      id: "2",
      title: "JavaScript Mastery Course",
      enrollments: 189,
      revenue: 9450,
      rating: 4.9,
      students: 189
    }
  ];

  const upcomingSessions = [
    { title: "Live Q&A Session", time: "Today, 3:00 PM", course: "Web Development" },
    { title: "Project Review", time: "Tomorrow, 10:00 AM", course: "UI/UX Design" },
  ];

  return (
    <div className="min-h-screen font-hanken" style={{ background: '#f9f9f9' }}>
      {/* Navigation Header */}
      <header className="bg-white sticky top-0 z-50" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="max-w-[1200px] mx-auto h-[70px] px-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-[20px] font-black text-[#1a1c1c] tracking-[-0.5px]">EdVerse</h1>
            <nav className="hidden md:flex gap-6">
              {user.user_type === "student" ? (
                <>
                  <button onClick={() => navigate("/explore-courses")} className="text-[14px] font-semibold text-[#4d4632] hover:text-[#8b5cf6] transition-colors">Browse Courses</button>
                  <button className="text-[14px] font-bold text-[#1a1c1c]">My Courses</button>
                  <button className="text-[14px] font-semibold text-[#4d4632] hover:text-[#8b5cf6] transition-colors">Messages</button>
                </>
              ) : (
                <>
                  <button className="text-[14px] font-bold text-[#1a1c1c]">My Courses</button>
                  <button className="text-[14px] font-semibold text-[#4d4632] hover:text-[#8b5cf6] transition-colors">Analytics</button>
                  <button className="text-[14px] font-semibold text-[#4d4632] hover:text-[#8b5cf6] transition-colors">Earnings</button>
                  <button className="text-[14px] font-semibold text-[#4d4632] hover:text-[#8b5cf6] transition-colors">Messages</button>
                </>
              )}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-[14px] font-semibold text-[#4d4632] px-4 py-2 rounded-full hover:bg-[#f0f0f0] transition-colors">
              <User className="h-4 w-4" />
              Profile
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("accessToken");
                navigate("/login");
              }}
              style={{
                padding: '8px 20px',
                background: '#1a1c1c',
                color: '#fff',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: 700,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto p-6 py-10">
        {/* Welcome Section */}
        <div className="mb-10">
          <h2 className="text-[32px] font-bold text-[#1a1c1c] tracking-tight mb-2">
            Welcome back, {user.name}! 👋
          </h2>
          <p style={{ fontSize: '15px', color: '#666' }}>
            {user.user_type === "student"
              ? "Ready to continue your learning journey?"
              : "Let's see how your courses are performing today."
            }
          </p>
        </div>

        {user.user_type === "student" ? (
          // STUDENT DASHBOARD
          <div className="space-y-10">
            {/* My Enrolled Courses */}
            <section>
              <h3 className="text-[20px] font-bold text-[#1a1c1c] mb-5 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#8b5cf6]" />
                My Enrolled Courses
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                {mockStudentCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-2xl p-6 border border-[rgba(0,0,0,0.08)] shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-transform hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-[18px] text-[#1a1c1c] leading-tight flex-1 pr-4">{course.title}</h4>
                      <span className="text-[12px] font-bold px-3 py-1 rounded-full bg-[#f3f0ff] text-[#8b5cf6] border border-[rgba(139,92,246,0.15)] whitespace-nowrap">
                        {course.progress}% Complete
                      </span>
                    </div>
                    <p className="text-[14px] text-[#666] mb-6">by {course.educator}</p>

                    <div className="space-y-2 mb-6">
                      <div className="h-2 w-full bg-[#f0f0f0] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4]" style={{ width: `${course.progress}%` }} />
                      </div>
                      <div className="flex justify-between text-[13px] text-[#999] font-medium">
                        <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                        <span className="text-[#1a1c1c]">Next: {course.nextLesson}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate("/course-module")}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#f9f9f9] text-[#1a1c1c] font-bold text-[14px] border border-[rgba(0,0,0,0.06)] transition-colors hover:bg-[#1a1c1c] hover:text-white group"
                    >
                      <Play className="h-4 w-4 group-hover:text-white text-[#1a1c1c] fill-current" />
                      Continue Learning
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Recommended Courses */}
              <section>
                <h3 className="text-[20px] font-bold text-[#1a1c1c] mb-5 flex items-center gap-2">
                  <Star className="h-5 w-5 text-[#ffd600]" />
                  Recommended For You
                </h3>
                <div className="bg-[#fff9d6] p-6 rounded-2xl border border-[rgba(255,214,0,0.3)] flex flex-col justify-between h-[160px]">
                  <div>
                    <h4 className="font-bold text-[18px] text-[#1a1c1c]">Data Science Fundamentals</h4>
                    <p className="text-[14px] text-[#b8960a] mt-1">Perfect match based on your interests!</p>
                  </div>
                  <button
                    onClick={() => navigate("/recommendations")}
                    className="self-start flex items-center gap-1.5 text-[14px] font-bold text-[#1a1c1c] hover:text-[#8b5cf6] transition-colors"
                  >
                    View Details <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </section>

              {/* Upcoming Live Sessions */}
              <section>
                <h3 className="text-[20px] font-bold text-[#1a1c1c] mb-5 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#06b6d4]" />
                  Upcoming Sessions
                </h3>
                <div className="space-y-3">
                  {upcomingSessions.map((session, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl border border-[rgba(0,0,0,0.08)] flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                      <div>
                        <h4 className="font-semibold text-[15px] text-[#1a1c1c]">{session.title}</h4>
                        <p className="text-[13px] text-[#666] mt-0.5">{session.course} • {session.time}</p>
                      </div>
                      <button className="px-4 py-2 rounded-full border border-[rgba(0,0,0,0.1)] text-[13px] font-bold text-[#1a1c1c] hover:bg-[#f0f0f0] transition-colors">
                        Join
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        ) : (
          // EDUCATOR DASHBOARD
          <div className="space-y-10">
            {/* Quick Actions */}
            <section>
              <div className="bg-gradient-to-r from-[#f3f0ff] to-[#ecfdf5] p-8 rounded-3xl border border-[rgba(139,92,246,0.15)] flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-[24px] font-bold text-[#1a1c1c] mb-1">Create a New Course</h3>
                  <p className="text-[15px] text-[#666]">Share your knowledge and reach thousands of students globally.</p>
                </div>
                <button className="flex-shrink-0 bg-[#ffd600] text-[#1e1e22] text-[15px] font-bold tracking-[0.2px] px-8 py-3.5 rounded-full hover:bg-[#ffe033] hover:scale-[1.02] transition-all shadow-[0_4px_16px_rgba(255,214,0,0.2)] flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Create Course
                </button>
              </div>
            </section>

            {/* Analytics Overview */}
            <section>
              <h3 className="text-[20px] font-bold text-[#1a1c1c] mb-5">Analytics Overview</h3>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="bg-white p-6 rounded-2xl border border-[rgba(0,0,0,0.08)] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#ecfdf5] flex items-center justify-center mb-3">
                    <Users className="h-6 w-6 text-[#059669]" />
                  </div>
                  <p className="text-[28px] font-bold text-[#1a1c1c] leading-none mb-1">434</p>
                  <p className="text-[13px] font-medium text-[#666]">Total Students</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[rgba(0,0,0,0.08)] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#f3f0ff] flex items-center justify-center mb-3">
                    <DollarSign className="h-6 w-6 text-[#7c3aed]" />
                  </div>
                  <p className="text-[28px] font-bold text-[#1a1c1c] leading-none mb-1">$21,700</p>
                  <p className="text-[13px] font-medium text-[#666]">Total Earnings</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[rgba(0,0,0,0.08)] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#fff9d6] flex items-center justify-center mb-3">
                    <Star className="h-6 w-6 text-[#b8960a]" />
                  </div>
                  <p className="text-[28px] font-bold text-[#1a1c1c] leading-none mb-1">4.85</p>
                  <p className="text-[13px] font-medium text-[#666]">Avg Rating</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[rgba(0,0,0,0.08)] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#e0f2fe] flex items-center justify-center mb-3">
                    <TrendingUp className="h-6 w-6 text-[#0284c7]" />
                  </div>
                  <p className="text-[28px] font-bold text-[#1a1c1c] leading-none mb-1">+15%</p>
                  <p className="text-[13px] font-medium text-[#666]">Growth Rate</p>
                </div>
              </div>
            </section>

            {/* My Created Courses */}
            <section>
              <h3 className="text-[20px] font-bold text-[#1a1c1c] mb-5 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#8b5cf6]" />
                My Created Courses
              </h3>
              <div className="space-y-4">
                {mockEducatorCourses.map((course) => (
                  <div key={course.id} className="bg-white p-6 rounded-2xl border border-[rgba(0,0,0,0.08)] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-shadow">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-[18px] text-[#1a1c1c]">{course.title}</h4>
                        <span className="text-[12px] font-bold px-2 py-0.5 rounded bg-[#fff9d6] text-[#b8960a] flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current" /> {course.rating}
                        </span>
                      </div>
                      <span className="text-[13px] font-medium text-[#666] bg-[#f0f0f0] px-3 py-1 rounded-full">
                        {course.students} active students
                      </span>
                    </div>

                    <div className="flex items-center gap-8 md:gap-12">
                      <div className="text-center">
                        <p className="text-[20px] font-bold text-[#1a1c1c]">{course.enrollments}</p>
                        <p className="text-[12px] font-semibold text-[#999] uppercase tracking-wider">Enrollments</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[20px] font-bold text-[#059669]">${course.revenue}</p>
                        <p className="text-[12px] font-semibold text-[#999] uppercase tracking-wider">Revenue</p>
                      </div>
                      <button className="h-10 w-10 rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-[#f0f0f0] transition-colors">
                        <ArrowRight className="h-5 w-5 text-[#1a1c1c]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;