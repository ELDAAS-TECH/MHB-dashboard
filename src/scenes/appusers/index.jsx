import React,{useState} from 'react'
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import Header from 'components/Header';
//import { useGetUserListQuery } from 'state/api';
import {dataUser} from "data";

const User = ({
    _id,
    name,
    PhNo,
    //Address,
    isParent,
    Family,
}) => {
    const theme = useTheme();
    //const [isExpanded,setIsExpanded] = useState(false);

    return(
        <Card
            sx={{
                backgroundImage:"none",
                backgroundColor:theme.palette.background.alt,
                borderRadius:"0.55rem"
            }}
        >
            <CardContent>
                <Typography sx={{fontSize:14}} color={theme.palette.secondary[700]} gutterBottom>
                    {name}
                </Typography>
                <Typography varient="h5" component="div">
                    {PhNo}
                </Typography>
                <Typography sx={{mb:"1.5rem"}} color={theme.palette.secondary[400]}>
                    {isParent}
                </Typography>
            </CardContent>
            
        </Card>
    );
};

const Userlist = () => {
    //const { data, isLoading } = useGetUserListQuery();
    const data = dataUser;
    const isLoading = false;
    const isNotMobile = useMediaQuery("(min-width:1000px)");

  return (
    <Box m='1.5rem 2.5rem'>
        <Header title="USER LIST" subtitle="User who uses your application" />
        {data || !isLoading ? (
            <Box mt='2px'
                display="grid" 
                gridTemplateColumns="repeat(4, minmax(0,1fr))" 
                justifyContent="space-between" 
                rowGap='20px' 
                columnGap="1.33%"
                sx={{
                    "& > div":{gridColumn: isNotMobile?undefined:"span 4"},
                }}
            >
                {data.map(({
                     _id,
                     name,
                     PhNo,
                     //Address,
                     isParent,
                     Family,
                })=>(
                    <User
                        key={_id}
                        _id={ _id}
                        name={name}
                        PhNo={PhNo}
                        //Address={Address}
                        isParent={isParent}
                        Family={Family}
                    />
                ))}
            </Box>
        ):(<>Loading.....</>)}
    </Box>
  );
};

export default Userlist;