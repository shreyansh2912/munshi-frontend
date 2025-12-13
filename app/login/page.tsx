'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@/components/ui/UI';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import * as authService from '@/lib/services/auth.service';
import { loginSchema, LoginFormData, validateForm } from '@/lib/validation/schemas';
import { toast } from 'sonner';

import { GoogleIcon } from '@/components/ui/Icons';

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Handle input change with real-time validation
  const handleInputChange = async (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Real-time validation
    try {
      await loginSchema.validateAt(field, { [field]: value });
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    } catch (err: any) {
      setFieldErrors(prev => ({ ...prev, [field]: err.message }));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form
      const errors = await validateForm(loginSchema, formData);
      if (errors) {
        setFieldErrors(errors);
        return;
      }

      // Call login API
      await authService.login(formData);
      
      // Success
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.info('Google OAuth coming soon!');
  };

  return (
    <div className="min-h-screen flex font-sans bg-white dark:bg-black transition-colors duration-200">
      {/* Left Panel - Visuals */}
      <div className="hidden lg:flex w-1/2 bg-munshi-indigo relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-munshi-indigo via-munshi-teal to-munshi-indigo opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-munshi-indigo via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-lg text-white">
           <div className="mb-8">
             <Logo variant="icon" size="xl" lightMode />
           </div>
           <h2 className="text-4xl font-heading font-bold mb-6">Accounting intelligence for the modern era.</h2>
           <p className="text-white/70 text-lg leading-relaxed mb-8">
             Join 10,000+ Indian businesses automating their finance with Munshi. From bank sync to GST filing, we handle the numbers so you can build.
           </p>
           
           <div className="flex gap-4 items-center">
             <div className="flex -space-x-3">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full border-2 border-munshi-indigo bg-gray-300"></div>
               ))}
             </div>
             <p className="text-sm font-medium">Trusted by industry leaders</p>
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
                Welcome Back
              </h1>
              <p className="text-munshi-subtext dark:text-zinc-400">
                Enter your details to access your dashboard.
              </p>
           </div>

           {/* Google Login Button */}
           <div className="mb-6">
             <Button 
               variant="outline" 
               className="w-full py-3 flex items-center justify-center gap-3"
               onClick={handleGoogleLogin}
               type="button"
             >
               <GoogleIcon />
               <span>Sign in with Google</span>
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

           {/* Login Form */}
           <form onSubmit={handleLogin} className="space-y-5">
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
              
              <div className="flex justify-end">
                 <a href="#" className="text-sm font-medium text-munshi-teal hover:text-munshi-indigo">Forgot password?</a>
              </div>

              <Button className="w-full py-3" size="lg" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'} <ArrowRight size={18} className="ml-2" />
              </Button>
           </form>

           <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 dark:text-zinc-400">
                Don't have an account?{" "}
                <a 
                  href="/signup"
                  className="font-medium text-munshi-indigo hover:text-munshi-teal"
                >
                  Sign up
                </a>
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
