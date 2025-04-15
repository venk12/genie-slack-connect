import React, { useRef, useEffect } from "react";
import { Server, Cloud, Database, MessageSquare } from "lucide-react";
import { BrandDiscord, BrandTelegram } from "./icons/BrandIcons";
import { useIMContext } from "@/contexts/IMContext";

// Custom Genie logo
const GenieLogo = () => (
  <div className="relative h-10 w-10 rounded-full flex items-center justify-center">
    <span className="text-2xl">✨</span>
  </div>
);

const WorkflowInfographic = () => {
  const { selectedIM } = useIMContext();

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
    <div className="max-w-4xl mx-auto relative py-2">
      {/* Added header */}
      {/* <h3 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-white">
        How does genie work?
      </h3> */}
      <div className="text-center mb-16">
      <h3 className="text-4xl font-bold mb-4 text-white bg-clip-text text-transparent">
        Why use genie?
      </h3>
      <p className="text-xl text-gray-400 max-w-2xl mx-auto">
        Real work gets done with other humans not in AI Platforms
      </p>
    </div>
      
      <div className="glass-card p-6 md:p-8 rounded-lg border border-white/10 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-4">
          {/* Step 1: AI Agents */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="flex flex-row md:flex-col items-center gap-4 md:gap-2 mb-6">
              <div className="bg-white/10 p-3 rounded-lg">
                <Server className="h-6 w-6 text-purple-400" />
              </div>
              <div className="bg-white/10 p-3 roundedi-lg">
                <Cloud className="h-6 w-6 text-blue-400" />
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <Database className="h-6 w-6 text-green-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Bring your agents from anywhere</h3>
            <p className="text-sm text-gray-300 max-w-[250px]">Whether they are running locally, on internal servers or on cloud service providers</p>
          </div>
          
          {/* Arrow 1 */}
          <div className="hidden md:block">
            <div className="w-16 flex items-center justify-center relative h-14">
              {/* Right arrow */}
              <svg width="40" height="24" viewBox="0 0 40 24" xmlns="http://www.w3.org/2000/svg" className="absolute top-0">
                <path d="M39.0607 13.0607C39.6464 12.4749 39.6464 11.5251 39.0607 10.9393L29.5147 1.3934C28.9289 0.807611 27.9792 0.807611 27.3934 1.3934C26.8076 1.97919 26.8076 2.92893 27.3934 3.51472L35.8787 12L27.3934 20.4853C26.8076 21.0711 26.8076 22.0208 27.3934 22.6066C27.9792 23.1924 28.9289 23.1924 29.5147 22.6066L39.0607 13.0607ZM0 13.5H38V10.5H0V13.5Z" fill="#9ca3af"/>
              </svg>
              {/* Left arrow */}
              <svg width="40" height="24" viewBox="0 0 40 24" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 rotate-180">
                <path d="M39.0607 13.0607C39.6464 12.4749 39.6464 11.5251 39.0607 10.9393L29.5147 1.3934C28.9289 0.807611 27.9792 0.807611 27.3934 1.3934C26.8076 1.97919 26.8076 2.92893 27.3934 3.51472L35.8787 12L27.3934 20.4853C26.8076 21.0711 26.8076 22.0208 27.3934 22.6066C27.9792 23.1924 28.9289 23.1924 29.5147 22.6066L39.0607 13.0607ZM0 13.5H38V10.5H0V13.5Z" fill="#9ca3af"/>
              </svg>
            </div>
          </div>
          
          {/* Mobile Divider */}
          <div className="md:hidden w-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
            <div className="flex-1 h-px bg-gray-800 mx-2"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
          </div>
          
          {/* Step 2: Genie */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="mb-6">
              <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-500/5 via-amber-500/5 to-yellow-500/5 border border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
                <GenieLogo />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">genie</h3>
            <p className="text-sm text-gray-300 max-w-[250px]">Manage all the agents across your organization in one place</p>
          </div>
          
          {/* Arrow 2 */}
          <div className="hidden md:block">
            <div className="w-16 flex items-center justify-center relative h-14">
              {/* Right arrow */}
              <svg width="40" height="24" viewBox="0 0 40 24" xmlns="http://www.w3.org/2000/svg" className="absolute top-0">
                <path d="M39.0607 13.0607C39.6464 12.4749 39.6464 11.5251 39.0607 10.9393L29.5147 1.3934C28.9289 0.807611 27.9792 0.807611 27.3934 1.3934C26.8076 1.97919 26.8076 2.92893 27.3934 3.51472L35.8787 12L27.3934 20.4853C26.8076 21.0711 26.8076 22.0208 27.3934 22.6066C27.9792 23.1924 28.9289 23.1924 29.5147 22.6066L39.0607 13.0607ZM0 13.5H38V10.5H0V13.5Z" fill="#9ca3af"/>
              </svg>
              {/* Left arrow */}
              <svg width="40" height="24" viewBox="0 0 40 24" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 rotate-180">
                <path d="M39.0607 13.0607C39.6464 12.4749 39.6464 11.5251 39.0607 10.9393L29.5147 1.3934C28.9289 0.807611 27.9792 0.807611 27.3934 1.3934C26.8076 1.97919 26.8076 2.92893 27.3934 3.51472L35.8787 12L27.3934 20.4853C26.8076 21.0711 26.8076 22.0208 27.3934 22.6066C27.9792 23.1924 28.9289 23.1924 29.5147 22.6066L39.0607 13.0607ZM0 13.5H38V10.5H0V13.5Z" fill="#9ca3af"/>
              </svg>
            </div>
          </div>
          
          {/* Mobile Divider */}
          <div className="md:hidden w-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
            <div className="flex-1 h-px bg-gray-800 mx-2"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
          </div>
          
          {/* Step 3: Messaging Platforms */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="bg-white/10 p-3 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-400" />
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <BrandDiscord className="h-6 w-6 text-indigo-400" />
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <BrandTelegram className="h-6 w-6 text-sky-400" />
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <MessageSquare className="h-6 w-6 text-purple-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Messaging Platforms</h3>
            <p className="text-sm text-gray-300 max-w-[250px]">Summon them from any IM/workspace at will</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowInfographic;