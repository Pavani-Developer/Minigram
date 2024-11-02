import React,{useContext,useState,createContext, Children} from 'react';

const UserProfileContext = createContext();

export const UserProfileProvider = ({children}) => {
    const [userProfile,setUserProfile] = useState(null);

    return (
        <useContext.Provider value = {{userProfile,setUserProfile}}>
    {children}
        </useContext.Provider>
    )
}

export const useUserProfile = () => useContext(UserProfileContext)
