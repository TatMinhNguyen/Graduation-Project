import React, { useEffect } from 'react';

import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import VerifyCode from './pages/register/verifyCode/VerifyCode';
import ForgotVerificationCode from './pages/register/verifyCode/ForgotVerificationCode';
import ForgotPassword from './pages/login/forgotPassword/ForgotPassword';
import Home from './pages/home/Home';
import GetAPost from './pages/home/getAPost/GetAPost';
import Profile from './pages/profile/Profile';
import UserPosts from './pages/profile/userPosts/UserPosts';
import Friends from './pages/friends/Friends';
import Messenger from './pages/messenger/Messenger';
import Search from './pages/search/Search';
import SearchPosts from './components/search/SearchPosts';
import SearchUsers from './components/search/SearchUsers';
import { useSelector } from 'react-redux';
import socket from './socket';
import MyFriends from './pages/myFriends/MyFriends';
import GetFriends from './components/myFriends/GetFriends';
import GetRequests from './components/myFriends/GetRequests';
import GetSuggestions from './components/myFriends/GetSuggestions';

function App() {
  const user = useSelector((state) => state.auth.login?.currentUser)

  useEffect(() => {
    if (user?.userId) {  // userId từ DB
      socket.emit('register', user.userId); 
    }
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/set-verify-code" element={<VerifyCode />} />
        <Route path="/get-verify-code" element={<ForgotVerificationCode />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
        <Route path="/get-post/:postId" element={<GetAPost />} />
        <Route path='/get-profile/:userId' element={<Profile/>}>
          <Route path='' element={<UserPosts />} />
          <Route path='friends' element={<Friends />} />
        </Route>
        <Route path='/messenger' element = {<Messenger/>}/>
        <Route path="/search" element={<Search />} >
          <Route path='posts' element={<SearchPosts/>}/>
          <Route path='users' element={<SearchUsers/>}/>
        </Route>
        <Route path='/friends' element = {<MyFriends/>}>
          <Route path='' element={<GetFriends />} />
          <Route path='requests' element={<GetRequests />} />
          <Route path='suggestions' element={<GetSuggestions />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
