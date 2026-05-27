"use client"

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "~/hooks/api/auth";
import { toast } from "sonner";
import { 
  ArrowRight, 
  BarChart2, 
  Layers, 
  LayoutTemplate, 
  MessageSquare, 
  Users, 
  Zap,
  Sparkles,
  Lock,
  Download,
  Globe,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function Home() {
  const { user } = useUser() as any;
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleProtectedAction = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (!user) {
      toast.error("Sign in required", {
        description: "New user? Register here.",
      });
      router.push("/login");
    } else {
      router.push(path);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-['DM_Sans',sans-serif] selection:bg-indigo-500/30">
      
      {/* Navigation */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-lg border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">Streamyst</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#templates" className="hover:text-white transition-colors">Templates</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <Link href="/forms" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                Dashboard
              </Link>
            ) : (
              <Link href="/login" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                Sign in
              </Link>
            )}
            <button 
              onClick={(e) => handleProtectedAction(e, "/forms/create")}
              className="bg-white text-black hover:bg-zinc-200 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0a0a0f] to-[#0a0a0f] -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            The modern way to collect data
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1]">
            Build beautiful forms <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">in minutes.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Create surveys, feedback forms, lead capture forms and registrations without writing code.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={(e) => handleProtectedAction(e, "/forms")}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-indigo-500/25 w-full sm:w-auto justify-center"
            >
              Start Building <ArrowRight className="w-5 h-5" />
            </button>
            <a 
              href="#features"
              className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all w-full sm:w-auto justify-center"
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* Visual / Screenshots Preview */}
      <section className="py-12 bg-[#0d0d14] border-y border-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-2xl border border-white/[0.1] bg-[#0a0a0f] shadow-2xl overflow-hidden max-w-5xl mx-auto">
            {/* Mockup Header */}
            <div className="h-12 border-b border-white/[0.05] bg-white/[0.02] flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="ml-4 flex gap-4 text-xs font-medium text-zinc-500">
                <span className="text-zinc-300">Dashboard</span>
                <span>Field Builder</span>
                <span>Analytics</span>
              </div>
            </div>
            {/* Mockup Content */}
            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center justify-center min-h-[300px]">
              {/* Visuals can be added here or screenshots displayed */}
              <div className="flex-1 space-y-4 w-full">
                <div className="h-8 w-1/3 bg-white/[0.05] rounded-lg mb-8" />
                <div className="h-12 w-full bg-white/[0.03] border border-white/[0.05] rounded-xl" />
                <div className="h-12 w-full bg-white/[0.03] border border-white/[0.05] rounded-xl" />
                <div className="h-12 w-3/4 bg-white/[0.03] border border-white/[0.05] rounded-xl" />
              </div>
              <div className="w-full md:w-64 space-y-4 border-l border-white/[0.05] md:pl-8">
                <div className="h-6 w-1/2 bg-white/[0.05] rounded mb-6" />
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-10 bg-indigo-500/20 border border-indigo-500/30 rounded-lg" />
                  <div className="h-10 bg-white/[0.03] border border-white/[0.05] rounded-lg" />
                  <div className="h-10 bg-white/[0.03] border border-white/[0.05] rounded-lg" />
                  <div className="h-10 bg-white/[0.03] border border-white/[0.05] rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Powerful features to help you build, share, and analyze your forms.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={Layers} title="Drag & drop builder" desc="Create forms intuitively without writing a single line of code." />
            <FeatureCard icon={BarChart2} title="Real-time analytics" desc="Track views, responses, and conversion rates instantly." />
            <FeatureCard icon={Users} title="Response management" desc="View, filter, and manage your submissions with ease." />
            <FeatureCard icon={Lock} title="Password protected forms" desc="Secure your forms and limit access to specific users." />
            <FeatureCard icon={Download} title="Export CSV" desc="Download all your submission data in one click." />
            <FeatureCard icon={Globe} title="Public sharing" desc="Share secure links to your hosted forms anywhere." />
          </div>
        </div>
      </section>

      {/* Templates Preview Section */}
      <section id="templates" className="py-24 bg-[#0d0d14] border-y border-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start with a template</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">Don't want to start from scratch? Use our pre-built templates to get running in seconds.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Customer Feedback", icon: MessageSquare, color: "text-blue-400", bg: "bg-blue-500/10" },
              { title: "Lead Generation", icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10" },
              { title: "Job Application", icon: LayoutTemplate, color: "text-emerald-400", bg: "bg-emerald-500/10" },
              { title: "Event Registration", icon: Globe, color: "text-purple-400", bg: "bg-purple-500/10" },
            ].map((t, i) => (
              <div key={i} className="group p-6 rounded-2xl bg-[#0a0a0f] border border-white/[0.05] hover:border-indigo-500/50 transition-all cursor-pointer">
                <div className={`w-10 h-10 rounded-xl ${t.bg} flex items-center justify-center mb-6`}>
                  <t.icon className={`w-5 h-5 ${t.color}`} />
                </div>
                <h3 className="font-bold mb-2">{t.title}</h3>
                <button onClick={(e) => handleProtectedAction(e, "/forms/create")} className="text-sm font-medium text-zinc-500 group-hover:text-indigo-400 transition-colors flex items-center gap-1">
                  Use template <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">Start for free, upgrade when you need more power.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900/40">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <div className="text-4xl font-bold mb-6">₹0 <span className="text-lg text-zinc-500 font-normal">/month</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-zinc-300"><CheckCircle2 className="w-5 h-5 text-indigo-400" /> 3 Forms</li>
                <li className="flex items-center gap-3 text-zinc-300"><CheckCircle2 className="w-5 h-5 text-indigo-400" /> 100 responses</li>
                <li className="flex items-center gap-3 text-zinc-500"><CheckCircle2 className="w-5 h-5 opacity-50" /> Basic templates</li>
              </ul>
              <button onClick={(e) => handleProtectedAction(e, "/forms")} className="w-full py-3 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition-colors font-semibold">
                Get Started
              </button>
            </div>
            
            <div className="p-8 rounded-3xl border border-indigo-500/30 bg-indigo-500/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="text-4xl font-bold mb-6">₹499 <span className="text-lg text-zinc-500 font-normal">/month</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-zinc-300"><CheckCircle2 className="w-5 h-5 text-indigo-400" /> Unlimited forms</li>
                <li className="flex items-center gap-3 text-zinc-300"><CheckCircle2 className="w-5 h-5 text-indigo-400" /> Unlimited responses</li>
                <li className="flex items-center gap-3 text-zinc-300"><CheckCircle2 className="w-5 h-5 text-indigo-400" /> Real-time Analytics</li>
                <li className="flex items-center gap-3 text-zinc-300"><CheckCircle2 className="w-5 h-5 text-indigo-400" /> CSV Export</li>
                <li className="flex items-center gap-3 text-zinc-300"><CheckCircle2 className="w-5 h-5 text-indigo-400" /> Password protection</li>
              </ul>
              <Link href="/pricing" className="block text-center w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-colors font-semibold text-white">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-[#0d0d14] border-y border-white/[0.02]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              { q: "Can I create unlimited forms?", a: "Yes, on our Pro plan you can create as many forms as you need without limits." },
              { q: "Do forms support analytics?", a: "Absolutely. Real-time analytics, including views, responses, and drop-off rates are built-in." },
              { q: "Can I export responses?", a: "Yes. You can export all your form submissions to a CSV file anytime from the dashboard on the Pro plan." },
            ].map((faq, i) => (
              <div key={i} className="rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-zinc-400">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span className="font-bold tracking-tight">Streamyst</span>
          </div>
          
          <div className="flex gap-6 text-sm text-zinc-500">
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-white transition-colors">Documentation</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: React.ElementType, title: string, desc: string }) {
  return (
    <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:bg-zinc-900/80 transition-colors">
      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-indigo-400" />
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm">{desc}</p>
    </div>
  );
}
