import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Container, Box, IconButton, Menu, MenuItem, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const MainNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true); 
  };

  const handleLogoutConfirm = () => {
    sessionStorage.removeItem("jwttoken");
    navigate("/", { replace: true });
    window.location.reload();
  };

  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: "linear-gradient(90deg, #1A1A1D, #3B1C32)",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
          borderRadius: "8px",
          padding: "8px 16px",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Container>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                fontWeight: "bold",
                color: "#FFFFFF",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                transition: "all 0.3s ease",
                "&:hover": {
                  color: "#A64D79",
                  transform: "scale(1.05)",
                  textShadow: "0 0 12px rgba(166, 77, 121, 0.6)",
                },
              }}
            >
              Computer Seekho
            </Typography>

            <Box sx={{ display: { xs: "none", md: "flex" }, gap: "24px", alignItems: "center" }}>
              {["add-enquiry","online-enquiries", "Enquiries", "table", "Students"].map((route, index) => (
                <Typography
                  key={index}
                  component={Link}
                  to={route === "Enquiries" ? "/listcomponent" : `/${route}`}
                  sx={{
                    color: "#FFFFFF",
                    fontSize: "1rem",
                    fontWeight: "500",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    transition: "all 0.3s",
                    "&:hover": { background: "rgba(166, 77, 121, 0.3)", color: "#A64D79" },
                  }}
                >
                  {route.replace("-", " ")}
                </Typography>
              ))}
              <Button
                variant="contained"
                onClick={handleLogoutClick}
                sx={{
                  background: "#6A1E55",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  "&:hover": {
                    background: "#A64D79",
                  },
                }}
              >
                Logout
              </Button>
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <MenuIcon sx={{ color: "#A64D79" }} />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                {["add-enquiry", "online-enquiries","Enquiries", "table", "Students"].map((route, index) => (
                  <MenuItem key={index} component={Link} to={`/${route}`} onClick={handleMenuClose}>
                    {route.replace("-", " ")}
                  </MenuItem>
                ))}
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Logout Confirmation Dialog */}
      <Dialog 
        open={openLogoutDialog} 
        onClose={handleLogoutCancel} 
        sx={{ 
          ".MuiPaper-root": { 
            borderRadius: "8px", 
            background: "#1A1A1D", 
            color: "#FFFFFF",
            width: "400px", 
            maxWidth: "100%" 
          } 
        }}
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#FFFFFF" }}>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} sx={{ color: "#A64D79" }}>
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} sx={{ background: "#6A1E55", color: "#FFFFFF", "&:hover": { background: "#A64D79" } }}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MainNavbar;
