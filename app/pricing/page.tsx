import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/UI';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '₹0',
      period: 'Forever Free',
      description: 'Perfect for freelancers and solo entrepreneurs',
      features: [
        'Up to 50 invoices/month',
        'Basic bank reconciliation',
        '1 user account',
        'Email support',
        'Mobile app access',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Pro',
      price: '₹999',
      period: 'per month',
      description: 'For growing businesses and startups',
      features: [
        'Unlimited invoices',
        'Automated GST filing',
        'Up to 5 users',
        'AI-powered insights',
        'Priority support',
        'Custom reports',
        'API access',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'Contact us',
      description: 'For large organizations with complex needs',
      features: [
        'Everything in Pro',
        'Unlimited users',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced security',
        'SLA guarantee',
        'On-premise deployment',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-munshi-indigo/5 dark:bg-zinc-800 border border-munshi-indigo/10 dark:border-zinc-700 text-munshi-indigo dark:text-zinc-300 text-sm font-medium mb-6">
            <Sparkles size={16} />
            14-day free trial on all plans
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-munshi-indigo dark:text-white mb-6">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-munshi-subtext dark:text-zinc-400 max-w-2xl mx-auto">
            Choose the perfect plan for your business. All plans include our core features with no hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-munshi-indigo dark:bg-white text-white dark:text-black shadow-2xl scale-105'
                    : 'bg-white dark:bg-munshi-dark-card border border-gray-200 dark:border-munshi-dark-border'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-munshi-gold rounded-full text-xs font-bold text-munshi-indigo">
                    MOST POPULAR
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`text-2xl font-heading font-bold mb-2 ${plan.popular ? '' : 'text-munshi-indigo dark:text-white'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.popular ? 'text-white/80 dark:text-black/70' : 'text-gray-600 dark:text-gray-400'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className={`text-sm ${plan.popular ? 'text-white/70 dark:text-black/60' : 'text-gray-500'}`}>/{plan.period}</span>}
                  </div>
                  {plan.price === 'Custom' && <p className={`text-sm mt-1 ${plan.popular ? 'text-white/70 dark:text-black/60' : 'text-gray-500'}`}>{plan.period}</p>}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={20} className={`flex-shrink-0 mt-0.5 ${plan.popular ? 'text-munshi-gold' : 'text-munshi-teal dark:text-teal-400'}`} />
                      <span className={`text-sm ${plan.popular ? 'text-white/90 dark:text-black/80' : 'text-gray-700 dark:text-gray-300'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-white text-munshi-indigo hover:bg-gray-100 dark:bg-black dark:text-white dark:hover:bg-zinc-900'
                      : ''
                  }`}
                  variant={plan.popular ? undefined : 'outline'}
                >
                  {plan.cta} <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50 dark:bg-zinc-900/50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold text-munshi-indigo dark:text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              { q: 'Can I switch plans later?', a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.' },
              { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, debit cards, UPI, and net banking.' },
              { q: 'Is there a setup fee?', a: 'No, there are no setup fees or hidden charges. You only pay for your subscription.' },
              { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription at any time. No questions asked.' },
            ].map((faq, i) => (
              <div key={i} className="bg-white dark:bg-munshi-dark-card rounded-xl p-6 border border-gray-200 dark:border-munshi-dark-border">
                <h3 className="font-heading font-semibold text-munshi-indigo dark:text-white mb-2">{faq.q}</h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-heading font-bold text-munshi-indigo dark:text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-munshi-subtext dark:text-zinc-400 mb-8">
            Join thousands of businesses using Munshi to automate their accounting.
          </p>
          <Link href="/signup">
            <Button size="lg" className="shadow-lg">
              Start Your Free Trial <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
