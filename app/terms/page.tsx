import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/UI';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-munshi-white dark:bg-munshi-dark-bg">
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-munshi-dark-card/80 backdrop-blur-md border-b border-gray-100 dark:border-munshi-dark-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/"><Logo variant="full" size="md" /></Link>
          <Link href="/signup"><Button size="sm">Get Started Free</Button></Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-16">
        <h1 className="text-4xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">Terms of Service</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Last updated: December 11, 2024</p>

        <div className="prose dark:prose-invert max-w-none space-y-6 text-munshi-text dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using Munshi, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">2. Use License</h2>
            <p>Permission is granted to temporarily use Munshi for personal or commercial purposes. This is the grant of a license, not a transfer of title.</p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">3. User Responsibilities</h2>
            <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">4. Service Modifications</h2>
            <p>Munshi reserves the right to modify or discontinue the service with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
