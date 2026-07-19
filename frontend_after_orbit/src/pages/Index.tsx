import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Figma Image & SVG Assets
const imgLogoIcon = "http://localhost:3845/assets/81a085881bd1c865f3668f5a37acd955283dcc1a.svg";
const imgHeroPlay = "http://localhost:3845/assets/69c45fa3bb2719ccad1341da04cae94691f822e6.svg";
const imgHeroChevron = "http://localhost:3845/assets/87e285665179c37c567d62a68e54578ac7083329.svg";
const imgStudentWithLaptop = "http://localhost:3845/assets/1caed7cef1dc85306c1a3c407785edf20a7b31ce.png";
const imgPredictiveRankIcon = "http://localhost:3845/assets/1fc2ac987466372d6bad9cfb74ceff63bfb4a944.svg";
const imgPathwaysIcon = "http://localhost:3845/assets/d27a50d2e750a5351f94cec6e7832f2864c1ace6.svg";
const imgMicroTopicIcon = "http://localhost:3845/assets/1c6dec7821d582fc80666774fd0950ad1be59b45.svg";
const imgVelocityIcon = "http://localhost:3845/assets/aaf3e50bdf163a36566328994db3a3e06176dbcf.svg";
const imgMentorGuiding = "http://localhost:3845/assets/f3473df0e6783bdecc589b110106f725b8632b38.png";
const imgJoyfulFamily = "http://localhost:3845/assets/9f0bdb9a06614679faed2f8d0deb8863bef04f05.png";
const imgLearnPillarIcon = "http://localhost:3845/assets/6334435404dac9f65bdf06b7b692665b0e33546f.svg";
const imgReadPillarIcon = "http://localhost:3845/assets/690d2bb4a707eb990262dec6cac1b63bb4c19e89.svg";
const imgAiPillarIcon = "http://localhost:3845/assets/245d6320c16ee8f45c8340553383e94217b0bd31.svg";

