import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  isSignup?: boolean;
}

export const AuthLayout = ({ children, title, subtitle, isSignup }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex bg-[#f9f9f9] font-hanken">
      {/* Left Panel - Premium Visual Storytelling (Hidden on Mobile) */}
      <div className="hidden lg:flex w-[45%] relative bg-gradient-to-br from-[#f2f0ff] to-[#e6f0ff] flex-col items-center justify-center overflow-hidden border-r border-[rgba(0,0,0,0.04)]">
        {/* Subtle Background Elements matching Landing Page */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#8b5cf6]/[0.08] to-[#06b6d4]/[0.06] blur-[100px] rounded-full pointer-events-none" />

        {/* Orbital Learning Visual */}
        <div className="relative w-[400px] h-[400px] flex items-center justify-center">
          {/* Outer Orbital Ring */}
          <div className="absolute inset-0 rounded-full border border-[rgba(0,0,0,0.04)]" style={{ animation: 'spin 40s linear infinite' }}>
            <div className="absolute top-0 left-1/2 w-2.5 h-2.5 rounded-full bg-[#8b5cf6] shadow-[0_0_12px_rgba(139,92,246,0.4)] -translate-x-1/2 -translate-y-1/2" />
          </div>
          {/* Middle Orbital Ring */}
          <div className="absolute inset-[18%] rounded-full border border-[rgba(0,0,0,0.06)]" style={{ animation: 'spin 25s linear infinite reverse' }}>
            <div className="absolute bottom-0 left-1/2 w-2 h-2 rounded-full bg-[#06b6d4] shadow-[0_0_10px_rgba(6,182,212,0.4)] -translate-x-1/2 translate-y-1/2" />
          </div>
          {/* Inner Glowing Core */}
          <motion.div
            className="absolute w-[80px] h-[80px] rounded-full flex items-center justify-center shadow-sm"
            style={{
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(0,0,0,0.04)',
            }}
            animate={{
              boxShadow: [
                '0 4px 20px rgba(139,92,246,0.08)',
                '0 8px 30px rgba(139,92,246,0.15)',
                '0 4px 20px rgba(139,92,246,0.08)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[#1a1c1c] text-[22px] font-extrabold tracking-tight">EV</span>
          </motion.div>
        </div>

        {/* Brand Presence Text */}
        <div className="absolute bottom-12 left-12 right-12 z-10 text-left -mb-[5%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/50 backdrop-blur-md border border-[rgba(0,0,0,0.04)] rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)]"
          >
            <h3 className="text-[#1a1c1c] text-[20px] font-bold mb-2 tracking-[-0.02em]">The EdVerse Ecosystem</h3>
            <p className="text-[#4d4632] text-[15px] leading-relaxed">
              Join an adaptive learning network where AI-driven insights and elite collaborative circles accelerate your mastery.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Form (Takes full width on mobile, 55% on desktop) */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-24 xl:px-32 relative overflow-y-auto min-h-screen bg-[#f9f9f9]">
        {/* Logo linking back to home */}
        <Link to="/" className="absolute top-8 left-6 sm:left-12 flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-[10px] bg-white border border-[rgba(0,0,0,0.08)] shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-250 ease-out">
            <span className="text-[#1a1c1c] text-[13px] font-extrabold">EV</span>
          </div>
          <span className="text-[#1a1c1c] font-extrabold tracking-[-0.6px] text-[20px]">EdVerse</span>
        </Link>

        <div className={`w-full max-w-[400px] mx-auto ${isSignup ? 'mt-12 mb-8' : 'mt-20 mb-12'}`}>
          {/* Header */}
          <div className={`${isSignup ? 'mb-6' : 'mb-10'} text-left`}>
            <h1 className={`${isSignup ? 'text-[29px]' : 'text-[36px]'} font-extrabold text-[#1a1c1c] tracking-[-0.03em] leading-[1.1] mb-3`}>
              {title}
            </h1>
            {subtitle && (
              <p className="text-[16px] text-[#4d4632] leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Form Content */}
          <div className="w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};