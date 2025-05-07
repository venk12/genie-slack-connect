
import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { 
  CheckCircle, ChevronRight, Zap, 
  Server, Cloud, Settings, ArrowRight,
  Shield, Database
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import WorkflowInfographic from "@/components/WorkflowInfographic";
import { Message, GenieMessage } from "@/components/ChatMessage";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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
        <div className="container-fluid">
          <div className="flex items-center justify-between h-16">
            <div className="flex-1" /> {/* Spacer */}
            <h1 className="text-2xl font-league-spartan text-center text-white tracking-tight">✨ genie/os</h1>
            <div className="flex-1 flex justify-end">
              <button
                onClick={() => scrollToSection(howItWorksRef)}
                className="text-gray-300 hover:text-white transition-colors font-medium mr-6 text-sm md:text-base"
              >
                How it works
              </button>
              <button
                onClick={() => scrollToSection(benefitsRef)}
                className="text-gray-300 hover:text-white transition-colors font-medium text-sm md:text-base"
              >
                Benefits
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section relative min-h-screen flex flex-col items-center justify-center py-20 md:py-32 lg:py-52 section-transition">
        <div className="container-fluid relative z-10">
          <div className="grid lg:grid-cols-2 items-center gap-8">
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left mb-10 lg:mb-0 stagger-fade-in space-y-4 md:space-y-6 animate-on-scroll opacity-0 px-4 sm:px-6 lg:px-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Turn Slack into your team's AI command center
                  <span className="text-white"> - in 5 minutes</span>
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-xl mx-auto lg:mx-0">
                Bring any model, workflow, or custom agent you own straight into Slack so anyone can @mention insights on demand.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 py-4">
                <div className="flex items-center px-4 py-2 bg-opacity-10 bg-green-500 rounded-full border border-green-500/20 w-full sm:w-auto">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-green-400">Trusted by 28 companies</span>
                </div>
                <div className="flex items-center px-4 py-2 bg-opacity-10 bg-blue-500 rounded-full border border-blue-500/20 w-full sm:w-auto">
                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-blue-400">32,417 queries answered</span>
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
              <span className="text-xs opacity-75 block">Currently limited to 100 workspaces!
                 Get high-touch onboarding, priority slack support, and lifetime 15% discount by signing up here</span>
            </div>

            {/* Right Side - Chat Interface */}
            <div className="w-full lg:translate-x-8 xl:translate-x-12 lg:max-w-[90%] relative px-4 lg:px-0">
              {/* Background Highlight */}
              <div className="absolute -inset-4 bg-gradient-to-br from-yellow-400/5 via-amber-400/5 to-transparent rounded-2xl blur-3xl"></div>

              {/* Animated Chat Interface */}
              <div className="relative w-full max-w-lg mx-auto lg:ml-0 transform lg:scale-90 font-league-spartan">
                <div className="glass-card rounded-lg overflow-visible shadow-2xl">
                  
                  {/* Chat Header */}
                  <div className="bg-[#1d1f23] p-2 sm:p-3 border-b border-white/10">
                    <div className="flex items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 mr-2"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                      <span className="ml-3 text-xs text-gray-400">#research-acme</span>
                    </div>
                  </div>

                  {/* Chat Body */}
                  <div className="p-4 space-y-4 bg-[#1a1d21]">
                    {/* Message - Sarah */}
                    <Message
                      avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                      name="Sarah"
                      time="11:03 AM"
                      text="Hey @raj @lena — we need to prep for the Acme Corp call tomorrow. Can someone pull highlights from their latest annual report?"
                    />

                    {/* Message - Raj */}
                    <Message
                      avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Raj"
                      name="Raj"
                      time="11:04 AM"
                      text="I downloaded the 2024 report but haven't read through it yet."
                    />

                    {/* Message - Sarah calls genie */}
                    <Message
                      avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                      name="Sarah"
                      time="11:04 AM"
                      text="@genie can you summarize the key takeaways?"
                    />

                    {/* genie summary */}
                    <GenieMessage
                      time="11:05 AM"
                      title="Summary (2024 Annual Report):"
                      bullets={[
                        'Revenue: $245M (+8% YoY)',
                        'Focus: automation for logistics',
                        'Markets: LATAM, Southeast Asia',
                        'Risks: margin pressure, supply chain'
                      ]}
                    />

                    {/* Lena message */}
                    <Message
                      avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Lena"
                      name="Lena"
                      time="11:06 AM"
                      text="@genie — what's our latest HubSpot activity with them?"
                    />

                    {/* genie CRM */}
                    <GenieMessage
                      time="11:06 AM"
                      title="CRM Activity:"
                      bullets={[
                        'Mar 14: Email opened (no reply)',
                        'Feb 22: Chat — asked about integrations',
                        'Mar 20: Opp paused (stage 2)'
                      ]}
                    />

                    {/* Raj - tech stack */}
                    <Message
                      avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Raj"
                      name="Raj"
                      time="11:07 AM"
                      text="Can you confirm their tech stack too?"
                    />

                    {/* genie tech stack */}
                    <GenieMessage
                      time="11:07 AM"
                      title="Tech Stack:"
                      bullets={[
                        'CRM: HubSpot',
                        'Automation: Tray.io',
                        'Analytics: Looker, Amplitude',
                        'Support: Intercom'
                      ]}
                    />

                    {/* Sarah - wrap up */}
                    <Message
                      avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                      name="Sarah"
                      time="11:08 AM"
                      text="Perfect — saved me a deep dive. Let's move fast on this."
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Teams Choose Section */}
      <section className="py-12 md:py-16 bg-black/90 relative">
        <div className="container-fluid">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">Why teams choose genie/os</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="glass-card p-5 md:p-6 rounded-lg border border-white/10">
              <div className="text-green-400 mb-4">
                <Zap className="w-8 md:w-10 h-8 md:h-10" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">6× faster answers</h3>
              <p className="text-sm md:text-base text-gray-300">
                Marketing, sales, and product teams solve 80% of data questions without waiting on analysts.
              </p>
            </div>
            
            <div className="glass-card p-5 md:p-6 rounded-lg border border-white/10">
              <div className="text-blue-400 mb-4">
                <Settings className="w-8 md:w-10 h-8 md:h-10" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Zero code setup</h3>
              <p className="text-sm md:text-base text-gray-300">
                Connect OpenAI, local models, or internal APIs with an easy interface.
              </p>
            </div>
            
            <div className="glass-card p-5 md:p-6 rounded-lg border border-white/10">
              <div className="text-amber-400 mb-4">
                <Server className="w-8 md:w-10 h-8 md:h-10" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">One keyboard shortcut</h3>
              <p className="text-sm md:text-base text-gray-300">
                Type "@genie" and talk to your AI like a teammate.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Visual Workflow Element */}
      <section ref={howItWorksRef} className="py-16 md:py-20 bg-black relative">
        <div className="container-fluid relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">How it works</h2>
          <WorkflowInfographic />
          
          <div className="max-w-3xl mx-auto mt-12 md:mt-16 px-4 sm:px-0">
            <div className="space-y-6 md:space-y-8">
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-0">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto md:mx-0 md:mr-4">
                  <span className="text-amber-500 font-bold">1</span>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Connect your AI sources (cloud, on-prem, or local)</h3>
                  <p className="text-sm md:text-base text-gray-300">Easily integrate with existing models and tools you already use.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-0">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto md:mx-0 md:mr-4">
                  <span className="text-amber-500 font-bold">2</span>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Pick the Slack channels where @genie should live</h3>
                  <p className="text-sm md:text-base text-gray-300">Deploy your AI agents to the channels where they're needed most.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-0">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto md:mx-0 md:mr-4">
                  <span className="text-amber-500 font-bold">3</span>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Watch your team self-serve insights, reports, and content</h3>
                  <p className="text-sm md:text-base text-gray-300">Team members simply @mention genie and ask questions in natural language.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section - Streamlined */}
      <section ref={benefitsRef} className="py-12 md:py-16 bg-black/90 relative">
        <div className="container-fluid">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">Built for productivity, ease of use & security</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-8 md:mb-16">
            <div className="bg-white/5 p-5 md:p-6 rounded-lg border border-white/10">
              <div className="text-purple-400 mb-4">
                <Database className="w-8 md:w-10 h-8 md:h-10" />
              </div>
              <h3 className="text-lg font-bold mb-2 md:mb-3">Admin-level audit log</h3>
              <p className="text-sm md:text-base text-gray-300">
                Complete visibility into all interactions and usage.
              </p>
            </div>
            
            <div className="bg-white/5 p-5 md:p-6 rounded-lg border border-white/10">
              <div className="text-green-400 mb-4">
                <Shield className="w-8 md:w-10 h-8 md:h-10" />
              </div>
              <h3 className="text-lg font-bold mb-2 md:mb-3">Enterprise-grade security</h3>
              <p className="text-sm md:text-base text-gray-300">
                Protection for your most sensitive company data.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-purple-900/20 z-0" />
        <div className="container-fluid relative z-10">
          <div className="max-w-3xl mx-auto text-center px-4 sm:px-0">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
              Get Early Access
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8">
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
                  className={`bg-white/10 border-white/20 text-white h-11 sm:h-12 ${
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
            
            <div className="mt-12 md:mt-16">
              <p className="text-gray-400 mb-4">Already powering:</p>
              <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
                <span className="text-gray-300 font-semibold">Atlassian</span>
                <span className="text-gray-300 font-semibold">TechStartup</span>
                <span className="text-gray-300 font-semibold">+ more</span>
              </div>
              <p className="text-gray-400 mt-4 text-sm">Ready to summon the genie?</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-6 md:py-8 border-t border-white/10">
        <div className="container-fluid">
          <div className="text-center text-gray-400 text-xs md:text-sm">
            <p>© {new Date().getFullYear()} genie/os. All rights reserved.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
