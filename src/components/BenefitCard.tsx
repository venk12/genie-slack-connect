
import React from "react";
import { LucideIcon } from "lucide-react";

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard = ({ icon, title, description }: BenefitCardProps) => {
  return (
    <div className="benefit-card p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
      <div className="flex items-start gap-3">
        <div className="mt-1 text-blue-400">
          {icon}
        </div>
        <div>
          <h4 className="font-semibold mb-1">
            <span className="highlight-text">{title}</span>
          </h4>
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default BenefitCard;
