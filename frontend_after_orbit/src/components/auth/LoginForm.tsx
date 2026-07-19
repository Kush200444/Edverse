import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";


export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [forgotSent, setForgotSent] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await fetch("http://localhost:5000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
        credentials: "include"
      });

      if (!user.ok) {
        const errData = await user.json();
        throw new Error(errData.error || "Login failed");
      }

      const userData = await user.json();

      localStorage.setItem("accessToken", JSON.stringify(userData.data.accessToken));

      navigate("/dashboard");
    } catch (error) {
      console.error("Sign-in error:", error);
      toast({
        title: "Sign-in Failed",
        description: "An error occurred during sign-in. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    // Simulate redirect — in production this would redirect to OAuth provider
    setTimeout(() => {
      setGoogleLoading(false);
    }, 2000);
  };

  const handleForgotPassword = () => {
    if (formData.email) {
      setForgotSent(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-[13px] font-bold text-[#1a1c1c]">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, email: e.target.value }));
              if (forgotSent) setForgotSent(false);
            }}
            required
            className="h-[48px] bg-white border border-[rgba(0,0,0,0.08)] rounded-xl px-4 text-[15px] focus-visible:ring-2 focus-visible:ring-[#8b5cf6]/20 focus-visible:border-[#8b5cf6] transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-[13px] font-bold text-[#1a1c1c]">Password</Label>
            <button type="button" onClick={handleForgotPassword} className="text-[12px] font-semibold text-[#8b5cf6] hover:text-[#7c3aed] transition-colors">
              Forgot password?
            </button>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            required
            className="h-[48px] bg-white border border-[rgba(0,0,0,0.08)] rounded-xl px-4 text-[15px] focus-visible:ring-2 focus-visible:ring-[#8b5cf6]/20 focus-visible:border-[#8b5cf6] transition-all"
          />
          {/* Inline forgot password confirmation (Issue 1) */}
          {forgotSent && (
            <p className="text-[12px] text-[#8b5cf6] mt-1">
              Reset link sent to {formData.email}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-[48px] bg-[#ffd600] text-[#1e1e22] rounded-full text-[14px] font-bold tracking-[0.28px] hover:bg-[#ffe033] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-[0_4px_16px_rgba(255,214,0,0.15)]"
      >
        Sign In
      </Button>

      <div className="relative py-1.5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-[rgba(0,0,0,0.06)]" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#f9f9f9] px-3 text-[#4d4632]/50 font-semibold tracking-wider text-[11px]">or</span>
        </div>
      </div>

      <Button
        type="button"
        onClick={handleGoogleLogin}
        disabled={googleLoading}
        variant="outline"
        className="w-full h-[48px] bg-white hover:bg-white border border-[rgba(0,0,0,0.08)] rounded-full text-[14px] font-semibold text-[#1a1c1c] transition-all duration-200 flex items-center justify-center gap-2.5 hover:border-[rgba(0,0,0,0.15)] disabled:opacity-70"
      >
        {googleLoading ? (
          <span className="text-[#4d4632]/60">Connecting...</span>
        ) : (
          <>
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </>
        )}
      </Button>

      <p className="text-center text-[14px] text-[#4d4632]/70 pt-2">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="text-[#8b5cf6] font-bold hover:text-[#7c3aed] transition-colors"
        >
          Create one
        </button>
      </p>
    </form>
  );
};