'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/ui/UI';
import { Logo } from '@/components/ui/Logo';
import { Building2, Users, ArrowRight, Check } from 'lucide-react';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [orgName, setOrgName] = useState('');
  const [orgType, setOrgType] = useState('');
  const router = useRouter();

  const handleComplete = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-munshi-white dark:bg-munshi-dark-bg flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <Logo variant="full" size="lg" className="mx-auto mb-6" />
          <h1 className="text-3xl font-heading font-bold text-munshi-indigo dark:text-white mb-2">
            Welcome to Munshi!
          </h1>
          <p className="text-munshi-subtext dark:text-zinc-400">
            Let's set up your account in just a few steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                step >= s 
                  ? 'bg-munshi-indigo border-munshi-indigo text-white dark:bg-white dark:border-white dark:text-black' 
                  : 'border-gray-300 dark:border-zinc-700 text-gray-400 dark:text-zinc-600'
              }`}>
                {step > s ? <Check size={20} /> : s}
              </div>
              {s < 3 && (
                <div className={`w-16 h-0.5 mx-2 ${
                  step > s ? 'bg-munshi-indigo dark:bg-white' : 'bg-gray-300 dark:bg-zinc-700'
                }`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white dark:bg-munshi-dark-card rounded-2xl shadow-xl border border-gray-100 dark:border-munshi-dark-border p-8">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-munshi-indigo/10 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Building2 size={32} className="text-munshi-indigo dark:text-white" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white mb-2">
                  Tell us about your business
                </h2>
                <p className="text-munshi-subtext dark:text-zinc-400">
                  This helps us customize your experience
                </p>
              </div>

              <Input 
                label="Organization Name" 
                placeholder="e.g. TechSpace India Pvt Ltd"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              />

              <div>
                <label className="block text-sm font-medium text-munshi-subtext dark:text-zinc-400 mb-2">
                  Business Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {['Sole Proprietorship', 'Partnership', 'Private Limited', 'LLP'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setOrgType(type)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        orgType === type
                          ? 'border-munshi-indigo bg-munshi-indigo/5 dark:border-white dark:bg-white/5'
                          : 'border-gray-200 dark:border-zinc-700 hover:border-munshi-indigo/50 dark:hover:border-zinc-600'
                      }`}
                    >
                      <p className="font-medium text-munshi-text dark:text-white">{type}</p>
                    </button>
                  ))}
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={() => setStep(2)}>
                Continue <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-munshi-teal/10 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users size={32} className="text-munshi-teal dark:text-teal-400" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white mb-2">
                  How many people will use Munshi?
                </h2>
                <p className="text-munshi-subtext dark:text-zinc-400">
                  You can always add more team members later
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {['Just me', '2-5 people', '6+ people'].map((size) => (
                  <button
                    key={size}
                    className="p-6 rounded-lg border-2 border-gray-200 dark:border-zinc-700 hover:border-munshi-teal dark:hover:border-teal-400 transition-all text-center"
                  >
                    <p className="font-medium text-munshi-text dark:text-white">{size}</p>
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button className="flex-1" size="lg" onClick={() => setStep(3)}>
                  Continue <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in-up text-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={40} className="text-green-600 dark:text-green-400" />
              </div>
              
              <h2 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white mb-2">
                You're all set!
              </h2>
              <p className="text-munshi-subtext dark:text-zinc-400 max-w-md mx-auto">
                Your account has been created successfully. Let's start managing your finances with Munshi.
              </p>

              <div className="pt-6">
                <Button className="w-full" size="lg" onClick={handleComplete}>
                  Go to Dashboard <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-zinc-500 mt-8">
          Need help? <a href="/support" className="text-munshi-indigo dark:text-indigo-400 hover:underline">Contact Support</a>
        </p>
      </div>
    </div>
  );
}
