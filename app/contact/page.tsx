import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Button, Input, Card } from '@/components/ui/UI';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

export default function ContactPage() {
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
            Get in Touch
          </h1>
          <p className="text-xl text-munshi-subtext dark:text-zinc-400 max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to our team and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8">
              <h2 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white mb-6">
                Send us a message
              </h2>
              <form className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="First Name" placeholder="Rajesh" />
                  <Input label="Last Name" placeholder="Kumar" />
                </div>
                <Input label="Email Address" type="email" placeholder="name@company.com" icon={<Mail size={16}/>} />
                <Input label="Phone Number" placeholder="+91 9876543210" icon={<Phone size={16}/>} />
                <div>
                  <label className="block text-sm font-medium text-munshi-subtext dark:text-zinc-400 mb-2">
                    How can we help?
                  </label>
                  <select className="w-full bg-white dark:bg-black border border-gray-200 dark:border-munshi-dark-border rounded-lg px-4 py-2.5 text-munshi-text dark:text-gray-100 outline-none">
                    <option>General Inquiry</option>
                    <option>Sales</option>
                    <option>Support</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-munshi-subtext dark:text-zinc-400 mb-2">
                    Message
                  </label>
                  <textarea 
                    className="w-full bg-white dark:bg-black border border-gray-200 dark:border-munshi-dark-border rounded-lg px-4 py-2.5 text-munshi-text dark:text-gray-100 outline-none resize-none h-32"
                    placeholder="Tell us more about your needs..."
                  ></textarea>
                </div>
                <Button className="w-full">
                  Send Message <Send size={16} className="ml-2" />
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white mb-6">
                  Other ways to reach us
                </h2>
                <div className="space-y-6">
                  <Card className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-munshi-indigo/10 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-munshi-indigo dark:text-white">
                        <Mail size={24} />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-munshi-indigo dark:text-white mb-1">Email</h3>
                        <p className="text-munshi-subtext dark:text-zinc-400 text-sm mb-2">Our team is here to help</p>
                        <a href="mailto:support@munshi.ai" className="text-munshi-teal dark:text-teal-400 hover:underline">
                          support@munshi.ai
                        </a>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-munshi-teal/10 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-munshi-teal dark:text-teal-400">
                        <Phone size={24} />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-munshi-indigo dark:text-white mb-1">Phone</h3>
                        <p className="text-munshi-subtext dark:text-zinc-400 text-sm mb-2">Mon-Fri from 9am to 6pm IST</p>
                        <a href="tel:+911234567890" className="text-munshi-teal dark:text-teal-400 hover:underline">
                          +91 123 456 7890
                        </a>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-munshi-indigo dark:text-white mb-1">Office</h3>
                        <p className="text-munshi-subtext dark:text-zinc-400 text-sm">
                          123 Business Park<br/>
                          Ahmedabad, Gujarat 380001<br/>
                          India
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              <Card className="p-6 bg-gradient-to-br from-munshi-indigo to-munshi-teal text-white">
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle size={24} />
                  <h3 className="font-heading font-semibold">Live Chat</h3>
                </div>
                <p className="text-sm text-white/80 mb-4">
                  Get instant answers to your questions. Our support team is available 24/7.
                </p>
                <Button variant="outline" className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30">
                  Start Chat
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
