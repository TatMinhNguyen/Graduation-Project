import React from 'react';

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


function App() {
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
      </Routes>
    </Router>
  );
}

export default App;
