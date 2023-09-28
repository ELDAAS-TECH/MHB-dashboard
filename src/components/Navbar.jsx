import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined,
} from '@mui/icons-material'
import FlexBetween from 'components/FlexBetween'
import { useDispatch } from 'react-redux'
import { setMode } from 'state'
import { AppBar, Button, Box, IconButton, InputBase, Menu, Typography, MenuItem, Toolbar, useTheme } from '@mui/material'
import LogoImage from 'assets/mhb.png'

const Navbar=({
    user,
    isSidebarOpen,
    setIsSidebarOpen,
    handleSignOut,
})=>{
    const dispatch = useDispatch();
    const theme = useTheme();
    const [anchorEl,setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleclick = (event) => setAnchorEl(event.currentTarget);
    const handleclose = () => setAnchorEl(null);
    const navigate = useNavigate();

  return (
    <AppBar sx={{
        position:"static",
        background:"none",
        boxShadow:"none",
    }}>
        <Toolbar sx={{justifyContent:"space-between"}}>
            {/* Left Side */}
            
            <IconButton onClick={()=>{ setIsSidebarOpen(!isSidebarOpen)}}>
                <MenuIcon />
            </IconButton>
                
            

            {/*Right Side */}
            <FlexBetween gap="1.5rem">
                <IconButton onClick={()=> dispatch(setMode())}>
                    {(theme.palette.mode === "dark") ? (
                        <DarkModeOutlined sx={{fontSize:"25px"}} />
                    ):(
                        <LightModeOutlined sx={{fontSize:"25px"}} />
                    )}
                </IconButton>
                <IconButton>
                    <SettingsOutlined sx={{fontSize:"25px"}}/>
                </IconButton>
                <FlexBetween>
                    <Button onClick={handleclick} sx={{display:"flex", justifyContent:"space-between", alignItems:"center", textTransform:"none",gap:"1rem"}}>
                        <Box 
                            component='img'
                            alt='profile'
                            src={LogoImage}
                            height='35px'
                            width='53px'
                            borderRadius='50%'
                            sx={{objectFit:'cover'}}
                        />
                        <Box textAlign='left'>
                            <Typography fontWeight='bold' fontSize='0.85rem' sx={{color:theme.palette.secondary[100]}}>
                                {user.name}
                            </Typography>
                            <Typography fontSize='0.75rem' sx={{color:theme.palette.secondary[200]}}>
                                {user.PhNo}
                            </Typography>
                        </Box>
                        <ArrowDropDownOutlined sx={{color:theme.palette.secondary[300], fontSize:"25px"}}/>
                    </Button>
                    <Menu anchorEl={anchorEl} open={isOpen} onClose={handleclose} anchorOrigin={{vertical:"bottom",horizontal:"center"}}>
                        <MenuItem onClick={()=>{navigate("/"); handleSignOut();}}>Log Out</MenuItem>
                    </Menu>
                </FlexBetween>
            </FlexBetween>
        </Toolbar>
    </AppBar>
  );
};

export default Navbar;