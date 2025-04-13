
import React, { useRef, useEffect } from "react";
import { Server, Cloud, Database, MessageSquare } from "lucide-react";
import { BrandDiscord, BrandTelegram } from "./icons/BrandIcons";
import { useIMContext } from "@/contexts/IMContext";

// Custom Genie logo
const GenieLogo = () => (
  <div className="relative h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
    <span className="text-2xl font-bold text-white">G</span>
    <div className="absolute -top-2 -right-1 h-4 w-4 bg-yellow-400 rounded-full" />
    <div className="absolute -bottom-1 -left-1 h-3 w-3 bg-green-400 rounded-full" />
  </div>
);

const WorkflowInfographic = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { selectedIM } = useIMContext();
  
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

  const messagingPlatformIcon = () => {
    switch(selectedIM.id) {
      case 'discord':
        return <BrandDiscord className="h-6 w-6 text-indigo-400" />;
      case 'telegram':
        return <BrandTelegram className="h-6 w-6 text-sky-400" />;
      case 'teams':
        return <MessageSquare className="h-6 w-6 text-blue-500" />;
      case 'slack':
      default:
        return <MessageSquare className="h-6 w-6 text-blue-400" />;
    }
  };

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto relative py-4">
      <div className="glass-card p-6 rounded-lg border border-white/10 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Step 1: AI Agents */}
          <div className="flex flex-col items-center text-center opacity-0 animate-step">
            <div className="flex flex-col items-center gap-2 mb-4">
              <div className="bg-white/10 p-2 rounded-lg">
                <Server className="h-6 w-6 text-purple-400" />
              </div>
              <div className="bg-white/10 p-2 rounded-lg">
                <Cloud className="h-6 w-6 text-blue-400" />
              </div>
              <div className="bg-white/10 p-2 rounded-lg">
                <Database className="h-6 w-6 text-green-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Bring your agents from anywhere</h3>
            <p className="text-sm text-gray-300">Whether they are running locally, on internal servers or on cloud service providers</p>
          </div>
          
          {/* Arrow 1 */}
          <div className="hidden md:block opacity-0 animate-step">
            <svg width="40" height="24" viewBox="0 0 40 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M39.0607 13.0607C39.6464 12.4749 39.6464 11.5251 39.0607 10.9393L29.5147 1.3934C28.9289 0.807611 27.9792 0.807611 27.3934 1.3934C26.8076 1.97919 26.8076 2.92893 27.3934 3.51472L35.8787 12L27.3934 20.4853C26.8076 21.0711 26.8076 22.0208 27.3934 22.6066C27.9792 23.1924 28.9289 23.1924 29.5147 22.6066L39.0607 13.0607ZM0 13.5H38V10.5H0V13.5Z" fill="#9ca3af"/>
            </svg>
          </div>
          
          {/* Step 2: Genie */}
          <div className="flex flex-col items-center text-center opacity-0 animate-step">
            <div className="mb-4">
              <div className="p-3 rounded-lg bg-white/5">
                <GenieLogo />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Genie</h3>
            <p className="text-sm text-gray-300">One-stop shop for all your agents</p>
          </div>
          
          {/* Arrow 2 */}
          <div className="hidden md:block opacity-0 animate-step">
            <svg width="40" height="24" viewBox="0 0 40 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M39.0607 13.0607C39.6464 12.4749 39.6464 11.5251 39.0607 10.9393L29.5147 1.3934C28.9289 0.807611 27.9792 0.807611 27.3934 1.3934C26.8076 1.97919 26.8076 2.92893 27.3934 3.51472L35.8787 12L27.3934 20.4853C26.8076 21.0711 26.8076 22.0208 27.3934 22.6066C27.9792 23.1924 28.9289 23.1924 29.5147 22.6066L39.0607 13.0607ZM0 13.5H38V10.5H0V13.5Z" fill="#9ca3af"/>
            </svg>
          </div>
          
          {/* Step 3: Messaging Platforms */}
          <div className="flex flex-col items-center text-center opacity-0 animate-step">
            <div className="flex space-x-3 mb-4">
              <div className="bg-white/10 p-2 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-400" />
              </div>
              <div className="bg-white/10 p-2 rounded-lg">
                <BrandDiscord className="h-6 w-6 text-indigo-400" />
              </div>
              <div className="bg-white/10 p-2 rounded-lg">
                <BrandTelegram className="h-6 w-6 text-sky-400" />
              </div>
              <div className="bg-white/10 p-2 rounded-lg">
                <MessageSquare className="h-6 w-6 text-purple-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Messaging Platforms</h3>
            <p className="text-sm text-gray-300">Summon them from any IM/workspace at will</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowInfographic;
