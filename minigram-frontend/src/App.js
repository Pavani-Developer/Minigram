import React, { useEffect } from 'react';
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
  const [userDetails,setUserDetails] = useState({});

  const hideNavbar = noNavbarPaths.includes(location.pathname);

  useEffect (() =>{
    const fetchUserProfile = async () =>{
      try{
        const respone = await axios.get(`http://127.0.0.1:8000/user/${username}/`),
        setUserDetails(respone);
      }catch(error){
        console.log(error);
      }
    }
  },[]);

  
  return (
    <div className="app-container">
      {/* Conditionally render Navbar if not on login or register page */}
      {!hideNavbar && <Navbar profilePic={userProfilePic} />}
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
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
