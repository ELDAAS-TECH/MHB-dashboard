import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import { CssBaseline,ThemeProvider } from "@mui/material";
import {createTheme} from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Userlist from "scenes/appusers";
import Geography from "scenes/geography";
import Login from 'scenes/login';
import SignUp from 'scenes/signup';
import UserList from 'scenes/userList';
import Users from 'scenes/users';


function App(){
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode]);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const handleLogin = () => { setIsLoggedIn(true); };
  const handleSignup = () => { setIsLoggedIn(true); };
  const handleSignOut = () => (setIsLoggedIn(false));

  return (
  <div className="app">
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        { isLoggedIn ? (
          <Routes>
            <Route element={<Layout handleSignOut={handleSignOut}/>}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/app users" element={<Userlist />} />
              <Route path="/location" element={<Geography />} /> 
              <Route path="/user devices" element={<UserList />} />
              <Route path="/users" element={<Users/>} />
            </Route>
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Login handleLogin = {handleLogin} />} />
            <Route path="/signup" element={<SignUp handleSignup = {handleSignup} />} />
          </Routes>
        )}
      </ThemeProvider>
    </BrowserRouter>
  </div> 
  );
}

export default App; 
