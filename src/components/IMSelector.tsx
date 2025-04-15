import React, { useState, useEffect } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useIMContext, IMType } from "@/contexts/IMContext";

const IMSelector = () => {
  const { selectedIM, setSelectedIM, otherIMName, setOtherIMName } = useIMContext();
  const [showOtherInput, setShowOtherInput] = useState(false);
  
  const imOptions: IMType[] = [
    {
      name: "Slack",
      id: "slack",
      logo: <img src="https://freepnglogo.com/images/all_img/1707837044slack-icon-png.png" alt="Slack" className="h-5 w-5" />,
    },
    {
      name: "Discord",
      id: "discord",
      logo: <img src="https://freepnglogo.com/images/all_img/1708701355discord-icon-png.png" alt="Discord" className="h-5 w-5" />,
    },
    {
      name: "Teams",
      id: "teams",
      logo: <img src="https://freepnglogo.com/images/all_img/microsoft-teams-83e6.png" alt="Teams" className="h-5 w-5" />,
    },
    {
      name: "Telegram",
      id: "telegram",
      logo: <img src="https://freepnglogo.com/images/all_img/telegram-logo-fc05.png" alt="Telegram" className="h-5 w-5" />,
    },
    {
      name: "Other",
      id: "other",
      logo: null,
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
    <div className="w-full max-w-md mx-auto">
      <div className="text-left mb-2">
        <h3 className="text-lg font-semibold text-white pb-4">Which messaging app does your organization use?</h3>
      </div>
      <div className="flex flex-col gap-3">
        <Select onValueChange={handleIMChange} defaultValue={selectedIM.id}>
          <SelectTrigger className="w-full bg-white/10 border-white/20">
            <SelectValue placeholder="Select your messaging app" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-white/20 text-white">
            {imOptions.map((im) => (
              <SelectItem 
                key={im.id} 
                value={im.id}
                className="flex items-center gap-2 focus:bg-white/10 focus:text-white"
              >
                <span>{im.name}</span>
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
