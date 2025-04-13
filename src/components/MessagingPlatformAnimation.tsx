
import React, { useState, useEffect } from "react";
import { Slack, MessageSquare } from "lucide-react";
import { BrandDiscord, BrandTelegram } from "./icons/BrandIcons";

type Platform = {
  name: string;
  icon: React.ReactNode;
};

const platforms: Platform[] = [
  { name: "Slack", icon: <Slack className="h-6 w-6" /> },
  { name: "Discord", icon: <BrandDiscord className="h-6 w-6" /> },
  { name: "Telegram", icon: <BrandTelegram className="h-6 w-6" /> },
  { name: "Teams", icon: <MessageSquare className="h-6 w-6" /> },
];

const MessagingPlatformAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade out
      setIsVisible(false);
      
      // Change platform after fade out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % platforms.length);
        setIsVisible(true);
      }, 500); // Half of the transition time
      
    }, 2000); // 2 seconds per platform

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center transition-all duration-500">
      <div 
        className={`transition-opacity duration-500 flex items-center gap-2 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="bg-white/10 p-2 rounded-lg">
          {platforms[currentIndex].icon}
        </div>
        <h3 className="text-lg font-semibold">{platforms[currentIndex].name}</h3>
      </div>
    </div>
  );
};

export default MessagingPlatformAnimation;
