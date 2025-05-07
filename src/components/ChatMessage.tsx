
import React from "react";

interface MessageProps {
  avatar: string;
  name: string;
  time: string;
  text: string;
}

export const Message = ({ avatar, name, time, text }: MessageProps) => {
  return (
    <div className="flex items-start space-x-3">
      <img src={avatar} alt={name} className="w-8 h-8 rounded" />
      <div>
        <div className="flex items-center">
          <span className="font-medium text-white">{name}</span>
          <span className="ml-2 text-xs text-gray-400">{time}</span>
        </div>
        <p className="text-gray-300 mt-1">{text}</p>
      </div>
    </div>
  );
};

interface GenieMessageProps {
  time: string;
  title: string;
  bullets: string[];
}

export const GenieMessage = ({ time, title, bullets }: GenieMessageProps) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-8 h-8 rounded bg-gradient-to-r from-yellow-600 to-amber-600 flex items-center justify-center">
        <span className="text-white text-xs">✨</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center">
          <span className="font-medium text-amber-500">genie</span>
          <span className="ml-2 text-xs text-gray-400">{time}</span>
        </div>
        <div className="mt-1 p-3 bg-[#222529] rounded-lg border border-[#565856]/30">
          <p className="text-gray-300 text-sm">{title}</p>
          <ul className="mt-2 text-sm text-gray-300 list-disc pl-5 space-y-1">
            {bullets.map((bullet, index) => (
              <li key={index}>{bullet}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
