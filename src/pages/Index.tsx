import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { 
  CheckCircle, ChevronRight, Zap, 
  Server, Cloud, Settings, ArrowRight,
  Users, Shield, Database 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import WorkflowInfographic from "@/components/WorkflowInfographic";
import BenefitCard from "@/components/BenefitCard";
import MessagingPlatformAnimation from "@/components/MessagingPlatformAnimation";
import IMSelector from "@/components/IMSelector";
import { useIMContext } from "@/contexts/IMContext";

const Index = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const { selectedIM, otherIMName } = useIMContext();

  // Get the display name for the selected IM
  const getIMDisplayName = () => {
    if (selectedIM.id === "other" && otherIMName) {
      return otherIMName;
    }
    return selectedIM.name;
  };

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
        .insert([{ email, platform: getIMDisplayName() }]);

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
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex-1" /> {/* Spacer */}
            <h1 className="text-2xl font-league-spartan text-center text-white tracking-tight">✨ genie/os</h1>
            <div className="flex-1 flex justify-end">
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
      <section className="hero-section relative min-h-screen flex flex-col items-center justify-center px-4 mt-10 py-64 section-transition">
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 items-center">
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left mb-10 lg:mb-0 stagger-fade-in space-y-6 animate-on-scroll opacity-0 px-6 lg:px-0">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Summon your AI Assistants from
                  <br />
                </span>
                <span className="inline-flex mt-8 justify-center lg:justify-start w-full">
                  <MessagingPlatformAnimation />
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-xl mx-auto lg:mx-0">
                genie/os makes it easy to bring your AI tools into your IMs, so your team can use them as a trusted colleague
              </p>

              {/* IM Selector moved above email signup */}
              <div className="lg:text-left mb-8 md:mb-0">
                <div className="max-w-md mx-auto lg:mx-0">
                  <IMSelector />
                </div>
              </div>

              {/* Email Signup Form */}
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 max-w-md mx-auto lg:mx-0">
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
                <div className="flex flex-col items-center lg:items-start gap-2">
                  <Button
                    type="submit"
                    className="h-11 sm:h-12 bg-gradient-to-r from-green-600 to-green-600 hover:from-green-800 hover:to-green-800 transition-all text-sm sm:text-base"
                    disabled={isLoading}
                  >
                    <span>Join Early Access</span>
                  </Button>
                  <span className="text-[10px] sm:text-xs opacity-75">Limited Spots!</span>
                </div>
              </form>
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
                      </div>
                    </div>

                    {/* Another Human Message */}
                    <div className="flex items-start space-x-2 sm:space-x-3 animate-fade-in opacity-0" style={{ animationDelay: '1.2s' }}>
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="User" className="w-6 h-6 sm:w-8 sm:h-8 rounded" />
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium text-white text-sm sm:text-base">Alex</span>
                          <span className="ml-2 text-[10px] sm:text-xs text-gray-400">11:32 AM</span>
                        </div>
                        <p className="text-gray-300 mt-1 text-sm sm:text-base">That's impressive! <span className="text-yellow-200">@genie - </span> can you also generate a summary report?</p>
                      </div>
                    </div>

                    {/* Genie Response 2 */}
                    <div className="flex items-start space-x-2 sm:space-x-3 animate-fade-in opacity-0" style={{ animationDelay: '1.7s' }}>
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded bg-gradient-to-r from-yellow-600 to-amber-600 flex items-center justify-center">
                        <span className="text-white text-[10px] sm:text-xs">✨</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <span className="font-medium text-amber-500 text-sm sm:text-base">genie</span>
                          <span className="ml-2 text-[10px] sm:text-xs text-gray-400">11:33 AM</span>
                        </div>
                        <div className="mt-1 p-2 sm:p-3 bg-white/10 rounded-lg border border-amber-500/10 relative">
                          {/* Agent Indicators */}
                          <div className="absolute -right-14 space-y-2 hidden sm:block">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded bg-blue-500/20 border border-blue-500/20 p-1.5 flex items-center justify-center group relative">
                                <svg className="w-full h-full text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                <span className="absolute left-full ml-2 px-2 py-1 bg-white/20 rounded text-xs text-blue-300 opacity-100 transition-opacity whitespace-nowrap backdrop-blur-sm">
                                  Monthly Reporter Agent
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded bg-green-500/20 border border-green-500/20 p-1.5 flex items-center justify-center group relative">
                                <svg className="w-full h-full text-green-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M4 19h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                  <path d="M4 15h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                  <path d="M4 11h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                  <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                  <path d="M9 15V9l3 4 3-4v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="absolute left-full ml-2 px-2 py-1 bg-white/20 rounded text-xs text-green-300 opacity-100 transition-opacity whitespace-nowrap backdrop-blur-sm">
                                  Visualization Agent
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm sm:text-base">Generating a summary report with key insights and recommendations...</p>
                          <div className="mt-2 space-y-2">
                            <div className="h-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-full w-3/4 animate-pulse"></div>
                            <div className="h-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-full w-1/2 animate-pulse"></div>
                            <div className="h-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-full w-5/6 animate-pulse"></div>
                          </div>
                        </div>
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

      {/* Visual Workflow Element */}
      <div className="mt-2">
        <WorkflowInfographic />
      </div>

      {/* Benefits Section */}
      <section 
        ref={benefitsRef}
        className="py-20 bg-black relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">

          <div className="mt-16 text-center" ref={benefitsRef}>
            <h3 className="text-4xl font-bold mb-4 text-white bg-clip-text text-transparent">Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <BenefitCard
                icon={<Zap className="w-8 h-8 text-yellow-400" />}
                title="Save Time"
                description="Your team can use AI tools right in their chat without switching apps."
              />
              <BenefitCard
                icon={<Shield className="w-8 h-8 text-green-400" />}
                title="Easy Setup"
                description="Connect all your tools in one place with no coding required."
              />
              <BenefitCard
                icon={<Users className="w-8 h-8 text-blue-400" />}
                title="Team Friendly"
                description="Everyone can use AI tools with simple chat commands they already know."
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
      

      {/* Social Proof Section */}
<section className="py-24 bg-gradient-to-b from-black to-gray-900/50 relative overflow-hidden">
  <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-10"></div>
  <div className="container mx-auto px-4 relative z-10">
    <div className="text-center mb-16">
      <h3 className="text-4xl font-bold mb-4 text-white bg-clip-text text-transparent">
        Requests from the community
      </h3>
      <p className="text-xl text-gray-400 max-w-2xl mx-auto">
        Real challenges voiced by tech leaders that genie/os solves
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Testimonial 1 - Twitter */}
      <div className="glass-card p-6 rounded-xl border border-white/10 hover:border-amber-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
        <div className="flex items-start mb-4">
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80" 
            alt="Alex Chen" 
            className="w-12 h-12 rounded-full mr-3 border-2 border-amber-400/50"
          />
          <div>
            <div className="flex items-center">
              <span className="font-semibold text-white">Alex Chen</span>
              <svg className="w-4 h-4 ml-2 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </div>
            <span className="text-gray-400 text-sm">CTO @TechStartup</span>
          </div>
        </div>
        <p className="text-gray-300 mb-6 italic">
          "We have 5 different AI tools but my team keeps asking me how to access them. Would be amazing if they could just @mention them in Slack like a teammate!"
        </p>
        <div className="flex items-center text-amber-400 bg-amber-400/10 px-3 py-2 rounded-lg">
          <CheckCircle className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">genie/os provides unified access</span>
        </div>
      </div>

      {/* Testimonial 2 - LinkedIn */}
      <div className="glass-card p-6 rounded-xl border border-white/10 hover:border-amber-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
        <div className="flex items-start mb-4">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80" 
            alt="Sarah Johnson" 
            className="w-12 h-12 rounded-full mr-3 border-2 border-amber-400/50"
          />
          <div>
            <div className="flex items-center">
              <span className="font-semibold text-white">Sarah Johnson</span>
              <svg className="w-4 h-4 ml-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <span className="text-gray-400 text-sm">AI Product Lead @Fortune500</span>
          </div>
        </div>
        <p className="text-gray-300 mb-6 italic">
          "Our data science team built amazing models but adoption is low because non-technical teams don't know how to use them. Need a way to make AI accessible through tools people already use daily."
        </p>
        <div className="flex items-center text-amber-400 bg-amber-400/10 px-3 py-2 rounded-lg">
          <CheckCircle className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">genie/os bridges this gap</span>
        </div>
      </div>

      {/* Testimonial 3 - Forum */}
      <div className="glass-card p-6 rounded-xl border border-white/10 hover:border-amber-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
        <div className="flex items-start mb-4">
          <img 
            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80" 
            alt="Jamal Wright" 
            className="w-12 h-12 rounded-full mr-3 border-2 border-amber-400/50"
          />
          <div>
            <div className="flex items-center">
              <span className="font-semibold text-white">Jamal Wright</span>
              <svg className="w-4 h-4 ml-2 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </div>
            <span className="text-gray-400 text-sm">Engineering Manager @AIscale</span>
          </div>
        </div>
        <p className="text-gray-300 mb-6 italic">
          "Managing multiple AI services is becoming a full-time job. Looking for a unified interface that works across Slack, Teams, and our custom tools."
        </p>
        <div className="flex items-center text-amber-400 bg-amber-400/10 px-3 py-2 rounded-lg">
          <CheckCircle className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">genie/os consolidates everything</span>
        </div>
      </div>
    </div>

    <div className="mt-16 text-center">
      <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-full border border-amber-400/20 backdrop-blur-sm">
        <Users className="w-5 h-5 text-amber-600 mr-2" />
        <span className="text-amber-600 font-medium text-sm tracking-wider">JOINED BY 20+ TEAMS</span>
      </div>
      
      {/* <div className="flex justify-center mt-8 space-x-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg key={star} className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        ))}
        <span className="text-gray-400 text-sm ml-2">4.8/5 from 286 reviews</span>
      </div> */}
    </div>
  </div>
</section>
      

      {/* Final CTA Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-purple-900/20 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to supercharge your {getIMDisplayName()} workspace?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the waitlist today - early users get preview features and priority support!
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
              <div className="flex flex-col items-center gap-2">
                  <Button
                    type="submit"
                    className="h-11 sm:h-12 bg-gradient-to-r from-green-600 to-green-600 hover:from-green-800 hover:to-green-800 transition-all text-sm sm:text-base"
                    disabled={isLoading}
                  >
                  <span>Join Early Access</span>
                </Button>
                <span className="text-xs opacity-75">Limited Spots!</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} genie/os. All rights reserved.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
