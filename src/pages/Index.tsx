
import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { 
  CheckCircle, ChevronRight, Zap, 
  Server, Cloud, Settings, ArrowRight 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import WorkflowInfographic from "@/components/WorkflowInfographic";
import BenefitCard from "@/components/BenefitCard";
import MessagingPlatformAnimation from "@/components/MessagingPlatformAnimation";

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

    const sections = document.querySelectorAll(".animate-on-scroll");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
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
        .insert([{ email }]);

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
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 section-transition">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 z-0" />
        
        {/* Glassmorphic elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl z-0" />
        
        <div className="container mx-auto relative z-10 max-w-5xl">
          <div className="text-center mb-12 stagger-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                One Click to Use AI in{" "}
              </span>
              <span className="inline-flex">
                <MessagingPlatformAnimation />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Genie lets you connect your AI tools to messaging platforms in seconds, so your team can use them with simple chat commands.
            </p>

            {/* Email Signup Form */}
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
                {!isValid && (
                  <p className="text-red-500 text-sm mt-1 text-left">
                    Please enter a valid email address
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="h-12 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "Join Early Access – Limited Spots!"}
              </Button>
            </form>
          </div>

          {/* Visual Workflow Element */}
          <WorkflowInfographic />

          <div className="mt-12">
            <Button 
              variant="ghost" 
              className="text-gray-300 hover:text-white flex items-center gap-2 mx-auto group"
              onClick={() => scrollToSection(howItWorksRef)}
            >
              Learn How It Works
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section 
        ref={howItWorksRef}
        className="py-20 bg-black relative overflow-hidden animate-on-scroll opacity-0 section-transition"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-black to-black z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Connect your AI tools to Slack in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Server className="w-8 h-8 text-purple-400" />,
                title: "Connect Your Tools",
                description: "Link your AI tools to Genie with a simple click - no coding needed."
              },
              {
                icon: <Settings className="w-8 h-8 text-blue-400" />,
                title: "Set Up Quick Commands",
                description: "Create easy-to-remember chat commands your team can use right away."
              },
              {
                icon: <Zap className="w-8 h-8 text-yellow-400" />,
                title: "Use in Slack",
                description: "Your team can now use powerful AI tools without leaving their chat."
              }
            ].map((step, index) => (
              <Card 
                key={index} 
                className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all group"
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-all">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center animate-on-scroll opacity-0" ref={benefitsRef}>
            <h3 className="text-2xl font-semibold mb-6">Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <BenefitCard
                icon={<Zap className="w-6 h-6" />}
                title="Save Time"
                description="Your team can use AI tools right in Slack without switching apps."
              />
              <BenefitCard
                icon={<Server className="w-6 h-6" />}
                title="Easy Setup"
                description="Connect all your tools in one place with no coding required."
              />
              <BenefitCard
                icon={<CheckCircle className="w-6 h-6" />}
                title="Team Friendly"
                description="Everyone can use AI tools with simple chat commands they already know."
              />
              <BenefitCard
                icon={<Cloud className="w-6 h-6" />}
                title="Works Anywhere"
                description="Use with cloud tools or your own private AI models - your choice."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 relative animate-on-scroll opacity-0 section-transition">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-purple-900/20 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to supercharge your Slack workspace?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the waitlist today - early users get special features and priority support!
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
                className="h-12 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "Join Early Access – Limited Spots!"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Genie. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
