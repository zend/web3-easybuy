import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './App.css';
import DrawerMenu from './components/DrawerMenu';

const Index = React.lazy(() => import('./pages/Index'));
const Days = React.lazy(() => import('./pages/Days'));


function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const toggleDrawer = (open) => (event) =>  {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open)
  }
  const isMetaMask = window.ethereum && window.ethereum.isMetaMask;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: '#F80' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Easy Buy
          </Typography>
          {isMetaMask ? <Button color="inherit">Login</Button> : <></>}
        </Toolbar>
      </AppBar>
      
      <BrowserRouter>
        <Drawer anchor='left' open={drawerOpen} onClose={toggleDrawer(false)}>
          <DrawerMenu />
        </Drawer>
        <Routes>
          <Route path='/' element={<Index />}></Route>
          <Route path='/days' element={<Days />}></Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
