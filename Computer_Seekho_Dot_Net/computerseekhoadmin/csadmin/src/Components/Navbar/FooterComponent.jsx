import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const FooterComponent = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "#1A1A1D", top: "auto", bottom: 0, height: 50 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography sx={{ color: "#A64D79", fontWeight: "bold" }}>
          © 2025 USM's Shriram Mantri Vidyanidhi Info Tech Academy
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default FooterComponent;
