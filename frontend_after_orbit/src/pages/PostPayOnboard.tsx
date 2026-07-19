import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PostPaymentChat } from "@/components/postPaymentChat";
import { motion } from "framer-motion";

const PostPaymentOnboarding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showChat, setShowChat] = useState(false);

  const courseName =
    location.state?.courseName ||
    localStorage.getItem("purchased_course_name") ||
    "Full-Stack Web Development Mastery";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChat(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleChatComplete = () => {
    localStorage.setItem("onboarding_completed", "true");
    localStorage.setItem("course_enrolled", "true");
    navigate("/course-module");
  };
  
  const handleSkipToCourse = () => {
    localStorage.setItem("course_enrolled", "true");
    navigate("/course-module");
  };

  if (!showChat) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6 font-hanken relative"
        style={{
          backgroundColor: "#FAFAF8",
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255,210,0,0.04), transparent 25%),
            linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      >
        <motion.div
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative z-10 w-full max-w-2xl"
        >
          <div
            className="rounded-[28px] bg-white p-10 md:p-12"
            style={{
              boxShadow: "0 12px 40px rgba(0,0,0,0.04)",
              border: "1px solid rgba(0,0,0,0.04)",
            }}
          >
            {/* Top Branding */}

            <div className="flex items-center gap-4 mb-10">
              <div
                className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center"
                style={{
                  boxShadow: "0 4px 18px rgba(0,0,0,0.04)",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                <span className="font-bold text-[18px] text-[#1a1c1c]">
                  EV
                </span>
              </div>

              <div>
                <p className="text-[20px] font-bold text-[#1a1c1c]">
                  EdVerse Intelligence
                </p>

                <p className="text-[14px] text-[#999] font-medium">
                  Activating your personalized learning environment
                </p>
              </div>
            </div>

            {/* Main Heading */}

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h1
                className="font-extrabold tracking-[-0.03em] leading-tight"
                style={{
                  fontSize: "34px",
                  color: "#1a1c1c",
                }}
              >
                Journey activated.
              </h1>

              <p
                className="mt-3 leading-relaxed"
                style={{
                  fontSize: "15px",
                  color: "#777",
                  maxWidth: "650px",
                  fontWeight: 500,
                }}
              >
                We are now configuring your personalized learning path for{" "}
                <span className="text-[#1a1c1c] font-semibold">
                  {courseName}
                </span>
              </p>
            </motion.div>

            {/* Status Steps */}

            <motion.div
              className="mt-10 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {[
                "Generating AI roadmap",
                "Sequencing curriculum structure",
                "Calibrating skill progression",
                "Initializing adaptive learning engine",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div
                    className="w-2.5 h-2.5 rounded-full bg-[#FFD60A]"
                    style={{
                      animation: "pulse 1.5s infinite",
                    }}
                  />

                  <p
                    style={{
                      fontSize: "14px",
                      color: "#666",
                      fontWeight: 500,
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Progress */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12"
            >
              <p
                className="mb-3"
                style={{
                  fontSize: "13px",
                  color: "#999",
                  fontWeight: 600,
                }}
              >
                Preparing your first learning session
              </p>

              <div
                className="w-full h-2 rounded-full overflow-hidden"
                style={{
                  background: "rgba(0,0,0,0.05)",
                }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "#FFD60A",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5 }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <PostPaymentChat
      courseName={courseName}
      onComplete={handleChatComplete}
    />
  );
};

export default PostPaymentOnboarding;