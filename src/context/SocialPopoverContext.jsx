import React, { createContext, useState, useContext, useRef } from 'react';

const SocialPopoverContext = createContext(null);

export const useSocialPopover = () => {
  return useContext(SocialPopoverContext);
};

export const SocialPopoverProvider = ({ children }) => {
  const [socialOpen, setSocialOpen] = useState(false);
  const triggerRef = useRef(null);

  const toggleSocialPopover = (ref = null) => {
    setSocialOpen((prev) => !prev);
    if (ref) {
      triggerRef.current = ref;
    }
  };

  const closeSocialPopover = () => {
    setSocialOpen(false);
  };

  const value = {
    socialOpen,
    toggleSocialPopover,
    closeSocialPopover,
    triggerRef,
  };

  return (
    <SocialPopoverContext.Provider value={value}>
      {children}
    </SocialPopoverContext.Provider>
  );
}; 