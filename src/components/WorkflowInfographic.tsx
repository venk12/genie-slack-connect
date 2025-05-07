
import React from "react";
import { Server } from "lucide-react";

// Custom Genie logo
const GenieLogo = () => (
  <div className="relative h-10 w-10 rounded-full flex items-center justify-center">
    <span className="text-2xl">✨</span>
  </div>
);

// Integration logos
const IntegrationLogos = () => (
  <div className="flex flex-wrap justify-center gap-4">
    <div className="bg-white/10 p-3 rounded-lg">
      <img src="/lovable-uploads/5d9a871e-8766-443f-afa9-bd39d693e969.png" alt="Zapier" className="h-6 w-auto" />
    </div>
    <div className="bg-white/10 p-3 rounded-lg">
      <img src="/lovable-uploads/8ae929a3-99a1-49bc-b593-21c8d5ea6edb.png" alt="Make" className="h-6 w-auto" />
    </div>
    <div className="bg-white/10 p-3 rounded-lg">
      <img src="/lovable-uploads/3dd25075-1a49-4b19-bfc3-830d0274bdb1.png" alt="n8n" className="h-6 w-auto" />
    </div>
    <div className="bg-white/10 p-3 rounded-lg">
      <Server className="h-6 w-6 text-purple-400" />
    </div>
  </div>
);

const WorkflowInfographic = () => {
  return (
    <div className="max-w-4xl mx-auto relative py-2">
      <div className="glass-card p-6 md:p-8 rounded-lg border border-white/10 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-6">
          {/* Step 1: Slack */}
          <div className="flex flex-col items-center text-center flex-1 px-4">
            <div className="mb-6">
              <div className="bg-white/10 p-3 rounded-lg">
                <img 
                  src="https://freepnglogo.com/images/all_img/1707837044slack-icon-png.png" 
                  alt="Slack" 
                  className="h-6 w-6"
                />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Slack</h3>
            <p className="text-sm text-gray-300 max-w-[250px]">Where your team already collaborates and gets work done</p>
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
          
          {/* Step 2: Genie (remains in middle) */}
          <div className="flex flex-col items-center text-center flex-1 px-4">
            <div className="mb-6">
              <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-500/5 via-amber-500/5 to-yellow-500/5 border border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
                <GenieLogo />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">genie</h3>
            <p className="text-sm text-gray-300 max-w-[250px]">Manage all your AI agents in one place and make them available in Slack</p>
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
          
          {/* Step 3: AI Agents */}
          <div className="flex flex-col items-center text-center flex-1 px-4">
            <IntegrationLogos />
            <h3 className="text-xl font-semibold mb-3 mt-6">Bring your agents from anywhere</h3>
            <p className="text-sm text-gray-300 max-w-[250px]">Whether they are running on Zapier, Make, n8n, or your own servers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowInfographic;
