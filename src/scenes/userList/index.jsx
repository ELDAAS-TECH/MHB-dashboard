import React, { useState } from "react";
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
//import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import {UserBeaconList,Puck,Beacon, HomeHub } from "data";
//import { Typography } from "@mui/material";
//import PopUp from "components/PopUp";

const UserList = () => {
  const theme = useTheme();

  // values to be sent to the backend
   const [page, setPage] = useState(0);
   const [pageSize, setPageSize] = useState(20);
   const [sort, setSort] = useState({});
   const [search, setSearch] = useState("");
   
   const [isOpen, setIsOpen] = useState(false);
   const [rowSelected, setRowSelected] = useState(""); 
   const handleRowClick = (params) => { 
      setIsOpen(true); 
      setRowSelected(params.row); 
      //alert(`You clicked on row with id ${params.row._id}`);
    };
   //const handleRowClick = (params) => { setIsOpen(true); };

   const [searchInput, setSearchInput] = useState("");
   
    const PopUp = (rowSelected) => {
      const HomeHubData = HomeHub;
      const BeaconData = Beacon;
      const PuckData = Puck;
    //console.log(rowSelected._id);
    const HomeHubcolumns = [
      {
        field: "_id",
        headerName: "ID",
        flex: 0.5,
      },

      {
        field: "Connectes_Cloud",
        headerName: "Connected To Cloud",
        flex: 1,
      },
      {
        field: "Error",
        headerName: "Error",
        flex: 1.8,
      },
      {
        field: "Updates",
        headerName: "Updates",
        flex: 1,
      }
    ];

    const Beaconcolumns = [
      {
        field: "_id",
        headerName: "ID",
        flex: 0.5,
      },
      {
        field: "Connectes_Hub",
        headerName: "Connected To Hub",
        flex: 3,
      },
      {
        field: "Error",
        headerName: "Error",
        flex: 1.8,
      },
      {
        field: "Updates",
        headerName: "Updates",
        flex: 1,
      }
    ];

      return (
        <Dialog open={isOpen} onClose={()=>setIsOpen(false)} fullWidth="md">
          <DialogContent> 
            <DialogContentText>

              <br />
              <Typography varient="h2" fontWeight="bold">
                Home Hub
              </Typography>
              <Box
                height="50vh"
                //width="80vh"
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
                <DataGrid
                  //loading={isLoading || !data}
                  loading={!HomeHubData}
                  getRowId={(row) => row._id}
                  rows={HomeHubData || []}
                  columns={HomeHubcolumns}
                  //rowCount={(BeaconData && BeaconData.total) || 0}
                  rowsPerPageOptions={[20, 50, 100]}
                  //pagination
                  //page={page}
                  //pageSize={pageSize}
                  //paginationMode="server"
                  //sortingMode="server"
                  //onPageChange={(newPage) => setPage(newPage)}
                  //onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  //onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                  //components={{ Toolbar: DataGridCustomToolbar }}
                  //onRowClick = {handleRowClick}
                  //componentsProps={{
                  //  toolbar: { searchInput, setSearchInput, setSearch },
                  //}}
                />
                <br />
                <Typography varient="h2" fontWeight="bold">
                  Beacon
                </Typography>
                <DataGrid rows={BeaconData} columns={Beaconcolumns} getRowId={(row) => row._id}/>
                <br />
                <Typography varient="h2" fontWeight="bold">
                  Puck
                </Typography>
                <DataGrid rows={PuckData} columns={Beaconcolumns} getRowId={(row) => row._id}/>
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>setIsOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      )
    }

  // const { data, isLoading } = useGetTransactionsQuery({
  //   page,
  //   pageSize,
  //   sort: JSON.stringify(sort),
  //   search,
  // });
  const data = UserBeaconList;

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "User",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "Hub",
      headerName: "No. of Hubs",
      flex: 1,
    },
    {
      field: "Beacon",
      headerName: "No. of Beacons",
      flex: 1,
      //sortable: false,
      //renderCell: (params) => params.value.length,
    },
    {
      field: "Puck",
      headerName: "No. of Puck",
      flex: 1,
      //renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="USER DETAILS" subtitle="Entire list of User" />
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
        <DataGrid
          //loading={isLoading || !data}
          loading={!data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          //rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          //page={page}
          //pageSize={pageSize}
          //paginationMode="server"
          //sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          onRowClick = {handleRowClick}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
        <PopUp />
      </Box>
    </Box>
  );
};



export default UserList;
