import React, { createContext, useContext, useState } from 'react';
import { ProfileTab, SocialProfileModal } from '../components/SocialProfileModal';

interface SocialModalContextType {
  openProfile: (tab: ProfileTab) => void;
  closeProfile: () => void;
}

const SocialModalContext = createContext<SocialModalContextType | undefined>(undefined);

export const SocialModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ProfileTab>('linkedin');

  const openProfile = (tab: ProfileTab) => {
    setActiveTab(tab);
    setIsOpen(true);
  };

  const closeProfile = () => {
    setIsOpen(false);
  };

  return (
    <SocialModalContext.Provider value={{ openProfile, closeProfile }}>
      {children}
      <SocialProfileModal
        isOpen={isOpen}
        onClose={closeProfile}
        initialTab={activeTab}
      />
    </SocialModalContext.Provider>
  );
};

export const useSocialModal = (): SocialModalContextType => {
  const context = useContext(SocialModalContext);
  if (!context) {
    throw new Error('useSocialModal must be used within a SocialModalProvider');
  }
  return context;
};
