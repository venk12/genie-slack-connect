
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type IMType = {
  name: string;
  id: string;
  logo: React.ReactNode;
};

interface IMContextType {
  selectedIM: IMType;
  setSelectedIM: (im: IMType) => void;
  otherIMName: string;
  setOtherIMName: (name: string) => void;
}

const defaultIM = {
  name: "Slack",
  id: "slack",
  logo: null,
};

const IMContext = createContext<IMContextType>({
  selectedIM: defaultIM,
  setSelectedIM: () => {},
  otherIMName: "",
  setOtherIMName: () => {},
});

export const useIMContext = () => useContext(IMContext);

export const IMProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [selectedIM, setSelectedIM] = useState<IMType>(defaultIM);
  const [otherIMName, setOtherIMName] = useState("");

  return (
    <IMContext.Provider value={{ 
      selectedIM, 
      setSelectedIM,
      otherIMName,
      setOtherIMName
    }}>
      {children}
    </IMContext.Provider>
  );
};
