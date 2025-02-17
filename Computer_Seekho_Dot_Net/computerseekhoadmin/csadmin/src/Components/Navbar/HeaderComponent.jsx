import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const HeaderComponent = () => {
  const [time, setTime] = useState(new Date());
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const slide = setInterval(() => {
      setPosition((prev) => (prev < 100 ? prev + 1 : -50));
    }, 50);
    return () => clearInterval(slide);
  }, []);

  return (
    <AppBar
      position="static"
       sx={{ backgroundColor: "#1A1A1D", overflow: "hidden", height: 50 }}
    >
      <Toolbar
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      ><marquee>USM's Shriram Mantri Vidyanidhi Info Tech Academy</marquee>
        <Typography sx={{ color: "#FEFFFF", fontWeight: "bold" ,width: "10%"}}>
          {time.toLocaleTimeString()}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;
