'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@/components/ui/UI';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import * as authService from '@/lib/services/auth.service';
import { registerSchema, RegisterFormData, validateForm } from '@/lib/validation/schemas';
import { toast } from 'sonner';

import { GoogleIcon } from '@/components/ui/Icons';

export default function SignupPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Handle input change with real-time validation
  const handleInputChange = async (field: keyof RegisterFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Real-time validation
    try {
      await registerSchema.validateAt(field, { [field]: value });
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    } catch (err: any) {
      setFieldErrors(prev => ({ ...prev, [field]: err.message }));
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form
      const errors = await validateForm(registerSchema, formData);
      if (errors) {
        setFieldErrors(errors);
        return;
      }

      // Call register API
      await authService.register(formData);
      
      // Success
      toast.success('Account created successfully!');
      router.push('/onboarding');
    } catch (error: any) {
      toast.error(error.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    toast.info('Google OAuth coming soon!');
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

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 bg-white dark:bg-black flex items-center justify-center p-8 transition-colors duration-200">
        <div className="w-full max-w-md">
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

           {/* Google Signup */}
           <div className="mb-6">
             <Button 
               variant="outline" 
               className="w-full py-3 flex items-center justify-center gap-3"
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
               <span className="px-2 bg-white dark:bg-black text-gray-500">Or continue with email</span>
             </div>
           </div>

           {/* Signup Form */}
           <form onSubmit={handleSignup} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="First Name" 
                  placeholder="Rajesh" 
                  icon={<User size={16}/>}
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  error={fieldErrors.firstName}
                  required
                />
                <Input 
                  label="Last Name" 
                  placeholder="Kumar" 
                  icon={<User size={16}/>}
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  error={fieldErrors.lastName}
                  required
                />
              </div>
              
              <Input 
                label="Email Address" 
                type="email" 
                placeholder="name@company.com" 
                icon={<Mail size={16}/>} 
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={fieldErrors.email}
                required
              />
              
              <Input 
                label="Password" 
                type="password" 
                placeholder="••••••••" 
                icon={<Lock size={16}/>} 
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                error={fieldErrors.password}
                required
              />

              <Button type="submit" className="w-full py-3" size="lg" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Get Started'} <ArrowRight size={18} className="ml-2" />
              </Button>
           </form>

           <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 dark:text-zinc-400">
                Already have an account?{" "}
                <a 
                  href="/login"
                  className="font-medium text-munshi-indigo hover:text-munshi-teal"
                >
                  Log in
                </a>
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
