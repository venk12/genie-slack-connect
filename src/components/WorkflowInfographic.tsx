
import React, { useRef, useEffect } from "react";
import { Server, Cloud, Settings, ArrowRight } from "lucide-react";
import MessagingPlatformAnimation from "./MessagingPlatformAnimation";

const WorkflowInfographic = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const elements = containerRef.current?.querySelectorAll('.animate-step');
          elements?.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('animate-fade-in');
              el.classList.remove('opacity-0');
            }, index * 300); // Staggered animation
          });
        }
      },
      { threshold: 0.2 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto relative py-4">
      <div className="glass-card p-6 rounded-lg border border-white/10 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Step 1: AI Agents */}
          <div className="flex flex-col items-center text-center opacity-0 animate-step">
            <div className="flex items-center gap-2 mb-4">
              <Server className="h-10 w-10 text-purple-400" />
              <Cloud className="h-10 w-10 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Your AI Agents</h3>
            <p className="text-sm text-gray-300">Local or cloud-based</p>
          </div>
          
          {/* Arrow 1 */}
          <ArrowRight className="h-8 w-8 text-gray-400 hidden md:block opacity-0 animate-step" />
          
          {/* Step 2: Genie */}
          <div className="flex flex-col items-center text-center opacity-0 animate-step">
            <div className="mb-4">
              <div className="p-3 rounded-lg bg-white/5">
                <Settings className="h-10 w-10 text-blue-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Genie</h3>
            <p className="text-sm text-gray-300">One simple dashboard</p>
          </div>
          
          {/* Arrow 2 */}
          <ArrowRight className="h-8 w-8 text-gray-400 hidden md:block opacity-0 animate-step" />
          
          {/* Step 3: Messaging Platform */}
          <div className="flex flex-col items-center text-center opacity-0 animate-step">
            <div className="mb-4">
              <MessagingPlatformAnimation />
            </div>
            <p className="text-sm text-gray-300">Access everywhere</p>
          </div>
        </div>
        
        {/* Animated connection lines */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-green-500/30 transform -translate-y-1/2 hidden md:block opacity-0 animate-step"></div>
      </div>
    </div>
  );
};

export default WorkflowInfographic;
