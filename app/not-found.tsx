import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/UI';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-munshi-white dark:bg-munshi-dark-bg flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <Logo variant="icon" size="xl" className="mx-auto mb-8 opacity-50" />
        
        <h1 className="text-9xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">Page Not Found</h2>
        <p className="text-munshi-subtext dark:text-zinc-400 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              <Home size={16} className="mr-2" /> Go Home
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="w-full sm:w-auto">
              <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-zinc-800">
          <p className="text-sm text-gray-500 dark:text-zinc-500">
            Need help? <Link href="/support" className="text-munshi-indigo dark:text-indigo-400 hover:underline">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
