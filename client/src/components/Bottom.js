import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';

import Paper from '@mui/material/Paper';

import {Typography} from "@mui/material";



export default function FixedBottomNavigation() {
    const [value, setValue] = React.useState(0);
    const ref = React.useRef(null);


    return (
        <Box sx={{ pb: 7 }} ref={ref}>
            <CssBaseline />

            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}

                >
                    <Typography style={{lineHeight:'50px'}}>
                        © 2023 <a href={'https://www.linkedin.com/in/avi-w-b29905233/'} target={'_blank'}>Avi Weiss</a>. All rights reserved.
                    </Typography>

                </BottomNavigation>
            </Paper>
        </Box>
    );
}

