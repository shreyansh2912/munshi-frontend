import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Button, Card } from '@/components/ui/UI';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';

export default function StatusPage() {
  const services = [
    { name: 'API', status: 'operational', uptime: '99.99%' },
    { name: 'Dashboard', status: 'operational', uptime: '100%' },
    { name: 'Bank Sync', status: 'operational', uptime: '99.95%' },
    { name: 'GST Filing', status: 'degraded', uptime: '98.5%' },
  ];

  return (
    <div className="min-h-screen bg-munshi-white dark:bg-munshi-dark-bg">
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-munshi-dark-card/80 backdrop-blur-md border-b border-gray-100 dark:border-munshi-dark-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/"><Logo variant="full" size="md" /></Link>
          <Link href="/signup"><Button size="sm">Get Started Free</Button></Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-16">
        <h1 className="text-4xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">System Status</h1>
        <p className="text-munshi-subtext dark:text-zinc-400 mb-8">Current operational status of all Munshi services</p>

        <Card className="p-6 mb-8 bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30">
          <div className="flex items-center gap-3">
            <CheckCircle size={24} className="text-green-600 dark:text-green-400" />
            <div>
              <h2 className="font-heading font-semibold text-green-900 dark:text-green-400">All Systems Operational</h2>
              <p className="text-sm text-green-700 dark:text-green-500">Last updated: Just now</p>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          {services.map((service, i) => (
            <Card key={i} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {service.status === 'operational' ? (
                    <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
                  ) : service.status === 'degraded' ? (
                    <AlertCircle size={20} className="text-yellow-600 dark:text-yellow-400" />
                  ) : (
                    <Circle size={20} className="text-red-600 dark:text-red-400" />
                  )}
                  <div>
                    <h3 className="font-medium text-munshi-text dark:text-white">{service.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{service.status}</p>
                  </div>
                </div>
                <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{service.uptime} uptime</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
