import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Send, Sparkles } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
}

const CONVERSATION_FLOW = [
  {
    key: "topic",
    botPrompt: "Welcome to EdVerse Intelligence. I'm here to build your personalized learning graph. To start, what specific skills or subjects are you looking to master right now?",
  },
  {
    key: "level",
    botPrompt: (prevAnswer: string) => `${prevAnswer} is a fantastic area to focus on. How familiar are you with this subject currently? Are you starting fresh, or do you already have some basics down?`,
  },
  {
    key: "hours",
    botPrompt: (prevAnswer: string) => `Got it. Having that context helps a lot. How much time can you realistically invest each week to level up?`,
  },
  {
    key: "goal",
    botPrompt: (prevAnswer: string) => `That pace works perfectly. Finally, what's your ultimate goal? Are you looking for a career switch, an internship, freelancing, or just personal growth?`,
  },
  {
    key: "final",
    botPrompt: (prevAnswer: string) => `That's a great goal, and I'm excited to help you get there. I'm synthesizing your profile and generating your personalized roadmap right now...`,
  }
];

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

const OnboardingChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [userResponses, setUserResponses] = useState<string[]>([]);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Page entrance animation
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Initial greeting
  useEffect(() => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages([
        {
          id: "welcome",
          text: CONVERSATION_FLOW[0].botPrompt as string,
          sender: "bot",
          timestamp: new Date(),
        }
      ]);
    }, 1200);
  }, []);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const updatedResponses = [...userResponses, text];
    setUserResponses(updatedResponses);
    setCurrentInput("");
    setIsTyping(true);

    const nextStepIndex = currentStepIndex + 1;

    // AI typing delay based on text length to simulate real thinking
    const typingDelay = 1200 + Math.random() * 800;

    setTimeout(() => {
      setIsTyping(false);

      if (nextStepIndex < CONVERSATION_FLOW.length - 1) {
        const nextStep = CONVERSATION_FLOW[nextStepIndex];
        const nextQuestion = typeof nextStep.botPrompt === 'function' ? nextStep.botPrompt(text) : nextStep.botPrompt;

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: nextQuestion as string,
          sender: "bot",
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, botMessage]);
        setCurrentStepIndex(nextStepIndex);
      } else {
        setCurrentStepIndex(nextStepIndex); // Final step
        const finalStep = CONVERSATION_FLOW[nextStepIndex];
        const finalMessageStr = typeof finalStep.botPrompt === 'function' ? finalStep.botPrompt(text) : finalStep.botPrompt;

        const finalMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: finalMessageStr as string,
          sender: "bot",
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, finalMessage]);

        localStorage.setItem("ugram_preferences", JSON.stringify(updatedResponses));

        // Wait briefly for the user to read the final message, then navigate
        setTimeout(() => {
          navigate("/recommendations");
        }, 3000);
      }
    }, typingDelay);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(currentInput);
    }
  };

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
        opacity: isPageLoaded ? 1 : 0,
        transition: "opacity 800ms ease-out"
      }}
    >

      {/* Premium Header */}
      <header
        className="w-full pt-6 pb-4 px-6 md:px-12 flex items-center justify-between"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(28px)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.02)",
          borderBottom: "1px solid rgba(0,0,0,0.06)"
        }}
      >
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-[12px] bg-white border border-[rgba(0,0,0,0.08)] shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-250 ease-out">
            <span className="text-[#1a1c1c] text-[14px] font-extrabold tracking-tight">EV</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#1a1c1c] font-extrabold tracking-[-0.04em] text-[18px] leading-[1.1]">EdVerse Intelligence</span>
            <span className="text-[#1a1c1c] opacity-50 text-[13px] font-medium mt-0.5">Personalizing your learning journey</span>
          </div>
        </Link>
        <div className="flex items-center gap-2.5 px-4 py-2 bg-white rounded-full border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hidden md:flex">
          <div className="w-2.5 h-2.5 rounded-full bg-[#facc15] animate-pulse" />
          <span className="text-[12px] font-semibold text-[#1a1c1c] uppercase tracking-wider opacity-80">
            AI Learning Session
          </span>
        </div>
      </header>

      {/* Main Conversation Area */}
      <div
        className="flex-1 w-full max-w-[800px] mx-auto relative z-10 flex flex-col pb-32 px-4 md:px-8"
        style={{ paddingTop: "110px" }}
      >

        <div className="flex flex-col space-y-6 w-full">
          {messages.map((message) => {
            const isUser = message.sender === "user";

            if (isUser) {
              return (
                <div key={message.id} className="flex flex-col items-end animate-[userMessagePop_0.3s_ease-out_both] mb-2">
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
                    <p className="text-[15px] font-semibold  leading-relaxed">
                      {message.text}
                    </p>
                  </div>
                  <span className="text-[11px] text-[#1a1c1c] opacity-40 mt-1.5 font-medium pr-1">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              );
            }

            // Bot Message (Premium ChatGPT style)
            return (
              <div key={message.id} className="flex items-start gap-3 animate-[botMessageFade_0.5s_ease-out_both] w-full max-w-[90%] mb-2">
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
                    <p className="text-[15px] font-medium text-[#1a1c1c] leading-[1.6]">
                      {message.text}
                    </p>
                  </div>
                  <span className="text-[11px] text-[#1a1c1c] opacity-40 mt-1.5 font-medium pl-2">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-3 animate-[botMessageFade_0.4s_ease-out_both] w-full max-w-[90%] mb-2">
              <div className="w-10 h-10 rounded-[12px] bg-white border border-[rgba(0, 0, 0, 0.04)] shadow-[0_0_15px_rgba(255,214,10,0.3)] flex items-center justify-center flex-shrink-0 mt-1">
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
                <span className="text-[13px] font-bold text-[#EAB308] mr-2 uppercase tracking-wide">Processing</span>
                <div className="flex items-center gap-1.5 h-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#EAB308] animate-[typingDot_1.4s_infinite_ease-in-out_both]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#EAB308] animate-[typingDot_1.4s_infinite_ease-in-out_both]" style={{ animationDelay: "0.2s" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#EAB308] animate-[typingDot_1.4s_infinite_ease-in-out_both]" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} className="h-10" />
        </div>
      </div>

      {/* Floating Input Field */}
      {currentStepIndex < CONVERSATION_FLOW.length - 1 && (
        <div
          className="fixed bottom-0 left-0 right-0 pt-20 pb-8 px-4 md:px-8 z-20 pointer-events-none"
          style={{ background: "linear-gradient(to top, #FAFAFA 80%, transparent)" }}
        >
          <div className="w-full max-w-[750px] mx-auto relative pointer-events-auto animate-[botMessageFade_0.5s_ease-out_0.3s_both]">
            {/* Outer Premium White Bar Wrapper */}
            <div className="w-full bg-white rounded-[28px] p-2 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.03)]">
              <div className="relative w-full h-[56px] flex items-center">
                <input
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Message EdVerse Intelligence..."
                  disabled={isTyping}
                  autoFocus
                  className="w-full h-full pl-5 pr-16 text-[15px] font-medium text-[#1a1c1c] outline-none placeholder:text-[#1a1c1c] placeholder:opacity-40 bg-transparent"
                />
                <button
                  onClick={() => handleSendMessage(currentInput)}
                  disabled={!currentInput.trim() || isTyping}
                  className={
                    "absolute right-1 top-1 bottom-1 flex items-center justify-center rounded-[18px] transition-all duration-200 " +
                    (!currentInput.trim() || isTyping
                      ? "bg-[#f5f5f5] text-[#a0a0a0] cursor-not-allowed"
                      : "bg-[#FFD60A] text-[#1a1c1c] cursor-pointer hover:scale-105 active:scale-95 shadow-[0_4px_12px_rgba(255,214,10,0.25)]")
                  }
                  style={{ width: "48px" }}
                >
                  <Send className="h-[20px] w-[20px]" style={{ marginLeft: "2px", strokeWidth: "2.5px" }} />
                </button>
              </div>
            </div>
            <div className="text-center mt-4">
              <span className="text-[12px] text-[#1a1c1c] opacity-40 font-medium">
                EdVerse Intelligence can make mistakes. Consider verifying important information.
              </span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes botMessageFade {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes userMessagePop {
          0% { opacity: 0; transform: scale(0.96) translateY(8px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes typingDot {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div >
  );
};

export default OnboardingChat;