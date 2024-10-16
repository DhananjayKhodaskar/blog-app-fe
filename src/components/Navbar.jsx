import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#0D1B2A", padding: "8px 16px" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{
            color: "#E0E1DD",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#E0E1DD",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
            }}
          >
            <HomeIcon />
            Blog App
          </Link>
        </Typography>
        <Box>
          {user ? (
            <>
              <Button
                component={Link}
                to="/create"
                sx={{ color: "#E0E1DD", marginRight: 2 }}
                startIcon={<AddCircleIcon />}
              >
                Create Post
              </Button>
              <Button
                onClick={logout}
                sx={{ color: "#E0E1DD" }}
                startIcon={<LogoutIcon />}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{ color: "#E0E1DD", marginRight: 2 }}
                startIcon={<LoginIcon />}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                sx={{ color: "#E0E1DD" }}
                startIcon={<AppRegistrationIcon />}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
