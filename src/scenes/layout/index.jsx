import { Box, useMediaQuery } from '@mui/material';
import React,{useState} from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from 'components/Navbar';
import { useSelector } from 'react-redux';
import Sidebar from 'components/Sidebar';
import { useGetUserQuery } from 'state/api';

const Layout=({handleSignOut})=> {
  const isNotMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state)=>state.global.userId);
  const { data } = useGetUserQuery(userId);
  console.log("data",data);
  
  return (
    <Box display={isNotMobile?"flex":"block"} width="100%" height="100%">
      <Sidebar
        user = {data || {}} 
        isNotMobile={isNotMobile}
        drawerWidth='250px'
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar 
          user = {data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          handleSignOut={handleSignOut}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;