export default function Index() {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(1);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleOrbitalMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 8, y: x * 8 });
  }, []);

  const handleOrbitalMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.02,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 250, damping: 20 },
    },
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-hanken overflow-x-hidden selection:bg-[#ffd600]/30 selection:text-[#1a1c1c]">

      {/* 1. Top Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-[12px] bg-[rgba(249,249,249,0.9)] border-b border-[rgba(0,0,0,0.06)] shadow-sm">
        <div className="max-w-[1280px] mx-auto h-[80px] px-6 sm:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src={imgLogoIcon} alt="Logo" className="w-[11px] h-[18px]" onError={(e) => {
              // Fallback if local asset server is not running
              e.currentTarget.style.display = 'none';
            }} />
            <span className="text-[24px] font-bold tracking-[-0.6px] text-[#1a1c1c]">EdVerse</span>
          </div>



          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="text-[14px] font-bold tracking-[0.28px] text-[#705d00] transition-opacity duration-[250ms] ease-out hover:opacity-70 px-3 py-2"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-[#ffd600] text-[#1e1e22] text-[14px] font-bold tracking-[0.28px] px-6 py-3 rounded-full hover:bg-[#ffe033] hover:scale-[1.03] active:scale-95 transition-all duration-[250ms] ease-out shadow-[0px_4px_10px_rgba(255,214,0,0.2)]"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center bg-grid-paper py-20 px-6 sm:px-12 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-[15%] left-[5%] lg:left-[8%] w-[550px] h-[550px] bg-gradient-to-tr from-[#8b5cf6]/[0.12] to-[#06b6d4]/[0.08] blur-[160px] rounded-full pointer-events-none z-0" />
        <div className="absolute top-[10%] right-[5%] lg:right-[8%] w-[600px] h-[600px] bg-[#ffd600]/[0.06] blur-[180px] rounded-full pointer-events-none z-0" />

        {/* Subtle floating background particles */}
        <div className="absolute w-[4px] h-[4px] rounded-full bg-[#8b5cf6]/20 pointer-events-none" style={{ top: '15%', left: '10%', animation: 'particle-drift 22s ease-in-out infinite alternate' }} />
        <div className="absolute w-[3px] h-[3px] rounded-full bg-[#ffd600]/25 pointer-events-none" style={{ top: '70%', left: '85%', animation: 'particle-drift 28s ease-in-out infinite alternate 2s' }} />
        <div className="absolute w-[3px] h-[3px] rounded-full bg-[#06b6d4]/20 pointer-events-none" style={{ top: '45%', left: '5%', animation: 'particle-drift 25s ease-in-out infinite alternate 4s' }} />
        <div className="absolute w-[4px] h-[4px] rounded-full bg-white/25 pointer-events-none" style={{ top: '30%', left: '92%', animation: 'particle-drift 30s ease-in-out infinite alternate 1s' }} />
        <div className="absolute w-[3px] h-[3px] rounded-full bg-[#10b981]/20 pointer-events-none" style={{ top: '85%', left: '40%', animation: 'particle-drift 20s ease-in-out infinite alternate 3s' }} />
        <div className="absolute w-[3px] h-[3px] rounded-full bg-[#8b5cf6]/15 pointer-events-none" style={{ top: '55%', left: '65%', animation: 'particle-drift 26s ease-in-out infinite alternate 5s' }} />

        <div className="max-w-[1280px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">

          {/* LEFT SIDE — Content */}
          <motion.div
            className="flex flex-col gap-6 items-start text-left order-2 lg:order-1 lg:translate-y-[45px]"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Header Badge */}
            <motion.div
              variants={itemVariants}
              className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.75)] border border-[rgba(255,255,255,0.5)] shadow-[0px_4px_20px_rgba(0,0,0,0.03)] flex gap-2 items-center px-4 py-2 rounded-full"
            >
              <span className="bg-[#06b6d4] rounded-full w-2 h-2 animate-pulse" />
              <span className="font-bold text-[11px] text-[#4d4632] tracking-[0.6px] uppercase">
                THE FUTURE OF LEARNING STARTS HERE
              </span>
            </motion.div>

            {/* Heading (H1) */}
            <motion.h1
              variants={itemVariants}
              className="text-[40px] sm:text-[56px] lg:text-[64px] font-extrabold tracking-[-1.28px] text-[#1a1c1c] leading-[1.1]"
            >
              Learning built around <span className="text-[#8b5cf6] relative text-[0.8em] tracking-[0.5px]">YOU.<span className="absolute left-0 right-0 bottom-1 h-[2px] bg-[#8b5cf6]/15 -skew-x-12" /></span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-[16px] sm:text-[18px] text-[#4d4632] leading-[1.6] max-w-[540px]"
            >
              Tell us how you learn. Our AI maps your goals, adapts to your pace, and builds a learning journey designed uniquely for you.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 items-start -mt-1"
            >
              <button
                onClick={() => navigate("/signup")}
                className="w-full sm:w-auto bg-[#ffd600] text-[#1e1e22] text-[14px] font-bold tracking-[0.28px] px-8 py-4 rounded-full hover:bg-[#ffe033] hover:scale-[1.03] hover:shadow-[0_12px_30px_rgba(255,214,0,0.45)] active:scale-98 transition-all duration-[250ms] ease-out shadow-[0_8px_24px_rgba(255,214,0,0.18)]"
              >
                Start Your Journey
              </button>
              <button
                onClick={() => navigate("/login")}
                className="w-full sm:w-auto backdrop-blur-[12px] bg-[rgba(255,255,255,0.5)] border border-[rgba(255,255,255,0.6)] flex gap-2 items-center justify-center px-8 py-4 rounded-full text-[14px] font-bold text-[#1a1c1c] hover:bg-[rgba(255,255,255,0.9)] hover:-translate-y-[2px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.05)] active:translate-y-0 active:scale-98 transition-all duration-[250ms] ease-out shadow-[0_4px_16px_rgba(0,0,0,0.03)]"
              >
                <img src={imgHeroPlay} alt="Play" className="w-[20px] h-[20px]" onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }} />
                <span>See How It Works</span>
              </button>
            </motion.div>

            {/* Value Indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 pt-6"
            >
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-[6px] bg-[rgba(255,255,255,0.45)] border border-[rgba(0,0,0,0.06)] shadow-[0_2px_8px_rgba(0,0,0,0.02)] text-[12px] font-semibold text-[#4d4632] tracking-[0.2px] hover:bg-white/80 hover:border-black/10 transition-all duration-[200ms]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-pulse" />
                <span>AI Adaptive Learning</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-[6px] bg-[rgba(255,255,255,0.45)] border border-[rgba(0,0,0,0.06)] shadow-[0_2px_8px_rgba(0,0,0,0.02)] text-[12px] font-semibold text-[#4d4632] tracking-[0.2px] hover:bg-white/80 hover:border-black/10 transition-all duration-[200ms]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
                <span>Personalized Roadmaps</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-[6px] bg-[rgba(255,255,255,0.45)] border border-[rgba(0,0,0,0.06)] shadow-[0_2px_8px_rgba(0,0,0,0.02)] text-[12px] font-semibold text-[#4d4632] tracking-[0.2px] hover:bg-white/80 hover:border-black/10 transition-all duration-[200ms]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffd600]" />
                <span>Live Collaborative Study</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE — Futuristic Orbital Animation */}
          <motion.div
            className="relative flex items-center justify-center lg:justify-end order-1 lg:order-2 lg:-translate-x-[50px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          >
            <div
              className="orbital-system relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] lg:w-[500px] lg:h-[500px]"
              onMouseMove={handleOrbitalMouseMove}
              onMouseLeave={handleOrbitalMouseLeave}
              style={{
                transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
            >

              {/* Floating micro-particles within orbital area */}
              <div className="absolute w-[3px] h-[3px] rounded-full bg-[#8b5cf6]/25 pointer-events-none" style={{ top: '12%', left: '18%', animation: 'particle-float 7s ease-in-out infinite' }} />
              <div className="absolute w-[2px] h-[2px] rounded-full bg-[#ffd600]/30 pointer-events-none" style={{ top: '70%', left: '82%', animation: 'particle-float 9s ease-in-out infinite 1.2s' }} />
              <div className="absolute w-[3px] h-[3px] rounded-full bg-[#06b6d4]/25 pointer-events-none" style={{ top: '38%', left: '88%', animation: 'particle-float 6.5s ease-in-out infinite 2.8s' }} />
              <div className="absolute w-[2px] h-[2px] rounded-full bg-[#10b981]/30 pointer-events-none" style={{ top: '85%', left: '25%', animation: 'particle-float 8s ease-in-out infinite 0.5s' }} />
              <div className="absolute w-[2px] h-[2px] rounded-full bg-white/25 pointer-events-none" style={{ top: '22%', left: '75%', animation: 'particle-float 10s ease-in-out infinite 3.5s' }} />
              <div className="absolute w-[3px] h-[3px] rounded-full bg-[#8b5cf6]/15 pointer-events-none" style={{ top: '58%', left: '8%', animation: 'particle-float 7.5s ease-in-out infinite 1.8s' }} />

              {/* Outer Orbital Ring — Clockwise, 36s */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '1px solid rgba(245, 158, 11, 0.18)',
                  animation: 'orbit-cw 36s linear infinite',
                }}
              >
                {/* Traveling light bead on outer ring */}
                <div className="absolute inset-0 rounded-full pointer-events-none" style={{ animation: 'orbit-cw 14s linear infinite' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#f59e0b]/80" style={{ boxShadow: '0 0 6px rgba(245,158,11,0.6), 0 0 12px rgba(245,158,11,0.3)' }} />
                </div>

                {/* READ node — 0° (top) */}
                <div className="absolute top-0 left-1/2" style={{ transform: 'translate(-50%, -50%)' }}>
                  <div style={{ animation: 'orbit-ccw 36s linear infinite' }}>
                    <div className="energy-node">
                      <div className="energy-node-glow" style={{ background: 'rgba(245, 158, 11, 0.35)', animationDelay: '1.5s' }} />
                      <div className="energy-node-shell" style={{ borderColor: 'rgba(245, 158, 11, 0.45)' }}>
                        <span className="energy-node-text">READ</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* LEARN node — 180° (bottom) */}
                <div className="absolute bottom-0 left-1/2" style={{ transform: 'translate(-50%, 50%)' }}>
                  <div style={{ animation: 'orbit-ccw 36s linear infinite' }}>
                    <div className="energy-node">
                      <div className="energy-node-glow" style={{ background: 'rgba(16, 185, 129, 0.35)', animationDelay: '2.25s' }} />
                      <div className="energy-node-shell" style={{ borderColor: 'rgba(16, 185, 129, 0.45)' }}>
                        <span className="energy-node-text">LEARN</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Orbital Ring — Decorative, counter-clockwise, 28s */}
              <div
                className="absolute rounded-full"
                style={{
                  inset: '16%',
                  border: '1px dashed rgba(139, 92, 246, 0.12)',
                  animation: 'orbit-ccw 28s linear infinite',
                }}
              >
                {/* Traveling light bead on middle ring */}
                <div className="absolute inset-0 rounded-full pointer-events-none" style={{ animation: 'orbit-ccw 11s linear infinite' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#8b5cf6]/70" style={{ boxShadow: '0 0 6px rgba(139,92,246,0.5), 0 0 12px rgba(139,92,246,0.25)' }} />
                </div>
              </div>

              {/* Inner Orbital Ring — Counter-clockwise, 20s */}
              <div
                className="absolute rounded-full"
                style={{
                  inset: '25%',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  animation: 'orbit-ccw 20s linear infinite',
                }}
              >
                {/* Traveling light bead on inner ring */}
                <div className="absolute inset-0 rounded-full pointer-events-none" style={{ animation: 'orbit-ccw 9s linear infinite' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#06b6d4]/70" style={{ boxShadow: '0 0 6px rgba(6,182,212,0.5), 0 0 12px rgba(6,182,212,0.25)' }} />
                </div>

                {/* RULE node — 0° (top) */}
                <div className="absolute top-0 left-1/2" style={{ transform: 'translate(-50%, -50%)' }}>
                  <div style={{ animation: 'orbit-cw 20s linear infinite' }}>
                    <div className="energy-node">
                      <div className="energy-node-glow" style={{ background: 'rgba(139, 92, 246, 0.4)' }} />
                      <div className="energy-node-shell" style={{ borderColor: 'rgba(139, 92, 246, 0.5)' }}>
                        <span className="energy-node-text">RULE</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI node — 180° (bottom) */}
                <div className="absolute bottom-0 left-1/2" style={{ transform: 'translate(-50%, 50%)' }}>
                  <div style={{ animation: 'orbit-cw 20s linear infinite' }}>
                    <div className="energy-node">
                      <div className="energy-node-glow" style={{ background: 'rgba(6, 182, 212, 0.4)', animationDelay: '0.75s' }} />
                      <div className="energy-node-shell" style={{ borderColor: 'rgba(6, 182, 212, 0.5)' }}>
                        <span className="energy-node-text">AI</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Central Nucleus: EV Intelligence Core ── */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <motion.div
                  className="relative flex items-center justify-center"
                  animate={{ scale: [0.95, 1.05, 0.95] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Outer atmospheric haze — breathing */}
                  <motion.div
                    className="absolute w-[140px] h-[140px] rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(255,214,0,0.06) 50%, transparent 72%)', filter: 'blur(30px)' }}
                    animate={{ opacity: [0.5, 0.85, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {/* Mid glow ring — breathing */}
                  <motion.div
                    className="absolute w-[100px] h-[100px] rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)', filter: 'blur(15px)' }}
                    animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.95, 1.1, 0.95] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  />
                  {/* Core glass shell */}
                  <div className="relative w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] rounded-full flex items-center justify-center">
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        background: 'rgba(15, 15, 25, 0.75)',
                        border: '1.5px solid rgba(255,255,255,0.12)',
                      }}
                      animate={{
                        boxShadow: [
                          '0 0 25px rgba(139,92,246,0.25), 0 0 50px rgba(139,92,246,0.08), inset 0 1px 1px rgba(255,255,255,0.1)',
                          '0 0 35px rgba(139,92,246,0.4), 0 0 70px rgba(139,92,246,0.15), inset 0 1px 1px rgba(255,255,255,0.1)',
                          '0 0 25px rgba(139,92,246,0.25), 0 0 50px rgba(139,92,246,0.08), inset 0 1px 1px rgba(255,255,255,0.1)',
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {/* EV Monogram */}
                    <span className="relative z-10 text-[22px] sm:text-[24px] font-extrabold tracking-[-0.5px] bg-gradient-to-br from-[#c4b5fd] via-[#ffd600] to-[#8b5cf6] bg-clip-text text-transparent select-none">
                      EV
                    </span>
                  </div>
                </motion.div>
              </div>

            </div>
          </motion.div>

        </div>

      </section>

      {/* 3. Product Journey Section (Adapts to You) */}
      <section id="journey" className="w-full bg-[#f9f9f9] bg-grid-paper py-16 px-6 sm:px-12 relative overflow-hidden">
        {/* Subtle background glow for light section */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-[#8b5cf6]/[0.02] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-[1280px] mx-auto flex flex-col items-center relative z-10">

          {/* Section Header */}
          <div className="text-center max-w-2xl mb-12 relative z-40">
            <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-extrabold text-[#1a1c1c] tracking-[-0.03em] leading-[1.1] mb-4">
              Built around the way you learn.
            </h2>
            <p className="text-[16px] text-[#4d4632]/80 leading-[1.6]">
              Every learner moves differently. EdVerse dynamically shapes the experience around your pace, goals and potential.
            </p>
          </div>

          {/* Cards Row */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative max-w-[1000px]">

            {/* Card 1: Adaptive Intelligence */}
            <motion.div
              className="relative w-full h-[320px] rounded-[24px] bg-[rgba(255,255,255,0.72)] backdrop-blur-[24px] border border-[rgba(255,255,255,0.8)] shadow-[0_12px_32px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)] flex flex-col items-center pt-8 pb-6 px-6 group overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-[#8b5cf6]/[0.05] blur-[50px] rounded-full pointer-events-none" />

              <h3 className="text-[18px] font-bold text-[#1a1c1c] tracking-tight mb-8 relative z-10">
                Adaptive Intelligence
              </h3>

              <div className="relative w-full flex-1 flex flex-col gap-3 items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl border border-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.03)] self-start ml-2 group-hover:-translate-y-1 transition-transform"
                >
                  <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
                  <span className="text-[12px] font-bold text-[#1a1c1c]">Visual Learner</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl border border-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.03)] self-end mr-2 group-hover:-translate-y-1 transition-transform"
                >
                  <svg className="w-3 h-3 text-[#06b6d4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  <span className="text-[12px] font-bold text-[#1a1c1c]">Fast Progression</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl border border-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.03)] self-start ml-6 group-hover:-translate-y-1 transition-transform"
                >
                  <span className="w-2 h-2 rounded-sm bg-[#ffd600] rotate-45" />
                  <span className="text-[12px] font-bold text-[#1a1c1c]">Goal Driven</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
                  className="absolute -bottom-2 flex items-center gap-2 px-4 py-2 bg-[#1a1c1c] rounded-full shadow-lg border border-[rgba(255,255,255,0.1)]"
                >
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">AI Engine Active</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Card 2: Dynamic Roadmap */}
            <motion.div
              className="relative w-full h-[320px] rounded-[24px] bg-[rgba(255,255,255,0.72)] backdrop-blur-[24px] border border-[rgba(255,255,255,0.8)] shadow-[0_12px_32px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)] flex flex-col items-center pt-8 pb-6 px-6 group overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.2, delay: 0.05, ease: "easeOut" }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-[#06b6d4]/[0.04] blur-[50px] rounded-full pointer-events-none" />

              <h3 className="text-[18px] font-bold text-[#1a1c1c] tracking-tight mb-6 relative z-10">
                Dynamic Roadmap
              </h3>

              <div className="relative w-full flex-1 flex flex-col items-center justify-center pt-2">
                <div className="relative flex flex-col items-start w-[140px]">
                  {/* Node 1 */}
                  <div className="relative flex items-center gap-4 z-10">
                    <div className="w-7 h-7 rounded-full bg-white border border-[#06b6d4]/30 flex items-center justify-center shadow-sm shrink-0 relative">
                      <span className="w-2 h-2 rounded-full bg-[#06b6d4]" />
                    </div>
                    <span className="text-[13px] font-bold text-[#1a1c1c]">Discovery</span>
                  </div>
                  {/* Conn 1 */}
                  <div className="w-[2px] h-7 bg-gradient-to-b from-[#06b6d4] to-[#8b5cf6] ml-[13px] my-1 opacity-70" />
                  {/* Node 2 */}
                  <div className="relative flex items-center gap-4 z-10">
                    <div className="absolute -inset-2 bg-[#8b5cf6]/10 blur-md rounded-full" />
                    <div className="w-7 h-7 rounded-full bg-white border border-[#8b5cf6]/30 flex items-center justify-center shadow-sm relative z-10 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-[#8b5cf6] animate-pulse" />
                    </div>
                    <span className="text-[13px] font-bold text-[#8b5cf6]">Skill Building</span>
                  </div>
                  {/* Conn 2 */}
                  <div className="w-[2px] h-7 bg-gradient-to-b from-[#8b5cf6] to-[#10b981] ml-[13px] my-1 opacity-40" />
                  {/* Node 3 */}
                  <div className="relative flex items-center gap-4 z-10">
                    <div className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                    </div>
                    <span className="text-[13px] font-bold text-[#1a1c1c]/50">Mastery</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Collaborative Learning */}
            <motion.div
              className="relative w-full h-[320px] rounded-[24px] bg-[rgba(255,255,255,0.72)] backdrop-blur-[24px] border border-[rgba(255,255,255,0.8)] shadow-[0_12px_32px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)] flex flex-col items-center pt-8 pb-6 px-6 group overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-[#ffd600]/[0.04] blur-[50px] rounded-full pointer-events-none" />

              <h3 className="text-[18px] font-bold text-[#1a1c1c] tracking-tight mb-4 relative z-10">
                Collaborative Learning
              </h3>

              <div className="relative w-full flex-1 flex items-center justify-center">
                <div className="relative w-full h-full max-w-[200px]">
                  {/* Mentor */}
                  <motion.div
                    className="absolute top-[5%] left-[5%] flex flex-col items-center gap-1 z-20"
                    initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 p-[1.5px] shadow-sm">
                      <img src="https://i.pravatar.cc/100?img=47" className="w-full h-full rounded-full border border-white" alt="Mentor" onError={(e) => { e.currentTarget.src = 'https://i.pravatar.cc/100?img=1' }} />
                    </div>
                    <span className="bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/50 text-[8px] font-bold text-[#1a1c1c] shadow-sm">Sarah</span>
                  </motion.div>

                  {/* Student */}
                  <motion.div
                    className="absolute bottom-[10%] right-[5%] flex flex-col items-center gap-1 z-20"
                    initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}
                  >
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 shadow-sm overflow-hidden">
                      <img src="https://i.pravatar.cc/100?img=12" className="w-full h-full object-cover" alt="Student" onError={(e) => { e.currentTarget.src = 'https://i.pravatar.cc/100?img=2' }} />
                    </div>
                  </motion.div>

                  {/* Discussion */}
                  <motion.div
                    className="absolute top-[25%] left-[25%] bg-white/95 backdrop-blur-xl p-3 rounded-xl rounded-tl-sm shadow-[0_8px_16px_rgba(0,0,0,0.06)] border border-white/60 w-[130px] z-30"
                    initial={{ y: 10, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                  >
                    <p className="text-[10px] text-[#4d4632] leading-snug font-medium">"Check the time complexity here."</p>
                  </motion.div>

                  {/* Insight */}
                  <motion.div
                    className="absolute bottom-[25%] left-[5%] bg-[#ffd600]/20 backdrop-blur-md p-2 rounded-lg border border-[#ffd600]/30 shadow-sm rotate-3 w-[70px] z-10"
                    initial={{ y: -10, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                  >
                    <div className="h-1 bg-[#b45309]/30 rounded-full w-full mb-1" />
                    <div className="h-1 bg-[#b45309]/30 rounded-full w-[60%]" />
                  </motion.div>

                  {/* Connect Line */}
                  <svg className="absolute inset-0 w-full h-full z-0 opacity-50 pointer-events-none" style={{ filter: 'drop-shadow(0 1px 2px rgba(139,92,246,0.1))' }}>
                    <path d="M 40 40 Q 100 80, 160 120" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3 3" />
                  </svg>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. Bento Grid Section (Ecosystem) */}
      <section id="pillars" className="w-full bg-[#f9f9f9] pt-12 pb-24 px-6 sm:px-12 border-t border-[rgba(0,0,0,0.03)] relative overflow-hidden">
        {/* Subtle ambient glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[500px] bg-gradient-to-br from-[#8b5cf6]/[0.03] to-[#06b6d4]/[0.03] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-[1000px] mx-auto flex flex-col items-center relative z-10">

          {/* Header - Reduced whitespace below */}
          <div className="text-center flex flex-col gap-2 items-center mb-8">
            <h2 className="text-[32px] sm:text-[40px] lg:text-[44px] font-extrabold text-[#1a1c1c] tracking-[-0.03em] leading-tight">
              An ecosystem of excellence.
            </h2>
            <p className="text-[16px] text-[#4d4632]/80 leading-[1.5] max-w-[500px]">
              Seamlessly integrated tools designed to accelerate comprehension and foster elite collaboration.
            </p>
          </div>

          {/* Premium 2x2 Bento Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 relative">

            {/* Card 1: Elite Learning Circles */}
            <motion.div
              className="relative w-full h-[340px] rounded-[32px] bg-gradient-to-br from-[rgba(255,255,255,0.8)] to-[rgba(249,249,249,0.4)] backdrop-blur-[24px] border border-[rgba(255,255,255,1)] shadow-[0_16px_40px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] flex flex-col overflow-hidden group"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.1 }}
            >
              <div className="absolute -top-10 -left-10 w-[180px] h-[180px] bg-[#8b5cf6]/[0.08] blur-[50px] rounded-full pointer-events-none group-hover:bg-[#8b5cf6]/[0.12] transition-colors duration-500" />

              <div className="flex-1 w-full relative flex items-center justify-center p-6 mt-2">
                <div className="relative w-[200px] h-[160px]">
                  {/* Node 1 */}
                  <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-12 h-12 rounded-full bg-white/60 backdrop-blur-md border border-white shadow-[0_4px_16px_rgba(139,92,246,0.1)] flex items-center justify-center z-20 group-hover:-translate-y-1 transition-transform duration-500">
                    <span className="w-3 h-3 rounded-full bg-[#8b5cf6] shadow-[0_0_12px_rgba(139,92,246,0.6)]" />
                  </div>
                  {/* Node 2 */}
                  <div className="absolute bottom-[15%] left-[10%] w-10 h-10 rounded-full bg-white/60 backdrop-blur-md border border-white shadow-[0_4px_16px_rgba(6,182,212,0.1)] flex items-center justify-center z-20 group-hover:-translate-y-1 transition-transform duration-500 delay-75">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4] shadow-[0_0_12px_rgba(6,182,212,0.6)]" />
                  </div>
                  {/* Node 3 */}
                  <div className="absolute bottom-[20%] right-[10%] w-14 h-14 rounded-full bg-white/60 backdrop-blur-md border border-white shadow-[0_4px_16px_rgba(245,158,11,0.1)] flex items-center justify-center z-20 group-hover:-translate-y-1 transition-transform duration-500 delay-150">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#f59e0b] shadow-[0_0_12px_rgba(245,158,11,0.6)] animate-pulse" />
                  </div>

                  {/* Connecting lines */}
                  <svg className="absolute inset-0 w-full h-full z-10 opacity-40 pointer-events-none">
                    <path d="M 100 35 L 45 125" fill="none" stroke="url(#grad1)" strokeWidth="1.5" strokeDasharray="4 4" />
                    <path d="M 100 35 L 160 115" fill="none" stroke="url(#grad2)" strokeWidth="1.5" strokeDasharray="4 4" />
                    <path d="M 45 125 L 160 115" fill="none" stroke="url(#grad3)" strokeWidth="1.5" strokeDasharray="4 4" />
                    <defs>
                      <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient>
                      <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#f59e0b" /></linearGradient>
                      <linearGradient id="grad3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#06b6d4" /><stop offset="100%" stopColor="#f59e0b" /></linearGradient>
                    </defs>
                  </svg>

                  {/* Orbiting particles */}
                  <div className="absolute inset-0 z-0 opacity-50">
                    <div className="absolute top-[40%] left-[45%] w-1 h-1 rounded-full bg-[#8b5cf6]" style={{ animation: 'orbit-cw 6s linear infinite' }} />
                    <div className="absolute top-[60%] left-[55%] w-1 h-1 rounded-full bg-[#06b6d4]" style={{ animation: 'orbit-ccw 8s linear infinite' }} />
                  </div>
                </div>
              </div>

              <div className="p-8 pt-0 relative z-10 flex flex-col justify-end">
                <h3 className="text-[18px] font-extrabold text-[#1a1c1c] tracking-tight mb-1">Elite Learning Circles</h3>
                <p className="text-[13px] text-[#4d4632]/70 font-medium leading-[1.4]">Connect with mentors and peers in dynamic knowledge flows.</p>
              </div>
            </motion.div>

            {/* Card 2: Intelligent Reading Layer */}
            <motion.div
              className="relative w-full h-[340px] rounded-[32px] bg-gradient-to-br from-[rgba(255,255,255,0.8)] to-[rgba(249,249,249,0.4)] backdrop-blur-[24px] border border-[rgba(255,255,255,1)] shadow-[0_16px_40px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] flex flex-col overflow-hidden group"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.2, delay: 0.05 }}
            >
              <div className="absolute -bottom-10 -right-10 w-[180px] h-[180px] bg-[#06b6d4]/[0.08] blur-[50px] rounded-full pointer-events-none group-hover:bg-[#06b6d4]/[0.12] transition-colors duration-500" />

              <div className="flex-1 w-full relative flex items-center justify-center p-6 mt-2">
                <div className="w-[85%] max-w-[240px] bg-white/80 backdrop-blur-xl rounded-2xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-5 relative group-hover:-translate-y-2 transition-transform duration-500">
                  {/* Text block lines */}
                  <div className="w-full h-1.5 bg-black/5 rounded-full mb-2.5" />
                  <div className="w-[85%] h-1.5 bg-black/5 rounded-full mb-2.5" />
                  <div className="w-[95%] h-1.5 bg-black/5 rounded-full mb-4" />

                  {/* Highlighted text block */}
                  <div className="relative w-full bg-gradient-to-r from-[#06b6d4]/10 to-transparent p-2.5 rounded-r-lg border-l-2 border-[#06b6d4]">
                    <div className="w-[90%] h-1.5 bg-[#06b6d4]/40 rounded-full mb-2" />
                    <div className="w-[60%] h-1.5 bg-[#06b6d4]/40 rounded-full" />

                    {/* Floating AI Popup */}
                    <div className="absolute -top-7 right-0 bg-[#1a1c1c] text-white text-[9px] font-bold px-2.5 py-1.5 rounded-lg shadow-xl flex items-center gap-1.5 z-20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-pulse" /> Context Insights
                    </div>
                  </div>

                  {/* Adaptive Progress Bar */}
                  <div className="mt-5 flex items-center gap-3">
                    <span className="text-[8px] font-bold text-black/30 uppercase tracking-widest">Velocity</span>
                    <div className="flex-1 h-1.5 bg-black/5 rounded-full overflow-hidden">
                      <div className="h-full w-[65%] bg-gradient-to-r from-[#06b6d4] to-[#8b5cf6] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 pt-0 relative z-10 flex flex-col justify-end">
                <h3 className="text-[18px] font-extrabold text-[#1a1c1c] tracking-tight mb-1">Intelligent Reading Layer</h3>
                <p className="text-[13px] text-[#4d4632]/70 font-medium leading-[1.4]">Contextual insights and dynamic annotations on the fly.</p>
              </div>
            </motion.div>

            {/* Card 3: Adaptive AI Tutor */}
            <motion.div
              className="relative w-full h-[340px] rounded-[32px] bg-gradient-to-br from-[rgba(255,255,255,0.8)] to-[rgba(249,249,249,0.4)] backdrop-blur-[24px] border border-[rgba(255,255,255,1)] shadow-[0_16px_40px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] flex flex-col overflow-hidden group"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.2, delay: 0.1 }}
            >
              <div className="absolute -top-10 -right-10 w-[180px] h-[180px] bg-[#10b981]/[0.08] blur-[50px] rounded-full pointer-events-none group-hover:bg-[#10b981]/[0.12] transition-colors duration-500" />

              <div className="flex-1 w-full relative flex items-center justify-center p-6 mt-2">
                <div className="w-[90%] max-w-[260px] flex flex-col gap-3 relative">
                  {/* AI Thinking Bubble */}
                  <div className="self-end bg-white/90 backdrop-blur-md border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] rounded-2xl rounded-tr-sm px-4 py-3 group-hover:-translate-y-1 transition-transform">
                    <div className="w-16 h-1.5 bg-black/10 rounded-full" />
                  </div>
                  {/* AI Response Bubble */}
                  <div className="self-start bg-[#1a1c1c]/95 backdrop-blur-xl shadow-[0_16px_32px_rgba(0,0,0,0.12)] rounded-2xl rounded-tl-sm px-5 py-4 relative group-hover:-translate-y-1 transition-transform delay-75">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                      <span className="text-[9px] text-[#10b981] font-bold tracking-widest uppercase">Synthesizing</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="w-28 h-1.5 bg-white/20 rounded-full" />
                      <div className="w-20 h-1.5 bg-white/20 rounded-full" />
                    </div>

                    {/* Floating Diagnostic Suggestion */}
                    <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-md border border-white shadow-[0_8px_20px_rgba(0,0,0,0.08)] px-3 py-2 rounded-xl flex items-center gap-2 z-20">
                      <div className="w-4 h-4 rounded-full bg-[#10b981]/20 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                      </div>
                      <span className="text-[10px] font-extrabold text-[#1a1c1c]">Mental Model Update</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 pt-0 relative z-10 flex flex-col justify-end">
                <h3 className="text-[18px] font-extrabold text-[#1a1c1c] tracking-tight mb-1">Adaptive AI Tutor</h3>
                <p className="text-[13px] text-[#4d4632]/70 font-medium leading-[1.4]">Real-time problem solving and diagnostic intervention.</p>
              </div>
            </motion.div>

            {/* Card 4: Competitive Growth Network */}
            <motion.div
              className="relative w-full h-[340px] rounded-[32px] bg-gradient-to-br from-[rgba(255,255,255,0.8)] to-[rgba(249,249,249,0.4)] backdrop-blur-[24px] border border-[rgba(255,255,255,1)] shadow-[0_16px_40px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] flex flex-col overflow-hidden group"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.2, delay: 0.15 }}
            >
              <div className="absolute -bottom-10 -left-10 w-[180px] h-[180px] bg-[#f59e0b]/[0.08] blur-[50px] rounded-full pointer-events-none group-hover:bg-[#f59e0b]/[0.12] transition-colors duration-500" />

              <div className="flex-1 w-full relative flex items-center justify-center p-6 mt-2">
                <div className="w-[90%] max-w-[260px] flex flex-col gap-3 relative">
                  {/* Leaderboard Item 1 */}
                  <div className="w-full bg-white/70 backdrop-blur-md border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] rounded-2xl px-4 py-3 flex items-center justify-between group-hover:-translate-x-1 transition-transform">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-extrabold text-[#f59e0b]">1</span>
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-black/5 to-black/10 border border-white/50" />
                      <div className="w-14 h-1.5 bg-black/10 rounded-full" />
                    </div>
                    <span className="text-[11px] font-bold text-[#1a1c1c]">14,200</span>
                  </div>

                  {/* Leaderboard Item 2 (You) */}
                  <div className="w-[95%] ml-auto bg-[#1a1c1c]/95 backdrop-blur-xl shadow-[0_12px_24px_rgba(0,0,0,0.1)] rounded-2xl px-4 py-3 flex items-center justify-between relative group-hover:translate-x-1 transition-transform delay-75 border border-white/10">
                    {/* Streak Indicator */}
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 flex items-center justify-center z-20">
                      <div className="w-8 h-8 bg-white rounded-full shadow-[0_4px_12px_rgba(245,158,11,0.2)] flex items-center justify-center border border-white/50">
                        <span className="text-[14px]">🔥</span>
                      </div>
                      <span className="absolute -bottom-1 text-[9px] font-bold text-white bg-[#f59e0b] rounded-full px-1.5 py-0.5 shadow-sm">12</span>
                    </div>
                    <div className="flex items-center gap-3 pl-6">
                      <span className="text-[11px] font-extrabold text-[#f59e0b]">2</span>
                      <div className="w-6 h-6 rounded-full bg-white/10 border border-white/10" />
                      <div className="w-12 h-1.5 bg-white/30 rounded-full" />
                    </div>
                    <span className="text-[11px] font-bold text-white">14,150</span>
                  </div>
                </div>
              </div>

              <div className="p-8 pt-0 relative z-10 flex flex-col justify-end">
                <h3 className="text-[18px] font-extrabold text-[#1a1c1c] tracking-tight mb-1">Competitive Growth Network</h3>
                <p className="text-[13px] text-[#4d4632]/70 font-medium leading-[1.4]">Climb peer leaderboards and build persistent learning streaks.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer id="footer" className="w-full bg-white border-t border-[rgba(0,0,0,0.06)] py-12 px-6 sm:px-12 text-center">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={imgLogoIcon} alt="Logo" className="w-[11px] h-[18px]" onError={(e) => {
              e.currentTarget.style.display = 'none';
            }} />
            <span className="text-[20px] font-bold tracking-[-0.6px] text-[#1a1c1c]">EdVerse</span>
          </div>

          {/* Copyright */}
          <p className="text-[14px] text-[#4d4632]/70">
            © 2025 EdVerse. Revolutionizing education through community and AI.
          </p>

          {/* Footer Navigation */}
          <div className="flex gap-6 text-[14px] font-medium text-[#4d4632]/70">
            <a href="#" className="hover:text-[#8b5cf6] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#8b5cf6] transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
