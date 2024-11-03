import React, { createContext, useContext, useState } from 'react';

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
    image: '', // Default or fetched data
    // Other properties as needed
  });

  return (
    <UserProfileContext.Provider value={[userProfile, setUserProfile]}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};
