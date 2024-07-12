import React from 'react';

import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import VerifyCode from './pages/register/verifyCode/VerifyCode';
import ForgotVerificationCode from './pages/register/verifyCode/ForgotVerificationCode';
import ForgotPassword from './pages/login/forgotPassword/ForgotPassword';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/set-verify-code" element={<VerifyCode />} />
        <Route path="/get-verify-code" element={<ForgotVerificationCode />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
