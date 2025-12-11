import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Button, Input, Card } from '@/components/ui/UI';
import { Calendar, ArrowRight } from 'lucide-react';

export default function BookDemoPage() {
  return (
    <div className="min-h-screen bg-munshi-white dark:bg-munshi-dark-bg">
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-munshi-dark-card/80 backdrop-blur-md border-b border-gray-100 dark:border-munshi-dark-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/"><Logo variant="full" size="md" /></Link>
          <Link href="/login"><Button variant="ghost" size="sm">Log In</Button></Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">Book a Demo</h1>
          <p className="text-xl text-munshi-subtext dark:text-zinc-400">See Munshi in action with a personalized walkthrough</p>
        </div>

        <Card className="p-8">
          <form className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="First Name" placeholder="Rajesh" />
              <Input label="Last Name" placeholder="Kumar" />
            </div>
            <Input label="Work Email" type="email" placeholder="name@company.com" />
            <Input label="Company Name" placeholder="TechSpace India" />
            <Input label="Phone Number" placeholder="+91 9876543210" />
            <div>
              <label className="block text-sm font-medium text-munshi-subtext dark:text-zinc-400 mb-2">Preferred Date & Time</label>
              <input type="datetime-local" className="w-full bg-white dark:bg-black border border-gray-200 dark:border-munshi-dark-border rounded-lg px-4 py-2.5 text-munshi-text dark:text-gray-100 outline-none" />
            </div>
            <Button className="w-full" size="lg">
              <Calendar size={18} className="mr-2" /> Schedule Demo
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
