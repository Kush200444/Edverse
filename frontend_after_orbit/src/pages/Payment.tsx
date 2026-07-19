import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, ShieldCheck, CheckCircle2, ArrowLeft, Lock, Loader2 } from "lucide-react";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "razorpay">("card");
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const coursePrice = localStorage.getItem("course_price") || "199";
  // The ExploreCourses page doesn't currently pass the name, so we use a placeholder or read from state if passed
  const courseName = location.state?.courseName || "Full-Stack Web Development Mastery";

  const handlePayment = () => {
    setIsProcessing(true);

    if (paymentMethod === "card") {
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardholderName) {
        setIsProcessing(false);
        toast({
          title: "Missing Information",
          description: "Please fill in all card details",
          variant: "destructive",
        });
        return;
      }
    }

    setTimeout(() => {
      setTimeout(() => {
        navigate("/post-payment-onboarding", {
          state: {
            courseName,
            coursePrice,
            paymentMethod,
          },
        });
      }, 300);
    }, 1500);
  };

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

        {/* LEFT */}

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-[12px] bg-white border border-[rgba(0,0,0,0.08)] shadow-sm flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 text-[#1a1c1c]" />
          </button>

          <div className="w-10 h-10 rounded-[12px] bg-white border border-[rgba(0,0,0,0.08)] shadow-sm flex items-center justify-center">
            <span className="text-[#1a1c1c] text-[14px] font-extrabold tracking-tight">
              EV
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[#1a1c1c] font-extrabold tracking-[-0.04em] text-[18px] leading-[1.1]">
              EdVerse Intelligence
            </span>

            <span className="text-[#1a1c1c] opacity-50 text-[13px] font-medium mt-0.5">
              Finalizing your learning journey
            </span>
          </div>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-2.5 px-4 py-2 bg-white rounded-full border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hidden md:flex">

          <div className="w-2.5 h-2.5 rounded-full bg-[#facc15] animate-pulse" />

          <span className="text-[12px] font-semibold text-[#1a1c1c] uppercase tracking-wider opacity-80">
            Secure Checkout
          </span>

        </div>

      </header>

      <div className="max-w-[1000px] mx-auto px-6 py-10 relative z-10">
        <div className="grid md:grid-cols-5 gap-6 lg:gap-8">

          {/* Left: Payment Method (Takes 3 columns) */}
          <div className="md:col-span-3 space-y-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#1a1c1c]" />
              <h2 className="text-[15px] font-extrabold text-[#1a1c1c] tracking-[-0.01em]">Choose payment method</h2>
            </div>

            <div className="space-y-3">
              {/* Card Option */}
              <label
                className="group flex items-center justify-between p-4 rounded-2xl bg-white cursor-pointer transition-all duration-300"
                style={{
                  boxShadow:
                    paymentMethod === 'card'
                      ? '0 8px 20px rgba(255,214,10,0.08)'
                      : '0 4px 20px rgba(0,0,0,0.03)',

                  border:
                    paymentMethod === 'card'
                      ? '1px solid #FFD60A'
                      : '1px solid transparent',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: paymentMethod === 'card' ? '#1a1c1c' : 'rgba(0,0,0,0.15)' }}>
                    {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-[#1a1c1c]" />}
                  </div>
                  <div>
                    <p className="font-bold text-[14px] text-[#1a1c1c]">Credit / Debit Card</p>
                    <p className="text-[12px] text-[#999] font-medium">Visa, Mastercard, Amex</p>
                  </div>
                </div>
                <CreditCard className="h-5 w-5 text-[#999]" />
                <input type="radio" className="hidden" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
              </label>

              {/* RazorPay Option */}
              <label
                className="group flex items-center justify-between p-4 rounded-2xl bg-white cursor-pointer transition-all duration-300"
                style={{
                  boxShadow:
                    paymentMethod === 'razorpay'
                      ? '0 8px 20px rgba(255,214,10,0.08)'
                      : '0 4px 20px rgba(0,0,0,0.03)',

                  border:
                    paymentMethod === 'razorpay'
                      ? '1px solid #FFD60A'
                      : '1px solid transparent',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: paymentMethod === 'razorpay' ? '#1a1c1c' : 'rgba(0,0,0,0.15)' }}>
                    {paymentMethod === 'razorpay' && <div className="w-2.5 h-2.5 rounded-full bg-[#1a1c1c]" />}
                  </div>
                  <div>
                    <p className="font-bold text-[14px] text-[#1a1c1c]">RazorPay</p>
                    <p className="text-[12px] text-[#999] font-medium">UPI, NetBanking, Wallets</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[#1a1c1c] text-[#FFD60A] text-[10px] font-extrabold tracking-wider">
                  RAZORPAY
                </span>
                <input type="radio" className="hidden" checked={paymentMethod === 'razorpay'} onChange={() => setPaymentMethod('razorpay')} />
              </label>
            </div>

            {/* Card Form */}
            <div
              className="bg-white rounded-2xl p-6 transition-all duration-300"
              style={{
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                opacity: paymentMethod === 'card' ? 1 : 0.4,
                pointerEvents: paymentMethod === 'card' ? 'auto' : 'none',
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-[12px] font-bold text-[#1a1c1c] mb-1.5">Cardholder name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.cardholderName}
                    onChange={(e) => setFormData(prev => ({ ...prev, cardholderName: e.target.value }))}
                    className="w-full bg-[#f9f9f9] rounded-xl px-4 py-3 text-[14px] outline-none focus:bg-white transition-colors"
                    style={{
                      border: '1px solid transparent',
                      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)'
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#1a1c1c'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; }}
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#1a1c1c] mb-1.5">Card number</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: e.target.value }))}
                      className="w-full bg-[#f9f9f9] rounded-xl pl-10 pr-4 py-3 text-[14px] outline-none focus:bg-white transition-colors font-mono"
                      style={{
                        border: '1px solid transparent',
                        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)'
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#1a1c1c'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; }}
                    />
                    <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#999]" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-bold text-[#1a1c1c] mb-1.5">Expiry date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                      className="w-full bg-[#f9f9f9] rounded-xl px-4 py-3 text-[14px] outline-none focus:bg-white transition-colors text-center"
                      style={{
                        border: '1px solid transparent',
                        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)'
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#1a1c1c'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; }}
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#1a1c1c] mb-1.5">CVV</label>
                    <input
                      type="password"
                      placeholder="123"
                      maxLength={4}
                      value={formData.cvv}
                      onChange={(e) => setFormData(prev => ({ ...prev, cvv: e.target.value }))}
                      className="w-full bg-[#f9f9f9] rounded-xl px-4 py-3 text-[14px] outline-none focus:bg-white transition-colors text-center"
                      style={{
                        border: '1px solid transparent',
                        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)'
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#1a1c1c'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Order Summary (Takes 2 columns) */}
          <div className="md:col-span-2">
            <div className="rounded-2xl overflow-hidden sticky top-6 bg-white" style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
              <div className="p-6 relative overflow-hidden" style={{ background: '#1a1c1c' }}>
                <div className="absolute top-[-60px] right-[-60px] w-[160px] h-[160px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,214,10,0.14), transparent 70%)' }} />
                <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-2 relative z-10">Order summary</p>
                <p className="text-[17px] font-extrabold leading-tight mb-3 text-white relative z-10" style={{ letterSpacing: '-0.01em' }}>
                  {courseName}
                </p>
                <div className="flex items-center gap-2 text-[12px] text-white/60 font-semibold relative z-10">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#FFD60A]" />
                  Lifetime access
                </div>
              </div>

              <div className="p-6 space-y-3.5">
                <div className="space-y-4">

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#FFD60A] mt-1" />
                    <p className="text-[13px] text-[#666] font-medium">
                      Personalized AI roadmap
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#FFD60A] mt-1" />
                    <p className="text-[13px] text-[#666] font-medium">
                      Project based curriculum
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#FFD60A] mt-1" />
                    <p className="text-[13px] text-[#666] font-medium">
                      Adaptive progress tracking
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#FFD60A] mt-1" />
                    <p className="text-[13px] text-[#666] font-medium">
                      Lifetime access included
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[rgba(0,0,0,0.05)]">

                    <p className="text-[12px] text-[#999] mb-1">
                      Program Investment
                    </p>

                    <p className="text-[30px] font-extrabold text-[#1a1c1c]">
                      ${coursePrice}
                    </p>

                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full mt-4 bg-[#FFD60A] text-[#1a1c1c] py-4 rounded-xl font-bold text-[14px] flex justify-center items-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ boxShadow: '0 4px 14px rgba(255,214,10,0.3)' }}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="h-3.5 w-3.5" style={{ strokeWidth: 2.5 }} />
                      Begin Learning Journey
                    </>
                  )}
                </button>

                <p className="text-[11px] text-[#999] font-medium text-center mt-3 flex items-center justify-center gap-1.5">
                  <Lock className="h-3 w-3" />
                  Secure payment processing by EdVerse
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Payment;