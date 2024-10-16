import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#415A77", padding: "8px 16px" }}
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
              >
                Create Post
              </Button>
              <Button onClick={logout} sx={{ color: "#E0E1DD" }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{ color: "#E0E1DD", marginRight: 2 }}
              >
                Login
              </Button>
              <Button component={Link} to="/register" sx={{ color: "#E0E1DD" }}>
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
