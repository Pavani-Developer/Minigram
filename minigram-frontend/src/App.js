import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Navbar from './Components/Navbar';
import Feed from './Pages/Feed';
import UserProfile from './Pages/UserProfile';
import Search from './Components/Search';
import Explore from './Pages/Explore';
import Messages from './Pages/Messages';
import Notifications from './Pages/Notifications';
import CreatePost from './Pages/CreatePost';
import './App.css';
import EditProfile from './Pages/EditProfile';
import PostDetail from './Pages/PostDetail';
import ProtectedRoute from './Components/ProtectedRoute';
import { UserProvider, useUser } from './contexts/UserContext';
import { UserProfileProvider } from './contexts/UserProfileContext';



const AppContent = () => {
  const userProfilePic = 'https://picsum.photos/50';
  const location = useLocation(); 
  const noNavbarPaths = ['/','/register'];

  const hideNavbar = noNavbarPaths.includes(location.pathname);

  
  return (
    <div className="app-container">
      {!hideNavbar && <Navbar />}
      <div className={`content-container ${hideNavbar ? 'full-width' : ''}`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route 
          path="/messages/*" 
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>}/>
          
          <Route 
          path="/feed"
          element={
              <ProtectedRoute>
                <Feed /> 
              </ProtectedRoute>} />
         
          
          <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <UserProfile /> 
            </ProtectedRoute>} />

          <Route 
          path="/edit-profile" 
          element={
          <ProtectedRoute>
            <EditProfile />
            </ProtectedRoute>}/>

          <Route 
          path="/search" 
          element={ 
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>} />

          <Route 
          path="/explore" 
          element={
          <ProtectedRoute>
            <Explore />
            </ProtectedRoute>} />

          <Route 
          path="/create" 
          element={
          <ProtectedRoute>
            <CreatePost />
            </ProtectedRoute>} />

          <Route 
          path='/post-detail' 
          element={
          <ProtectedRoute>
            <PostDetail />
          </ProtectedRoute>} />

          <Route 
          path="/notifications" 
          element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>} />
          
        </Routes>
      </div>
    </div>
  );
};


const App = () => {
  return (
    <BrowserRouter>
    <UserProvider>
      <UserProfileProvider>
        <AppContent />
      </UserProfileProvider>
    
    </UserProvider>
      
    </BrowserRouter>
  );
};

export default App;
