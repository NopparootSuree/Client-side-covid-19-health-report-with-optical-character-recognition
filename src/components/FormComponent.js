import { useState, useEffect } from 'react'
import axios from 'axios'
import NavbarComponent from './NavbarComponent'
import liff from "@line/liff";
import Swal from 'sweetalert2'
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const FormComponent = () => {
    const [ checkIsAny, setcheckIsAny ] = useState([])
    
    const checkRegister = () => {
        axios.get(`${process.env.REACT_APP_API}/checkUUIDIsEmpty`)
        .then((check) => {
            setcheckIsAny(check.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    const [userUID, setuserUID ] = useState('')
    const [displayName, setDisplayName ] = useState('')
    const [image, setImage ] = useState('')

    const props = {
        displayName,
        image
    }

    const [ state, setState ] = useState({
        body_temperature: "",
        upper_blood_pressure: "", 
        lower_blood_pressure: "",
        pulse_rate: "",
        respiratory: "",
        pulse_ox: "",
        blood_sugar: "",
        see_a_doctor: "",
        sickness: "" 
    })
 
    let { body_temperature, upper_blood_pressure, 
        lower_blood_pressure, pulse_rate, respiratory,
        pulse_ox, blood_sugar, see_a_doctor,  sickness 
    } = state

    const inputValue = (name) => (event) => {
        // console.log(name, "=" , event.target.value);
        setState({...state, [name]:event.target.value})
    }
    
    const submitForm = (event) => {
        event.preventDefault();
        if(sickness === ''){
            sickness = 'ไม่มีอาการ'
        }

        let valid = body_temperature === "" && upper_blood_pressure === "" && 
        lower_blood_pressure === "" && pulse_rate === "" && respiratory === "" &&
        pulse_ox === "" && blood_sugar === "" 

        if(!valid){
            axios
            .post(`${process.env.REACT_APP_API}/create/vitalsign`,
            { uuid: userUID, body_temperature, upper_blood_pressure, 
            lower_blood_pressure, pulse_rate, respiratory,
            pulse_ox, blood_sugar, see_a_doctor,  sickness })
            .then(response => {
                Swal.fire('แจ้งเตือน','บันทึกข้อมูลเรียบร้อย','success')
                setState({...state, body_temperature: "", upper_blood_pressure: "", 
                            lower_blood_pressure: "", pulse_rate: "", respiratory: "", pulse_ox: "",
                            blood_sugar: "", see_a_doctor: "", sickness: "" })
            })
            .catch(err => {
                Swal.fire('แจ้งเตือน',err.response.data.error,'error')
            })
        }else{
            Swal.fire('แจ้งเตือน','กรุณากรอกข้อมูล','eroor')
        }


        
    }

    const isHas = () => {
        let hasUUID = false;
        checkIsAny.forEach((has) => {
            if(userUID === has.uuid){
                hasUUID = true
            }
        })
        return hasUUID
    }

    useEffect(() => {
        checkRegister() 

        liff.init({ liffId: `${process.env.REACT_APP_LIFF_FORM}` }, () => { 
            if (liff.isLoggedIn()) {
                liff.getProfile().then(profile => {
                    setuserUID(profile.userId)
                    setDisplayName(profile.displayName)
                    setImage(profile.pictureUrl)
                })
                .catch((err => console.log(err)))
            } else {
                liff.login();
            }
        }, err => console.log(err));

    },[])

    return(
        <div>
            {
                isHas() === true ? (
                    <div>
                        <CssBaseline />
                        <Container maxWidth="sm" sx={{ p: 2}}>
                            <NavbarComponent {...props}/>
                            <Stack direction="row" justifyContent="center">
                                <Typography variant='h4' gutterBottom component="div">
                                    รายงานอาการ
                                </Typography>
                            </Stack>
                            <form onSubmit={submitForm}>
                                <Grid>
                                    <Grid container spacing={2} sx={{p:1}}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField id="body_temperature" label="อุณหภูมิร่างกาย" 
                                            value={body_temperature} onChange={inputValue('body_temperature')} 
                                            variant="outlined" type="number" fullWidth/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField id="upper_blood_pressure" label="ความดันโลหิตตัวบน" 
                                            value={upper_blood_pressure} onChange={inputValue('upper_blood_pressure')} 
                                            variant="outlined" type="number" fullWidth/>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{p:1}}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField id="lower_blood_pressure" label="ความดันโลหิตตัวล่าง" 
                                            value={lower_blood_pressure} onChange={inputValue('lower_blood_pressure')} 
                                            variant="outlined" type="number" fullWidth/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField id="pulse_rate" label="การเต้นชีพจรต่อนาที" 
                                            value={pulse_rate} onChange={inputValue('pulse_rate')} 
                                            variant="outlined" type="number" fullWidth/>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{p:1}}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField id="respiratory" label="จำนวนครั้งในการหายใจต่อนาที" 
                                            value={respiratory} onChange={inputValue('respiratory')} 
                                            variant="outlined" type="number" fullWidth/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField id="pulse_ox" label="ปริมาณออกซิเจนในเลือด" 
                                            value={pulse_ox} onChange={inputValue('pulse_ox')} 
                                            variant="outlined" type="number" fullWidth/>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{p:1}}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField id="blood_sugar" label="ค่าน้ำตาลในเลือด" 
                                            value={blood_sugar} onChange={inputValue('blood_sugar')} 
                                            variant="outlined" type="number" fullWidth/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <InputLabel id="see_a_doctor">มีความประสงค์ต้องการพบแพทย์</InputLabel>
                                                    <Select
                                                    labelId="see_a_doctor"
                                                    id="see_a_doctor"
                                                    value={see_a_doctor} 
                                                    onChange={inputValue('see_a_doctor')}
                                                    label="มีความประสงค์ต้องการพบแพทย์"
                                                    >
                                                    <MenuItem value="ไม่ได้เลือก">ไม่ได้เลือก</MenuItem>
                                                    <MenuItem value="ต้องการพบแพทย์">ต้องการพบแพทย์</MenuItem>
                                                    <MenuItem value="ไม่ต้องการพบแพทย์">ไม่ต้องการพบแพทย์</MenuItem>
                                                    </Select>
                                                <FormHelperText>กรุณาเลือกความประสงค์</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1} sx={{p:1}}>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                id="sickness"
                                                label="อาการ"
                                                multiline
                                                maxRows={5}
                                                value={sickness} 
                                                onChange={inputValue('sickness')}
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1} sx={{p:1}}>
                                        <Grid item xs={12}>
                                            <Button variant="contained" type='submit' fullWidth>บันทึกข้อมูล</Button>
                                        </Grid>
                                    </Grid>                
                                </Grid>
                            </form>
                        </Container>
                    </div>
                ) : (
                    <Grid item xs={12} sm={12} m={5}>
                        <Box>
                            <Box display="flex">
                                <Box sx={{ flexGrow: 1}}>
                                    <Stack direction="row" justifyContent="center">
                                        <Typography variant='h3' gutterBottom component="div">
                                            กรุณาลงทะเบียนก่อนเข้าใช้งาน
                                        </Typography>
                                    </Stack>   
                                </Box>
                            </Box>
                        </Box>
                        <Grid m={3}>
                            <Link href='register'>
                                <Stack direction="row" justifyContent="center">
                                    <Button variant="contained">
                                        <Typography variant='h6' gutterBottom component="div">
                                            ลงทะเบียน
                                        </Typography>
                                    </Button>
                                </Stack>
                            </Link>
                        </Grid>
                    </Grid>
                )    
            }
        </div>
    )
}

export default FormComponent;