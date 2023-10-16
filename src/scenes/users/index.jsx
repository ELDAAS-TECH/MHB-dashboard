import React, { useState, useEffect } from "react";
import { Box, useTheme,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  List,
  Typography,
  ListItem
 } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@material-ui/core/styles';
//import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useLocation,useNavigate } from 'react-router-dom';

import {Puck,Beacon, HomeHub } from "data";

import {
  DataGridPremium,
  GridToolbar,
  useGridApiRef,
  useKeepGroupedColumnsHidden,
} from '@mui/x-data-grid-premium';
import { useDemoData } from '@mui/x-data-grid-generator';
import { processJsonData } from "./getUsers";
//import PopUp from "components/PopUp";
const useStyles = makeStyles((theme) => ({
  customDialog: {
    height:"20vh",
    width:"200vh" 
  },
}));


const Users = () => {
  const theme = useTheme();

  // values to be sent to the backend
   const [page, setPage] = useState(0);
   const [pageSize, setPageSize] = useState(20);
   const [sort, setSort] = useState({});
   const [search, setSearch] = useState("");
   const [filteredHub, setFilteredHub] = useState([]);
   const [myBeaconInfo, setBeaconInfo] = useState([]);
   const [myPuckInfo, setPuckInfo] = useState([]);
   const [isOpen, setIsOpen] = useState(false);
   const [rowSelected, setRowSelected] = useState("");
   const classes = useStyles();
   const [selectedBeaconId, setSelectedBeaconId] = useState(null);
   const [selectedPuckId, setSelectedPuckId] = useState(null);
   const navigate = useNavigate();

   const [AWSUserList, setAWSUserList] = useState([]);

   useEffect(() => {
    async function fetchData() {
      try {
        const userList = await processJsonData();
        setAWSUserList(userList);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error if needed
      }
    }

    fetchData();
  }, []);

   
   const handleRowClick = (params,hub_id) => { 
      const filteredHub = HomeHub.filter((hub) => hub.Hub_id === hub_id);
      setIsOpen(true); 
      setRowSelected(params.row); 
      setFilteredHub(filteredHub);
      // setSelectedBeaconId(params.row.Beacon_id || null);
      // setSelectedPuckId(params.row.Puck_id || null);
      // navigate(`/user_hub/${hub_id}`);
      
    };
   const handleBPRowClick = (params,beacon_id,puck_id) => { 
      const selectedBeaconId = Beacon.filter((bec) => bec.Beacon_id === beacon_id);
      const selectedPuckId = Puck.filter((puck) => puck.Puck_id === puck_id);
      setIsOpen(true); 
      setRowSelected(params.row); 
      setSelectedBeaconId(selectedBeaconId);
      setSelectedPuckId(selectedPuckId)
      // setSelectedBeaconId(params.row.Beacon_id || null);
      // setSelectedPuckId(params.row.Puck_id || null);
      // navigate(`/beacon_Puck/${beacon_id,puck_id}`)
      
    };
   
   //const handleRowClick = (params) => { setIsOpen(true); };

   const [searchInput, setSearchInput] = useState("");
   
    const PopUp = (rowSelected) => {
      const HomeHubData = HomeHub;
      const BeaconData = Beacon;
      const PuckData = Puck;
    //console.log(rowSelected._id);

    const handleClose = () => {
        setIsOpen(false);
      };

    const HomeHubcolumns = [
      {
        field: "Hub_id",
        headerName: "ID",
        flex: 0.5,
      },

      {
        field: "Slaves_Connected",
        headerName: "Slaves Connected",
        flex: 0.5,
      },
      {
        field: "Beacon_id",
        headerName: "Beacon id",
        flex: 0.5,
      },
      {
        field: "Puck_id",
        headerName: "Puck id",
        flex: 0.5,
      },
      {
        field: "Hub_Firmware_version",
        headerName: "Firmware version",
        flex: 0.5,
      },
      {
        field: "Landline",
        headerName: "Landline",
        flex: 0.5,
      },
      {
        field: "Wifi_Strength",
        headerName: "Wifi Strength",
        flex: 0.5,
      },
      {
        field: "Hub_logs",
        headerName: "Hub logs",
        flex: 0.5,
      }
    ];

    const Beaconcolumns = [
      {
        field: "Beacon_id",
        headerName: "ID",
        flex: 0.5,
      },
      {
        field: "Battery_Level",
        headerName: "Battery Level",
        flex: 0.5,
      },
      {
        field: "Solar_Level",
        headerName: "Solar Level",
        flex: 0.5,
      },
      {
        field: "Temp",
        headerName: "Temperature",
        flex: 0.5,
      },
      {
        field: "RSSI",
        headerName: "RSSI",
        flex: 0.5,
      },
      {
        field: "Firmware_version",
        headerName: "Firmware version",
        flex: 0.5,
      },
      {
        field: "Beacon_logs",
        headerName: "Beacon logs",
        flex: 0.5,
      }
    ];
    const Puckcolumns = [
        {
          field: "Puck_id",
          headerName: "ID",
          flex: 0.5,
        },
        {
          field: "Puck_Battery_Level",
          headerName: "Battery Level",
          flex: 0.5,
        },
        {
          field: "Accelerometer",
          headerName: "Accelerometer",
          flex: 0.5,
        },
        {
          field: "RSSI_Signal",
          headerName: "RSSI",
          flex: 0.5,
        },
        {
          field: "Puck_Firmware_Version",
          headerName: "Firmware version",
          flex: 0.5,
        },
        {
          field: "Puck_logs",
          headerName: "Puck logs",
          flex: 0.5,
        }
      ];
    
     

    
      return (
        <Dialog fullScreen open={isOpen} onClose={handleClose}  >
          <AppBar sx={{ position: 'relative' }}>
            <toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>

            </toolbar>
          </AppBar>
        
          <DialogContent> 
            <DialogContentText>

              <br />
              
              <Box
                height="30vh"
                width="180vh"
                sx={{
                  "& .MuiDataGrid-root": {
                    border: "none",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderBottom: "none",
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: theme.palette.primary.light,
                  },
                  "& .MuiDataGrid-footerContainer": {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderTop: "none",
                  },
                  "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${theme.palette.secondary[200]} !important`,
                  },
                }}
              >
                <Typography varient="h1" fontWeight="bold">
                Home Hub
               </Typography>
                <DataGrid
                  //loading={isLoading || !data}
                  loading={!HomeHubData}
                  getRowId={(row) => row.Hub_id}
                  rows={filteredHub || []}
                  columns={HomeHubcolumns}
                  onRowClick={(params) => handleBPRowClick(params,params.row.Beacon_id,params.row.Puck_id)}
                  //rowCount={(BeaconData && BeaconData.total) || 0}
                  // rowsPerPageOptions={[20, 50, 100]}
                  pagination
                  
                />
                <br />
                {selectedBeaconId && (
                <>
                  <Typography variant="h2" fontWeight="bold">
                    Beacon
                  </Typography>
                  <DataGrid rows={selectedBeaconId || []} columns={Beaconcolumns} getRowId={(row) => row.Beacon_id} />
                </>
              )}
                <br />
                {selectedPuckId && (
                <>
                  <Typography variant="h2" fontWeight="bold">
                    Puck
                  </Typography>
                  <DataGrid rows={selectedPuckId} columns={Puckcolumns} getRowId={(row) => row.Puck_id} />
                </>
              )}
              </Box>
            </DialogContentText>
          </DialogContent>
          {/* <DialogActions>
            <Button onClick={()=>setIsOpen(false)}>Close</Button>
          </DialogActions> */}
        </Dialog>
      )
    }

  // const { data, isLoading } = useGetTransactionsQuery({
  //   page,
  //   pageSize,
  //   sort: JSON.stringify(sort),
  //   search,
  // });
  const data = AWSUserList;
  console.log(data)

  const columns = [
    {
      field: "sub",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "email",
      headerName: "User Name",
      flex: 1,
    },
    {
      field: "given_name",
      headerName: "First Name",
      flex: 1,
    },
    {
      field: "middle_name",
      headerName: "Middle Name",
      flex: 1,
      //sortable: false,
      //renderCell: (params) => params.value.length,
    },
    {
      field: "family_name",
      headerName: "Last Name",
      flex: 1,
      //renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
    {
        field: "birthdate",
        headerName: "DOB",
        flex: 1,
        //renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
      },
      {
        field: "phone_number",
        headerName: "Contact Number",
        flex: 1,
        //renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
      },
      {
        field: "Hub_id",
        headerName: "Hub ID",
        flex: 1,
        //renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
      }
  ];

  const apiRef = useGridApiRef();
  
  const initialState = useKeepGroupedColumnsHidden({
    apiRef,
    initialState: {
      ...data.initialState,
      rowGrouping: {
        ...data.initialState?.rowGrouping,
        model: ['ID'], // Clear any previous row grouping
      },
      sorting: {
        sortModel: [{ field: '__row_group_by_columns_group__', sort: 'asc' }], // Clear any previous sorting
      },
      aggregation: {}, // Clear any previous aggregation
    },
  });
  

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="USER DETAILS" subtitle="Entire list of User" />
      <button><Typography>Expand all</Typography></button>
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGridPremium
          //loading={isLoading || !data}
          loading={!data}
          getRowId={(row) => row.sub}
          rows={data || []}
          columns={columns}
          apiRef={apiRef}
          disableRowSelectionOnClick
          initialState={initialState}
          slots={{ toolbar: GridToolbar }}
          onRowClick={(params) => handleRowClick(params, params.row.Hub_id)}
          
        />
        <PopUp/>
      </Box>
    </Box>
  );
};



export default Users;
