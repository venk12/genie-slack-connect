
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
    <div className="bg-white p-3 rounded-lg">
      <img src="/lovable-uploads/5d9a871e-8766-443f-afa9-bd39d693e969.png" alt="Zapier" className="h-6 w-auto" />
    </div>
    <div className="bg-white p-3 rounded-lg">
      <img src="/lovable-uploads/8ae929a3-99a1-49bc-b593-21c8d5ea6edb.png" alt="Make" className="h-6 w-auto" />
    </div>
    <div className="bg-white p-3 rounded-lg">
      <img src="/lovable-uploads/3dd25075-1a49-4b19-bfc3-830d0274bdb1.png" alt="n8n" className="h-6 w-auto" />
    </div>
    <div className="bg-white p-3 rounded-lg">
      <img src="/lovable-uploads/d0576a9a-259f-4374-8e19-ce3c0217f161.png" alt="Claude" className="h-6 w-auto" />
    </div>
    <div className="bg-white p-3 rounded-lg">
      <img src="/lovable-uploads/16d4d0e0-1d05-4fae-936e-67a30e7758f7.png" alt="LMstudio" className="h-6 w-auto" />
    </div>
    <div className="bg-white p-3 rounded-lg">
      <img src="/lovable-uploads/5eb51efa-680e-4a02-9d38-a2886a13f9c5.png" alt="Agent.AI" className="h-6 w-auto" />
    </div>
    <div className="bg-white p-3 rounded-lg">
      <Server className="h-6 w-6 text-purple-600" />
    </div>
  </div>
);

const WorkflowInfographic = () => {
  return (
    <div className="max-w-4xl mx-auto relative py-2">
      <div className="glass-card p-6 md:p-8 rounded-lg border border-white/10 shadow-xl bg-[#3F0E40]/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-6">
          {/* Step 1: Slack */}
          <div className="flex flex-col items-center text-center flex-1 px-4">
            <div className="mb-6">
              <div className="bg-white p-3 rounded-lg">
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

      {/* Multi-user chat demo - with reduced height and animated entries */}
      <div className="mt-12 max-w-3xl mx-auto">
        <div className="glass-card rounded-lg overflow-hidden shadow-xl bg-[#3F0E40]/10">
          {/* Chat Header */}
          <div className="bg-[#3F0E40] p-3 border-b border-[#522653]">
            <div className="flex items-center">
              <span className="text-white font-medium"># sales-team</span>
            </div>
          </div>

          {/* Chat Messages - with individual fade-in animations */}
          <div className="p-4 space-y-4 bg-[#1A1D21] max-h-[50vh] md:max-h-[40vh] overflow-y-auto">
            {/* Sarah's Message */}
            <div className="flex items-start space-x-3 animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="User" className="w-8 h-8 rounded" />
              <div>
                <div className="flex items-center">
                  <span className="font-medium text-white">Sarah</span>
                  <span className="ml-2 text-xs text-gray-400">10:15 AM</span>
                </div>
                <p className="text-gray-300 mt-1">
                  Team, I need to prepare for the Acme Corp meeting tomorrow. Any insights on their recent tech infrastructure changes?
                </p>
              </div>
            </div>

            {/* Mike's Message */}
            <div className="flex items-start space-x-3 animate-fade-in opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" alt="User" className="w-8 h-8 rounded" />
              <div>
                <div className="flex items-center">
                  <span className="font-medium text-white">Mike</span>
                  <span className="ml-2 text-xs text-gray-400">10:17 AM</span>
                </div>
                <p className="text-gray-300 mt-1">
                  I heard they might be shifting from AWS to Azure, but let's ask <span className="text-yellow-300">@genie</span> to pull data from Hubspot and recent news.
                </p>
              </div>
            </div>

            {/* Team message asking Genie */}
            <div className="flex items-start space-x-3 animate-fade-in opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="User" className="w-8 h-8 rounded" />
              <div>
                <div className="flex items-center">
                  <span className="font-medium text-white">Alex</span>
                  <span className="ml-2 text-xs text-gray-400">10:18 AM</span>
                </div>
                <p className="text-gray-300 mt-1">
                  <span className="text-yellow-300">@genie</span> Can you research Acme Corp's tech stack changes in the last quarter and suggest discussion points for Sarah's meeting tomorrow? Check both Hubspot and recent news.
                </p>
              </div>
            </div>

            {/* Genie Response */}
            <div className="flex items-start space-x-3 animate-fade-in opacity-0" style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}>
              <div className="w-8 h-8 rounded bg-gradient-to-r from-yellow-600 to-amber-600 flex items-center justify-center">
                <span className="text-white text-xs">✨</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <span className="font-medium text-amber-500">genie</span>
                  <span className="ml-2 text-xs text-gray-400">10:19 AM</span>
                </div>
                <div className="mt-1 p-3 bg-[#222529] rounded-lg border border-[#565856]/30">
                  <p className="text-gray-300 text-sm">Based on Hubspot data and recent news, here's what I found about Acme Corp:</p>
                  <ul className="mt-2 text-sm text-gray-300 list-disc pl-5 space-y-1">
                    <li>Transitioning from AWS to Azure over the next 6 months (confirmed in their Q2 earnings call)</li>
                    <li>HubSpot notes: 3 meetings with their CTO about integration challenges</li>
                    <li>Recent press release mentioned a $2.4M budget for cloud consulting</li>
                    <li>Their LinkedIn shows 5 new Azure engineer hires in the last month</li>
                  </ul>
                  <p className="mt-3 text-sm text-gray-300">Recommended approach: Focus on our Azure migration services and training programs. Their CTO (James Wilson) is particularly concerned about security during the transition.</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">@genie saved 3 hours of research in 20 seconds</p>
              </div>
            </div>

            {/* Sarah's follow-up */}
            <div className="flex items-start space-x-3 animate-fade-in opacity-0" style={{ animationDelay: '1.4s', animationFillMode: 'forwards' }}>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="User" className="w-8 h-8 rounded" />
              <div>
                <div className="flex items-center">
                  <span className="font-medium text-white">Sarah</span>
                  <span className="ml-2 text-xs text-gray-400">10:21 AM</span>
                </div>
                <p className="text-gray-300 mt-1">
                  This is perfect! Thanks team and @genie - I'll build my presentation around these points. Can you add this to our meeting prep doc?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowInfographic;
