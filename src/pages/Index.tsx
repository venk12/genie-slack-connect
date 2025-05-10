
import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { 
  CheckCircle, ChevronRight, Zap, 
  Server, Cloud, Settings, ArrowRight,
  Shield, Database, Slack, MessageSquare
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

      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Center - Title */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className="text-xl sm:text-2xl font-league-spartan text-white tracking-tight">✨ Genie</h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section relative min-h-screen flex flex-col items-center justify-center py-20 md:py-28 lg:py-40 section-transition">
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
                Bring any LLM, workflow, or custom agent you own - straight into Slack. Mention <span className="text-yellow-500"> @genie </span>
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
              <span className="text-xs opacity-75 block">Currently limited to 50 workspaces!
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

                  {/* Chat Body - with individual fade-in animations */}
                  <div className="p-4 space-y-4 bg-[#1a1d21] max-h-[70vh] md:max-h-[60vh] overflow-y-auto">
                    {/* Message - Sarah */}
                    <div className="opacity-0 animate-fade-in" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>
                      <Message
                        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                        name="Sarah"
                        time="11:03 AM"
                        text="Hey @raj @lena — we need to prep for the Acme Corp call tomorrow. Can someone pull highlights from their latest annual report?"
                      />
                    </div>

                    {/* Message - Raj */}
                    <div className="opacity-0 animate-fade-in" style={{animationDelay: '0.5s', animationFillMode: 'forwards'}}>
                      <Message
                        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Raj"
                        name="Raj"
                        time="11:04 AM"
                        text="I downloaded the 2024 report but haven't read through it yet."
                      />
                    </div>

                    {/* Message - Sarah calls genie */}
                    <div className="opacity-0 animate-fade-in" style={{animationDelay: '0.8s', animationFillMode: 'forwards'}}>
                      <Message
                        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                        name="Sarah"
                        time="11:04 AM"
                        text="@genie can you summarize the key takeaways?"
                      />
                    </div>

                    {/* genie summary */}
                    <div className="opacity-0 animate-fade-in" style={{animationDelay: '1.1s', animationFillMode: 'forwards'}}>
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
                    </div>

                    {/* Lena message */}
                    <div className="opacity-0 animate-fade-in" style={{animationDelay: '1.4s', animationFillMode: 'forwards'}}>
                      <Message
                        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Lena"
                        name="Lena"
                        time="11:06 AM"
                        text="@genie — what's our latest HubSpot activity with them?"
                      />
                    </div>

                    {/* genie CRM */}
                    <div className="opacity-0 animate-fade-in" style={{animationDelay: '1.7s', animationFillMode: 'forwards'}}>
                      <GenieMessage
                        time="11:06 AM"
                        title="CRM Activity:"
                        bullets={[
                          'Mar 14: Email opened (no reply)',
                          'Feb 22: Chat — asked about integrations',
                          'Mar 20: Opp paused (stage 2)'
                        ]}
                      />
                    </div>

                    {/* Raj - tech stack */}
                    <div className="opacity-0 animate-fade-in" style={{animationDelay: '2.0s', animationFillMode: 'forwards'}}>
                      <Message
                        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Raj"
                        name="Raj"
                        time="11:07 AM"
                        text="Can you confirm their tech stack too?"
                      />
                    </div>

                    {/* genie tech stack */}
                    <div className="opacity-0 animate-fade-in" style={{animationDelay: '2.3s', animationFillMode: 'forwards'}}>
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
                    </div>

                    {/* Sarah - wrap up */}
                    <div className="opacity-0 animate-fade-in" style={{animationDelay: '2.6s', animationFillMode: 'forwards'}}>
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
        </div>
      </section>

      {/* New "AI is changing communication" section */}
      <section className="py-16 md:py-20 bg-black/80 relative">
        <div className="container-fluid">
          <div className="max-w-4xl mx-auto text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              AI Is Changing Communication—But Let's Keep It Human.
            </h2>
            
            <div className="text-gray-300 space-y-4 text-base md:text-lg">
              <p>
                In today's digital world, AI is everywhere. It writes emails, generates reports, summarizes meetings—but every new AI tool can create distance between teams and the conversations that matter most. Sales, marketing, product—everyone is siloed in different tools, and human connection starts to get lost in the mix.
              </p>
              
              <p>
                Genie solves this problem. It's a Slack-native command center where any team member can instantly access the right AI, model, or workflow—no more jumping between platforms. With just one Slack command, your team gets the insights they need, fast.
              </p>
              
              <p>
                The result? AI doesn't replace human interaction. It makes it easier, faster, and more meaningful. Teams are aligned, decisions happen quickly, and communication stays at the heart of everything.
              </p>
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
          
          <div className="max-w-3xl mx-auto mt-12 md:mt-16 px-4 sm:px-0">
            <div className="space-y-6 md:space-y-12">
              {/* Step 1 - Connect AI sources with integration logos */}
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto md:mx-0 md:mr-4">
                  <span className="text-amber-500 font-bold">1</span>
                </div>
                <div className="md:flex-1">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-center md:text-left">Connect your AI sources (cloud, on-prem, or local)</h3>
                  <p className="text-sm md:text-base text-gray-300 mb-4 text-center md:text-left">Easily integrate with existing models and tools you already use.</p>
                  
                {/* Integration logos */}
                <div className="flex flex-col items-center mt-4">
                  {/* Icons Row */}
                  <div className="flex justify-center gap-6">
                    {/* AI Automation Tools */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex gap-4">
                        {/* Zapier */}
                        <div
                          className="bg-white p-3 rounded-lg border border-white/20 flex items-center justify-center h-16"
                          title="Zapier"
                        >
                          <img src="/lovable-uploads/5d9a871e-8766-443f-afa9-bd39d693e969.png" alt="n8n" className="h-10 w-auto" />
                        </div>
                        {/* n8n */}
                        <div
                          className="bg-white p-3 rounded-lg border border-white/20 flex items-center justify-center w-16 h-16"
                          title="n8n"
                        >
                          <img src="/lovable-uploads/3dd25075-1a49-4b19-bfc3-830d0274bdb1.png" alt="n8n" className="h-10 w-auto" />
                        </div>
                        {/* Make */}
                        <div
                          className="bg-white p-3 rounded-lg border border-white/20 flex items-center justify-center w-16 h-16"
                          title="Make"
                        >
                          <img src="/lovable-uploads/8ae929a3-99a1-49bc-b593-21c8d5ea6edb.png" alt="Make" className="h-10 w-auto" />
                        </div>
                      </div>
                      <p className="text-xs text-white/60 mt-1">AI Automation Tools</p>
                    </div>

                    {/* Divider */}
                    <div className="border-l border-white/20 h-16 mx-2"></div>

                    {/* Cloud LLM Provider */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex gap-4">
                        {/* Claude */}
                        <div
                          className="bg-white p-3 rounded-lg border border-white/20 flex items-center justify-center w-16 h-16"
                          title="Claude"
                        >
                          <img src="/lovable-uploads/d0576a9a-259f-4374-8e19-ce3c0217f161.png" alt="Claude" className="h-10 w-auto" />
                        </div>
                      </div>
                      <p className="text-xs text-white/60 mt-1">Cloud LLM Provider</p>
                    </div>

                    {/* Divider */}
                    <div className="border-l border-white/20 h-16 mx-2"></div>

                    {/* Local LLMs */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex gap-4">
                        {/* LLMstudio */}
                        <div
                          className="bg-white p-3 rounded-lg border border-white/20 flex items-center justify-center w-16 h-16"
                          title="LLMstudio"
                        >
                          <img src="/lovable-uploads/16d4d0e0-1d05-4fae-936e-67a30e7758f7.png" alt="LLMstudio" className="h-10 w-auto" />
                        </div>
                      </div>
                      <p className="text-xs text-white/60 mt-1">Local LLMs</p>
                    </div>
                    
                    {/* MCP Servers */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex gap-4">
                        {/* MCP Servers */}
                        <div
                          className="bg-white p-3 rounded-lg border border-white/20 flex items-center justify-center w-16 h-16"
                          title="MCPservers"
                        >
                          <img src="/lovable-uploads/sd982398-2319-4323-349as-3014716730.png" alt="MCP Servers" className="h-10 w-auto" />
                        </div>
                      </div>
                      <p className="text-xs text-white/60 mt-1">MCP Servers</p>
                    </div>
                    
                  </div>
                </div>
                </div>
              </div>
              
              {/* Step 2 - Add to Slack channels with Slack channels infographic */}
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto md:mx-0 md:mr-4">
                  <span className="text-amber-500 font-bold">2</span>
                </div>
                <div className="md:flex-1">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-center md:text-left">Pick the Slack channels where @genie should live</h3>
                  <p className="text-sm md:text-base text-gray-300 mb-4 text-center md:text-left">Deploy your AI agents to the channels where they're needed most.</p>
                  
                  {/* Slack channels infographic */}
                  <div className="bg-[#1A1D21]/80 rounded-lg border border-white/10 p-4 mt-4">
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-xs">#</span>
                        <span className="text-white font-semibold">sales-team</span>
                        <span className="ml-auto text-green-400 text-xs flex items-center">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                          Active
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-xs">#</span>
                        <span className="text-white font-semibold">marketing</span>
                        <span className="ml-auto text-green-400 text-xs flex items-center">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                          Active
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-xs">#</span>
                        <span className="text-white font-semibold">product-team</span>
                        <span className="ml-auto text-gray-400 text-xs flex items-center">
                          <span className="w-2 h-2 bg-gray-400 rounded-full mr-1"></span>
                          Inactive
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-xs">#</span>
                        <span className="text-white font-semibold">general</span>
                        <span className="ml-auto text-green-400 text-xs flex items-center">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 3 - Use @genie mention */}
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto md:mx-0 md:mr-4">
                  <span className="text-amber-500 font-bold">3</span>
                </div>
                <div className="md:flex-1">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-center md:text-left">Watch your team self-serve insights, reports, and content</h3>
                  <p className="text-sm md:text-base text-gray-300 mb-4 text-center md:text-left">Team members simply @mention genie and ask questions in natural language.</p>
                  
                  {/* @genie mention infographic */}
                  <div className="bg-[#1A1D21]/80 rounded-lg border border-white/10 p-4 mt-4">
                    <div className="flex items-start space-x-3">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="User" className="w-8 h-8 rounded" />
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium text-white">Alex</span>
                          <span className="ml-2 text-xs text-gray-400">Just now</span>
                        </div>
                        <p className="text-gray-300 mt-1">
                          <span className="text-yellow-300">@genie</span> Can you research Acme Corp's tech stack changes in the last quarter and suggest discussion points for tomorrow's meeting?
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 mt-3">
                      <div className="w-8 h-8 rounded bg-gradient-to-r from-yellow-600 to-amber-600 flex items-center justify-center">
                        <span className="text-white text-xs">✨</span>
                      </div>
                      {/* start */}
                      <div className="p-4 text-sm text-white font-sans max-w-md">
                        <div className="flex items-top">
                          <span className="font-medium text-amber-500">genie</span>
                          <span className="ml-2 text-xs text-gray-400">Just now</span>
                        </div>

                        <p className="text-gray-300 mt-1 italic">
                          Looking up information...
                        </p>

                        <div className="flex items-center mt-4">
                          <div className="w-4 h-4 mr-2">
                            <div className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full"></div>
                          </div>
                          <p className="text-gray-200">Researching news articles (via Zapier)</p>
                        </div>

                        <div className="flex items-center mt-2">
                          <div className="w-4 h-4 mr-2">
                            <div className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full"></div>
                          </div>
                          <p className="text-gray-200">Researching HubSpot context (via HubSpot MCP)</p>
                        </div>

                        <div className="flex items-center mt-2">
                          <div className="w-4 h-4 mr-2">
                            <div className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full"></div>
                          </div>
                          <p className="text-gray-200">Consolidating all the information</p>
                        </div>

                        <div className="mt-4 text-green-300">
                          ✅ Here's the consolidated research from all sources.
                        </div>
                      </div>
                      {/* end */}
                    </div>
                  </div>
                </div>
              </div>
              {/*Step 4 */}
              {/* Step 4 - Centralized agent management */}  
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto md:mx-0 md:mr-4">
                  <span className="text-amber-500 font-bold">4</span>
                </div>
                <div className="md:flex-1">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-center md:text-left">Manage all your agents and automations in one place</h3>
                  <p className="text-sm md:text-base text-gray-300 mb-4 text-center md:text-left">Easily add, update, or remove agents from a centralized dashboard—whether it's a Zapier automation or a local workflow.</p>

                  {/* Agent Management Infographic */}
                  <div className="bg-[#1A1D21]/80 rounded-lg border border-white/10 p-4 mt-4">
                    <div className="text-white text-sm font-mono">
                      <div className="grid grid-cols-4 text-xs text-white/60 border-b border-white/10 pb-2 mb-2">
                        <div>Agent</div>
                        <div>Status</div>
                        <div>Type</div>
                        <div className="text-right">Actions</div>
                      </div>

                      {/* Sample row - Zapier Agent */}
                      <div className="grid grid-cols-4 items-center py-2 border-b border-white/5">
                        <div>Lead Enrichment</div>
                        <div><span className="text-green-400">Active</span></div>
                        <div>Zapier</div>
                        <div className="text-right text-white/50 space-x-2">
                          <button className="hover:text-amber-400">✏️</button>
                          <button className="hover:text-red-400">🗑️</button>
                        </div>
                      </div>

                      {/* Sample row - Custom Agent */}
                      <div className="grid grid-cols-4 items-center py-2 border-b border-white/5">
                        <div>HubSpot Context</div>
                        <div><span className="text-green-400">Active</span></div>
                        <div>Custom MCP</div>
                        <div className="text-right text-white/50 space-x-2">
                          <button className="hover:text-amber-400">✏️</button>
                          <button className="hover:text-red-400">🗑️</button>
                        </div>
                      </div>

                      {/* Add New Agent Button */}
                      <div className="mt-3 text-center">
                        <button className="bg-amber-500/10 text-amber-400 px-3 py-1 text-xs rounded hover:bg-amber-500/20">
                          + Add New Agent
                        </button>
                      </div>
                    </div>
                  </div>
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
              Limited to 20 workspaces! Receive custom onboarding, priority support, and lifetime 10% discount.
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
                <span>Try Early Access</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
            
            {/* <div className="mt-12 md:mt-16">
              <p className="text-gray-400 mb-4">Already powering:</p>
              <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
                <span className="text-gray-300 font-semibold">Atlassian</span>
                <span className="text-gray-300 font-semibold">TechStartup</span>
                <span className="text-gray-300 font-semibold">+ more</span>
              </div>
              <p className="text-gray-400 mt-4 text-sm">Ready to summon the genie?</p>
            </div> */}
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

