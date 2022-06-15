import { Link as RouterLink } from "react-router-dom";
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import React from "react";

function DrawerMenu() {
  const navs = [
    ["首页", "/", <ListIcon />],
    ["日历", "/days", <CalendarMonthIcon />],
  ]
  return (
    <Box sx={{ width: 200, maxWidth: 360, bgcolor: "background.paper" }}>
      <nav>
        <List>
          {navs.map(nav => {
            return (
            <ListItemButton component={RouterLink} to={nav[1]} key={nav[1]}>
              <ListItemIcon>
                {/* <ListIcon /> */}
                {nav[2]}
              </ListItemIcon>
              <ListItemText primary={nav[0]} />
            </ListItemButton>
            )
          })}
        </List>
      </nav>
    </Box>
  );
}

export default DrawerMenu;
