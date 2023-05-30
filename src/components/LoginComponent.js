import React, { useEffect ,useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { authenticate, getToken } from '../services/authorize'
import { useNavigate } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, Grid, Typography } from '@mui/material';
import Stack from "@mui/material/Stack";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginComponent = () => {
    let navigate = useNavigate()

    const [state, setState] = useState({
        username: "",
        password: "",
        showPassword: false
    })

    const { username, password } = state 

    const inputValue = (name) => (event) => {
        // console.log(name, "=" , event.target.value);
        setState({...state, [name]:event.target.value})
    }

    const submitForm = async (event) => {
        event.preventDefault()
        await axios
        .post(`${process.env.REACT_APP_API}/login`, {username, password})
        .then(response => {
            //Login สำเร็จ
            if(response.status === 200){
                authenticate(response, navigate('/admin'))
                window.location.reload()
            }  
        })
        .catch(err => {
            Swal.fire('แจ้งเตือน',err.response.data.error,'error')
        }) 
    }

    useEffect(() => {
        getToken() && navigate('/admin')
        // eslint-disable-next-line
    },[])

    const handleClickShowPassword = () => {
        setState({
            ...state,
            showPassword: !state.showPassword
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth='sm' sx={{ p: 2}}>
                <Stack direction="row" justifyContent="center">
                    <Typography variant='h4' mt={5} gutterBottom component="div">
                        เข้าสู่ระบบ | Admin
                    </Typography>
                </Stack>
                <form onSubmit={submitForm}>
                    <Grid>
                        <Grid container spacing={1} sx={{p:1}}>
                            <Grid item xs={12} sm={12} >
                                <InputLabel htmlFor="outlined-adornment-password">Username</InputLabel>
                                <OutlinedInput id="username" label="Username" 
                                value={username} onChange={inputValue('username')} 
                                variant="outlined" fullWidth required/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} sx={{p:1}}>
                            <Grid item xs={12}>
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={state.showPassword ? 'text' : 'password'}
                                    value={state.password}
                                    onChange={inputValue('password')}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {state.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="Password"
                                    fullWidth required
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} sx={{p:1}}>
                            <Grid item xs={12}>
                                <Stack direction="row" justifyContent="center">
                                    <Button variant="contained" type='submit' fullWidth>เข้าสู่ระบบ</Button>
                                </Stack>   
                            </Grid>
                        </Grid>  
                    </Grid>
                </form>
            </Container>
        </React.Fragment>
    )
}

export default LoginComponent;



