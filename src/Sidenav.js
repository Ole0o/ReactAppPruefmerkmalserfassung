import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import BuildIcon from "@mui/icons-material/Build";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import HouseIcon from "@mui/icons-material/House";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { Navigate, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

const drawerWidth = 240;

export default function Sidenav() {
  const navigation = useNavigate();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Webanwendung Prüfmerkmalserfassung
          </Typography>
          <Typography variant="h11" noWrap component="div" marginLeft={160}>
            Version Stable 1.0
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <Tooltip title="Dashboard">
              <ListItem disablePadding onClick={() => navigation("/")}>
                <ListItemButton>
                  <ListItemIcon>
                    <HouseIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
            </Tooltip>
            <Divider />
            <Tooltip title="Wareneingangprüfung anlegen">
              <ListItem
                disablePadding
                onClick={() => navigation("webasisdaten")}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <NoteAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="WE-Prüfung" />
                </ListItemButton>
              </ListItem>
            </Tooltip>
            <Tooltip title="AQL Kalkulator">
              <ListItem disablePadding onClick={() => navigation("aql")}>
                <ListItemButton>
                  <ListItemIcon>
                    <ModelTrainingIcon />
                  </ListItemIcon>
                  <ListItemText primary="WE-AQL" />
                </ListItemButton>
              </ListItem>
            </Tooltip>
            <Divider />
            <Tooltip title="Prüfpläne verwalten">
              <ListItem
                disablePadding
                onClick={() => navigation("pruefplanung")}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <BuildIcon></BuildIcon>
                  </ListItemIcon>
                  <ListItemText primary="Prüfplanung" />
                </ListItemButton>
              </ListItem>
            </Tooltip>
            <Tooltip title="Artikelstamm verwalten">
              <ListItem disablePadding onClick={() => navigation("artikel")}>
                <ListItemButton>
                  <ListItemIcon>
                    <FileOpenIcon />
                  </ListItemIcon>
                  <ListItemText primary="Artikel" />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
// import { useState } from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
// import Artikel from "./pages/Artikel";
// import Pruefplanung from "./pages/Pruefplanung";
// import WEPruefung from "./pages/WEPruefung";
// import AQL from "./pages/AQL";
// import Home from "./pages/Home";
// import { Navigate, useNavigate } from "react-router-dom";

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   zIndex: "0",
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// export default function Sidenav() {
//   const theme = useTheme();
//   const [open, setOpen] = useState(false);
//   // const [menudata, setMenudata] = useState("/");
//   const navigation = useNavigate();

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{
//               marginRight: 5,
//               ...(open && { display: "none" }),
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             Majesty Q
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === "rtl" ? (
//               <ChevronRightIcon />
//             ) : (
//               <ChevronLeftIcon />
//             )}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           <ListItem
//             disablePadding
//             sx={{ display: "block" }}
//             onClick={() => navigation("/")}
//           >
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? "initial" : "center",
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : "auto",
//                   justifyContent: "center",
//                 }}
//               >
//                 <InboxIcon />
//               </ListItemIcon>
//               <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>
//           <ListItem
//             disablePadding
//             sx={{ display: "block" }}
//             onClick={() => navigation("/artikel")}
//           >
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? "initial" : "center",
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : "auto",
//                   justifyContent: "center",
//                 }}
//               >
//                 <InboxIcon />
//               </ListItemIcon>
//               <ListItemText primary="Artikel" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>
//           <ListItem
//             disablePadding
//             sx={{ display: "block" }}
//             onClick={() => navigation("/pruefplanung")}
//           >
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? "initial" : "center",
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : "auto",
//                   justifyContent: "center",
//                 }}
//               >
//                 <InboxIcon />
//               </ListItemIcon>
//               <ListItemText
//                 primary="Prüfplanung"
//                 sx={{ opacity: open ? 1 : 0 }}
//               />
//             </ListItemButton>
//           </ListItem>
//           <ListItem
//             disablePadding
//             sx={{ display: "block" }}
//             onClick={() => navigation("/aql")}
//           >
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? "initial" : "center",
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : "auto",
//                   justifyContent: "center",
//                 }}
//               >
//                 <InboxIcon />
//               </ListItemIcon>
//               <ListItemText primary="AQL" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>
//           <ListItem
//             disablePadding
//             sx={{ display: "block" }}
//             onClick={() => navigation("/wepruefung")}
//           >
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? "initial" : "center",
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : "auto",
//                   justifyContent: "center",
//                 }}
//               >
//                 <InboxIcon />
//               </ListItemIcon>
//               <ListItemText
//                 primary="WE-Prüfung"
//                 sx={{ opacity: open ? 1 : 0 }}
//               />
//             </ListItemButton>
//           </ListItem>
//         </List>
//         <Divider />
//       </Drawer>
//       <DrawerHeader />
//       {/*
//       {menudata == "Home" && <Home />}
//       {menudata == "WEPruefung" && <WEPruefung />}
//       {menudata == "AQL" && <AQL />}
//       {menudata == "Artikel" && <Artikel />}
//       {menudata == "Pruefplanung" && <Pruefplanung />} */}
//     </Box>
//   );
// }
