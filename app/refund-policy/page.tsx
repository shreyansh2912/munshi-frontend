import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/UI';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-munshi-white dark:bg-munshi-dark-bg">
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-munshi-dark-card/80 backdrop-blur-md border-b border-gray-100 dark:border-munshi-dark-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/"><Logo variant="full" size="md" /></Link>
          <Link href="/signup"><Button size="sm">Get Started Free</Button></Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-16">
        <h1 className="text-4xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">Refund Policy</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Last updated: December 11, 2024</p>

        <div className="prose dark:prose-invert max-w-none space-y-6 text-munshi-text dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">30-Day Money-Back Guarantee</h2>
            <p>We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied with Munshi, contact us within 30 days of your purchase for a full refund.</p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">Refund Process</h2>
            <p>To request a refund, email support@munshi.ai with your account details. Refunds are processed within 5-7 business days to the original payment method.</p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">Exceptions</h2>
            <p>Refunds are not available for custom enterprise plans or after the 30-day period. Annual subscriptions are prorated if cancelled mid-term.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
