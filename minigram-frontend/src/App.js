import React from 'react';
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


const AppContent = () => {
  const userProfilePic = 'https://picsum.photos/50';
  const location = useLocation(); // Get current location
  const noNavbarPaths = ['/','/register'];

  const hideNavbar = noNavbarPaths.includes(location.pathname);

  return (
    <div className="app-container">
      {/* Conditionally render Navbar if not on login or register page */}
      {!hideNavbar && <Navbar profilePic={userProfilePic} />}
      <div className={`content-container ${hideNavbar ? 'full-width' : ''}`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/messages/*" element={<Messages />} />
          
          <Route 
          path="/feed"
          element={
          <ProtectedRoute>
            <Feed /> 
          </ProtectedRoute>} 
          />
         
          
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path='/post-detail' element={<PostDetail />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>
    </div>
  );
};


const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
