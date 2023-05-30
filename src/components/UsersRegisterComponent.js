import { useState, useEffect } from 'react'
import axios from 'axios'
import NavbarComponent from './NavbarComponent'
import liff from "@line/liff";
import Swal from 'sweetalert2'
import './UsersRegisterComponent.css'
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

const UsersRegisterComponent = () => {
    const [ checkIsAny, setcheckIsAny ] = useState([])
    const [ counter, setCounter ] = useState('')
    const [ userUID, setuserUID ] = useState('')
    const [ displayName, setDisplayName ] = useState('')
    const [ image, setImage ] = useState('')

    const props = {
        displayName,
        image
    }

    const [ state, setState ] = useState({
        uuid: "",
        prename: "",
        name: "",
        surname: "",
        birthdate: "",
        id_card: "",
        email: "",
        address: "", 
        subdistrict: "",
        district: "", 
        province: "", 
        zip_code: "", 
        phone_number: ""
    })

    const { prename, name, surname, birthdate, id_card, email, address, subdistrict,
        district, province, zip_code, phone_number
    } = state

    const inputValue = (name) => (event) => {
        // console.log(name, "=" , event.target.value);
        setState({...state, [name]:event.target.value})
    }

    const checkRegister = () => {
        axios.get(`${process.env.REACT_APP_API}/checkUUIDIsEmpty`)
        .then((check) => {
            setcheckIsAny(check.data)
        }).catch((err) => {
            console.log(err);
        })
    }


    const checkHnZero = (counter) => {
        if(counter >= 0 && counter <= 8){
            return 'HN00000'
        }else if(counter >= 9 && counter <= 98){
            return 'HN0000'
        }else if(counter >= 99 && counter <= 998){
            return 'HN000'
        }else if(counter >= 999 && counter <= 9998){
            return 'HN00'
        }else if(counter >= 9999 && counter <= 99998){
            return 'HN0'
        }else if(counter >= 99999){
            return 'HN'
        }
    }   
    
    const getHN = () => {
        axios.get(`${process.env.REACT_APP_API}/HN`)
        .then((counter) => {
            setCounter(counter.data)
        }).catch((err) => {
            console.log(err);
        })
    } 
    
    liff.init({ liffId: `${process.env.REACT_APP_LIFF_REGISTER}` }, () => { 
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


    useEffect(() => {
        checkRegister()
        getHN()
    }, [])

    const isHas = () => {
        let hasUUID = false;
        checkIsAny.forEach((has) => {
            if(userUID === has.uuid){
               hasUUID = true
            } 
        })
        return hasUUID
    }
    
    const submitForm = (event) => {
        
        axios
        .post(`${process.env.REACT_APP_API}/create/user`,
        { HNId: `${checkHnZero(counter)}${counter+1}`,uuid: userUID, prename, name, surname, birthdate, id_card, email, address, subdistrict,
        district, province, zip_code, phone_number })
        .then((response) => {
            event.preventDefault()
            Swal.fire('แจ้งเตือน',"ท่านได้ลงทะเบียนเรียบร้อยแล้ว",'success')
            .then((result) => {
                liff.closeWindow()
            })
        })
        .catch(err => {
            Swal.fire('แจ้งเตือน',err.response.data.error,'error')
        })
    }

    return(
        <div>
            {
                isHas() === false ? (
                    <div>
                        <CssBaseline />
                        <Container maxWidth='sm' sx={{ p: 2}}>
                            <NavbarComponent {...props}/>
                            <Stack direction="row" justifyContent="center">
                                <Typography variant='h4' gutterBottom component="div">
                                    ลงทะเบียน
                                </Typography>
                            </Stack>
                            <form onSubmit={submitForm}>
                                <Grid>
                                    <Grid container spacing={2} sx={{ p: 1}}>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <InputLabel id="prename">คำนำหน้าชื่อ</InputLabel>
                                                    <Select
                                                    labelId="prename"
                                                    id="prename"
                                                    value={prename} 
                                                    onChange={inputValue('prename')}
                                                    label="คำนำหน้าชื่อ" required>
                                                    <MenuItem value="เด็กชาย">เด็กชาย</MenuItem>
                                                    <MenuItem value="เด็กหญิง">เด็กหญิง</MenuItem>
                                                    <MenuItem value="นาย">นาย</MenuItem>
                                                    <MenuItem value="นาง">นาง</MenuItem>
                                                    <MenuItem value="นางสาว">นางสาว</MenuItem>
                                                    </Select>
                                                <FormHelperText>กรุณาเลือกคำนำหน้าชื่อ</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField id="name" label="ชื่อ" 
                                            value={name} onChange={inputValue('name')} 
                                            variant="outlined" type="text" required fullWidth/>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ p: 1}}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField id="surname" label="นามสกุล" 
                                            value={surname} onChange={inputValue('surname')} 
                                            variant="outlined" type="text" required fullWidth/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <TextField id="birthdate" label="วัน/เดือน/ปีเกิด" 
                                                value={birthdate} onChange={inputValue('birthdate')} 
                                                variant="outlined" type="text" required fullWidth/>
                                                <FormHelperText>เช่น 11/05/2543</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ p: 1}}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField id="id_card" label="เลขบัตรประจำตัวประชาชน" 
                                            value={id_card} onChange={inputValue('id_card')} 
                                            variant="outlined" type="number" required fullWidth/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <TextField id="email" label="อีเมล์ (ถ้าไม่มีอีเมล์ไม่ต้องกรอก)" 
                                                value={email} onChange={inputValue('email')} 
                                                variant="outlined" type="email" fullWidth/>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ p: 1}}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField id="address" label="ที่อยู่" 
                                            value={address} onChange={inputValue('address')} 
                                            variant="outlined" type="text" required fullWidth/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField id="subdistrict" label="ตำบล" 
                                            value={subdistrict} onChange={inputValue('subdistrict')} 
                                            variant="outlined" type="text" required fullWidth/>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ p: 1}}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField id="district" label="อำเภอ" 
                                            value={district} onChange={inputValue('district')} 
                                            variant="outlined" type="text" required fullWidth/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField id="province" label="จังหวัด" 
                                            value={province} onChange={inputValue('province')} 
                                            variant="outlined" type="text" required fullWidth/>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ p: 1}}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField id="zip_code" label="รหัสไปรษณีย์" 
                                            value={zip_code} onChange={inputValue('zip_code')} 
                                            variant="outlined" type="number" required fullWidth/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField id="phone_number" label="เบอร์โทร" 
                                            value={phone_number} onChange={inputValue('phone_number')} 
                                            variant="outlined" type="number" required fullWidth/>
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
                                            ท่านได้ทำการลงทะเบียนเรียบร้อยแล้ว
                                        </Typography>
                                    </Stack>   
                                </Box>
                            </Box>
                        </Box>
                        <Grid m={3}>
                            <Link onClick={() => liff.closeWindow()}>
                                <Stack direction="row" justifyContent="center">
                                    <Button variant="contained">
                                        <Typography variant='h6' gutterBottom component="div">
                                            ย้อนกลับ
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

export default UsersRegisterComponent;