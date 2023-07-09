import {useState} from 'react';
import {CircularProgress, Box, Grid, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, TextField, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {Link, useNavigate} from "react-router-dom";

const Register = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const navigate = useNavigate();

    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            setLoading(true)
            const response = await fetch('/users/register', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    username,
                    password
                })
            });
            if(response.ok){
                const data = await response.json();
                navigate('/login')
            }else{
                const errorData = await response.json();
                console.log('Registration error', errorData);
            }

        }catch(error){
            console.error('An error occurred during registration:', error);
        }finally {
            setLoading(false)
        }
        console.log({
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
        });
    };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
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
        <Box style={headerStyle} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <h1>Welcome to Task-Manager</h1>
            <h2>
                                      Already have an account?{" "}
                          <Link to={'/login'} >Back to login</Link>
                        </h2>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <TextField
                                id="outlined-first-name"
                                label="First Name"
                                variant="outlined"
                                value={firstName}
                                onChange={handleFirstNameChange}
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <TextField
                                id="outlined-last-name"
                                label="Last Name"
                                variant="outlined"
                                value={lastName}
                                onChange={handleLastNameChange}
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <TextField
                                id="outlined-username"
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
                        {loading ? <CircularProgress /> : <Button variant="contained" type="submit" sx={{mt: 2}}>
                            Register
                        </Button>}
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

export default Register