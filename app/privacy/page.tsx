import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/UI';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-munshi-white dark:bg-munshi-dark-bg">
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-munshi-dark-card/80 backdrop-blur-md border-b border-gray-100 dark:border-munshi-dark-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/"><Logo variant="full" size="md" /></Link>
          <Link href="/signup"><Button size="sm">Get Started Free</Button></Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-16">
        <h1 className="text-4xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">Privacy Policy</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Last updated: December 11, 2024</p>

        <div className="prose dark:prose-invert max-w-none space-y-6 text-munshi-text dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">Information We Collect</h2>
            <p>We collect information you provide directly to us, including name, email address, company information, and financial data necessary to provide our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages.</p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing and accidental loss, destruction, or damage.</p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">Your Rights</h2>
            <p>You have the right to access, update, or delete your personal information at any time. You may also object to processing of your personal data or request data portability.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
