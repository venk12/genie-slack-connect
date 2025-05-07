
import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { 
  CheckCircle, ChevronRight, Zap, 
  Server, Cloud, Settings, ArrowRight,
  Users, Shield, Database, CheckCircle2 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import WorkflowInfographic from "@/components/WorkflowInfographic";
import BenefitCard from "@/components/BenefitCard";

const Index = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  // Animation for sections as they come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    // Only select elements within the hero section
    const heroSection = document.querySelector(".hero-section");
    if (heroSection) {
      const animatedElements = heroSection.querySelectorAll(".animate-on-scroll");
      animatedElements.forEach((element) => {
        observer.observe(element);
      });

      return () => {
        animatedElements.forEach((element) => {
          observer.unobserve(element);
        });
      };
    }
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("signups")
        .insert([{ email, platform: "Slack" }]);

      if (error) throw error;
      
      toast("Success", {
        description: "Thanks for signing up! We'll keep you updated.",
      });
      setEmail("");
    } catch (error: any) {
      if (error.code === "23505") {
        // Unique constraint violation - email already exists
        toast("Already signed up!", { 
          description: "This email is already on our list."
        });
      } else {
        console.error("Error signing up:", error);
        toast("Something went wrong", { 
          description: "Please try again later."
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-['Segoe_UI',-apple-system,BlinkMacSystemFont,'Helvetica_Neue',Helvetica,Arial,sans-serif]">
      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-900/5 via-transparent to-amber-900/5" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-1" /> {/* Spacer */}
            <h1 className="text-2xl font-league-spartan text-center text-white tracking-tight">✨ genie/os</h1>
            <div className="flex-1 flex justify-end">
              <button
                onClick={() => scrollToSection(howItWorksRef)}
                className="text-gray-300 hover:text-white transition-colors font-medium mr-6"
              >
                How it works
              </button>
              <button
                onClick={() => scrollToSection(benefitsRef)}
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                Benefits
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section relative min-h-screen flex flex-col items-center justify-center py-52 section-transition">
        <div className="container mx-auto relative z-10 px-8">
          <div className="grid lg:grid-cols-2 items-center gap-8">
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left mb-10 lg:mb-0 stagger-fade-in space-y-6 animate-on-scroll opacity-0 px-6 lg:px-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Turn Slack into your team's AI command center
                  <span className="text-white">—in 5 minutes</span>
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-xl mx-auto lg:mx-0">
                Bring every model, chatbot, or custom agent you own straight into Slack so anyone can @mention insights on demand.
              </p>

              <div className="flex items-center justify-center lg:justify-start gap-4 py-4">
                <div className="flex items-center px-4 py-2 bg-opacity-10 bg-green-500 rounded-full border border-green-500/20">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm text-green-400">Trusted by 28 companies</span>
                </div>
                <div className="flex items-center px-4 py-2 bg-opacity-10 bg-blue-500 rounded-full border border-blue-500/20">
                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-sm text-blue-400">32,417 queries answered</span>
                </div>
              </div>

              {/* Email Signup Form */}
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 max-w-md mx-auto lg:mx-0 mt-8">
                <div className="flex-grow pb-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (!isValid) setIsValid(validateEmail(e.target.value));
                    }}
                    className={`bg-white/10 border-white/20 text-white h-11 sm:h-12 text-sm sm:text-base ${
                      !isValid ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {!isValid && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1 text-left">
                      Please enter a valid email address
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="h-11 sm:h-12 bg-gradient-to-r from-green-600 to-green-600 hover:from-green-800 hover:to-green-800 transition-all text-sm sm:text-base"
                  disabled={isLoading}
                >
                  <span>Join Early Access</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </form>
              <span className="text-xs opacity-75 block">Limited to 100 workspaces! Get concierge onboarding, priority support, and lifetime 20% discount.</span>
            </div>

            {/* Right Side - Chat Interface */}
            <div className="w-full lg:translate-x-8 xl:translate-x-12 lg:max-w-[90%] relative px-4 lg:px-0">
              {/* Background Highlight */}
              <div className="absolute -inset-4 bg-gradient-to-br from-yellow-400/5 via-amber-400/5 to-transparent rounded-2xl blur-3xl"></div>
              {/* Animated Chat Interface */}
              <div className="relative w-full max-w-lg mx-auto lg:ml-0 transform lg:scale-90 font-league-spartan">
                <div className="glass-card rounded-lg overflow-visible shadow-2xl">
                  {/* Chat Header */}
                  <div className="bg-white/5 p-2 sm:p-3 border-b border-white/10">
                    <div className="flex items-center">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500 mr-2"></div>
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500 mr-2"></div>
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500"></div>
                      <span className="ml-3 text-[10px] sm:text-xs text-gray-400"># ai-playground</span>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                    {/* Human Message */}
                    <div className="flex items-start space-x-2 sm:space-x-3 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-6 h-6 sm:w-8 sm:h-8 rounded" />
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium text-white text-sm sm:text-base">Sarah</span>
                          <span className="ml-2 text-[10px] sm:text-xs text-gray-400">11:30 AM</span>
                        </div>
                        <p className="text-gray-300 mt-1 text-sm sm:text-base"><span className="text-yellow-200">@genie - </span>
                         Can you help me analyze this dataset?
                        </p>
                      </div>
                    </div>

                    {/* Genie Response */}
                    <div className="flex items-start space-x-2 sm:space-x-3 animate-fade-in opacity-0" style={{ animationDelay: '0.7s' }}>
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded bg-gradient-to-r from-yellow-600 to-amber-600 flex items-center justify-center">
                        <span className="text-white text-[10px] sm:text-xs">✨</span>
                      </div>
                      <div className="flex-1 min-w-0 ">
                        <div className="flex items-center">
                          <span className="font-medium text-amber-500 text-sm sm:text-base">genie</span>
                          <span className="ml-2 text-[10px] sm:text-xs text-gray-400">11:31 AM</span>
                        </div>
                        <div className="mt-1 p-2 sm:p-3 bg-white/10 rounded-lg border border-amber-500/10 relative">
                          {/* Agent Indicators */}
                          <div className="absolute -right-14 space-y-2 hidden sm:block">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded bg-purple-500/20 border border-purple-500/20 p-1.5 flex items-center justify-center group relative">
                                <svg className="w-full h-full text-purple-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M21 5c0 1.1-2 2-2 2s-2-.9-2-2 2-2 2-2 2 .9 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M19 9V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M12 15H3v6h18v-6h-9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M3 15v-2c0-1.1.9-2 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M15 11h4c1.1 0 2 .9 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="m12 7 1.5-1.5c.8-.8 2.2-.8 3 0l1 1c.8.8.8 2.2 0 3L16 11h-4V7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                                <span className="absolute left-full ml-2 px-2 py-1 bg-white/20 rounded text-xs text-purple-300 opacity-100 transition-opacity whitespace-nowrap backdrop-blur-sm">
                                  Data Analysis Agent
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm sm:text-base">I'd be happy to help! I see you have a CSV file. Let me analyze the key trends...</p>
                          <div className="mt-2 h-16 sm:h-24 bg-white/5 rounded overflow-hidden">
                            <div className="h-full w-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 animate-pulse"></div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">@genie cut 6 hours of analyst time to 6 seconds</p>
                      </div>
                    </div>

                    {/* Typing Indicator */}
                    <div className="flex items-center space-x-2 animate-fade-in opacity-0" style={{ animationDelay: '2.2s' }}>
                      <div className="w-2 h-2 rounded-full bg-amber-500/50 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-amber-500/50 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-amber-500/50 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Teams Choose Section */}
      <section className="py-16 bg-black/90 relative">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Why teams choose genie/os</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass-card p-6 rounded-lg border border-white/10">
              <div className="text-green-400 mb-4">
                <Zap className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">6× faster answers</h3>
              <p className="text-gray-300">
                Marketing, sales, and product teams solve 80% of data questions without waiting on analysts.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-lg border border-white/10">
              <div className="text-blue-400 mb-4">
                <Settings className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Zero code setup</h3>
              <p className="text-gray-300">
                Connect OpenAI, local models, or internal APIs with a drag-and-drop dashboard.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-lg border border-white/10">
              <div className="text-amber-400 mb-4">
                <Server className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">One keyboard shortcut</h3>
              <p className="text-gray-300">
                Type "@genie" and talk to your AI like a teammate.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Proof Section */}
      <section className="py-16 bg-black relative">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Proof it works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 text-center">
              <h3 className="text-3xl font-bold text-amber-400 mb-2">32,417</h3>
              <p className="text-gray-300">questions answered last month for 28 companies</p>
            </div>
            
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 text-center">
              <h3 className="text-3xl font-bold text-green-400 mb-2">4.1 sec</h3>
              <p className="text-gray-300">average response time</p>
            </div>
            
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 text-center">
              <h3 className="text-3xl font-bold text-blue-400 mb-2">93%</h3>
              <p className="text-gray-300">of users say they'd be "very disappointed" if genie/os disappeared</p>
            </div>
          </div>
          
          {/* Testimonial */}
          <div className="glass-card p-8 rounded-lg border border-white/10 mt-12 max-w-3xl mx-auto">
            <p className="text-xl italic text-gray-300 mb-6">
              "genie/os turned five scattered AI tools into one Slack command. Adoption jumped from 12% to 79% in two weeks."
            </p>
            <div className="flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80" 
                alt="Sarah Johnson" 
                className="w-12 h-12 rounded-full mr-4 border-2 border-amber-400/50"
              />
              <div>
                <p className="font-semibold text-white">Sarah Johnson</p>
                <p className="text-gray-400 text-sm">AI Product Lead, Fortune 500 retailer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Workflow Element */}
      <section ref={howItWorksRef} className="py-20 bg-black relative">
        <div className="container mx-auto px-8 relative z-10">
          <h2 className="text-3xl font-bold mb-12 text-center">How it works</h2>
          <WorkflowInfographic />
          
          <div className="max-w-3xl mx-auto mt-16">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mr-4">
                  <span className="text-amber-500 font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Connect your AI sources (cloud, on-prem, or local)</h3>
                  <p className="text-gray-300">Easily integrate with existing models and tools you already use.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mr-4">
                  <span className="text-amber-500 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Pick the Slack channels where @genie should live</h3>
                  <p className="text-gray-300">Deploy your AI agents to the channels where they're needed most.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mr-4">
                  <span className="text-amber-500 font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Watch your team self-serve insights, reports, and content</h3>
                  <p className="text-gray-300">Team members simply @mention genie and ask questions in natural language.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 bg-black/90 relative">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Built for security</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <div className="text-green-400 mb-4">
                <Shield className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold mb-3">SOC 2 Type II compliant</h3>
              <p className="text-gray-300">
                Enterprise-grade security standards you can trust.
              </p>
            </div>
            
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <div className="text-blue-400 mb-4">
                <Cloud className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold mb-3">Data never leaves your cloud</h3>
              <p className="text-gray-300">
                Unless you explicitly configure it to do so.
              </p>
            </div>
            
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <div className="text-purple-400 mb-4">
                <Database className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold mb-3">Admin-level audit log</h3>
              <p className="text-gray-300">
                Complete visibility into all interactions and usage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        ref={benefitsRef}
        className="py-20 bg-black relative overflow-hidden"
      >
        <div className="container mx-auto px-8 relative z-10">
          <div className="mt-16 text-center" ref={benefitsRef}>
            <h3 className="text-4xl font-bold mb-4 text-white">Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <BenefitCard
                icon={<Zap className="w-8 h-8 text-yellow-400" />}
                title="Save Time"
                description="Your team can use AI tools right in Slack without switching apps."
              />
              <BenefitCard
                icon={<Shield className="w-8 h-8 text-green-400" />}
                title="Easy Setup"
                description="Connect all your AI tools in one place with no coding required."
              />
              <BenefitCard
                icon={<Users className="w-8 h-8 text-blue-400" />}
                title="Team Friendly"
                description="Everyone can use AI tools with simple Slack commands they already know."
              />
              <BenefitCard
                icon={<Database className="w-8 h-8 text-purple-400" />}
                title="Works Anywhere"
                description="Use with cloud tools or your own private AI models - your choice."
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-purple-900/20 z-0" />
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get Early Access
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Limited to 100 workspaces! Receive concierge onboarding, priority support, and lifetime 20% discount.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-grow">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (!isValid) setIsValid(validateEmail(e.target.value));
                  }}
                  className={`bg-white/10 border-white/20 text-white h-12 ${
                    !isValid ? "border-red-500" : ""
                  }`}
                  required
                />
              </div>
              <Button
                type="submit"
                className="h-11 sm:h-12 bg-gradient-to-r from-green-600 to-green-600 hover:from-green-800 hover:to-green-800 transition-all text-sm sm:text-base"
                disabled={isLoading}
              >
                <span>Join Now</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
            
            <div className="mt-16">
              <p className="text-gray-400 mb-4">Already powering:</p>
              <div className="flex flex-wrap justify-center items-center gap-8">
                <span className="text-gray-300 font-semibold">Atlassian</span>
                <span className="text-gray-300 font-semibold">TechStartup</span>
                <span className="text-gray-300 font-semibold">+ more</span>
              </div>
              <p className="text-gray-400 mt-4 text-sm">Ready to add your logo?</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-8 border-t border-white/10">
        <div className="container mx-auto px-8">
          <div className="text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} genie/os. All rights reserved.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
