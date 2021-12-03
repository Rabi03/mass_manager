import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function ButtonAppBar({onClick,onMeal}) {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" color='inherit'>
        <Toolbar>
        <Link style={{textDecoration: 'none',flexGrow:1}} to="/">
          <Typography variant="h6" component="div" sx={{cursor: 'pointer' }}>
            Mess
          </Typography>
          </Link>
          <Button color="inherit" onClick={onClick}>AddMember</Button>
          <Button color="inherit" onClick={onMeal}>AddMeal</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
