import React, { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Bot,
  User,
  ArrowRight,
  Clock,
  Music,
  Moon,
  Sun,
  Brain,
  Sparkles,
} from "lucide-react";

interface ChatMessage {
  id: string;
  type: "bot" | "user";
  content: string;
  timestamp: Date;
  options?: string[];
  isTyping?: boolean;
  component?: React.ReactNode;
}

interface StudyVibeProfile {
  user_id: string;
  vibe_tag: string;
  parameters: {
    sound: string;
    rhythm: string;
    time: string;
  };
  description: string;
  recommendations: string[];
}

interface PostPaymentChatProps {
  courseName: string;
  onComplete: () => void;
}

export const PostPaymentChat: React.FC<PostPaymentChatProps> = ({
  courseName,
  onComplete,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userResponses, setUserResponses] = useState<Record<string, string>>(
    {}
  );
  const [studyVibeProfile, setStudyVibeProfile] =
    useState<StudyVibeProfile | null>(null);
  const [isLoadingVibe, setIsLoadingVibe] = useState(false);
  const [isActivating, setIsActivating] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const chatSteps = [
    {
      id: "welcome",
      message: `Welcome.\n\nYou’ve successfully unlocked ${courseName}.\n\nEdVerse Intelligence is now configuring a personalized learning path optimized specifically for your goals.`,
      options: ["Let's get started!", "Tell me more about the course"],
    },
    {
      id: "course_overview",
      message:
        "Great! Let me give you a quick overview of what you can expect:\n\n📚 48 comprehensive lessons\n🎯 Hands-on projects\n👥 Community access\n📜 Certificate upon completion\n🎤 1-on-1 mentorship sessions\n\nWhat interests you most?",
      options: [
        "The projects",
        "Community features",
        "Mentorship sessions",
        "Everything!",
      ],
    },
    {
      id: "learning_goals",
      message:
        "Excellent! Setting clear goals helps you stay motivated. What do you hope to achieve by completing this course?",
      options: [
        "Get a new job in tech",
        "Advance in my current role",
        "Start a side project",
        "Learn for personal growth",
      ],
    },
    {
      id: "study_vibe_intro",
      message:
        "That's a fantastic goal! 🎯 Now, let's personalize your learning experience. I'd like to understand your study preferences to create the perfect learning environment for you.\n\nCould you describe how you like to study? For example, when do you prefer to study, what kind of environment helps you focus, and how do you like to structure your learning sessions?",
      options: [
        "I'm a night owl who likes music while studying",
        "I prefer quiet morning sessions with long focus periods",
        "I like afternoon study with breaks and ambient sounds",
        "Let me type my own description",
      ],
    },
    {
      id: "study_vibe_processing",
      message:
        "Perfect! Let me analyze your study preferences and create a personalized learning profile for you...",
      options: [],
    },
    {
      id: "features_intro",
      message:
        "Awesome! Based on your preferences, here are some key features you should know about:\n\n🔥 **Smart Doubt System**: Bookmark questions at specific video timestamps\n🎥 **Video Conferencing**: Study with peers in virtual rooms\n📝 **Note Taking**: Integrated note-taking with auto-save\n⏲️ **Pomodoro Timer**: Built-in focus sessions\n🏆 **Progress Tracking**: See your learning journey\n\nReady to explore your course?",
      options: ["Yes, let's go!", "Tell me about study groups"],
    },
    {
      id: "study_groups",
      message:
        "Study groups are amazing for learning! 👥 You can:\n\n• Join virtual study rooms with other students\n• Start video calls while watching lectures\n• Chat in real-time during sessions\n• Share notes and doubts\n• Form accountability partnerships\n\nI highly recommend trying the study features once you're comfortable with the basics!",
      options: ["Sounds great!", "I prefer studying alone for now"],
    },
    {
      id: "final_tips",
      message:
        "Here are my top tips for success in this course:\n\n✅ **Start with Lesson 1** - Don't skip the fundamentals\n✅ **Take notes actively** - Use the built-in note feature\n✅ **Mark your doubts** - Use timestamps to remember questions\n✅ **Practice consistently** - Little and often beats cramming\n✅ **Join the community** - Connect with fellow learners\n✅ **Use the Pomodoro timer** - 25-minute focused sessions work wonders\n\nAre you ready to begin your learning journey?",
      options: ["Yes, take me to my course!", "I have a question first"],
    },
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Initialize chat with welcome message
  useEffect(() => {
    // Premium activation moment duration
    const activationDuration = 1200;

    setTimeout(() => {
      setIsActivating(false);

      const welcomeMessage: ChatMessage = {
        id: "1",
        type: "bot",
        content: chatSteps[0].message,
        timestamp: new Date(),
        options: chatSteps[0].options,
      };

      setTimeout(() => {
        setMessages([welcomeMessage]);
      }, 500);
    }, activationDuration);
  }, []);

  // Function to call the study vibe API
  const getStudyVibeProfile = async (description: string) => {
    setIsLoadingVibe(true);
    try {
      const response = await fetch(
        "http://localhost:8001/get-study-vibe-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: "user_" + Date.now(),
            description: description,
          }),
        }
      );

      if (response.ok) {
        const vibeProfile: StudyVibeProfile = await response.json();
        setStudyVibeProfile(vibeProfile);

        // Store in localStorage for CourseModule
        localStorage.setItem("user_study_vibe", JSON.stringify(vibeProfile));

        return vibeProfile;
      } else {
        console.error("Failed to get study vibe profile");
        return null;
      }
    } catch (error) {
      console.error("Error calling study vibe API:", error);
      return null;
    } finally {
      setIsLoadingVibe(false);
    }
  };

  // Component for displaying study vibe profile
  const StudyVibeDisplay: React.FC<{ profile: StudyVibeProfile }> = ({
    profile,
  }) => {
    const getVibeIcon = (vibeTag: string) => {
      if (vibeTag.includes("night")) return <Moon className="h-5 w-5" />;
      if (vibeTag.includes("morning")) return <Sun className="h-5 w-5" />;
      if (vibeTag.includes("lofi") || vibeTag.includes("music"))
        return <Music className="h-5 w-5" />;
      return <Brain className="h-5 w-5" />;
    };

    const getVibeColor = (vibeTag: string) => {
      if (vibeTag.includes("night"))
        return { bg: "#f3f0ff", border: "rgba(139,92,246,0.2)" };
      if (vibeTag.includes("morning"))
        return { bg: "#fff9d6", border: "rgba(255,214,0,0.3)" };
      if (vibeTag.includes("lofi"))
        return { bg: "#eef6ff", border: "rgba(59,130,246,0.2)" };
      return { bg: "#ecfdf5", border: "rgba(16,185,129,0.2)" };
    };

    const colors = getVibeColor(profile.vibe_tag);

    return (
      <div
        className="rounded-xl space-y-3"
        style={{
          padding: '16px',
          background: colors.bg,
          border: `1px solid ${colors.border}`,
        }}
      >
        <div className="flex items-center gap-2">
          <span style={{ color: '#666' }}>{getVibeIcon(profile.vibe_tag)}</span>
          <h3 className="font-bold text-[15px]" style={{ color: '#1a1c1c' }}>
            Your Study Vibe Profile
          </h3>
        </div>

        <p className="text-[13px] leading-relaxed" style={{ color: '#666' }}>
          {profile.description}
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className="text-[11px] font-medium"
            style={{
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '9999px',
            }}
          >
            🎵 {profile.parameters.sound}
          </Badge>
          <Badge
            variant="outline"
            className="text-[11px] font-medium"
            style={{
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '9999px',
            }}
          >
            ⏰ {profile.parameters.rhythm}
          </Badge>
          <Badge
            variant="outline"
            className="text-[11px] font-medium"
            style={{
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '9999px',
            }}
          >
            🕒 {profile.parameters.time}
          </Badge>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-[13px]" style={{ color: '#1a1c1c' }}>
            📋 Personalized Recommendations:
          </h4>
          <div className="space-y-1.5">
            {profile.recommendations.slice(0, 4).map((rec, index) => (
              <div
                key={index}
                className="text-[12px] leading-relaxed rounded-lg"
                style={{
                  background: 'rgba(255,255,255,0.7)',
                  padding: '8px 12px',
                  border: '1px solid rgba(0,0,0,0.05)',
                  color: '#4d4632',
                }}
              >
                {rec}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const addMessage = (
    content: string,
    type: "bot" | "user",
    options?: string[],
    component?: React.ReactNode
  ) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      options,
      component,
    };

    if (type === "user") {
      setMessages((prev) => [...prev, newMessage]);
      handleUserResponse(content);
    } else {
      setIsTyping(true);
      setTimeout(() => {
        setMessages((prev) => [...prev, newMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000);
    }
  };

  const handleUserResponse = async (response: string) => {
    const stepKey = chatSteps[currentStep]?.id;
    if (stepKey) {
      setUserResponses((prev) => ({ ...prev, [stepKey]: response }));
    }

    // Special handling for study vibe step
    if (currentStep === 3) {
      // study_vibe_intro step
      let studyDescription = response;

      if (response === "Let me type my own description") {
        // Wait for user to type their own description
        return;
      }

      // Move to processing step
      setCurrentStep(4);
      setTimeout(() => {
        addMessage(chatSteps[4].message, "bot");

        // Process the study vibe
        setTimeout(async () => {
          const vibeProfile = await getStudyVibeProfile(studyDescription);

          if (vibeProfile) {
            addMessage(
              "🎉 Your personalized study profile is ready! Here's what I've learned about your learning style:",
              "bot",
              [
                "This looks perfect!",
                "Tell me more about these recommendations",
              ],
              <StudyVibeDisplay profile={vibeProfile} />
            );
          } else {
            addMessage(
              "I've created a basic study profile for you. Don't worry - you can always adjust your preferences later in the course!",
              "bot",
              ["That's fine!", "Let's continue"]
            );
          }
        }, 2000);
      }, 1500);
      return;
    }

    // Handle study vibe processing responses
    if (currentStep === 4) {
      setCurrentStep(5);
      setTimeout(() => {
        addMessage(chatSteps[5].message, "bot", chatSteps[5].options);
      }, 1500);
      return;
    }

    // Move to next step for other cases
    const nextStep = currentStep + 1;

    if (nextStep < chatSteps.length) {
      setCurrentStep(nextStep);

      // Special handling for specific responses
      if (currentStep === 5 && response === "Tell me about study groups") {
        setTimeout(() => {
          addMessage(chatSteps[6].message, "bot", chatSteps[6].options);
        }, 1500);
        return;
      } else if (currentStep === 6) {
        setTimeout(() => {
          addMessage(chatSteps[7].message, "bot", chatSteps[7].options);
        }, 1500);
        return;
      }

      // Normal flow
      if (nextStep < chatSteps.length) {
        setTimeout(() => {
          addMessage(
            chatSteps[nextStep].message,
            "bot",
            chatSteps[nextStep].options
          );
        }, 1500);
      }
    } else {
      // Chat completed
      if (
        response === "Yes, take me to my course!" ||
        response === "Sounds great!" ||
        response === "Yes, let's go!" ||
        response === "This looks perfect!" ||
        response === "That's fine!" ||
        response === "Let's continue"
      ) {
        setTimeout(() => {
          const finalMessage = studyVibeProfile
            ? `🚀 Perfect! You're all set up for success with your personalized ${studyVibeProfile.vibe_tag.replace(
              /_/g,
              " "
            )} study profile. Taking you to your course now...\n\nRemember, learning is a journey - enjoy every step! 💫`
            : "🚀 Perfect! You're all set up for success. Taking you to your course now...\n\nRemember, learning is a journey - enjoy every step! 💫";

          addMessage(finalMessage, "bot");

          setTimeout(() => {
            onComplete();
          }, 2000);
        }, 1000);
      } else {
        setTimeout(() => {
          addMessage(
            "No problem! You can always reach out to our support team or use the help features within the course. For now, let's get you started!\n\nTaking you to your course... 🎓",
            "bot"
          );

          setTimeout(() => {
            onComplete();
          }, 2000);
        }, 1000);
      }
    }
  };

  const handleOptionClick = (option: string) => {
    addMessage(option, "user");
  };

  const handleInputSubmit = () => {
    if (currentInput.trim()) {
      addMessage(currentInput, "user");
      setCurrentInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleInputSubmit();
    }
  };

  const getProgressPercentage = () => {
    return Math.min(((currentStep + 1) / chatSteps.length) * 100, 100);
  };

  if (isActivating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8] font-hanken">
        <div
          className="text-center"
          style={{ animation: 'ppChatFadeOut 1.2s ease-in-out both' }}
        >
          <h1 className="font-extrabold text-[28px] text-[#1a1c1c] mb-3 tracking-[-0.04em]">
            EdVerse Intelligence Activated
          </h1>
          <p className="text-[15px] font-medium text-[#666] flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFD60A] animate-pulse" />
            Initializing adaptive learning environment...
          </p>
        </div>
        <style>{`
          @keyframes ppChatFadeOut {
            0% { opacity: 0; transform: scale(0.98); }
            20% { opacity: 1; transform: scale(1); }
            80% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(1.02); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col font-hanken"
      style={{
        backgroundColor: "#FAFAF8",
        backgroundImage: `
radial-gradient(circle at 20% 30%, rgba(255,210,0,0.04), transparent 25%),
linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px),
linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)
`,
        backgroundSize: "40px 40px",
        animation: 'ppChatFadeIn 0.8s ease-out'
      }}
    >
      {/* Header */}
      <header
        className="w-full pt-6 pb-4 px-6 md:px-12 flex items-center justify-between"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "rgba(250,250,248,0.85)",
          backdropFilter: "blur(28px)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.02)",
          borderBottom: "1px solid rgba(0,0,0,0.06)"
        }}
      >
        <div className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-[12px] bg-white border border-[rgba(0,0,0,0.08)] shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-250 ease-out">
            <span className="text-[#1a1c1c] text-[14px] font-extrabold tracking-tight">EV</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#1a1c1c] font-extrabold tracking-[-0.04em] text-[18px] leading-[1.1]">Course Activation</span>
            <span className="text-[#1a1c1c] opacity-50 text-[13px] font-medium mt-0.5">Preparing your private learning environment</span>
          </div>
        </div>

        {/* Premium Status Chip */}
        <div className="flex items-center gap-2.5 px-4 py-2 bg-white rounded-full border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#b8960a] animate-pulse" />
          <span className="text-[12px] font-semibold text-[#b8960a] uppercase tracking-wider opacity-80">
            Course Activated
          </span>
        </div>

        {/* Animated Intelligence Sync Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[rgba(0,0,0,0.04)] overflow-hidden">
          <div
            className="h-full bg-[#FFD60A]"
            style={{
              width: '40%',
              animation: 'syncLine 2s ease-in-out infinite alternate',
              boxShadow: '0 0 10px rgba(255,214,10,0.5)'
            }}
          />
        </div>
      </header>

      {/* Chat Container */}
      <div
        className="flex-1 w-full max-w-[800px] mx-auto relative z-10 flex flex-col pb-44 px-4 md:px-8"
        style={{ paddingTop: "40px" }}
      >
        {/* Scrollable Messages Area */}
        <div className="flex flex-col space-y-8 w-full">
          {messages.map((message) => {
            const isUser = message.type === "user";

            if (isUser) {
              return (
                <div
                  key={message.id}
                  className="flex flex-col items-end animate-[ppChatFadeIn_0.35s_ease-out_both] mb-2"
                >
                  <div
                    className="px-6 py-4"
                    style={{
                      backgroundColor: "#FFD60A",
                      color: "#1a1c1c",
                      borderRadius: "20px",
                      borderBottomRightRadius: "4px",
                      boxShadow: "0 4px 16px rgba(255,214,10,0.15)",
                      maxWidth: "75%"
                    }}
                  >
                    <p className="text-[15px] font-semibold leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                  <span className="text-[11px] text-[#1a1c1c] opacity-40 mt-1.5 font-medium pr-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              );
            }

            // Bot Message (Light Theme, EV logo outside)
            return (
              <div
                key={message.id}
                className="flex items-start gap-3 animate-[ppChatFadeIn_0.35s_ease-out_both] w-full max-w-[90%] mb-2"
              >
                {/* Bot Avatar */}
                <div className="w-10 h-10 rounded-[12px] bg-white border border-[rgba(0,0,0,0.04)] shadow-[0_0_15px_rgba(255,214,10,0.3)] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#1a1c1c] text-[14px] font-extrabold tracking-tight">EV</span>
                </div>

                <div className="flex flex-col">
                  {/* Bot Bubble */}
                  <div
                    className="px-6 py-5 flex flex-col gap-3"
                    style={{
                      backgroundColor: "white",
                      border: "1px solid rgba(0,0,0,0.04)",
                      borderRadius: "24px",
                      borderTopLeftRadius: "4px",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.018)",
                    }}
                  >
                    <p
                      className="whitespace-pre-line leading-relaxed"
                      style={{
                        color: '#1a1c1c',
                        fontSize: '15px',
                        letterSpacing: '-0.01em',
                        fontWeight: 500
                      }}
                    >
                      {message.content}
                    </p>

                    {/* Custom Component Display */}
                    {message.component && (
                      <div className="mt-4">{message.component}</div>
                    )}

                    {/* Quick Reply Options */}
                    {message.options && message.options.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-2.5">
                        {message.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className="font-medium flex items-center justify-center"
                            style={{
                              height: '42px',
                              padding: '0 18px',
                              borderRadius: '14px',
                              border: '1px solid rgba(0,0,0,0.08)',
                              background: '#ffffff',
                              fontSize: '13px',
                              color: '#1a1c1c',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#1a1c1c';
                              e.currentTarget.style.color = '#f6f6f5ff';
                              e.currentTarget.style.borderColor = '#1a1c1c';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#ffffff';
                              e.currentTarget.style.color = '#1a1c1c';
                              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)';
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[11px] text-[#1a1c1c] opacity-40 mt-1.5 font-medium pl-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {(isTyping || isLoadingVibe) && (
            <div className="flex items-start gap-3 animate-[ppChatFadeIn_0.3s_ease-out_both] w-full max-w-[90%] mb-2">
              <div className="w-10 h-10 rounded-[12px] bg-white border border-[rgba(0,0,0,0.04)] shadow-[0_0_15px_rgba(255,214,10,0.3)] flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-[#1a1c1c] text-[14px] font-extrabold tracking-tight">EV</span>
              </div>
              <div
                className="px-6 py-5 flex items-center gap-2"
                style={{
                  backgroundColor: "white",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: "24px",
                  borderTopLeftRadius: "4px",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.03)",
                }}
              >
                <span className="text-[13px] font-bold text-[#FFD60A] mr-2 uppercase tracking-wide">
                  {isLoadingVibe ? "Analyzing" : "Processing"}
                </span>
                <div className="flex items-center gap-1.5 h-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFD60A] animate-[typingDot_1.4s_infinite_ease-in-out_both]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFD60A] animate-[typingDot_1.4s_infinite_ease-in-out_both]" style={{ animationDelay: "0.2s" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFD60A] animate-[typingDot_1.4s_infinite_ease-in-out_both]" style={{ animationDelay: "0.4s" }} />
                </div>
                {isLoadingVibe && (
                  <span className="ml-2" style={{ fontSize: '12px', color: '#666', fontWeight: 500 }}>
                    Analyzing your study preferences...
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Study Vibe Summary (if available) */}
          {studyVibeProfile && (
            <div
              className="w-full mt-4 animate-[ppChatFadeIn_0.4s_ease-out_both]"
            >
              <div
                className="rounded-xl p-4 flex items-center gap-3"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.08)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                }}
              >
                <Brain className="h-5 w-5 flex-shrink-0" style={{ color: '#8b5cf6' }} />
                <div>
                  <p className="text-[13px] font-semibold" style={{ color: '#1a1c1c' }}>
                    Your Study Profile Summary
                  </p>
                  <p className="text-[12px]" style={{ color: '#999' }}>
                    Profile saved and will be applied to your course experience! You
                    can always adjust these preferences later.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Floating Input Field */}
      <div
        className="fixed bottom-0 left-0 right-0 pt-20 pb-8 px-4 md:px-8 z-20 pointer-events-none"
        style={{ background: "linear-gradient(to top, #FAFAF8 80%, transparent)" }}
      >
        <div className="w-full max-w-[750px] mx-auto relative pointer-events-auto animate-[ppChatFadeIn_0.5s_ease-out_0.3s_both]">
          {/* Outer Premium White Bar Wrapper */}
          <div
            className="w-full bg-white rounded-[28px] p-2 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.03)]"
            style={{ opacity: currentStep === 0 ? 0.4 : 1, transition: 'opacity 0.5s ease' }}
          >
            <div className="relative w-full h-[56px] flex items-center">
              <input
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={
                  currentStep === 0
                    ? "AI is preparing your learning environment..."
                    : currentStep === 3 && userResponses["study_vibe_intro"] === "Let me type my own description"
                      ? "Describe your ideal study environment, time preferences, and habits..."
                      : "Type your message or use the quick replies above..."
                }
                disabled={isLoadingVibe || currentStep === 0}
                className="w-full h-full pl-5 pr-16 text-[15px] font-medium text-[#1a1c1c] outline-none placeholder:text-[#1a1c1c] placeholder:opacity-40 bg-transparent"
              />
              <button
                onClick={handleInputSubmit}
                disabled={!currentInput.trim() || isLoadingVibe || currentStep === 0}
                className={
                  "absolute right-1 top-1 bottom-1 flex items-center justify-center rounded-[18px] transition-all duration-200 " +
                  (!currentInput.trim() || isLoadingVibe || currentStep === 0
                    ? "bg-[#f5f5f5] text-[#a0a0a0] cursor-not-allowed"
                    : "bg-[#FFD60A] text-[#1a1c1c] cursor-pointer hover:scale-105 active:scale-95 shadow-[0_4px_12px_rgba(255,214,10,0.25)]")
                }
                style={{ width: "48px" }}
              >
                <ArrowRight className="h-[20px] w-[20px]" style={{ strokeWidth: "2.5px" }} />
              </button>
            </div>
          </div>

          {/* Skip button */}
          <div className="flex flex-col items-center gap-3 mt-4">
            <button
              onClick={onComplete}
              disabled={isLoadingVibe}
              style={{
                fontSize: '13px',
                color: '#1a1c1c',
                opacity: 0.55,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
                fontWeight: 500,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.55'; }}
            >
              Enter course directly →
            </button>
          </div>
        </div>
      </div>

      {/* Keyframe animation */}
      <style>{`
        @keyframes ppChatFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes syncLine {
          from { transform: translateX(-100%); }
          to { transform: translateX(250%); }
        }
        @keyframes typingDot {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};
