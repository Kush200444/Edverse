import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Play,
  Pause,
  Users,
  Trophy,
  Clock,
  BookOpen,
  Video,
  MessageSquare,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Settings,
  Timer,
  Save,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize,
  HelpCircle,
  Bookmark,
  X,
  Edit,
  Trash2,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  avatar?: string;
}

interface Lesson {
  id: string;
  title: string;
  youtubeId: string;
  duration: number;
}

interface Doubt {
  id: string;
  timestamp: number;
  question: string;
  lessonId: string;
  lessonTitle: string;
  createdAt: Date;
}

const CourseModule = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isEdVerseActive, setIsEdVerseActive] = useState(false);
  const [notes, setNotes] = useState("");
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isPomodoroActive, setIsPomodoroActive] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [player, setPlayer] = useState<any>(null);
  const [playerReady, setPlayerReady] = useState(false);

  // Doubt feature states
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [showDoubtModal, setShowDoubtModal] = useState(false);
  const [currentDoubtQuestion, setCurrentDoubtQuestion] = useState("");
  const [doubtTimestamp, setDoubtTimestamp] = useState(0);
  const [editingDoubtId, setEditingDoubtId] = useState<string | null>(null);

  const playerRef = useRef<HTMLDivElement>(null);

  // Course lessons with YouTube videos
  const lessons: Lesson[] = [
    {
      id: "1",
      title: "Introduction to Node.js",
      youtubeId: "TlB_eWDSMt4",
      duration: 1800,
    },
    {
      id: "2",
      title: "Building REST APIs with Node.js",
      youtubeId: "pKd0Rpw7O48",
      duration: 2400,
    },
    {
      id: "3",
      title: "Express.js Fundamentals",
      youtubeId: "L72fhGm1tfE",
      duration: 2100,
    },
    {
      id: "4",
      title: "MongoDB Integration",
      youtubeId: "ExcRbA7fy_A",
      duration: 1950,
    },
    {
      id: "5",
      title: "Authentication & Security",
      youtubeId: "mbsmsi7l3r4",
      duration: 2700,
    },
  ];

  const currentLesson = lessons[currentLessonIndex];
  const courseProgress = Math.round(
    ((currentLessonIndex + 1) / lessons.length) * 100
  );
  const totalLessons = lessons.length;
  const completedLessons = currentLessonIndex;

  const leaderboard = [
    { id: "1", name: "Emma Chen", points: 2450, avatar: "👩‍💻" },
    { id: "2", name: "Alex Rodriguez", points: 2380, avatar: "👨‍💼" },
    { id: "3", name: "Sarah Johnson", points: 2210, avatar: "👩‍🎨" },
    { id: "4", name: "You", points: 1980, avatar: "🙂" },
    { id: "5", name: "Mike Wilson", points: 1850, avatar: "👨‍🚀" },
  ];

  const studyRoomUsers: User[] = [
    { id: "1", name: "Emma", avatar: "👩‍💻" },
    { id: "2", name: "Alex", avatar: "👨‍💼" },
    { id: "3", name: "Sarah", avatar: "👩‍🎨" },
  ];

  // Load doubts from localStorage on component mount
  useEffect(() => {
    try {
      const savedDoubts = localStorage.getItem("course_doubts");
      if (savedDoubts) {
        const parsed = JSON.parse(savedDoubts);
        if (Array.isArray(parsed)) {
          setDoubts(parsed);
        }
      }
    } catch (error) {
      console.error("Error parsing doubts from localStorage:", error);
    }
  }, []);

  // Save doubts to localStorage whenever doubts change
  useEffect(() => {
    localStorage.setItem("course_doubts", JSON.stringify(doubts));
  }, [doubts]);

  // Load YouTube API
  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      document.head.appendChild(tag);
    }

    (window as any).onYouTubeIframeAPIReady = () => {
      initializePlayer();
    };

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, []);

  const initializePlayer = () => {
    if (playerRef.current && (window as any).YT) {
      const newPlayer = new (window as any).YT.Player(playerRef.current, {
        height: "100%",
        width: "100%",
        videoId: currentLesson.youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          fs: 1,
          cc_load_policy: 0,
          iv_load_policy: 3,
          autohide: 0,
        },
        events: {
          onReady: (event: any) => {
            setPlayer(event.target);
            setPlayerReady(true);
            setDuration(event.target.getDuration());
          },
          onStateChange: (event: any) => {
            const state = event.data;
            if (state === (window as any).YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (
              state === (window as any).YT.PlayerState.PAUSED ||
              state === (window as any).YT.PlayerState.ENDED
            ) {
              setIsPlaying(false);
            }
          },
        },
      });
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (player && isPlaying && playerReady) {
      interval = setInterval(() => {
        if (player.getCurrentTime) {
          setCurrentTime(player.getCurrentTime());
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [player, isPlaying, playerReady]);

  useEffect(() => {
    if (player && playerReady) {
      player.loadVideoById(currentLesson.youtubeId);
      setCurrentTime(0);
    }
  }, [currentLessonIndex, player, playerReady]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPomodoroActive && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime((time) => time - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setIsPomodoroActive(false);
      setPomodoroTime(25 * 60);
    }
    return () => clearInterval(interval);
  }, [isPomodoroActive, pomodoroTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    if (player && playerReady) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
  };

  const handleSeek = (percentage: number) => {
    if (player && playerReady && duration) {
      const newTime = (percentage / 100) * duration;
      player.seekTo(newTime);
      setCurrentTime(newTime);
    }
  };

  const handleSkipForward = () => {
    if (player && playerReady) {
      const newTime = Math.min(currentTime + 10, duration);
      player.seekTo(newTime);
      setCurrentTime(newTime);
    }
  };

  const handleSkipBack = () => {
    if (player && playerReady) {
      const newTime = Math.max(currentTime - 10, 0);
      player.seekTo(newTime);
      setCurrentTime(newTime);
    }
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const handleCreateStudyRoom = () => {
    setIsEdVerseActive(true);
  };

  const handleEndStudyRoom = () => {
    setIsEdVerseActive(false);
  };

  const handleSaveNotes = () => {
    localStorage.setItem(`notes_${currentLesson.title}`, notes);
  };

  // Doubt functionality
  const handleCreateDoubt = () => {
    if (player && playerReady) {
      // Pause the video when creating a doubt
      if (isPlaying) {
        player.pauseVideo();
      }
      setDoubtTimestamp(currentTime);
      setShowDoubtModal(true);
    }
  };

  const handleSaveDoubt = () => {
    if (currentDoubtQuestion.trim()) {
      const newDoubt: Doubt = {
        id: editingDoubtId || Date.now().toString(),
        timestamp: doubtTimestamp,
        question: currentDoubtQuestion,
        lessonId: currentLesson.id,
        lessonTitle: currentLesson.title,
        createdAt: new Date(),
      };

      if (editingDoubtId) {
        setDoubts(
          doubts.map((doubt) =>
            doubt.id === editingDoubtId ? newDoubt : doubt
          )
        );
        setEditingDoubtId(null);
      } else {
        setDoubts([...doubts, newDoubt]);
      }

      setCurrentDoubtQuestion("");
      setShowDoubtModal(false);
    }
  };

  const handleEditDoubt = (doubt: Doubt) => {
    setEditingDoubtId(doubt.id);
    setCurrentDoubtQuestion(doubt.question);
    setDoubtTimestamp(doubt.timestamp);
    setShowDoubtModal(true);
  };

  const handleDeleteDoubt = (doubtId: string) => {
    setDoubts(doubts.filter((doubt) => doubt.id !== doubtId));
  };

  const handleJumpToDoubt = (doubt: Doubt) => {
    // Switch to the lesson if it's different
    const lessonIndex = lessons.findIndex(
      (lesson) => lesson.id === doubt.lessonId
    );
    if (lessonIndex !== -1 && lessonIndex !== currentLessonIndex) {
      setCurrentLessonIndex(lessonIndex);
    }

    // Jump to timestamp after a small delay to ensure video is loaded
    setTimeout(() => {
      if (player && playerReady) {
        player.seekTo(doubt.timestamp);
        setCurrentTime(doubt.timestamp);
      }
    }, 1000);
  };

  const handleCancelDoubt = () => {
    setShowDoubtModal(false);
    setCurrentDoubtQuestion("");
    setEditingDoubtId(null);
  };

  const getCurrentLessonDoubts = () => {
    return (Array.isArray(doubts) ? doubts : []).filter((doubt) => doubt.lessonId === currentLesson?.id);
  };

  return (
    <div
      className="min-h-screen flex flex-col font-hanken relative"
      style={{
        backgroundColor: "#FAFAF8",
        backgroundImage: `
radial-gradient(circle at 20% 30%, rgba(255,210,0,0.04), transparent 25%),
linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px),
linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)
`,
        backgroundSize: "40px 40px"
      }}
    >
      {/* Header with Progress */}
      <header
        className="w-full pt-6 pb-4 px-6 md:px-12 flex items-center justify-between border-b border-[rgba(0,0,0,0.06)]"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "rgba(250,250,248,0.85)",
          backdropFilter: "blur(28px)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.02)"
        }}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-[12px] bg-white border border-[rgba(0,0,0,0.08)] shadow-sm flex items-center justify-center">
                <span className="text-[#1a1c1c] text-[14px] font-extrabold tracking-tight">EV</span>
              </div>
              <div className="flex flex-col hidden md:flex">
                <span className="text-[#1a1c1c] font-bold text-[14px] leading-tight">EdVerse Intelligence</span>
                <span className="text-[#1a1c1c] opacity-50 text-[12px] font-medium">Personalizing your learning session</span>
              </div>
            </div>

            <div className="w-px h-10 bg-[rgba(0,0,0,0.06)] hidden md:block" />

            <div className="flex flex-col">
              <h1 className="text-[#1a1c1c] font-extrabold tracking-tight text-[20px] leading-[1.1]">
                Full-Stack Web Development Mastery
              </h1>
              <span className="text-[#1a1c1c] opacity-60 text-[13px] font-medium mt-0.5">
                Today's focus: {currentLesson.title}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="text-[#1a1c1c] text-[15px] font-bold tracking-tight">
              {courseProgress}% Completed
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Video and Content Area - Spans 3 columns */}
        <div className="lg:col-span-3 space-y-8">
          {/* YouTube Video Player */}
          <div className="bg-white rounded-[24px] border border-[rgba(0,0,0,0.04)] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="p-0">
              <div className="relative bg-[#0a0a0a] aspect-[21/9] w-full overflow-hidden group/player">

                {/* Background blurred image for cinematic effect */}
                <div
                  className="absolute inset-0 z-0 bg-cover bg-center opacity-60 blur-xl scale-110 transition-all duration-1000"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop')` }}
                />

                {/* YouTube Player Container */}
                <div ref={playerRef} className="w-full h-full relative z-10" />

                {/* Cinematic Overlay when paused */}
                {!isPlaying && (
                  <div className="absolute inset-0 z-20 bg-[rgba(0,0,0,0.55)] flex flex-col justify-center p-12 backdrop-blur-[2px] transition-all duration-500">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                      <span className="text-[#FFD60A] text-[13px] font-bold tracking-widest uppercase mb-4 block opacity-90 drop-shadow-md">
                        Currently Learning
                      </span>
                      <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight mb-5 leading-tight max-w-3xl drop-shadow-lg">
                        {currentLesson.title}
                      </h2>
                      <div className="flex items-center gap-4">
                        <span className="text-white/90 font-semibold text-[15px] drop-shadow-md">
                          Lesson Duration: {Math.round(currentLesson.duration / 60)} Minutes
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#FFD60A] shadow-[0_0_8px_rgba(255,214,10,0.8)] animate-pulse" />
                          <span className="text-white/90 text-[14px] font-bold tracking-wide drop-shadow-md">Session Ready</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Top Right AI Badge */}
                <div className="absolute top-6 right-6 z-30 flex items-center gap-2 px-3.5 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFD60A] animate-pulse shadow-[0_0_8px_rgba(255,214,10,0.8)]" />
                  <span className="text-white text-[11px] font-bold tracking-wider uppercase opacity-90">
                    AI Learning Analysis Enabled
                  </span>
                </div>

                {/* Custom Premium Video Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 pt-16 opacity-0 group-hover/player:opacity-100 transition-opacity duration-300">
                  <div className="flex flex-col gap-4 max-w-[98%] mx-auto">
                    {/* Minimal Progress Bar */}
                    <div className="flex items-center gap-4 text-white/90 text-xs font-semibold tracking-wide w-full">
                      <div
                        className="flex-1 bg-white/20 h-1 rounded-full cursor-pointer relative group/progress"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const percentage =
                            ((e.clientX - rect.left) / rect.width) * 100;
                          handleSeek(percentage);
                        }}
                      >
                        <div
                          className="bg-[#FFD60A] h-1 rounded-full transition-all relative"
                          style={{
                            width: duration
                              ? `${(currentTime / duration) * 100}%`
                              : "0%",
                          }}
                        >
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,214,10,0.8)] scale-0 group-hover/progress:scale-100 transition-transform" />
                        </div>
                        {/* Doubt markers on progress bar */}
                        {getCurrentLessonDoubts().map((doubt) => (
                          <div
                            key={doubt.id}
                            className="absolute top-0 w-1.5 h-1.5 bg-white/80 rounded-full transform -translate-y-[1px] cursor-pointer hover:bg-white hover:scale-150 transition-all shadow-sm"
                            style={{
                              left: `${(doubt.timestamp / duration) * 100}%`,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleJumpToDoubt(doubt);
                            }}
                            title={`Doubt: ${doubt.question}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Elegant Control Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handlePlayPause}
                          className="text-[#1a1c1c] bg-white hover:bg-[#FFD60A] hover:scale-105 rounded-full h-11 w-11 p-0 shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all flex items-center justify-center"
                        >
                          {isPlaying ? (
                            <Pause className="h-5 w-5" fill="currentColor" />
                          ) : (
                            <Play className="h-5 w-5 ml-1" fill="currentColor" />
                          )}
                        </Button>
                        <div className="flex items-center gap-2 text-white/80 text-[13px] font-bold tracking-wide">
                          <span>{formatTime(currentTime)}</span>
                          <span className="opacity-40 font-normal">/</span>
                          <span>{formatTime(duration)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/20 hover:scale-110 transition-all rounded-full h-9 w-9 p-0 opacity-80 hover:opacity-100"
                        >
                          <Volume2 className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/20 hover:scale-110 transition-all rounded-full h-9 w-9 p-0 opacity-80 hover:opacity-100"
                        >
                          <Maximize className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {!isEdVerseActive ? (
              <Button
                size="lg"
                onClick={handleCreateStudyRoom}
                className="bg-[#1a1c1c] text-white hover:bg-black flex-1 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.1)] h-14 font-semibold text-[15px]"
              >
                <Users className="h-5 w-5 mr-2 opacity-70" />
                Create Classroom Environment
              </Button>
            ) : (
              <Button
                variant="outline"
                size="lg"
                onClick={handleEndStudyRoom}
                className="flex-1 rounded-full h-14 border border-[rgba(0,0,0,0.08)] bg-white text-[#1a1c1c] font-semibold hover:bg-gray-50 shadow-sm"
              >
                End Study Session
              </Button>
            )}

            {/* Add Doubt Button */}
            <Button
              size="lg"
              onClick={handleCreateDoubt}
              className="bg-white border border-[rgba(0,0,0,0.08)] text-[#1a1c1c] hover:bg-gray-50 shadow-sm rounded-full px-8 h-14 font-semibold text-[15px]"
            >
              <HelpCircle className="h-5 w-5 mr-2 opacity-70 text-red-500" />
              Add Doubt
            </Button>
          </div>

          {/* Doubt Modal */}
          {showDoubtModal && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
              <div className="w-full max-w-md mx-4 bg-white rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-[rgba(0,0,0,0.04)] overflow-hidden">
                <div className="p-6 border-b border-[rgba(0,0,0,0.04)]">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-bold text-[#1a1c1c] text-[18px]">
                      <HelpCircle className="h-5 w-5 text-red-500" />
                      {editingDoubtId ? "Edit Doubt" : "Add Doubt"}
                      <span className="text-[14px] font-normal text-muted-foreground ml-1">
                        at {formatTime(doubtTimestamp)}
                      </span>
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCancelDoubt}
                      className="rounded-full h-8 w-8 p-0 hover:bg-gray-100"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-6 space-y-5">
                  <div>
                    <label className="text-[13px] font-semibold text-[#1a1c1c] opacity-80 mb-2 block uppercase tracking-wider">
                      What's your doubt or question?
                    </label>
                    <Textarea
                      value={currentDoubtQuestion}
                      onChange={(e) => setCurrentDoubtQuestion(e.target.value)}
                      placeholder="Describe your doubt or question about this part of the video..."
                      className="min-h-[120px] border border-[rgba(0,0,0,0.08)] bg-[rgba(250,250,248,0.5)] rounded-xl focus-visible:ring-1 focus-visible:ring-[#FFD60A] focus-visible:border-[#FFD60A] resize-none text-[15px]"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={handleCancelDoubt}
                      className="flex-1 rounded-full h-12 border border-[rgba(0,0,0,0.08)] font-semibold text-[#1a1c1c] hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveDoubt}
                      className="flex-1 rounded-full h-12 bg-[#FFD60A] text-[#1a1c1c] hover:bg-[#e6c109] shadow-sm font-semibold transition-colors"
                      disabled={!currentDoubtQuestion.trim()}
                    >
                      {editingDoubtId ? "Update" : "Save"} Doubt
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Ed-Verse Study Environment */}
          {isEdVerseActive && (
            <div className="bg-[#0a0a0a] rounded-[24px] border border-[rgba(0,0,0,0.04)] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden relative">
              {/* Subtle background glow */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FFD60A] opacity-[0.05] rounded-full blur-3xl" />
              </div>

              <div className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center backdrop-blur-sm border border-white/10">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold tracking-tight text-[18px] text-white leading-tight">
                        Ed-Verse Study Room
                      </h3>
                      <p className="text-[13px] text-white/60 font-medium">
                        AI-monitored collaborative session
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-sm">
                    <Timer className="h-4 w-4 text-white/80" />
                    <span className="font-mono font-bold text-white tracking-wider text-[15px]">
                      {formatTime(pomodoroTime)}
                    </span>
                    <div className="w-px h-4 bg-white/20 mx-1" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsPomodoroActive(!isPomodoroActive)}
                      className="h-7 w-7 p-0 rounded-full hover:bg-white/20 text-white"
                    >
                      {isPomodoroActive ? (
                        <Pause className="h-3.5 w-3.5" fill="currentColor" />
                      ) : (
                        <Play className="h-3.5 w-3.5 ml-0.5" fill="currentColor" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {studyRoomUsers.map((user) => (
                    <div
                      key={user.id}
                      className="bg-white/5 backdrop-blur-sm p-5 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center text-[16px] font-bold text-white shadow-inner mb-3 border border-white/10">
                        {user.name.charAt(0)}
                      </div>
                      <p className="text-[14px] font-bold text-white tracking-tight">{user.name}</p>
                      <div className="flex items-center gap-1.5 mt-1.5 bg-white/10 px-2.5 py-1 rounded-full">
                        <div className="w-1.5 h-1.5 bg-[#FFD60A] rounded-full animate-pulse shadow-[0_0_8px_rgba(255,214,10,0.8)]" />
                        <p className="text-[9px] font-bold text-white/90 uppercase tracking-widest">Focused</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Invite Slot */}
                  <div className="bg-white/5 backdrop-blur-sm p-5 rounded-2xl border border-white/5 border-dashed text-center flex flex-col items-center justify-center hover:bg-white/10 transition-all cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:bg-white/10 transition-all">
                      <span className="text-white/40 text-2xl mb-1">+</span>
                    </div>
                    <p className="text-[13px] font-bold text-white/40 tracking-tight group-hover:text-white/60">Invite Peer</p>
                  </div>
                </div>

                <div className="flex justify-center gap-2 p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 shadow-xl max-w-[280px] mx-auto">
                  <Button
                    size="sm"
                    onClick={() => setIsMicOn(!isMicOn)}
                    className={`h-11 w-11 p-0 rounded-full transition-all ${isMicOn
                        ? "bg-white text-[#0a0a0a] hover:bg-gray-200"
                        : "bg-transparent text-white/70 hover:bg-white/20"
                      }`}
                  >
                    {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setIsCameraOn(!isCameraOn)}
                    className={`h-11 w-11 p-0 rounded-full transition-all ${isCameraOn
                        ? "bg-white text-[#0a0a0a] hover:bg-gray-200"
                        : "bg-transparent text-white/70 hover:bg-white/20"
                      }`}
                  >
                    {isCameraOn ? <Camera className="h-4 w-4" /> : <CameraOff className="h-4 w-4" />}
                  </Button>
                  <div className="w-px h-6 bg-white/20 mx-1 self-center" />
                  <Button
                    size="sm"
                    className="h-11 w-11 p-0 rounded-full bg-transparent text-white/70 hover:bg-white/20 transition-all"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    className="h-11 w-11 p-0 rounded-full bg-transparent text-white/70 hover:bg-white/20 transition-all"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Notes Section */}
          <div className="bg-white rounded-[24px] border border-[rgba(0,0,0,0.04)] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="p-6 pb-4 border-b border-[rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-bold text-[#1a1c1c] text-[16px]">
                  <BookOpen className="h-5 w-5 opacity-70" />
                  Lecture Notes
                </h3>
                <Button
                  size="sm"
                  onClick={handleSaveNotes}
                  className="rounded-full bg-white border border-[rgba(0,0,0,0.08)] text-[#1a1c1c] hover:bg-gray-50 shadow-sm font-semibold h-9 px-4"
                >
                  <Save className="h-4 w-4 mr-2 opacity-60" />
                  Save Notes
                </Button>
              </div>
            </div>
            <div className="p-6 bg-[rgba(250,250,248,0.3)]">
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Take notes during the lecture..."
                className="min-h-[200px] border border-[rgba(0,0,0,0.06)] bg-white rounded-xl focus-visible:ring-1 focus-visible:ring-[#FFD60A] focus-visible:border-[#FFD60A] resize-none text-[15px] shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Sidebar - Spans 1 column */}
        <div className="space-y-6">
          {/* My Doubts Section */}
          <div className="bg-white rounded-[24px] border border-[rgba(0,0,0,0.04)] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="p-5 pb-4 border-b border-[rgba(0,0,0,0.04)] bg-[rgba(250,250,248,0.5)]">
              <h3 className="flex items-center gap-2 font-bold text-[#1a1c1c] text-[15px]">
                <HelpCircle className="h-5 w-5 text-red-500" />
                My Doubts
                <span className="ml-auto bg-gray-100 text-[#1a1c1c] rounded-full px-2.5 py-0.5 text-xs font-bold">
                  {doubts.length}
                </span>
              </h3>
            </div>
            <div className="p-5 space-y-4 max-h-72 overflow-y-auto">
              {doubts.length === 0 ? (
                <div className="text-center py-6 flex flex-col items-center">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <HelpCircle className="h-5 w-5 text-gray-300" />
                  </div>
                  <p className="text-[13px] text-muted-foreground font-medium">
                    No doubts yet.<br />Add a doubt while watching.
                  </p>
                </div>
              ) : (
                doubts.map((doubt) => (
                  <div
                    key={doubt.id}
                    className="p-4 rounded-2xl border border-[rgba(0,0,0,0.04)] bg-[#FAFAF8] group hover:border-[rgba(0,0,0,0.08)] hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex-1">
                        <p className="font-bold text-[13px] text-[#1a1c1c] leading-tight">
                          {doubt.lessonTitle}
                        </p>
                        <p className="text-[11px] font-medium text-muted-foreground mt-0.5 uppercase tracking-wider">
                          at {formatTime(doubt.timestamp)}
                        </p>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditDoubt(doubt)}
                          className="h-7 w-7 p-0 rounded-full hover:bg-white border border-transparent hover:border-[rgba(0,0,0,0.08)]"
                        >
                          <Edit className="h-3 w-3 text-[#1a1c1c]" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteDoubt(doubt.id)}
                          className="h-7 w-7 p-0 rounded-full hover:bg-white border border-transparent hover:border-red-100"
                        >
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-[14px] text-[#1a1c1c] leading-snug mb-3 opacity-90">{doubt.question}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleJumpToDoubt(doubt)}
                      className="text-[12px] h-8 rounded-full border border-[rgba(0,0,0,0.08)] font-semibold text-[#1a1c1c] hover:bg-white w-full"
                    >
                      <Bookmark className="h-3.5 w-3.5 mr-1.5 opacity-60" />
                      Jump to timestamp
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Course Timeline */}
          <div className="bg-white rounded-[24px] border border-[rgba(0,0,0,0.04)] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="p-5 pb-4 border-b border-[rgba(0,0,0,0.04)] bg-[rgba(250,250,248,0.5)]">
              <h3 className="flex items-center gap-2 font-bold text-[#1a1c1c] text-[15px]">
                <Clock className="h-5 w-5 opacity-70" />
                Course Timeline
              </h3>
            </div>
            <div className="p-5 relative">
              {/* Continuous vertical line */}
              <div className="absolute left-[27px] top-8 bottom-8 w-px bg-[rgba(0,0,0,0.08)] z-0" />
              
              <div className="space-y-6 relative z-10">
                {lessons.map((lesson, i) => {
                  const lessonDoubts = doubts.filter(
                    (doubt) => doubt.lessonId === lesson.id
                  );
                  const isCurrent = i === currentLessonIndex;
                  const isPast = i < currentLessonIndex;
                  
                  return (
                    <div
                      key={lesson.id}
                      className="flex gap-4 group cursor-pointer"
                      onClick={() => setCurrentLessonIndex(i)}
                    >
                      {/* Timeline Node */}
                      <div className="relative flex flex-col items-center mt-1">
                        <div className={`relative w-3.5 h-3.5 rounded-full border-2 bg-white transition-all duration-300 ${isCurrent ? "border-[#FFD60A] shadow-[0_0_8px_rgba(255,214,10,0.6)]" : isPast ? "border-[#1a1c1c]" : "border-[rgba(0,0,0,0.15)] group-hover:border-[rgba(0,0,0,0.3)]"}`}>
                          {isCurrent && <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-[#FFD60A] animate-pulse" />}
                          {isPast && <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-[#1a1c1c]" />}
                        </div>
                      </div>
                      
                      {/* Timeline Content */}
                      <div className="flex-1 pb-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 transition-all duration-300 group-hover:translate-x-1">
                            <p className={`font-bold text-[14px] leading-tight ${isCurrent ? "text-[#1a1c1c]" : "text-[#1a1c1c] opacity-70 group-hover:opacity-100"}`}>
                              {lesson.title}
                            </p>
                            <p className="text-[12px] font-medium text-muted-foreground mt-0.5">
                              {formatTime(lesson.duration)} • Lesson {i + 1}
                            </p>
                          </div>
                          {lessonDoubts.length > 0 && (
                            <div className="bg-red-50 text-red-600 rounded-full px-2 py-0.5 text-[10px] font-bold border border-red-100 flex items-center whitespace-nowrap">
                              {lessonDoubts.length} doubt{lessonDoubts.length !== 1 ? "s" : ""}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-[24px] border border-[rgba(0,0,0,0.04)] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="p-5 pb-4 border-b border-[rgba(0,0,0,0.04)] bg-[rgba(250,250,248,0.5)]">
              <h3 className="flex items-center gap-2 font-bold text-[#1a1c1c] text-[15px]">
                <Trophy className="h-5 w-5 text-[#FFD60A]" />
                Leaderboard
              </h3>
            </div>
            <div className="p-0">
              {leaderboard.map((user, index) => {
                const isYou = user.name === "You";
                return (
                  <div
                    key={user.id}
                    className={`flex items-center gap-4 px-5 py-3.5 border-b border-[rgba(0,0,0,0.02)] last:border-0 transition-colors cursor-pointer ${isYou
                        ? "bg-[#FAFAF8] relative"
                        : "hover:bg-gray-50"
                      }`}
                  >
                    {isYou && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FFD60A]" />}
                    
                    <span className={`font-bold text-[13px] w-4 text-center ${isYou ? "text-[#1a1c1c]" : "text-muted-foreground"}`}>
                      {index + 1}
                    </span>
                    
                    <div className="relative">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold shadow-sm ${isYou ? "bg-[#1a1c1c] text-white" : "bg-gray-100 text-gray-700 border border-[rgba(0,0,0,0.04)]"}`}>
                        {user.name === "You" ? "ME" : user.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      {index === 0 && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFD60A] rounded-full border border-white flex items-center justify-center">
                          <span className="text-[8px]">👑</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 flex justify-between items-center">
                      <p className={`font-bold text-[14px] ${isYou ? "text-[#1a1c1c]" : "text-[#1a1c1c] opacity-90"}`}>
                        {user.name}
                      </p>
                      <p className={`text-[12px] font-bold ${isYou ? "text-[#FFD60A]" : "text-muted-foreground"}`}>
                        {user.points} <span className="font-medium opacity-70">pts</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModule;
