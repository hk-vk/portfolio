import React, { createContext, useState, useContext, useRef, useCallback, useMemo } from 'react';

const SocialPopoverContext = createContext(null);

export const useSocialPopover = () => {
  return useContext(SocialPopoverContext);
};

export const SocialPopoverProvider = ({ children }) => {
  const [socialOpen, setSocialOpen] = useState(false);
  const triggerRef = useRef(null);

  const toggleSocialPopover = useCallback((ref = null) => {
    setSocialOpen((prev) => !prev);
    if (ref) {
      triggerRef.current = ref;
    }
  }, []);

  const closeSocialPopover = useCallback(() => {
    setSocialOpen(false);
  }, []);

  const value = useMemo(() => ({
    socialOpen,
    toggleSocialPopover,
    closeSocialPopover,
    triggerRef,
  }), [socialOpen, toggleSocialPopover, closeSocialPopover]);

  return (
    <SocialPopoverContext.Provider value={value}>
      {children}
    </SocialPopoverContext.Provider>
  );
}; 
