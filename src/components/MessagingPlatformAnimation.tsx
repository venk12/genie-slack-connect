
import React, { useState, useEffect } from "react";

type Platform = {
  name: string;
  icon: string;
};

const platforms: Platform[] = [
  { 
    name: "Slack", 
    icon: "https://freepnglogo.com/images/all_img/1707837044slack-icon-png.png"
  },
  { 
    name: "Discord", 
    icon: "https://freepnglogo.com/images/all_img/1708701355discord-icon-png.png"
  },
  { 
    name: "Telegram", 
    icon: "https://freepnglogo.com/images/all_img/telegram-logo-fc05.png"
  },
  { 
    name: "Teams", 
    icon: "https://freepnglogo.com/images/all_img/microsoft-teams-83e6.png"
  },
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
        className={`transition-opacity duration-500 flex items-center gap-4 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="bg-white/10 p-3 rounded-lg">
          <img 
            src={platforms[currentIndex].icon} 
            alt={platforms[currentIndex].name}
            className="h-8 w-8"
          />
        </div>
        <h3 className="text-2xl font-semibold">{platforms[currentIndex].name}</h3>
      </div>
    </div>
  );
};

export default MessagingPlatformAnimation;
