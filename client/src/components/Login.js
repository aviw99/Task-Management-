import {useState,useEffect, useContext} from 'react';
import {CircularProgress, Box, Grid, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, TextField, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {Link, useNavigate}  from "react-router-dom";


import {AppContext} from "../App";
// const jwt_decode = require("jwt-decode");
import jwtDecode from "jwt-decode";

const Login = (props) => {
    const {token, setToken} = useContext(AppContext);
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    // const [userId, setUserId] = useState();

    const navigate = useNavigate();
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    // useEffect(() => {
    //     if(userId) {
    //         console.log(userId)
    //     }
    // },[userId])

    const handleSubmit = async(event) => {
        event.preventDefault();

        try{
            setLoading(true)
            const response = await fetch('/users/login', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            if(response.ok){
                const data = await response.json();
                // console.log('Successful login', data);
                const the_token = data.token;
                const decodedToken = await jwtDecode(the_token);
                setToken([decodedToken, the_token])
                navigate('/tasks')
                // console.log(decodedToken.userId)

            }else{
                const errorData = await response.json();
                console.log('Login error', errorData);
            }

        }catch(error){
            console.error('An error occurred during login:', error);
        }finally {
            setLoading(false)
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const headerStyle = {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        paddingTop:'20vh'
    }
    return (
        <Box  style={headerStyle} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <h1>Welcome to Task-Manager</h1>
            <h2>
                                           Login to continue or{" "}
                                             <Link to={'/register'}>
                                                 create a new account
                                             </Link>
                                         </h2>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <TextField
                                id="outlined-basic"
                                label="Username"
                                variant="outlined"
                                value={username}
                                onChange={handleUsernameChange}
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password" required>Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={handlePasswordChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        { loading ? <CircularProgress /> : <Button variant="contained" type="submit" sx={{mt: 2}} onClick={handleSubmit}>
                            Login
                        </Button>}
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

export default Login
