
import React, { useState, useEffect } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slack, MessageSquare } from "lucide-react";
import { BrandDiscord, BrandTelegram } from "./icons/BrandIcons";
import { useIMContext, IMType } from "@/contexts/IMContext";

const IMSelector = () => {
  const { selectedIM, setSelectedIM, otherIMName, setOtherIMName } = useIMContext();
  const [showOtherInput, setShowOtherInput] = useState(false);
  
  const imOptions: IMType[] = [
    {
      name: "Slack",
      id: "slack",
      logo: <Slack className="h-5 w-5 text-blue-400" />,
    },
    {
      name: "Discord",
      id: "discord",
      logo: <BrandDiscord className="h-5 w-5 text-indigo-400" />,
    },
    {
      name: "Teams",
      id: "teams",
      logo: <MessageSquare className="h-5 w-5 text-blue-500" />,
    },
    {
      name: "Telegram",
      id: "telegram",
      logo: <BrandTelegram className="h-5 w-5 text-sky-400" />,
    },
    {
      name: "Other",
      id: "other",
      logo: <MessageSquare className="h-5 w-5 text-gray-400" />,
    },
  ];

  useEffect(() => {
    // Set initial logo
    const initialIM = imOptions.find(im => im.id === selectedIM.id);
    if (initialIM) {
      setSelectedIM(initialIM);
    }
  }, []);

  const handleIMChange = (value: string) => {
    const selected = imOptions.find(im => im.id === value);
    if (selected) {
      setSelectedIM(selected);
      setShowOtherInput(value === "other");
      if (value !== "other") {
        setOtherIMName("");
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="text-center mb-2">
        <h3 className="text-lg font-semibold">Which messaging app does your organization use?</h3>
      </div>
      <div className="flex flex-col gap-3">
        <Select onValueChange={handleIMChange} defaultValue={selectedIM.id}>
          <SelectTrigger className="w-full bg-white/10 border-white/20">
            <div className="flex items-center gap-2">
              {selectedIM.logo}
              <SelectValue placeholder="Select your messaging app" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-white/20 text-white">
            {imOptions.map((im) => (
              <SelectItem 
                key={im.id} 
                value={im.id}
                className="flex items-center gap-2 focus:bg-white/10 focus:text-white"
              >
                <div className="flex items-center gap-2">
                  {im.logo}
                  <span>{im.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {showOtherInput && (
          <Input
            type="text"
            placeholder="Please specify your messaging app"
            value={otherIMName}
            onChange={(e) => setOtherIMName(e.target.value)}
            className="bg-white/10 border-white/20 text-white"
          />
        )}
      </div>
    </div>
  );
};

export default IMSelector;
