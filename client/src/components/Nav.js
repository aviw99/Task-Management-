import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function ButtonAppBar() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <AppBar position="fixed" sx={{ backgroundColor: 'white' , color:"black"}}>
                <Toolbar>
                    <Typography variant="h4" component="div" sx={{marginLeft:'4%', flexGrow: 1, textAlign: 'center' }}>
                        Task-Manager
                    </Typography>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/login"
                    >Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
