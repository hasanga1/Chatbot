// import { AppBar, Toolbar } from "@mui/material";
// import React from "react";
// import Logo from "./shared/Logo";
// import { useAuth } from "../context/AuthContext";
// import NavigationLink from "./shared/NavigationLink";

// const Header = () => {
//   const auth = useAuth();
//   return (
//     <AppBar
//       sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
//     >
//       <Toolbar sx={{ display: "flex" }}>
//         <Logo />
//       </Toolbar>
//       <div>
//         {auth?.isLoggedIn ? (
//           <>
//             <NavigationLink
//               bg="#eff1ed"
//               to="/chat"
//               text="Chat"
//               textColor="black"
//             />
//             <NavigationLink
//               bg="#eff1ed"
//               to="/"
//               text="Signout"
//               textColor="black"
//               onClick={auth.logout}
//             />
//           </>
//         ) : (
//           <>            <NavigationLink
//           bg="#eff1ed"
//           to="/login"
//           text="Signin"
//           textColor="black"
//         />
//         <NavigationLink
//           bg="#eff1ed"
//           to="/signup"
//           text="Signup"
//           textColor="black"
//         />
//           </>
//         )}
//       </div>
//     </AppBar>
//   );
// };

// export default Header;

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { CiMenuFries } from "react-icons/ci";
import Logo from "./shared/Logo";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

export default function Header(props: Props) {
  const auth = useAuth();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        bgcolor: "#111d13",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        paddingTop: "10px",
      }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        <div>
          <Logo />
        </div>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ bgcolor: "#111d13" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <CiMenuFries />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <div className="logo-normal">
              <Logo />
            </div>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {auth?.isLoggedIn ? (
              <>
                <Link to="/chat" style={{ textDecoration: "none", background: "#9ef01a", color:"#111d13"}}  className="nav-link-left">
                  Chat
                </Link>
                <Link
                  to="/"
                  style={{ textDecoration: "none", background: "#38b000", color:"white"}}
                  onClick={auth?.logout}
                  className="nav-link-right"
                >
                  Sign out
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" style={{ textDecoration: "none", background: "#9ef01a", color:"#111d13"}} className="nav-link-left">
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", background: "#38b000", color:"white"}}
                  className="nav-link-right"
                >
                  Signup
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "#111d13",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
