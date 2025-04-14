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
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 animate-gradient-shift" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex-1" /> {/* Spacer */}
            <h1 className="text-2xl font-playfair text-center text-white">genie-os</h1>
            <div className="flex-1 flex justify-end">
              <button
                onClick={() => scrollToSection(benefitsRef)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Benefits
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-32 section-transition">
        <div className="container mx-auto relative z-10 max-w-5xl">
          <div className="text-center mb-12 stagger-fade-in space-y-12">
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Summon your AI Agents from
                <br />
              </span>
              <span className="inline-flex mt-8 justify-center w-full">
                <MessagingPlatformAnimation />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              genie-os lets you connect your AI tools to {getIMDisplayName()} in seconds, so your team can use them with simple chat commands.
            </p>

            {/* IM Selector moved above email signup */}
            <IMSelector />

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
                className="h-12 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all flex flex-col items-center justify-center py-1"
                disabled={isLoading}
              >
                <span>Join Early Access</span>
                <span className="text-xs opacity-75">Limited Spots!</span>
              </Button>
            </form>
          </div>

          {/* Visual Workflow Element */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <WorkflowInfographic />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        ref={benefitsRef}
        className="py-20 bg-black relative overflow-hidden animate-on-scroll opacity-0 section-transition"
      >
        <div className="container mx-auto px-4 relative z-10">

          <div className="mt-16 text-center animate-on-scroll opacity-0" ref={benefitsRef}>
            <h3 className="text-2xl font-semibold mb-6 text-white">Benefits</h3>
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

      {/* Final CTA Section */}
      <section className="py-16 relative animate-on-scroll opacity-0 section-transition">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-purple-900/20 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to supercharge your {getIMDisplayName()} workspace?
            </h2>
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
                className="h-12 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all flex flex-col items-center justify-center py-1"
                disabled={isLoading}
              >
                <span>Join Early Access</span>
                <span className="text-xs opacity-75">Limited Spots!</span>
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} genie-os. All rights reserved.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
