'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@/components/ui/UI';
import { ArrowRight, Lock, Mail, ArrowLeft, RefreshCw } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export default function SignupPage() {
  const [step, setStep] = useState<'signup' | 'verification'>('signup');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep('verification');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Verifying OTP:', otp.join(''));
    router.push('/onboarding');
  };

  const handleGoogleSignup = () => {
    console.log('Signing up with Google...');
    setTimeout(() => router.push('/onboarding'), 1000);
  };

  return (
    <div className="min-h-screen flex font-sans bg-white dark:bg-black transition-colors duration-200">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 bg-munshi-indigo relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-munshi-indigo via-munshi-teal to-munshi-indigo opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-munshi-indigo via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-lg text-white">
           <div className="mb-8">
             <Logo variant="icon" size="xl" lightMode />
           </div>
           <h2 className="text-4xl font-heading font-bold mb-6">Start your journey with Munshi.</h2>
           <p className="text-white/70 text-lg leading-relaxed mb-8">
             Get started with a 14-day free trial. No credit card required. Experience the power of AI-driven accounting.
           </p>
           
           <div className="space-y-4">
             {['Automated GST filing', 'Smart bank reconciliation', 'AI-powered insights'].map((feature, i) => (
               <div key={i} className="flex items-center gap-3">
                 <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                   <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                   </svg>
                 </div>
                 <span className="text-white/90">{feature}</span>
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 bg-white dark:bg-black flex items-center justify-center p-8 transition-colors duration-200">
        <div className="w-full max-w-md">
           
           {step === 'signup' ? (
             <>
               <div className="mb-8">
                  <div className="mb-8 lg:hidden">
                    <Logo variant="full" size="md" />
                  </div>
                  <h1 className="text-3xl font-heading font-bold text-munshi-indigo dark:text-white mb-2">
                    Create Account
                  </h1>
                  <p className="text-munshi-subtext dark:text-zinc-400">
                    Start your 14-day free trial. No credit card required.
                  </p>
               </div>

               <div className="mb-6">
                 <Button 
                   variant="outline" 
                   className="w-full py-3 flex items-center justify-center gap-3 text-gray-700 hover:bg-gray-50 border-gray-300 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white transition-all"
                   onClick={handleGoogleSignup}
                   type="button"
                 >
                   <GoogleIcon />
                   <span>Sign up with Google</span>
                 </Button>
               </div>

               <div className="relative mb-6">
                 <div className="absolute inset-0 flex items-center">
                   <div className="w-full border-t border-gray-200 dark:border-zinc-800"></div>
                 </div>
                 <div className="relative flex justify-center text-sm">
                   <span className="px-2 bg-white dark:bg-black text-gray-500 dark:text-zinc-500 transition-colors duration-200">Or continue with email</span>
                 </div>
               </div>

               <form onSubmit={handleSignup} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="First Name" placeholder="Rajesh" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    <Input label="Last Name" placeholder="Kumar" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                  </div>
                  <Input 
                    label="Email Address" 
                    type="email" 
                    placeholder="name@company.com" 
                    icon={<Mail size={16}/>} 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input 
                    label="Password" 
                    type="password" 
                    placeholder="••••••••" 
                    icon={<Lock size={16}/>} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <Button className="w-full py-3" size="lg">
                    Get Started <ArrowRight size={18} className="ml-2" />
                  </Button>
               </form>

               <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500 dark:text-zinc-400">
                    Already have an account?{" "}
                    <a 
                      href="/login"
                      className="font-medium text-munshi-indigo hover:text-munshi-teal dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                    >
                      Log in
                    </a>
                  </p>
               </div>
             </>
           ) : (
             <div className="animate-fade-in-up">
                <button 
                  onClick={() => setStep('signup')}
                  className="flex items-center text-sm text-gray-500 hover:text-munshi-indigo dark:text-gray-400 dark:hover:text-white mb-8 transition-colors"
                >
                  <ArrowLeft size={16} className="mr-1" /> Back to Sign up
                </button>

                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-munshi-indigo/10 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6 text-munshi-indigo dark:text-white">
                    <Mail size={32} />
                  </div>
                  <h2 className="text-3xl font-heading font-bold text-munshi-indigo dark:text-white mb-3">Verify your email</h2>
                  <p className="text-munshi-subtext dark:text-zinc-400 leading-relaxed">
                     We've sent a 6-digit verification code to <br/>
                     <span className="font-medium text-munshi-text dark:text-white">{email}</span>
                  </p>
                </div>

                <form onSubmit={handleVerify} className="space-y-8">
                  <div className="flex justify-center gap-2 sm:gap-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-mono font-medium border border-gray-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-black text-munshi-indigo dark:text-white focus:border-munshi-indigo focus:ring-1 focus:ring-munshi-indigo dark:focus:border-white outline-none transition-all"
                      />
                    ))}
                  </div>

                  <Button className="w-full py-3" size="lg">
                    Verify Email <ArrowRight size={18} className="ml-2" />
                  </Button>
                </form>
                
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500 dark:text-zinc-400">
                    Didn't receive the code?{' '}
                    <button className="font-medium text-munshi-indigo hover:text-munshi-teal dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors inline-flex items-center">
                      <RefreshCw size={14} className="mr-1" /> Resend
                    </button>
                  </p>
                </div>
             </div>
           )}

        </div>
      </div>
    </div>
  );
}
