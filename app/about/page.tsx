import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/UI';
import { Target, Users, Zap, Award, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-munshi-white dark:bg-munshi-dark-bg">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-munshi-dark-card/80 backdrop-blur-md border-b border-gray-100 dark:border-munshi-dark-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <Logo variant="full" size="md" />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-munshi-indigo dark:text-white mb-6">
            Simplifying accounting for modern businesses
          </h1>
          <p className="text-xl text-munshi-subtext dark:text-zinc-400 max-w-2xl mx-auto">
            We're on a mission to make financial management accessible, intelligent, and effortless for every Indian business.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold text-munshi-indigo dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-munshi-subtext dark:text-zinc-400 mb-6">
                At Munshi, we believe that every business deserves access to world-class financial tools. We're building the future of accounting with AI-powered automation, seamless integrations, and intelligent insights.
              </p>
              <p className="text-lg text-munshi-subtext dark:text-zinc-400">
                From GST compliance to bank reconciliation, we handle the complexity so you can focus on growing your business.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Target, label: 'Mission-Driven', desc: 'Focused on empowering businesses' },
                { icon: Users, label: '10,000+ Users', desc: 'Trusted by businesses nationwide' },
                { icon: Zap, label: 'AI-Powered', desc: 'Cutting-edge automation' },
                { icon: Award, label: 'Award-Winning', desc: 'Recognized for innovation' },
              ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-munshi-dark-card border border-gray-200 dark:border-munshi-dark-border rounded-2xl p-6">
                  <div className="w-12 h-12 bg-munshi-indigo/10 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-munshi-indigo dark:text-white mb-4">
                    <item.icon size={24} />
                  </div>
                  <h3 className="font-heading font-semibold text-munshi-indigo dark:text-white mb-1">{item.label}</h3>
                  <p className="text-sm text-munshi-subtext dark:text-zinc-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-lg text-munshi-subtext dark:text-zinc-400">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Simplicity First', 
                desc: 'We believe complex problems deserve simple solutions. Every feature is designed to be intuitive and easy to use.' 
              },
              { 
                title: 'Customer Success', 
                desc: "Your success is our success. We're committed to providing exceptional support and continuous improvement." 
              },
              { 
                title: 'Innovation', 
                desc: 'We leverage the latest technology to stay ahead, bringing AI and automation to traditional accounting.' 
              },
            ].map((value, i) => (
              <div key={i} className="bg-white dark:bg-munshi-dark-card border border-gray-200 dark:border-munshi-dark-border rounded-2xl p-8">
                <h3 className="text-xl font-heading font-bold text-munshi-indigo dark:text-white mb-3">{value.title}</h3>
                <p className="text-munshi-subtext dark:text-zinc-400">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-heading font-bold text-munshi-indigo dark:text-white mb-4">
            Built by experts, for businesses
          </h2>
          <p className="text-lg text-munshi-subtext dark:text-zinc-400 mb-12 max-w-2xl mx-auto">
            Our team combines decades of experience in finance, technology, and design to create the best accounting platform for Indian businesses.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-munshi-indigo to-munshi-teal rounded-full mx-auto mb-4"></div>
                <h3 className="font-heading font-semibold text-munshi-indigo dark:text-white mb-1">Team Member {i}</h3>
                <p className="text-sm text-munshi-subtext dark:text-zinc-400">Position</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-munshi-indigo to-munshi-teal">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Join thousands of businesses using Munshi
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Start your free trial today. No credit card required.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-munshi-indigo hover:bg-gray-100">
              Get Started Free <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
