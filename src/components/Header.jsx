import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="navbar">
          <Toolbar>
          <KeyboardBackspaceIcon/>
            <div className="divider">
            </div>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Event
            </Typography>
          </Toolbar>
      </AppBar>
    </Box>
  )
}
